# Writing rubric

This rubric grades the copy of the Paris metro atlas in English (EN) and French (FR). It has five parts:

1. Project rules that every entry must follow.
2. Judged dimensions, in three sets: station notes, line copy, UI strings.
3. Binary tells (AI-style and translation-style).
4. Deterministic checks that a script can run.
5. A weighting proposal and the hard-failure rule.

Grade each locale separately. Then grade the pair for parity (dimension S6).

A note on intent: score the effect on the reader (vague, inflated, padded, wrong), not "AI-likeness". Each tell below is also a quality fault. No single style tell proves machine authorship.

---

## 1. Project rules

These come from `apps/web/src/data/types.ts`, `docs/multi-line-plan.md`, `docs/reviews/*.md` and the "Editorial decisions" sections of `docs/research/line*.md`.

| ID | Rule |
|---|---|
| R1 | **No invented facts.** No invented quotations, counts, dates, names or "first" claims. Every fact must be supported by a listed source. A fact from one source only gets "according to…" / « selon… », or is left out. |
| R2 | **Etymology opens with the name.** The first sentence says what the station name refers to. EN: "Called X after/because…". FR: « La station doit son nom à… » or « La station porte le nom de… ». |
| R3 | **Same facts in both locales.** EN and FR state the same facts, dates, qualifiers and uncertainty. A locale may omit a gloss its readers do not need (for example, FR does not explain "mairie"). |
| R4 | **No mannered prose.** Do not use a metaphor or flourish when a literal statement is available. ("A dial worth turning" fails. "A parameter worth varying" passes.) |
| R5 | **Naming chain intact.** Station → street, square or place → person or event. Keep the layers of a name separate (Étoile came before de Gaulle). Do not substitute a nearby landmark's history. |
| R6 | **Uncertainty stays visible.** Disputed origins keep their qualifier ("may", « serait », « probablement »). When sources conflict, use the broader date. No speculative ancient etymologies. |
| R7 | **Context adds a separate fact.** The context field must not repeat or continue the etymology. |
| R8 | **Word targets are not minimums.** A short accurate entry is better than padding. Never cut a name, date or qualifier only to meet a target. |
| R9 | **Identifiers are fixed.** Station names, IDs and source labels keep official spelling and diacritics (Bienvenüe, Quai de la Rapée, Palais-Royal). |

---

## 2. Judged dimensions

Each dimension has 3–5 levels. The highest number is best. Each level describes properties a grader can see in the text. These levels map directly to Jev Score levels.

### 2a. Station notes (etymology and context)

#### S1. Lead and naming chain (etymology only)

Measures whether the first sentence explains the name and whether the chain from station to source is complete.

| Level | Observable situation |
|---|---|
| 1 | The first sentence does not explain the name (it gives background, a date or a landmark), or the note never explains the name. |
| 2 | The name is explained, but not in the first sentence, or a link in the chain is missing (for example, the person is named but the street between station and person is not). |
| 3 | The first sentence explains the name and the chain is complete, but a layer is blurred (two namesakes merged, or a compound name explains only one part). |
| 4 | The first sentence explains the name, every part of a compound name is explained, and each link in the chain is stated in order. |

- EN, level 1: "Throughout Parisian history this area has changed greatly, and the station takes its name from…"
- EN, level 4: "Called Marcadet – Poissonniers after two nearby streets. Marcadet recalls an old market site; Poissonniers recalls the traders who carried fish to Paris."
- FR, level 2: « Le général Mouton-Duvernet sert la Révolution et l’Empire. La rue, puis la station, portent son nom. »
- FR, level 4: « La station doit son nom à la rue Mouton-Duvernet, qui honore le général Régis Barthélemy Mouton-Duvernet, fusillé à Lyon en 1816. »

#### S2. Concrete, checkable content

Measures how much of the note a reader could verify (names, dates, places, agents) against how much is abstract or evaluative.

| Level | Observable situation |
|---|---|
| 1 | Most sentences contain no checkable fact. They state significance, atmosphere or "heritage". |
| 2 | One sentence carries the facts; at least one other sentence is abstract or evaluative only. |
| 3 | Every sentence has a checkable fact, but one claim is vague where the source gives detail ("in the past", "a famous figure"). |
| 4 | Every sentence has at least one checkable fact, stated at the precision the sources support (broad when they conflict, exact when they agree). |

- EN, level 1: "The name reflects the area's rich historical heritage."
- EN, level 4: "The station first bore the name Pont de Flandre. It took Cariou’s name in 1946."
- FR, level 1: « Un lieu chargé d’histoire qui témoigne du passé du quartier. »
- FR, level 4: « Ancien marché aux chevaux jusqu’en 1866. »

