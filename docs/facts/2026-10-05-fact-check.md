# Station fact check, 2026-10-05

This report covers one run of the station fact checker (`apps/web/scripts/facts/`) over the copy of all 200 station entries (lines 1, 4, 5, 6, 7, 9 and 14), the review of the 80 riskiest claim pairs, and the fixes that came from it. For how to run the checker, see [README.md](README.md).

## Summary

- 1,778 sentence claims (879 EN/FR pairs) from 200 station entries were checked against 354 fetched source pages.
- Jev (`jev-1.13.0`) answered 1,778 requests with 0 errors in 25.6 s. Numbers and dates were compared in code: 1,481 checked, 51 unmatched in 49 claims.
- The 80 riskiest pairs were reviewed against the full source pages. Result: 1 confirmed error, 5 confirmed imprecise claims, 32 claims that are true but not supported by the cited sources, 39 supported claims, and 3 claims first marked imprecise that did not survive a refutation pass.
- 6 copy corrections were applied. Sources were added for all 32 unsourced pairs, and for République on Line 5 so that it cites the same sources as Line 9. `bun run test` (104 pass) and `bun run typecheck` pass.
- As a ranker of real errors, the risk score is weak: 6 confirmed problems in the top 80 (precision 0.075), spread over ranks 6 to 80. As a ranker of claims that need attention (error, imprecise or unsourced), it is useful: precision 0.60 at 10 and 0.48 at 80.

## Method

### 1. Sources

`sources.ts` collects every URL from each station's `sources[]` and `people[]` (354 unique URLs at run time: source links and biography links). Wikipedia pages come from the MediaWiki API as plain text (`prop=extracts`, `explaintext`, `redirects`). Other pages are fetched as HTML and stripped to text. Each response is cached in `apps/web/scripts/facts/cache/` (gitignored), with its status, so a failed link is kept as a finding.

### 2. Claim splitting

`claims.ts` splits each station field (etymology, context) in each locale into sentences. It aligns the EN and FR sentences in order into groups, usually 1:1, sometimes 1:2 when one locale splits a sentence that the other keeps whole.

- Claim id: `line/station/field/locale/n`, for example `9/robespierre/context/fr/2`.
- Pair key: `line/station/field/g`, for example `9/robespierre/context/2`. The ranking is per pair.

### 3. Retrieval

`retrieve.ts` cuts each source text into passages of about 100 to 150 words and ranks them with BM25. Tokens are accent-folded. Document frequencies come from all passages of all stations, so words that occur in every metro article ("station", "ligne") weigh little. The query for a claim is:

- the claim (weight 1),
- its other-locale counterpart (weight 1 for an EN claim, 0.5 for a FR claim),
- the previous sentence (weight 0.3, to resolve "it" or "the square"),
- with station-name words multiplied by 0.3.

Only the station's own source pages are candidates. The top 5 passages go to Jev.

### 4. Number and date checks in code

Jev is weak on numbers and dates (see the Jev 1.13 jaggedness notes), so `numbers.ts` extracts every number, year, date and century from the claim, in English or French, and normalises it to a key (`d:1900-07-19`, `my:1900-07`, `y:1900`, `c:19`, `n:300`). Each key is looked up in the numbers found in the station's source texts. A fact that no source contains is "unmatched".

### 5. Jev questions

`jev.ts` sends one `systemOne` request per claim, with the state `{claim, previous_sentence?, station, field, passages[]}` and three questions (question set `facts-2`):

| Question | Type | Meaning |
|---|---|---|
| `supported` | Noul | Is every detail of the claim (name, date, number, place, title, relation) stated in the passages or directly implied by them? |
| `contradicted` | Noul | Does a passage state something incompatible with a detail of the claim (a different date, number, name, place, title, order of events or reason)? |
| `best_passage` | choice | Which passage best supports the claim, or `none` |

Answers are cached per model, question version and state, so a rerun pays only for changed claims.

### 6. Risk formula

`rank.ts`, weights in `RISK_WEIGHTS`:

