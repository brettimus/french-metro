# Line 3 fact check, 2026-10-06

A full review of the Line 3 station copy before release. It uses the method of pass 3 ([2026-10-05-fact-check-pass3.md](2026-10-05-fact-check-pass3.md)) on one line, as for Line 11 ([2026-10-06-fact-check-line-11.md](2026-10-06-fact-check-line-11.md)). The fixes are applied in commit `e342d2d`. The copy changes and the evaluator scores are in [docs/copy/changes/line3.md](../copy/changes/line3.md).

## Summary

- 123 EN/FR claim pairs in 25 station entries (251 claims). Every pair has a verdict.
- Verdicts: 116 supported, 6 confirmed errors, 1 unsourced, 0 refuted.
- Confirmed errors by category: 2 misleading, 1 wrong fact, 1 EN/FR mismatch, 1 overstated wording, 1 wrong date.
- 5 of the 6 errors are fixed. The fix for the sixth (Temple, wrong date) was refuted, and the text is kept. See [Temple](#temple-not-changed).
- The unsourced claim (Saint-Lazare leper hospital) is correct. A source is added; the text did not change.
- Links: the 69 URLs in the Line 3 sources had no failures and no redirects.
- The `facts-3` ranking put the unsourced claim at rank 2 and 2 of the 6 errors in its top 10. The other errors were at ranks 19, 28, 63 and 97.

## Method

1. Ranking. The fact checker ran on Line 3 with Jev `jev-1.13.0`, questions `facts-2` and ranker `facts-3` (2026-10-06T01:13:33Z): 502 requests (470 live, 3 cached), 0 fetch failures. 260 numbers were checked in code; 2 claims had a number that did not match a source. 29 of the 251 whole-source requests failed with HTTP 400 `max_tokens_exceeded`. Those 29 claims were scored on the retrieved passages only.
2. Review. Every pair was reviewed, not only the top of the ranking. The verifiers saw the pair, the full unit text in EN and FR and the station's sources. Each verifier read the cited sources and other reliable sources, and gave a verdict with a quote.
3. Refutation. Each flag (a possible error, or a claim not in the cited sources) and each proposed fix went to a second agent that tried to show that the text was correct, or that the fix was wrong. A flag is `confirmed` only when the refutation failed. A fix is applied only when its refutation failed.
4. Fixes. Each confirmed error has a fix in both locales (Louise Michel: EN only). Two fixes changed during review: Havre – Caumartin was reworded to stay within 45 words (EN 44, FR 43), and its text is now the same in `line9.ts` (shared-etymology test). The Temple fix was dropped.

The verdicts are in the review output (`fact-verdicts.json`), not in the repository. They are not in the lab label sets.

## Confirmed errors (6)

"Rank" is the position by `facts-3` risk among the 123 pairs. "Fix" is the text at `e342d2d`.

| # | Pair | Category | Rank | Text at review (EN) | Problem | Fix | Evidence |
|---|---|---|---|---|---|---|---|
| 1 | `3/porte-de-champerret/etymology/1` | misleading | 6 | Named for the Porte de Champerret, a gate in the city fortifications towards Champerret, a locality of Neuilly. | Champerret was a locality of Neuilly in the past. It has been in Levallois-Perret since 1867. | EN: … towards Champerret, a former locality of Neuilly.<br>FR: … en direction de Champerret, un ancien lieu-dit de Neuilly. | https://fr.wikipedia.org/wiki/Porte_de_Champerret : La porte tire son nom d'un lieu-dit de Neuilly-sur-Seine (sur la commune de Levallois-Perret depuis 1867) |
| 2 | `3/porte-de-bagnolet/etymology/2` | wrong-fact | 9 | A Line 2 station, opened as Rue de Bagnolet, was renamed Alexandre Dumas on 13 September 1970 to avoid confusion with this one. | The cited source and the Alexandre Dumas article give the first name as Bagnolet. Only the Line 2 article says « Rue de Bagnolet ». The sources conflict, so the fix does not give the first name. | EN: A Line 2 station named for Rue de Bagnolet was renamed Alexandre Dumas on 13 September 1970 to avoid confusion with this one.<br>FR: Une station de la ligne 2, nommée d’après la rue de Bagnolet, a été rebaptisée Alexandre Dumas le 13 septembre 1970 pour éviter toute confusion avec celle-ci. | https://fr.wikipedia.org/wiki/Alexandre_Dumas_(m%C3%A9tro_de_Paris) : sa dénomination initiale de Bagnolet (EN article: originally called Bagnolet). Cited source: la station Bagnolet de la ligne 2, renommée Alexandre Dumas le 13 septembre 1970 |
| 3 | `3/havre-caumartin/etymology/3` | misleading | 19 | Rue du Havre, added to the name in 1926, honours the Normandy port. | The street does not honour the port. It took the name because trains from the Saint-Lazare terminus went to Le Havre. | EN: Rue du Havre, added to the name in 1926, recalls the trains from Saint-Lazare to Le Havre.<br>FR: La seconde, ajoutée au nom en 1926, rappelle les trains de Saint-Lazare vers Le Havre. | https://fr.wikipedia.org/wiki/Rue_du_Havre_(Paris) : Elle prit le nom de « rue du Havre » parce que les trains partant de cet embarcadère permettaient de se rendre au Havre. |
| 4 | `3/louise-michel/context/1` | en-fr-mismatch | 28 | The station opened on 24 September 1937 as Vallier, the name of the street above. | The station is under Rue Anatole-France, not under Rue Vallier. FR « celui de la rue qu’elle dessert » was correct. | EN: The station opened on 24 September 1937 as Vallier, the name of the street it serves.<br>FR: (no change) | https://fr.wikipedia.org/wiki/Louise_Michel_(m%C3%A9tro_de_Paris) : La station est implantée … sous la rue Anatole-France, à l'intersection avec la rue Louise-Michel |
| 5 | `3/temple/etymology/2` | wrong-date | 63 | The order settled in this area, known as the Temple quarter, in the middle of the 13th century. | The verifier found a Templar house in Paris from about 1140. | Not applied. See [Temple](#temple-not-changed). | https://fr.wikipedia.org/wiki/Prieur%C3%A9_hospitalier_du_Temple : leur premier lieu de résidence installé vers 1140 |
| 6 | `3/europe/context/2` | overstated-wording | 97 | Simone Veil was minister of health and the first president of the European Parliament. | She was the first president of the directly elected Parliament (1979). The Parliament had presidents from 1958. | EN: … the first president of the directly elected European Parliament.<br>FR: … la première présidente du Parlement européen élu au suffrage universel. | https://en.wikipedia.org/wiki/President_of_the_European_Parliament : The first two female presidents were Simone Veil MEP in 1979 (first president of the elected Parliament) |

### Temple (not changed)

The proposed fix was "in the 12th century" / « au XIIe siècle ». The refutation showed that the source for the fix (Prieuré hospitalier du Temple) puts the residence of about 1140 near the Place de Grève, not in the Temple quarter. The current text, "the middle of the 13th century", agrees with both cited sources for the Temple quarter. The fix and its source addition were dropped, and the text is kept.

### Unsourced (1)

| Pair | Rank | Text (EN) | Result |
|---|---|---|---|
| `3/saint-lazare/etymology/2` | 2 | The street led to the Maison Saint-Lazare, a leper hospital dedicated to Saint Lazarus. | Correct, but the cited station page does not say "leper hospital". Source added; text not changed. Evidence: https://fr.wikipedia.org/wiki/Enclos_Saint-Lazare : Il abrite à son origine une léproserie |

The same commit also made changes that were not fact errors: copy edits for the edit band (sentier, quatre-septembre, arts-et-metiers), a clearer Réaumur – Sébastopol context ("Lines 3 and 4 cross … with Line 3 below"), a more precise line summary ("Two names … on 4 September 1870"), and people entries for parity (Réaumur on `reaumur-sebastopol`, as on Line 4; Henri Grégoire on `arts-et-metiers` in `line11.ts`).

## Sources added

- `saint-lazare`: “Enclos Saint-Lazare · Wikipédia”, https://fr.wikipedia.org/wiki/Enclos_Saint-Lazare, for the leper hospital.
- `havre-caumartin`: “Rue du Havre · Wikipédia”, https://fr.wikipedia.org/wiki/Rue_du_Havre_(Paris), for the reason for the street name. Added in `line3.ts` and `line9.ts`.

## Ranking compared with the verdicts

| Problem | Rank | In the top 10 |
|---|---|---|
| Saint-Lazare, leper hospital (unsourced) | 2 | yes |
| Porte de Champerret, "a locality of Neuilly" | 6 | yes |
| Porte de Bagnolet, "opened as Rue de Bagnolet" | 9 | yes |
| Havre – Caumartin, "honours the Normandy port" | 19 | no |
| Louise Michel, "the street above" | 28 | no |
| Temple, "middle of the 13th century" | 63 | no |
| Europe, "first president of the European Parliament" | 97 | no |

- 7 problems in 123 pairs (base rate 5.7%). The top 10 has 3 of the 7 (precision 0.30). The top 20 has 4.
- Recall of the 6 confirmed errors: 0.33 in the top 10, 0.50 in the top 20, 0.67 in the top 30.
- The ranking found claims that are not in any cited source (Saint-Lazare, mean supported 0.18) and text that adds to the source (Havre "honours", Bagnolet "Rue de", Champerret "Neuilly").
- It missed an error that the cited source repeats (Temple, rank 63, supported 0.85) and overstated wording (Veil, rank 97, supported 0.92). Pass 3 and Line 11 had the same blind spots.
- Rank 1 (Arts et Métiers, 10 October 1794, risk 0.92) is supported word for word by the CNAM source. 6 of the top 10 were supported. Most of them had low support scores because their whole-source request failed (see Method).

## Open items

- `station/3/porte-de-bagnolet/etymology/fr` is now in the copy edit band (0.72): the fix brought in « nommée d’après » and a 27-word sentence. EN is at 0.845 because of the FR parity cap. The fact is correct; the FR wording needs a copy edit.
- Temple: the cited sources say the middle of the 13th century, and another source gives a Templar house in Paris from about 1140 near the Place de Grève. The text is kept. A historian's source for when the order settled in the Temple quarter would close this.
- Porte de Bagnolet: the sources disagree on the first name of the Line 2 station (Bagnolet or Rue de Bagnolet). Check a primary source (RATP or a period map) before the text gives the first name again.
- The 29 claims with a failed whole-source request (`max_tokens_exceeded`) were scored on passages only. The full review covered them, but the ranking for them is weaker. The request size limit should be fixed in the checker.
- `station/3/villiers/etymology/fr` (0.847) is shared with Line 2 and was not changed.