#### S3. Literal and plain statement

Measures whether the note uses plain words and a plain copula, without metaphor, cliché, promotional words or inflated significance (rule R4).

| Level | Observable situation |
|---|---|
| 1 | Two or more figurative or promotional phrases, or one claim of significance that the note does not support ("a testament to", « témoigne de »). |
| 2 | One figurative, promotional or inflated phrase, or a fancy verb in place of "is/was" ("serves as", "stands as", « incarne »). |
| 3 | Literal throughout, but one word is longer or more formal than needed ("approximately", "commemorate the memory of", « procéder à »). |
| 4 | Literal throughout, with plain verbs ("is", "was", "named after", « doit son nom à ») and familiar words. |

- EN, level 1: "The station keeps the memory of a vanished village alive, a testament to its storied past."
- EN, level 4: "Called Chevaleret after the street, from a lieu-dit of Ivry recorded in 1670."
- FR, level 1: « Véritable témoin du passé, la station incarne la riche histoire du quartier. »
- FR, level 4: « La station doit son nom au village de Charonne, rattaché à Paris en 1860. »

Boundary cases (calibration): transport and office terms are literal ("served as the line's terminus", « sert de terminus », "served as a representative"). Evaluator: a section 4.5 hit for T2, T4, T8 or T13 caps S3 at level 2.

#### S4. Economy

Measures filler: hedges without cause, intensifiers, metadiscourse, summary closers, and sentences that repeat what the reader already has.

| Level | Observable situation |
|---|---|
| 1 | A whole sentence adds no fact (a summary closer, a "the station kept the name" sentence, a restatement of the etymology, or a sentence that only judges the subject: "became a distinctive part of French textile design"). A sentence that states how certain a claim is ("The attribution is traditional rather than certain") is not filler. |
| 2 | No empty sentence, but two or more filler words or phrases ("it is worth noting", "actually", "still… today", « il convient de souligner », « ainsi »). |
| 3 | One filler word or phrase. |
| 4 | Every word carries meaning. Hedges appear only where the evidence is disputed, and they say why. |

- EN, level 1: "…The two names therefore describe the same interchange through different local references."
- EN, level 4: "Its origin is uncertain: a landowning Chevaleret family is judged more likely than a path wide enough for one horse."
- FR, level 1: « …La station conserve donc aujourd’hui ce nom. »
- FR, level 4: « Un couloir les relie en 1931 : leurs deux noms sont alors réunis. »

Evaluator: S4 is computed in code from two Jev Nouls (`deletable_sentence` ≥ 0.5 → level 1; `filler_phrase` ≥ 0.5 or a section 4.5 filler hit → level 3; else level 4). Level 2 needs a count, so the evaluator does not output it. A single 4-level Score stayed at the top level on 22 of 26 calibration units.

#### S5. Sentence construction

Measures sentence length, clause stacking, dangling participles, and whether pronouns have a clear antecedent inside the field.

| Level | Observable situation |
|---|---|
| 1 | One sentence over 35 words, or a dangling participle, or a pronoun with no antecedent in the field. |
| 2 | One sentence of 26–35 words that chains three or more clauses ("Opened…, was chosen…, becoming…"; « qui… dont… où… »). |
| 3 | All sentences 25 words or less, but two sentences share one rigid pattern (for example, parallel clauses joined by a semicolon in every note), or a sentence is hard to parse on first reading. |
| 4 | All sentences 25 words or less, one main idea each, readable on first pass. Length follows the content. |

- EN, level 1: "Opened on 30 June 1928 with simultaneous extensions of Lines 8 and 9, its Line 8 platform was the first…" (dangling participle, 47 words)
- EN, level 1: "He continued to serve as a representative after 1848." (context field; "he" has no antecedent)
- FR, level 2: « Ouverte en 1933, la station est choisie pour tester un éclairage, devenant en 1997 la première d’une série… »
- FR, level 4: « Les quais de la ligne 6 ouvrent en 1909. La station prend alors le nom de la place. »

Read each field on its own. A context note that opens with a pronoun or possessive (He, It, Its, Il, Elle, Son, Sa, Ses) or a definite noun phrase (« le col », "the pass") whose referent is only in the etymology is level 1. Evaluator: code caps S5 at level 1 for an opening pronoun and at level 2 / level 1 for a sentence over 25 / 35 words.

#### S6. Locale parity (graded on the EN/FR pair)

Measures whether the two locales give the same facts, qualifiers and uncertainty, and whether each reads as native text, not a translation.