```
claim risk = 0.4 × contradicted
           + 0.3 × (1 − supported)
           + min(0.3, 0.15 × unmatched numbers)      (number words count half)
           + 0.05 if best_passage = none or no passage was retrieved
           + 0.1 × fetch failure                      (1 = a source link failed, 0.5 = only a people link failed)
           + 0.3 + 0.1 instead of the Jev terms if Jev returned an error

pair risk  = max(claim risk over EN and FR claims) + 0.2 × |risk(EN) − risk(FR)|
```

### 7. Review

The 80 pairs with the highest risk were reviewed by agents that read the full source pages and, when needed, other pages on the same subject (place articles, line articles, en.wikipedia). Each claim got one verdict: `error`, `imprecise`, `true_but_unsourced` (true, but the cited sources do not state it) or `supported`. Every `error` and `imprecise` verdict then went through a separate refutation pass that tried to prove the claim correct. Only verdicts that survived are counted as confirmed.

Run figures: model `jev-1.13.0`, question set `facts-2`, generated 2026-10-05T10:50:34Z, 1,778 requests (1,706 live, 72 cached), 3,525,730 input tokens and 179,657 output tokens, 28.5 s in total.

## Distribution of Jev answers

| Range | supported | contradicted |
|---|---|---|
| 0–0.2 | 127 | 1,358 |
| 0.2–0.5 | 190 | 349 |
| 0.5–0.8 | 484 | 61 |
| 0.8–1.0 | 977 | 10 |

`best_passage = none`: 83 claims.

## Review results (top 80 pairs)

| Verdict | Pairs |
|---|---|
| Confirmed error | 1 |
| Confirmed imprecise | 5 |
| Imprecise, not confirmed after refutation | 3 |
| True but unsourced | 32 |
| Supported | 39 |

### Jev as a ranker

Precision at k, by rank in `ranked.md`:

| k | Confirmed problems | Precision | Confirmed + unsourced | Precision |
|---|---|---|---|---|
| 10 | 1 | 0.10 | 6 | 0.60 |
| 20 | 2 | 0.10 | 11 | 0.55 |
| 40 | 2 | 0.05 | 24 | 0.60 |
| 80 | 6 | 0.075 | 38 | 0.48 |

The confirmed problems are at ranks 6, 12, 50, 60, 66 and 80. The ranking does not put them at the top. Pairs below rank 80 were not reviewed, so recall is unknown.

Signals per category (a pair has a signal when any of its claims has it):

| Signal | Confirmed (6) | Refuted (3) | Unsourced (32) | Supported (39) |
|---|---|---|---|---|
| contradicted ≥ 0.5 | 3 | 2 | 11 | 25 |
| supported < 0.5 | 6 | 3 | 32 | 35 |
| supported < 0.2 | 3 | 2 | 26 | 11 |
| unmatched number or date | 1 | 1 | 15 | 3 |
| best_passage = none | 2 | 1 | 17 | 8 |
| EN/FR risk differ by ≥ 0.15 | 0 | 0 | 3 | 21 |

What the table shows:

- **Low `supported` is the most useful signal.** Every confirmed problem and every unsourced claim had supported < 0.5. Supported < 0.2 separates the problem and unsourced pairs (31 of 41) from the supported pairs (11 of 39).
- **`contradicted` is not predictive.** It was ≥ 0.5 for 25 of the 39 supported pairs and for only 3 of the 6 confirmed problems. Jev often marks a claim as contradicted when a passage is about a related fact. The one confirmed error (Robespierre, contradicted 0.96) was found because the en.wikipedia source and the fr.wikipedia source disagree. The two highest-ranked pairs (Saint-Mandé, contradicted 0.86 and 0.98) are a conflict between the claim and an error in the source article (1934 instead of 1937), not an error in the copy.
- **Unmatched numbers predict missing sources, not errors.** 15 of the 32 unsourced pairs had an unmatched date, against 3 of the 39 supported pairs. Usually the full date was in the line article and only the year was in the station article. Only 1 confirmed problem had an unmatched number.
- **EN/FR disagreement points to false alarms.** 21 of the 39 supported pairs had a disagreement of 0.15 or more, and none of the confirmed problems. One locale scoring low while the other scores high is mostly Jev noise. The `pairDisagreement` weight (0.2) adds risk in the wrong direction and should be reduced or removed.
- **Imprecision is hard for Jev.** Four of the five confirmed imprecise claims are wrong in one word ("only", "more speculatively", "confirmed", "neighbouring", "district"), where the passage states something close. Jev gave these supported 0.02 to 0.33, so they were in the low-supported group, but so were 81 other pairs.