| Level | Observable situation |
|---|---|
| 1 | A fact, date or name is in one locale and absent or different in the other, or a qualifier ("may", « serait ») is lost. |
| 2 | Same facts, but one locale reads as a calque (English word order, « opposer… à » rendered as "opposed X to Y", « nommé d’après », possessive in every sentence). |
| 3 | Same facts and native phrasing, but one locale adds or drops a minor gloss that is not justified by reader need. |
| 4 | Same facts, same qualifiers, each locale idiomatic; differences are only glosses one audience needs. |

- EN, level 2: "…opposed Bonaparte’s army to Mamluk forces." (calque of « opposer… à »)
- FR, level 1: EN says "may come from"; FR says « vient de ». (Uncertainty lost.)
- FR, level 4: EN "Called Cadet after the street, which may honour…" / FR « La station doit son nom à la rue Cadet, qui rendrait hommage à… »

Evaluator: levels 1, 3 and 4 come from the Jev parity Nouls. Level 2 comes from the FR calque patterns in section 4.3 (Jev did not detect French calques in calibration). For short strings, a literal rendering that is also the natural wording ("Line 1" / « Ligne 1 ») is not a calque.

#### S7. Context value (context only)

Measures whether the context gives a fact that the etymology does not already state, and whether that fact belongs to this station. Context about the namesake (person, place, event) is acceptable when it gives a new fact; it scores below a station-specific fact.

| Level | Observable situation |
|---|---|
| 1 | The context repeats or paraphrases the etymology (same person, office, date or event in other words), or it is only "The station opened in 1900." |
| 2 | A generic station fact (renovation, "the station is busy", a temporary decoration also used at other stations) or a fact about another station or line. |
| 3 | A new fact about the namesake (person, place, event) that the etymology does not state; or a station-specific fact with a filler first sentence or an unlinked fact tacked on at the end. |
| 4 | A station-specific fact (former name, rename, construction, physical feature, layout, branch history), stated directly. |

- EN, level 1: "Alexis Vavin was a notary elected to the Chamber of Deputies." (when the etymology already says this)
- EN, level 3: "The battle formed part of the French campaign in Egypt…" (continues the Pyramides etymology with a new fact)
- EN, level 4: "The station later gave its own name to a Métro decorating style. Its orange tiles, introduced in 1969, became a model for other stations."
- FR, level 1: « La station ouvre en 1900. »
- FR, level 4: « La ligne 6 se termine ici sur une boucle sous la place, avec un quai étroit pour la descente et un quai large pour la montée. »

Decision of 2026-10-05: before this date, level 1 included every context about the namesake. A namesake fact that is new now scores level 3.

### 2b. Line copy (title, summary, imageAlt)

S2, S3, S4 and S6 apply to summaries as written above. Add these:

#### L1. Summary scope

| Level | Observable situation |
|---|---|
| 1 | The summary is promotional or general ("a journey through Paris history") and names no stations, places or periods. |
| 2 | It names the line's route or termini but gives no reason to read the entries. |
| 3 | It names route and one concrete theme of the names on the line. |
| 4 | It names route and a concrete theme, with at least one example station, in 1–3 short sentences. |

- EN, level 1: "Discover the fascinating stories hidden along this iconic line."
- EN, level 4: "Line 7 runs from La Courneuve to two southern branches. Many of its names come from villages and gates absorbed in 1860, such as Porte d’Ivry."
- FR, level 1: « Un voyage incontournable au cœur de l’histoire parisienne. »
- FR, level 4: « La ligne 14 relie Saint-Denis à Orly. Ses noms récents viennent souvent de communes et de gares, comme Thiais – Orly. »

#### L2. Alt text accuracy

| Level | Observable situation |
|---|---|
| 1 | Alt text is missing, says "image of", or describes something not in the image. |
| 2 | Accurate but generic ("metro illustration"). |
| 3 | Names the main subject and style, but adds interpretation ("evoking…", « rappelant… »). |
| 4 | Names what is visible (subject, setting, style) in one sentence, with no interpretation. |

- EN, level 4: "Illustration of an enamel station sign above a tiled platform."
- FR, level 4: « Illustration d’une plaque émaillée au-dessus d’un quai carrelé. »

#### L3. Title form

| Level | Observable situation |
|---|---|
| 1 | Title Case in FR, marketing words, or inconsistent with other line titles. |
| 2 | Correct case but a different pattern from the other line titles. |
| 3 | Correct case, same pattern as other line titles. |

- EN, level 1: "Line 4: Discover The North-South Axis!"
- FR, level 3: « Ligne 4 »

### 2c. UI labels and short interface sentences

Do not apply S1, S2, S5, S7, L1 to UI strings. Apply S3 only to sentences, not to labels.

#### U1. Clarity and form

Judged with the string's usage on the page (which element it fills: button, link, heading, aria-label, status message), taken from `apps/web/src/app.ts`.

| Level | Observable situation |
|---|---|
| 1 | The label does not say what happens, uses marketing words ("Embark", « Découvrez »), or uses Title Case in FR or EN. |
| 2 | Clear but long, or a noun phrase where a verb is expected for an action. |
| 3 | Clear, sentence case, short; actions start with a verb (EN imperative, FR infinitive or imperative used consistently). No final period on labels. |

- EN, level 1: "Embark On Your Journey"; level 3: "Show map"
- FR, level 1: « Voir La Carte » ; level 3: « Voir la carte »

#### U2. Consistency

Judged per string: the request holds the string and the sibling strings of the same type (actions, headings, labels, messages) in the same locale. A conflict lowers only the strings that take part in it.

| Level | Observable situation |
|---|---|
| 1 | The same action or object has two different words in one locale ("line" / "route"; « station » / « arrêt »). |
| 2 | Same words, but FR mixes infinitive and imperative for actions. |
| 3 | One word per concept and one verb form per locale, matching the data copy ("Métro" or "metro", not both). |

#### U3. Parity

| Level | Observable situation |
|---|---|
| 1 | EN and FR say different things (one omits a disclaimer, a credit, or an instruction). |
| 2 | Same meaning, but one locale is a literal calque. |
| 3 | Same meaning, idiomatic in each locale. |

---

## 3. Binary tells

Each tell is present or absent. **CODE** = a regex, word list or count can detect it. **JUDGED** = a model or human must decide. **CODE→JUDGED** = code flags candidates, a judge confirms. **HARD** = hard failure (see section 5).