A ranking that uses mostly `1 − supported` and unmatched numbers, with a small or zero weight for `contradicted` and disagreement, would probably find unsourced claims faster. It is not clear that any of these signals finds imprecise wording faster than reading in order of low support.

### Notes on the review data

The verdict list from the review used a different order for ranks 1 to 10, and for ranks 41 to 50 it gave only the rank as the id. The verdicts were mapped back to `ranked.md` by pair key. Two fix tasks (claims 43 and 50) were sent to non-existent files (`line43.ts`, `line50.ts`). These two were applied in the final pass.

## Confirmed fixes

### 1. Robespierre, context (error, rank 6)

- Before (EN): "Of its two entrances, only the one on Rue Barbès is described as Art Deco."
- After (EN): "Both of its entrances are Art Deco buildings. The one on Rue Robespierre is built into the line of the facade beside it, which is rare on the network."
- Before (FR): « Des deux entrées de la station, seule celle de la rue Barbès est qualifiée d’Art déco. »
- After (FR): « Ses deux accès sont des édicules de style Art déco. Celui de la rue Robespierre s’aligne sur la façade voisine, un cas rare sur le réseau. »
- Evidence: [Robespierre (métro de Paris)](https://fr.wikipedia.org/wiki/Robespierre_(m%C3%A9tro_de_Paris)): « l'accès 1 « Rue Robespierre » comprenant un édicule de style Art déco établi en alignement avec la façade attenante du no 187 de la rue de Paris (cas rare sur le réseau) » and « l'accès 2 « Rue Barbès » consistant également en un édicule dans le style Art déco ». The old text used only en.wikipedia, which labels only access 2. Correction 24 in `docs/research/line9.md` is updated.

### 2. Porte Maillot, etymology (imprecise, rank 12)

- Before (EN): "perhaps an old mallet game, or more speculatively the 1382 Maillotins revolt."
- After (EN): "perhaps an old mallet game played in the wood, or the 1382 Maillotins revolt."
- Before (FR): « peut-être un ancien jeu de mail, ou plus spéculativement la révolte des Maillotins de 1382. »
- After (FR): « peut-être un ancien jeu de mail dans le bois, ou la révolte des Maillotins de 1382. »
- Evidence: [Porte Maillot](https://fr.wikipedia.org/wiki/Porte_Maillot) (added as a source): « On dit souvent que ce nom viendrait d'un ancien jeu de mail » and « Une origine bien plus ancienne est beaucoup plus probable. Il s'agirait du souvenir de la révolte dite des Maillotins ». The old text ranked the two in the opposite order from the source. `docs/research/line1.md` says to give both as unproven.

### 3. Saint-Augustin, etymology (imprecise, rank 50)

- Before (EN): "The square and church give their name to the surrounding district in the 8th arrondissement."
- After (EN): "The station lies under Boulevard Haussmann, east of the square, on the boundary between the Madeleine and Europe districts."
- Before (FR): « La place et l’église donnent leur nom au quartier environnant, dans le 8e arrondissement. »
- After (FR): « Elle se trouve sous le boulevard Haussmann, à l’est de la place, à la limite des quartiers de la Madeleine et de l’Europe. » The FR first sentence now ends « qui tient le sien de l’église Saint-Augustin voisine », to stay within 45 words.
- Evidence: [Saint-Augustin (métro de Paris)](https://fr.wikipedia.org/wiki/Saint-Augustin_(m%C3%A9tro_de_Paris)): « La station est implantée au nord du quartier de la Madeleine à sa limite administrative avec le quartier de l'Europe. Elle se trouve sous le boulevard Haussmann, à l'est de la place Saint-Augustin. » The administrative quartiers of the 8th are Champs-Élysées, Faubourg-du-Roule, Madeleine and Europe.

### 4. Bastille, context (imprecise, rank 60)

- Before (EN): "A bridge over the Canal Saint-Martin, at the north end of the Arsenal basin, carries the Line 1 platforms."
- After (EN): "Part of the Line 1 platforms stands on a bridge over the Canal Saint-Martin, at the north end of the Arsenal basin."
- Before (FR): « Un pont au-dessus du canal Saint-Martin, à l’extrémité nord du bassin de l’Arsenal, porte les quais de la ligne 1. »
- After (FR): « Une partie des quais de la ligne 1 repose sur un pont au-dessus du canal Saint-Martin, à l’extrémité nord du bassin de l’Arsenal. »
- Evidence: [Bastille (métro de Paris)](https://fr.wikipedia.org/wiki/Bastille_(m%C3%A9tro_de_Paris)): the Line 1 station is « en partie souterraine et aérienne », and only « la partie aérienne du quai » looks over the canal.

### 5. Thiais – Orly, context (imprecise, rank 66)

- Before (EN): "The name was confirmed in 2022 after local authorities requested changes to the southern extension’s station names. Pont de Rungis remains the name of the connecting RER C station."
- After (EN): "The station was renamed in September 2022, after local elected officials objected to some of the southern extension’s station names. Pont de Rungis was kept as its subtitle and remains the name of the connecting RER C station."
- Before (FR): « Le nom a été confirmé en 2022 après les demandes des collectivités concernant les stations du prolongement sud. Pont de Rungis reste le nom de la gare du RER C en correspondance. »
- After (FR): « La station a été renommée en septembre 2022, après les objections d’élus locaux à certains noms de stations du prolongement sud. Pont de Rungis a été conservé en sous-titre et reste le nom de la gare du RER C en correspondance. »
- Evidence: [Thiais - Orly (métro de Paris)](https://fr.wikipedia.org/wiki/Thiais_-_Orly_(m%C3%A9tro_de_Paris)): « La station est initialement nommée Pont de Rungis… En septembre 2022, à la suite de débats locaux, elle est renommée Thiais – Orly, avec la mention Pont de Rungis en sous-titre. » [Thiais–Orly station](https://en.wikipedia.org/wiki/Thiais%E2%80%93Orly_station) (added) reports the mayors' objections.

### 6. Saint-Mandé, etymology (imprecise, rank 80)

- Before (EN): "Named for the neighbouring town of Saint-Mandé."
- After (EN): "Named for the town of Saint-Mandé, where it stands, on the boundary with Vincennes."
- Before (FR): « La station doit son nom à la commune voisine de Saint-Mandé. »
- After (FR): « La station doit son nom à la commune de Saint-Mandé, où elle se trouve, à la limite de Vincennes. »
- Evidence: [Saint-Mandé (métro de Paris)](https://fr.wikipedia.org/wiki/Saint-Mand%C3%A9_(m%C3%A9tro_de_Paris)): « située à la limite des communes de Saint-Mandé et de Vincennes », « implantée sous l'amorce de l'avenue de Paris (D 120) à Saint-Mandé ».

### Related wording changes (not confirmed errors)

- Thiais – Orly, etymology (unsourced, rank 36): "to identify the two neighbouring municipalities served by the station" became "after Thiais, where the station stands, and the neighbouring municipality of Orly" (FR: « à Thiais, où elle se trouve, et à la commune voisine d’Orly »). Source: en.wikipedia Thiais–Orly station.
- Hôpital Bicêtre, context (unsourced, rank 33): "The hospital’s history traces the name through the forms…" became "The name passed through the forms…" (FR: « Le nom est passé par les formes… »). The AP-HP booklet that the old wording cited is a PDF the checker cannot read. Sources added: Bicêtre and Le Kremlin-Bicêtre (Wikipédia).

## Sources added for true but unsourced claims (32 pairs)

Each change log in `docs/copy/changes/line*.md` has a section "Fact check 2026-10-05" with the quote that supports each claim. Copy did not change for these, except the two items above.

| Line | Station | Source added | Supports |
|---|---|---|---|
| 1 | saint-mande | Saint-Mandé station (en.wikipedia), Picpus (fr) | 26 April 1937 rename; Picpus rename 1 March 1937 |
| 1 | nation | Place de la Nation | Place du Trône 1660, Trône-Renversé 1792 |
| 1 | chateau-de-vincennes | Ligne 1 du métro de Paris | 24 March 1934 |
| 1 | berault | Ligne 1 du métro de Paris | first platform doors, February 2009 |
| 1 | gare-de-lyon | Paris-Gare-de-Lyon | name from the railway line |
| 1 | porte-de-vincennes | Portes de Paris, Enceinte de Thiers | gate in the Thiers wall |
| 1 | la-defense | Ligne 1 du métro de Paris | western terminus |
| 4 | porte-de-clignancourt | Quartier de Clignancourt | 1860 |
| 4 | chateau-deau | Fontaine du Château-d’Eau, Place de la République | fountain moved to La Villette |
| 4 | montparnasse-bienvenue | Quartier du Montparnasse, Montparnasse (en) | rubble-heap "Mount Parnassus" |
| 4 | saint-sulpice | Église Saint-Sulpice | several architects in turn |
| 4 | barbes-rochechouart | Marguerite de Rochechouart, Boulevard Marguerite-de-Rochechouart | abbess of Montmartre |
| 5 | republique | Place de la République | same sources as Line 9 for the shared etymology |
| 6 | saint-jacques, dupleix, raspail | Ligne 6 du métro de Paris | 24 April 1906 |
| 6 | edgar-quinet | Boulevard Edgar-Quinet | junction of four other streets |
| 7 | gare-de-lest | Ligne 7 du métro de Paris | Line 7 in 1910 |
| 7 | place-monge, place-ditalie | Ligne 7 du métro de Paris | 1931 transfer under the Seine |
| 7 | maison-blanche | Le Kremlin-Bicêtre | branch opened 1982 |
| 7 | mairie-divry | Maison Blanche | branches separate at Maison Blanche |
| 9 | trocadero | Place du Trocadéro-et-du-11-Novembre | 1877 rename |
| 9 | porte-de-montreuil | Ligne 9 du métro de Paris | end of terminus role, 1937 |
| 9 | pont-de-sevres | Boulogne-Billancourt, 4 avril 1943 (CPGenea) | date and 80 deaths at the station |
| 9 | republique | Place de la République | name given for the statue project |
| 14 | villejuif-gustave-roussy | Gustave-Roussy | 1926 |
| 14 | hopital-bicetre | Bicêtre, Le Kremlin-Bicêtre | Winchester → Bicêtre |
| 14 | thiais-orly | Thiais–Orly station (en) | location and rename |
| 14 | mairie-de-saint-ouen | Hôtel de ville de Saint-Ouen-sur-Seine | town hall |

All new source URLs were fetched after the change; all return text. One title (Gare de Paris-Gare-de-Lyon) redirected and was changed to the target title, Paris-Gare-de-Lyon.

## Not changed

- The 3 refuted imprecise verdicts: 7/gare-de-lest/etymology/2 and 4/gare-de-lest/etymology/2 (the shared Gare de l'Est etymology, "adopted this name in 1854") and 6/denfert-rochereau/etymology/1 (the name "Pierre Philippe Denfert-Rochereau").
- Saint-Mandé rename date: the fr station article gives 26 April 1934; the copy keeps 26 April 1937. `docs/research/line1.md` treats 1934 as an error in the article, and en.wikipedia gives 1937.
- La Défense area field ("Puteaux / Courbevoie"; the station article says Puteaux). This was a side note, not a reviewed claim.

## Broken source links

The six links that failed in the run were checked again with a browser user agent. No replacement was made, because none of them is a moved page with a known new address.

| URL | Station | Status |
|---|---|---|
| https://www.ratp.fr/decouvrir/patrimoine/histoire-station-montparnasse-bienvenue | 4/montparnasse-bienvenue | HTTP 403 to scripts and to a browser user agent (bot protection). Not confirmed broken. Check in a browser. |
| https://www.bonjour-ratp.fr/en/lignes-metro/ligne-5/ | 5/gare-dausterlitz | HTTP 403 (bot protection). Not confirmed broken. Check in a browser. |
| https://quotidien-parisiens-sous-occupation.paris.fr/en/detail_419.html | 5/jacques-bonsergent | HTTP 200, but the text needs JavaScript. Link works. |
| https://www.saint-ouen.fr/vie-quotidienne/culture-et-patrimoine/histoire-et-patrimoine/histoire-de-saint-ouen-sur-seine/ | 14/mairie-de-saint-ouen, 14/saint-ouen | HTTP 200 with a JavaScript proof-of-work challenge. Link probably works in a browser. |
| https://www.aphp.fr/sites/default/files/w_livret_accueil_enfant_bicetre.pdf | 14/hopital-bicetre | HTTP 200, a 2.3 MB PDF. Link works; the checker does not read PDFs. |
| https://www.valdemarne.fr/espace-presse/les-communiques-de-presse/nouveaux-noms-des-stations-de-la-ligne-14-du-grand-paris-express-un-choix-de-coherence-territoriale | 14/chevilly-larue, 14/thiais-orly | Connection timeout, also for the site's home page. Not confirmed broken. Thiais – Orly now also cites the fr and en station articles. |

Wikipedia titles that redirect (not broken, but the cited title is not the article title): Esplanade de La Défense (métro de Paris), Bonne Nouvelle (métro de Paris), Sulpitius the Pious, Pierre Philippe Denfert-Rochereau (→ Aristide Denfert-Rochereau), Gilbert du Motier, Marquis de Lafayette, François Séverin Marceau-Desgraviers (fr and en), Franklin D. Roosevelt (fr).

## Copy evaluation after the fixes

The copy evaluator was run again on lines 1, 9 and 14 (`--kind station`), where copy text changed. All edited units are in the ship band (≥ 0.85), with no FAIL check and no hard failure:

| Unit | EN | FR |
|---|---|---|
| 1/porte-maillot/etymology | 0.92 | 0.92 |
| 1/bastille/context | 0.95 | 0.97 |
| 1/saint-mande/etymology | 0.91 | 0.88 |
| 9/robespierre/context | 0.96 | 0.95 |
| 9/saint-augustin/etymology | 0.98 | 0.97 |
| 14/thiais-orly/etymology | 0.94 | 0.95 |
| 14/thiais-orly/context | 0.94 | 0.93 |
| 14/hopital-bicetre/context | 0.93 | 0.98 |

The first Saint-Augustin FR draft used « nommée d’après », which the evaluator flagged as a calque (T19, FR 0.79). It was rewritten. The Saint-Mandé FR second sentence has 26 words (a review finding, not a FAIL); it did not change in this pass.

## Files changed

- `apps/web/src/data/line1.ts`, `line4.ts`, `line5.ts`, `line6.ts`, `line7.ts`, `line9.ts`, `line14.ts`
- `docs/copy/changes/line1.md`, `line4.md`, `line5.md`, `line6.md`, `line7.md`, `line9.md`, `line14.md`
- `docs/research/line9.md` (Robespierre correction 24, Saint-Augustin location)
- `docs/copy/README.md` (link to the fact checker)
- `.gitignore` (`apps/web/scripts/facts/cache/`, `apps/web/scripts/facts/out/`)
- New: `apps/web/scripts/facts/`, `apps/web/tests/facts.test.ts`, `docs/facts/`

## Open issues

1. Pairs below rank 80 were not reviewed. Confirmed problems appeared as low as rank 80, so more are likely below it. A next pass could review pairs with supported < 0.2 below rank 80, ordered by `1 − supported`.
2. Change the risk weights: lower or remove `pairDisagreement` and `contradicted`, keep `unsupported` and `unmatchedNumber`. Measure again on these 80 labels before a new review.
3. Check the two RATP links and the valdemarne.fr link in a browser.
4. The Saint-Mandé date conflict (1934 in the fr article, 1937 elsewhere) will rank first on every run. Add a known-conflicts list, or cite a primary source for 1937.
5. The cited Wikipedia titles that redirect could point to the article titles.