| ID | Tell | Definition | EN example | FR example | Detect |
|---|---|---|---|---|---|
| T1 | AI vocabulary | Style words that rose sharply after 2023. | delve, tapestry, testament, underscore, showcase, pivotal, crucial, intricate, meticulous, vibrant, robust, boasts, garner, foster, enhance, interplay, landscape, realm, notably, additionally, enduring | crucial, essentiel, véritable, incontournable, emblématique, fascinant, précieux, pérenne, dynamique | CODE |
| T2 | Inflated significance | Says a person, place or thing was important, prominent, distinctive, heroic or influential, with no fact in the note that shows why (an office, a result, a count). A date or a place alone does not show why. | "stands as a testament to", "played a prominent role", "became a distinctive part of", "lasting legacy" | « témoigne de », « joue un rôle important », « marquent l’histoire de », « incarne » | CODE→JUDGED |
| T3 | "-ing" tail clause | A trailing participle that adds commentary, not a fact. | "…, highlighting its historical significance." | « …, rappelant ainsi son passé ouvrier. » | CODE |
| T4 | Promotional tone | Tourism or advertising words in a neutral note. Words that report what happened (executed, killed, demolished, fusillé) are facts, not drama. | nestled, in the heart of, bustling, charming, rich history, iconic, renowned, hidden gem | niché, au cœur de, riche histoire, prestigieux, mythique | CODE |
| T5 | Negative parallelism | A contrast nobody proposed. Acceptable only when it corrects a real misconception. | "not just a station, but…", "more than just" | « non seulement… mais aussi », « pas seulement… mais » | CODE→JUDGED |
| T6 | Reflex tricolon | A list of three abstract nouns or adjectives. | "history, culture and community" | « histoire, culture et mémoire » | CODE→JUDGED |
| T7 | Vague attribution | Cites unnamed authorities, in an active or passive form. | "historians say", "it is often said", "legend has it", "remembered as", "regarded as", "said to be" | « selon certains historiens », « on dit souvent », « considéré comme », « réputé », « passe pour » | CODE→JUDGED |
| T8 | Avoided copula | A fancy verb where "is/was/has" works. | serves as, stands as, functions as, boasts, features | sert de, se veut, constitue, incarne | CODE |
| T9 | Summary or moral closer | The last sentence evaluates or sums up. A last sentence that states how certain a claim is, is not a closer. | "Today, the name lives on.", "a fitting tribute", "therefore describe…", "became a distinctive part of French textile design" | « En somme… », « Aujourd’hui encore, le nom… », « un bel hommage », « marquent l’histoire de », « fait date » | CODE→JUDGED |
| T10 | Metadiscourse / signposting | Text about the text. | interestingly, it is worth noting, importantly, indeed | il est intéressant de noter, il convient de souligner, en effet | CODE |
| T11 | Magic adverbs | Intensifiers that add nothing. | truly, deeply, remarkably, quietly, profoundly, arguably | véritablement, profondément, remarquablement | CODE |
| T12 | False range | "From X to Y" where X and Y are not ends of a scale. The two termini of a line are ends of a range; name them so a reader can see it. | "from medieval abbeys to modern boulevards" | « des abbayes médiévales aux boulevards modernes » | CODE→JUDGED |
| T13 | Stock metaphor / cliché | Ready-made figures of speech (rule R4). | steeped in history, a window into, bears witness to, woven into the fabric, stood the test of time | figé dans le temps, au fil des siècles, garder la trace, la mémoire des lieux | CODE→JUDGED |
| T14 | Grandiosity | Superlatives the subject does not support. | "forever changed the city", "one of the most important" | « a changé à jamais », « l’un des plus importants » | CODE→JUDGED |
| T15 | Hedge stacking | Two or more hedges on one claim, or hedges on undisputed facts. | "may possibly have", "likely… probably" | « aurait sans doute », « probablement peut-être » | CODE |
| T16 | Synonym cycling | One referent gets several names. | "the abbey… the monastery… the religious house" | « l’église… le sanctuaire… l’édifice religieux » | JUDGED |
| T17 | Self-reference to source | Copy refers to a source document (an article, Wikipedia) or to "the sources" in general. Copy must never do this; cite sources in the source list, not in the prose. | "according to the station's own article", "the English line article", "its own article", "according to its French Wikipedia article", "The sources checked…", "sources say" | « selon son propre article », « l’article consacré à », « l’article anglais », « selon Wikipédia », « dans les sources », « les sources consultées » | CODE |
| T18 | Additive connector stacking | More than one additive connector in a note under 55 words. | additionally, moreover, furthermore | en outre, de plus, par ailleurs, qui plus est, ainsi, alors | CODE |
| T19 | Translation calque | A construction copied from the other language. | "opposed X to Y", "the historical quarter" (for « le quartier historique ») | « faire sens », « être en charge de », « nommé d’après », « renommé pour », « , d’après la rue », « la station a vu la RATP décorer », « doit son nom à sa proximité », « la station est simplifiée » (the name was), sentence-initial « Définitivement » for *certainly*, « initier », « opportunité », « réaliser » for *se rendre compte* | CODE→JUDGED |
| T20 | Template opening/closing (corpus) | More than 10% of notes on one line share a non-mandated opening word or closing pattern. The mandated R2 opening is exempt. | 6 contexts open "The station opened in 1900." | 22 contexts open « Ouverte le… » | CODE (corpus) |
| T21 | Duplicated sentence across stations | A whole sentence (6+ words) repeats word for word on a different station. A shared station (same station id on two lines) may repeat its etymology: not a tell. A repeated context sentence on the same station id is a REVIEW hint, not a tell. | 9/x context = 4/y context | same | CODE (corpus) |
| T22 | Invented or unsupported fact | A date, name, quotation, count or "first" claim not in the sources. **HARD** | "Named in 1832 by Baron X" | « Baptisée en 1832 par le baron X » | JUDGED + fact check |
| T23 | Lost uncertainty | A disputed origin is stated as settled, in one or both locales. **HARD** | "comes from" where source says "may come from" | « vient de » where source says « serait » | JUDGED |
| T24 | Locale fact mismatch | EN and FR give a different date, name or claim. **HARD** | EN 1946 / FR 1947 | | CODE (numbers) → JUDGED |
| T25 | Missing name explanation | Etymology never explains the station name. **HARD** | | | JUDGED |
| T26 | Em dash | Any em dash (—) in data or UI. House rule. **HARD (mechanical)** | "The name—surprisingly—comes from…" | « Le nom — étonnamment — vient… » | CODE |

---

## 4. Deterministic checks

These run as code over `apps/web/src/data/line*.ts`, `apps/web/src/i18n.ts` and `apps/web/src/coming-soon.ts`. Results are PASS, REVIEW or FAIL.

### 4.1 Word counts (from `types.ts`)

Count words by splitting on whitespace after joining elided forms (« l’histoire » = 1 word).

| Field | Target per locale | REVIEW | FAIL |
|---|---|---|---|
| etymology | 20–45 | < 15 or 46–55 | > 55 |
| context | 20–55 | < 15 or 56–65 | > 65 |
| FR/EN length ratio (per field) | 0.9–1.3 | outside 0.75–1.5 | — |

Short entries are REVIEW, never FAIL (rule R8). An editor can accept a short entry that is complete.

### 4.2 Sentence length and variance

- Any sentence > 25 words: REVIEW. Any sentence > 35 words: FAIL (S5 level 1).
- Per line, per locale, per field: standard deviation of sentence length < 3 words: REVIEW (uniform rhythm).
- Per line: share of notes with the same sentence count > 70%: REVIEW.

### 4.3 French typography

Convention for this project: U+202F (narrow no-break space) before `; ! ?` and U+00A0 (no-break space) before `:` and inside « ». Either character passes in any position; a plain space or no space fails. Note: the current copy uses plain spaces before `;` and `:`; a bulk fix is expected.

| Check | Pattern (FR strings only) | Result |
|---|---|---|
| Space before `; : ! ?` | `\S[;:!?]` or ` [;:!?]` (plain U+0020). Exclude URLs and times (`\d:\d`). | FAIL |
| Guillemets | `"` in FR display text; `«(?![\u00A0\u202F])`; `(?<![\u00A0\u202F])»` | FAIL |
| Apostrophe | `'` (U+0027) in FR display text | FAIL |
| Ellipsis | `\.\.\.` | FAIL |
| Centuries | `\b\d{1,2}(e|ème|eme|è)\s+siècle`, `[IVXL]+(ème|eme|è)\b`, `Siècle` | FAIL |
| Ordinals | `\d+(ème|eme|è|ième)\b`, `\b1ère\b`, `\b2nd\b` | FAIL |
| Numbers | `\b\d{1,3},\d{3}\b` (English thousands separator) | FAIL |
| Decades | `années\s+\d{2}s?\b`, `\d{4}'?s\b` | FAIL |
| Year ranges | `\b\d{4}-\d{4}\b` (hyphen; use en dash or « de… à… ») | FAIL |
| Months/days | capitalised month or day name not at sentence start. Allow « 14 Juillet », « 11 Novembre ». | REVIEW |
| Generic place terms | `(?<![.!?]\s)\b(Rue|Avenue|Boulevard|Place|Quai|Gare|Église|Pont|Porte|Square)\s` in prose. Allowlist official station names (Place d’Italie, Porte Maillot, Gare de l’Est as station labels). | REVIEW |
| Odonym hyphens | `\b(rue|place|avenue|boulevard|quai)\s+[A-Z]\w+\s+[A-Z]\w+`; `\bSainte?\s[A-Z]` in street or church names. Allowlist RATP station spellings (Hôtel de Ville, Charles de Gaulle – Étoile). | REVIEW |
| Accented capitals | `^A\s` / `\.\sA\s` (for À), `\bE(toile|lysées|cole|glise)\b` | FAIL |
| Ligatures | `oeuvre|coeur|soeur|voeu|oeil` | FAIL |
| Abbreviated Saint | `\bSte?\.?\s` | FAIL |
| Space before `,` `.` | ` [,.]` | FAIL |
| FR calques (word list) | `faire sens`, `en charge de`, `initier`, `opportunité`, `digital`, `éventuellement`, `réaliser` | REVIEW |
| FR calques (syntax, `FR_CALQUE_PATTERNS`) | « d’après / pour » after nommer, renommer, baptiser, appeler; « , d’après la rue / le boulevard… »; place or thing + « a vu » + infinitive; « doit son nom à sa proximité »; « la station est (ensuite) simplifiée »; sentence-initial « Définitivement » (mid-sentence « définitivement » = *permanently* is correct) | REVIEW; on a pair, caps S6 at level 2 |

### 4.4 English typography

| Check | Pattern (EN strings only) | Result |
|---|---|---|
| Apostrophe | `'` (U+0027) in display text (Line 1 currently has about 40) | FAIL |
| Quotes | `"` inside display text; use “ ” | FAIL |
| Em dash | `—` anywhere (also FR, data and UI) | FAIL |
| Station-name dash | `\w–\w` (unspaced en dash) in a compound station name; house form is spaced: "Strasbourg – Saint-Denis" | FAIL |
| Year ranges | `\b\d{4}-\d{4}\b` (use en dash) | FAIL |
| Street words | Choose "Rue", "Boulevard", "Place" capitalised before a name (78 current uses). Flag lowercase `\b(rue|boulevard|avenue|place|quai)\s+(de|du|des|d’|[A-Z])` (Line 14) | REVIEW |
| Métro / metro | Both forms in EN data or UI | REVIEW (choose one) |
| Spelling | British forms (honours, centre, neighbouring). Flag `\b(honor|center|neighbor|program)\w*` | REVIEW |
| Title Case labels | Multi-word UI label with 2+ capitalised non-initial words not on the proper-noun allowlist | FAIL |

### 4.5 Flagged word lists

Case-insensitive, whole word. Count hits per note.

**EN flag list** (T1, T2, T4, T8, T10, T11, T13): delve, tapestry, testament, underscore, showcase, pivotal, crucial, intricate, meticulous, vibrant, robust, boasts, bolstered, garner, foster, enhance, interplay, landscape, realm, notably, additionally, moreover, furthermore, comprehensive, enduring, nestled, "in the heart of", bustling, charming, "rich history", "rich heritage", renowned, iconic, breathtaking, "hidden gem", timeless, storied, picturesque, "serves as", "stands as", "functions as", "plays a * role", legacy, "lives on", "to this day", "steeped in", "a window into", "bears witness", "fabric of", "test of time", interestingly, "it is worth noting", importantly, indeed, truly, deeply, remarkably, quietly, profoundly, arguably, seamlessly, uniquely, "historians say", "it is often said", "some believe", "legend has it", "remembered as", "regarded as", "said to be", "according to the station's own", "sources say", "according to sources", "in the sources". "Serves as" / "served as" does not count before a transport or office term (terminus, representative, deputy).

**FR flag list**: crucial, essentiel, véritable, incontournable, emblématique, vibrant, dynamique, fascinant, précieux, pérenne, niché, prestigieux, mythique, « haut lieu de », « au cœur de », « riche histoire », « chargé d’histoire », « témoigne de », incarne, illustre, « met en avant », reflète, « s’inscrit dans », valoriser, favoriser, « joue un rôle », « il est intéressant de noter », « il convient de souligner », « il est important de noter », « en somme », « en conclusion », « pour résumer », « en définitive », « en outre », « par ailleurs », « qui plus est », « non seulement », « figé dans le temps », « au fil des siècles », « traverser les époques », « garder la trace », « la mémoire des lieux », « la mise en place de », « procéder à », véritablement, profondément, « selon certains historiens », « considéré comme », « réputé », « passe pour », « selon son propre article », « dans les sources », « selon les sources ». « Sert de » does not count before « terminus » or « représentant ».

**Persistence filler (both)**: EN "still", "remains", "today"; FR « demeure », « reste », « aujourd’hui », « toujours ». REVIEW when used in a sentence that adds no new fact.

**Filler (both, REVIEW, S4 level 3)**: EN "simply", "long before the metro arrived", "two years before this Métro station opened"; FR « tout simplement », « bien avant l’arrivée du métro », « depuis son ouverture ».

**Field openings (REVIEW)**: a station note that opens with a pronoun or possessive (EN He, She, It, Its, His, Her, They, Their; FR Il, Elle, Ils, Elles, Son, Sa, Ses, Leur, Leurs) caps S5 at level 1. An EN etymology that opens "Named for its…" / "Called after its…" has a possessive with no antecedent.

**Thresholds per note**: 0 hits = PASS. 1 hit = REVIEW. 2 or more hits = FAIL. Any T3 tail clause, T9 closer, or more than one additive connector (T18) = REVIEW.

### 4.6 Parity checks (code)

- Every number (year, day, count) in EN must appear in FR for the same field, and the reverse. Mismatch = REVIEW (T24 candidate).
- Every capitalised proper name in EN should appear in FR. The check compares text with accents removed, splits compound names at hyphens and en dashes, skips the words of station names, and accepts a French form from a small EN→FR name map (Germany/Allemagne, Jena/Iéna, Mary Magdalene/Marie-Madeleine). Missing = REVIEW. It does not change the composite.
- Hedge present in one locale and absent in the other (EN: may, might, probably, possibly, perhaps, uncertain, disputed, debated, according to; FR: serait, aurait, probablement, peut-être, incertain, discuté, selon) = REVIEW (T23 candidate). EN "may" counts only as a lowercase modal followed by a word; the month "May" is not a hedge.

---

## 5. Composite score

### Weights

Normalise each dimension to 0–1 ((level − 1) / (max − 1)). Then:

| Set | Weights |
|---|---|
| Etymology | S1 0.25, S2 0.20, S3 0.15, S4 0.10, S5 0.10, S6 0.20 |
| Context | S7 0.25, S2 0.20, S3 0.15, S4 0.10, S5 0.10, S6 0.20 |
| Line summary | L1 0.30, S2 0.20, S3 0.20, S4 0.10, S6 0.20 |
| Alt text / title | L2 or L3 0.60, S6 0.40 |
| UI string | U1 0.40, U2 0.30, U3 0.30 |

Subtract 0.05 per soft tell found (T1–T21, capped at 0.25). Subtract 0.05 per FAIL in section 4 (capped at 0.20).

Bands: ≥ 0.85 ship; 0.65–0.84 edit; < 0.65 rewrite.

### Hard failures

These fail the entry whatever the weighted score:

- T22 invented or unsupported fact
- T23 lost uncertainty
- T24 locale fact mismatch
- T25 etymology does not explain the name
- T26 em dash (mechanical; fix, then re-score)
- Any section 4 FAIL in word count (> 55 etymology, > 65 context)

### One-minute editor pass

1. Does the first sentence explain the name? (S1, T25)
2. Is every fact in the sources, with the same qualifiers in both locales? (R1, T22–T24)
3. Does context add a separate fact? (S7)
4. Read once aloud: any metaphor, puffery, filler sentence or long chained sentence? (S3–S5)
5. Run the script for typography and word lists. (Section 4)

---

## 6. Sources

**English writing and AI tells**
- Wikipedia, "Signs of AI writing": https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing
- Orwell, "Politics and the English Language": https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/
- Kobak et al., "Delving into LLM-assisted writing in biomedical publications through excess vocabulary", Science Advances 2025: https://pmc.ncbi.nlm.nih.gov/articles/PMC12219543/ and https://arxiv.org/abs/2406.07016
- GOV.UK, "Use clear language": https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/
- Federal Plain Language Guidelines: https://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/static/companion.websites/9780199379996/pdf/ch2/FederalPLGuidelines.pdf and https://digital.gov/guides/plain-language/principles/short-simple
- The Economist Style Guide (preview): https://profilebooks.com/wp-content/uploads/wpallimport/files/PDFs/9781781258316_preview.pdf
- Pinker, The Sense of Style: https://www.manchester.ac.uk/about/news/steven-pinker-on-zombie-nouns-and-the-curse-of-prior-knowledge/ and https://themillions.com/2014/11/the-impediments-of-style-advice-from-steven-pinker-and-the-cia.html
- Pullum, "50 Years of Stupid Grammar Advice": https://www.lel.ed.ac.uk/~gpullum/50years.pdf
- tropes.fyi AI writing tropes: https://gist.github.com/ossa-ma/f3baa9d25154c33095e22272c631f5a1 and https://tropes.fyi/tropes/negative-parallelism
- Hacker News on negative parallelism: https://news.ycombinator.com/item?id=45407571

**French writing, AI tells and typography**
- Wikipédia, Aide:Identifier l’usage d’une IA générative: https://fr.wikipedia.org/wiki/Aide:Identifier_l'usage_d'une_IA_g%C3%A9n%C3%A9rative
- Wikipédia, Conventions typographiques: https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Conventions_typographiques
- Projet Voltaire, Détecter un texte produit par ChatGPT: https://www.projet-voltaire.fr/ressources/detecter-texte-chatgpt-ia-generative/
- Projet Voltaire, Comment écrire les siècles: https://www.projet-voltaire.fr/regles-orthographe/comment-ecrire-les-siecles/
- IA Signal, Mots que ChatGPT utilise trop en français: https://www.iasignal.com/blog/mots-chatgpt-trop-utilises
- Loumina, Les tics de ChatGPT: https://www.loumina.fr/blog-reconnaitre-un-texte-d-ia-les-tics-de-chatgpt
- Blog du Modérateur, Mots les plus utilisés par ChatGPT: https://www.blogdumoderateur.com/chatgpt-mots-utilises-chatbot/
- Redacteur.com, Éviter les tics de langage de ChatGPT: https://www.redacteur.com/blog/eviter-tics-de-langage-chatgpt/
- Académie française, « En charge de »: https://www.academie-francaise.fr/en-charge-de-en-responsabilite-de-en-capacite-de
- OQLF, être en charge de: https://vitrinelinguistique.oqlf.gouv.qc.ca/20844/les-emprunts-a-langlais/emprunts-syntaxiques/les-emprunts-deconseilles-etre-en-charge-de-et-prendre-charge-de
- OQLF, Types d’espacement: https://vitrinelinguistique.oqlf.gouv.qc.ca/24565/la-typographie/espacement/types-despacement
- Françoise Nore, Anglicismes masqués et calques: https://www.francoisenore.com/anglicismes-masques-et-calques
- Question Orthographe, « Nommé d’après »: https://www.question-orthographe.fr/question/nomme-dapres/
- CEFAN, Règles majuscules et minuscules: https://www.axl.cefan.ulaval.ca/monde/regles-1MAJ-MIN.htm
- Ministère de la Culture, « Rédiger… simplement »: https://www.culture.gouv.fr/content/download/93485/file/guide_rediger-simplement_def.pdf?inLanguage=fre-FR
- Typographisme, Les espaces typographiques et le web: https://typographisme.net/post/Les-espaces-typographiques-et-le-web

**Project sources**
- `apps/web/src/data/types.ts`, `docs/multi-line-plan.md`, `docs/reviews/copy-panel.md`, `docs/reviews/final-copy-panel.md`, `docs/research/line*.md`
- User writing-style rule (mannered prose): `/Users/brettbeutell/fiber/klaus-skills/instructions/writing-style.md`

Note: « témoigne de », « incontournable » and « riche histoire » are on the FR list from editorial experience, not from a source that documents them as ChatGPT tics. Treat them as flags only.
