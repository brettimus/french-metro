/**
 * Jev questions for the copy rubric (docs/copy/writing-rubric.md).
 *
 * Conventions (see the Jev design notes):
 * - Instructions are in English for both locales. Jev reads French state well; French
 *   example phrases go in the criteria where a tell needs them.
 * - Score levels run from worst (index 0 = rubric level 1) to best, and each level
 *   describes a situation. Normalised score = index / (levels - 1).
 * - Nouls: yes = problem present, except the few listed in GOOD_WHEN_YES.
 * - State fields are named in backticks. Send only the fields a question needs.
 */
import { noul, score } from "@typesafe-ai/sdk";

/** Bump when any question wording changes, so stored results can be compared. */
export const QUESTION_SET_VERSION = "2026-10-05.6";

// ---------- station unit (etymology and context) ----------
// State: { station, field, locale, text } (+ `etymology` for context units).
// Calibration notes (sample 36, seed 7, two editors): boundary cases below come from units where Jev
// and the editors disagreed. Keep them in the criteria, not in a separate prompt.

const S2_concrete = score(
  "How much of `text` could a reader check against a source (names, dates, places, people, events), as opposed to statements of significance, atmosphere or heritage? A sentence that says how certain an attribution is and names its basis ('The attribution is traditional rather than certain', 'Cette attribution reste traditionnelle') counts as checkable.",
  [
    "Most sentences contain no checkable fact; they talk about significance, atmosphere, memory or heritage",
    "One sentence carries the facts; at least one other sentence only evaluates or summarises (a sentence that states how certain a claim is does not count here)",
    "Every sentence has a checkable fact, but one claim is vague where a precise one was possible: 'in the past', 'a famous figure', 'a medieval owner' for a known person, 'another stop' for a known station, 'ended violently' for a killing, 'au sein des assemblées' for a named assembly",
    "Every sentence states at least one checkable fact (a name, a date, a place, an event) at a definite level of precision",
  ],
);

const S3_literal = score(
  "Does `text` use plain, literal wording, or does it use metaphor, cliché, promotional words or claims of significance? Transport and office terms are literal: 'served as the terminus', 'served as a representative', 'sert de terminus' are not fancy verbs.",
  [
    "Two or more figurative or promotional phrases, or a claim of significance the text does not support ('a testament to', 'témoigne de', 'rich history', 'au cœur de')",
    "One figurative, promotional or inflated phrase ('played a prominent role', 'joue un rôle important', 'considéré comme un héros', 'became a distinctive part of'), or 'serves as / stands as / incarne / constitue' used where 'is' would say the same thing",
    "Literal throughout, but one word is more formal or longer than needed ('approximately', 'commemorate the memory of', 'procéder à')",
    "Literal throughout, with plain verbs ('is', 'was', 'named after', 'doit son nom à') and familiar words",
  ],
);

/**
 * S4 economy is derived in code from these two Nouls (a 4-level Score sat at the top level on
 * 22/26 units). deletable_sentence -> level 1, filler_phrase -> level 3, neither -> level 4.
 * Level 2 (two or more filler phrases) needs a count, so code does not produce it.
 */
const S4_PARTS = {
  deletable_sentence: noul(
    "Does `text` contain a whole sentence that adds no new name, date, place, event or cause, because it only repeats what another sentence of `text` already said, says that the name was kept, or only judges the subject (says that it became important, distinctive, famous or influential)?",
    {
      true: "Examples: 'Its flower patterns and illustrated scenes became a distinctive part of French textile design', 'The station therefore keeps this name', « La station conserve donc ce nom », « Ses motifs marquent l’histoire des tissus imprimés français »",
      false: "Each sentence adds at least one new name, date, place, event or cause. The first sentence of a note that explains a name adds a fact. A sentence that states how certain a claim is ('The attribution is traditional rather than certain') adds a fact",
    },
  ),
  filler_phrase: noul(
    "Does `text` contain a filler word or phrase that adds no fact: an intensifier or signpost ('simply', 'actually', 'it is worth noting', « tout simplement », « il convient de souligner »), a persistence phrase ('still today', « aujourd’hui encore »), or a comparison with the opening of the metro ('long before the metro arrived', 'two years before this Métro station opened', « bien avant l’arrivée du métro », « depuis son ouverture »)?",
  ),
} as const;

const S5_construction = score(
  "Can each sentence of `text` be read correctly on the first pass? Ignore sentence length; only judge structure.",
  [
    "A phrase attaches to the wrong subject (a dangling participle such as 'Built in 1900, its platform…'), or a pronoun or a definite noun phrase ('he', 'it', 'its', 'il', 'elle', 'the pass', « le col ») has no antecedent inside `text`. `station` and `etymology` do not count as antecedents",
    "No such error, but one sentence stacks clauses so that the reader must reread it to see what refers to what",
    "Every sentence reads correctly on the first pass",
  ],
);

const S1_lead = score(
  "`text` should explain where the name of the metro station `station` comes from. How well does its first sentence explain the name, and is the chain from station to street or place to person or event complete? A station named after a whole town or a single structure (a bridge, a town hall, a railway station) has a complete chain when `text` names that town or structure.",
  [
    "The first sentence does not explain the name (it gives background, a date or a landmark), or the name is never explained",
    "The name is explained, but not in the first sentence, or a link is missing (for example, the person is named but the street or place between station and person is not)",
    "Choose this level only if (a) two different people or places are merged into one, or (b) a word of the station name is not explained anywhere in `text`. If every word of the station name is explained, do not choose this level",
    "The first sentence explains the name, every word of the station name is explained somewhere in `text`, and each link (station, street or place, person or event) is stated in order",
  ],
);

/**
 * S7 rule (2026-10-05 decision): context about the namesake is acceptable when it gives a new fact
 * that `etymology` does not already state. Level 3 holds a new namesake fact or a station fact with
 * filler; level 4 needs a station-specific fact stated directly.
 */
const S7_context = score(
  "`text` is the context note for the metro station `station`. `etymology` is the separate note that explains its name. Does `text` add a fact that `etymology` does not already state, and is that fact about this station? Compare `text` with `etymology` sentence by sentence before you choose.",
  [
    "`text` repeats or paraphrases what `etymology` already says (the same person, office, date or event, in other words), or it only says when the station opened ('The station opened in 1900', « La station ouvre en 1900 »)",
    "`text` gives a generic station fact (a renovation, traffic, a temporary decoration also used at other stations, a standard tiling) or a fact about another station or line",
    "`text` gives a new fact about the person, place or event that `etymology` explains (a later career step, a work, an outcome, a date not in `etymology`); or it gives a fact specific to this station but opens with a filler sentence or ends with an unrelated fact",
    "`text` gives a fact specific to this station (a former name, a rename, its construction, a physical feature, its layout, branch history), stated directly",
  ],
);

/** Tells: yes = present. One tell per question. */
const TELLS = {
  t2_inflated: noul(
    "Does `text` say that a person, place or thing was important, prominent, distinctive, heroic, famous or influential, without a fact in `text` that shows why (an office held, a result, a count)? A date or a place alone does not show why.",
    {
      true: "Examples: 'played a prominent role', 'became a distinctive part of', 'remembered as a hero', 'stands as a testament to', 'lasting legacy', 'joue un rôle important', 'marquent l’histoire de', 'considéré comme un héros', 'témoigne de'",
      false: "`text` states facts without judging importance, or each claim of importance comes with the fact that shows why ('known for toile de Jouy', 'célèbre pour la toile de Jouy')",
    },
  ),
  t4_praise: noul(
    "Does `text` contain a word whose only function is to praise or dramatise its subject?",
    {
      true: "Words that judge or decorate: 'iconic', 'charming', 'prestigieux', 'mythique', 'magnifique', 'incontournable', 'breathtaking'",
      false: "Words that report what happened are facts, not drama: 'executed', 'killed', 'demolished', 'stormed', 'fusillé'. Naming words ('honouring', 'dedicated to', « dédiée à ») are facts. A reputation followed by its object ('known for', « célèbre pour la toile de Jouy ») is a fact. Claims of importance ('prominent', 'important') belong to another question, not here",
    },
  ),
  t5_neg_parallel: noul(
    "Does `text` contrast its subject with something nobody suggested, in the form 'not just X, but Y', 'more than just', 'non seulement… mais aussi' or 'pas seulement… mais'?",
  ),
  t6_tricolon: noul(
    "Does `text` contain a list of three abstract nouns or adjectives used for rhythm rather than information, such as 'history, culture and community', 'kings, a revolution and diplomacy' or 'histoire, culture et mémoire'?",
  ),
  t7_vague_attribution: noul(
    "Does `text` attribute a claim or a reputation to unnamed people, in an active or a passive form?",
    {
      true: "'historians say', 'it is often said', 'legend has it', 'remembered as', 'regarded as', 'said to be', « selon certains historiens », « on dit souvent », « considéré comme », « réputé », « passe pour »",
      false: "The claim has a named source, or `text` states it directly as fact. Saying that an attribution is uncertain is not a vague attribution",
    },
  ),
  t9_closer: noul(
    "Does the last sentence of `text` sum up, evaluate or draw a moral instead of stating a new fact?",
    {
      true: "'Today, the name lives on.', 'a fitting tribute', 'became a distinctive part of French textile design', « Aujourd’hui encore, le nom… », « un bel hommage », « marquent l’histoire des tissus imprimés français », « reste dans les mémoires », « fait date »",
      false: "The last sentence states a new name, date, place, event or cause. A last sentence that states how certain a claim is ('The attribution is traditional rather than certain') is a fact, not a closer",
    },
  ),
  t12_false_range: noul(
    "Does `text` use 'from X to Y' (or 'de X à Y') where X and Y are not two ends of a real scale, place range or time span, such as 'from medieval abbeys to modern boulevards'? If X and Y are the two ends of a line, a route or a period, answer no.",
  ),
  t13_stock_metaphor: noul(
    "Does `text` use a ready-made figure of speech, such as 'steeped in history', 'a window into', 'bears witness to', 'woven into the fabric', 'au fil des siècles', 'garder la trace', 'la mémoire des lieux'?",
  ),
  t14_grandiosity: noul(
    "Does `text` use a superlative or sweeping claim that its facts do not support, such as 'forever changed the city', 'one of the most important', 'a changé à jamais', 'l’un des plus importants'?",
  ),
  t16_synonym_cycling: noul(
    "Does `text` refer to the same thing by two or more different names in a row to avoid repeating a word, such as 'the abbey… the monastery… the religious house'?",
  ),
} as const;

/**
 * Referent slip, both locales (hint): the station is said to change when only its name changed, or
 * the station is the subject of an event it cannot perform. Calibration: both editors named it; no
 * other question covers it.
 */
const METONYMY = noul(
  "Does `text` say that the station or street itself was changed (simplified, shortened, renamed, extended) when only its name changed, or make the station the subject of something people did ('the station saw RATP decorate', « la station a vu »), or say that a name is owed to proximity (« doit son nom à sa proximité avec »)?",
);

/** FR-only ranking hints. Never a gate (Jev fluency detection is weak, see design notes 2a). */
const FR_HINTS = {
  // The open question ("copied word for word from English?") gave 0.08–0.17 on every unit, so it
  // names the constructions. Code checks the same patterns (checks.ts FR_CALQUE_PATTERNS).
  t19_calque: noul(
    "Does the French in `text` contain one of these English-shaped constructions: « d’après » or « pour » after nommer, renommer, baptiser or appeler meaning 'named after / for' (« renommé pour le philosophe », « d’après la rue » in a naming sentence), a place or thing as the subject of « voir » + infinitive (« la station a vu la RATP décorer »), « être en charge de », « prendre place » meaning « avoir lieu », or « faire sens »?",
  ),
  metonymy: METONYMY,
  native: score("How natural is the French of `text` for a native reader of reference prose?", [
    "Reads as a translation from English: the sentence order and the links between clauses follow English, with several unidiomatic constructions",
    "One construction a French editor would change: a calque (« d’après », « a vu… faire »), a wrong preposition, or an inanimate subject with a verb that needs a person",
    "Natural, with one slightly stiff phrase",
    "Natural reference prose that a French editor would publish unchanged",
  ]),
};

/** EN-only ranking hints: calque from French, and the same referent slip. */
const EN_HINTS = {
  t19_calque: noul("Does the English in `text` contain a construction copied word for word from French?", {
    true: "A French structure in English words: 'opposed X to Y' for 'opposer… à', 'the historical quarter' for 'le quartier historique', French word order",
    false: "Idiomatic English",
  }),
  metonymy: METONYMY,
};

export const ETYMOLOGY_QUESTIONS = {
  S1: S1_lead,
  S2: S2_concrete,
  S3: S3_literal,
  ...S4_PARTS,
  S5: S5_construction,
  t25_explains_name: noul("Does `text` state where the name of the metro station `station` comes from?"),
  ...TELLS,
} as const;

export const CONTEXT_QUESTIONS = {
  S7: S7_context,
  S2: S2_concrete,
  S3: S3_literal,
  ...S4_PARTS,
  S5: S5_construction,
  ...TELLS,
} as const;

// ---------- station pair ----------
// State: { station, field, en, fr }.

export const STATION_PAIR_QUESTIONS = {
  // Raw only. S6 itself is derived in code from the parity Nouls below and the FR calque patterns:
  // this Score splits between levels and does not detect French calques.
  S6_judged: score(
    "`en` and `fr` are the English and French versions of one note about the metro station `station`. How well do they match in facts and qualifiers, and does each read as native text?",
    [
      "A fact, date or name is in one version and absent or different in the other, or a qualifier of uncertainty ('may', 'probably', 'serait', 'probablement') is in one version only",
      "Same facts, but one version reads as a word-for-word translation of the other",
      "Same facts and natural phrasing, but one version adds or drops a minor explanation",
      "Same facts and same qualifiers, and each version reads as natural writing in its language",
    ],
  ),
  // same_facts was dropped: 0.83–0.98 on every pair, so it gave no signal.
  fr_missing: noul(
    "Does `en` state a date, number, proper name, qualifier or claim that is absent from `fr` and cannot be inferred from words already in `fr`?",
    {
      true: "A date, number, name, qualifier of certainty or claim in `en` that a French reader cannot find or infer in `fr`",
      false: "Wording differences, a gloss one audience does not need, or a name that `fr` gives through another phrase (« rue Saint-Placide » for 'Placide', « comme la rue voisine » for 'Rue de Vaugirard', « de trois quarts » for 'from the front left')",
    },
  ),
  en_missing: noul(
    "Does `fr` state a date, number, proper name, qualifier or claim that is absent from `en` and cannot be inferred from words already in `en`?",
    {
      true: "A date, number, name, qualifier of certainty or claim in `fr` that an English reader cannot find or infer in `en`",
      false: "Wording differences, a gloss one audience does not need, or a fact that `en` gives through another phrase (a title or office that implies the institution)",
    },
  ),
  conflict: noul("Do `en` and `fr` disagree about any fact, such as a date, a name, a number, or a description of a person?"),
  hedge_mismatch: noul(
    "Does one of `en` and `fr` present something as uncertain ('may', 'probably', 'perhaps', 'serait', 'aurait', 'probablement', 'peut-être') while the other states it as certain?",
  ),
  fr_calque: noul(
    "Does `fr` copy an English construction from `en` that a French writer would not use: « d’après » or « pour » meaning 'named after / for' (« renommé pour », « d’après le boulevard »), a place as the subject of « voir » + infinitive (« la station a vu… »), « doit son nom à sa proximité » for 'named for its proximity', or the station as the thing that was simplified or renamed when only its name changed?",
  ),
} as const;

// ---------- line copy ----------
// State: { line, field, locale, text } (+ `other_titles` for titles).

export const LINE_SUMMARY_QUESTIONS = {
  L1: score("`text` is the summary of Paris metro line `line` on a site that explains station names. How specific is it?", [
    "Promotional or general ('a journey through Paris history'); names no stations, places or periods",
    "Names the route or the termini, but gives no theme of the station names",
    "Names the route or a set of places and one concrete theme of the station names",
    "Names a concrete theme of the station names with at least one example place or station, in one to three short sentences",
  ]),
  S2: S2_concrete,
  S3: S3_literal,
  ...S4_PARTS,
  ...TELLS,
} as const;

export const LINE_ALT_QUESTIONS = {
  L2: score("`text` is the alt text of an illustration for Paris metro line `line`. How well does it describe a visible image?", [
    "Says 'image of', or describes ideas or stories rather than anything that can be seen",
    "Accurate but generic ('metro illustration', 'illustration of places and names')",
    "Names the main subject and style, but adds interpretation ('evoking…', 'rappelant…', 'interpretive')",
    "Names what is visible (subject, setting, style) in one sentence, with no interpretation",
  ]),
} as const;

export const LINE_TITLE_QUESTIONS = {
  L3: score(
    "`text` is the title of Paris metro line `line`. `other_titles` are the titles of the other lines in the same language. Is the title well formed?",
    [
      "Uses Title Case in French, marketing words, or a form unlike `other_titles`",
      "Correct capitalisation, but a different pattern from `other_titles`",
      "Correct capitalisation and the same pattern as `other_titles`",
    ],
  ),
} as const;

/** Pair for line fields. State: { line, field, en, fr }. */
export const SHORT_PAIR_QUESTIONS = {
  // Raw only; S6 is derived in code from the Nouls, as for stations.
  S6_judged: score("`en` and `fr` are the English and French versions of one piece of interface or summary text. Do they match?", [
    "They say different things: one omits a fact, a disclaimer, a credit or an instruction that the other has",
    "Same meaning, but one is a word-for-word rendering that a native writer would not use. A literal rendering that is also the natural wording ('Line 1' / 'Ligne 1', 'Station list' / 'Liste des stations') is not a fault",
    "Same meaning, but one adds or drops a minor detail",
    "Same meaning, natural in each language",
  ]),
  conflict: noul("Do `en` and `fr` disagree about any fact, such as a number, a name or an instruction?"),
  fr_missing: STATION_PAIR_QUESTIONS.fr_missing,
  en_missing: STATION_PAIR_QUESTIONS.en_missing,
} as const;

/** Pair for UI and page strings (rubric U3). State: { key, en, fr }. */
export const UI_PAIR_QUESTIONS = {
  U3: score("`en` and `fr` are the English and French versions of interface string `key`. Do they say the same thing?", [
    "They say different things: one omits a disclaimer, a credit, an instruction or a fact that the other has",
    "Same meaning, but one is a word-for-word rendering of the other",
    "Same meaning, natural in each language",
  ]),
} as const;

// ---------- UI and page strings ----------
// State: { key, locale, text, usage } for U1; UI strings also get { role, siblings } for U2.

export const UI_QUESTIONS = {
  U1: score(
    "`text` is an interface string (key `key`) on a website about Paris metro station names, in locale `locale`. `usage` says where it appears on the page (button, link, heading, aria-label, status message). Is it clear and well formed for that use? A label for a thing (a heading, a count, a name, a status, an aria-label for a region) is a noun phrase; only a button or link that does something needs a verb. A link that names its destination ('All lines', 'To Mairie d’Ivry', 'Vers Mairie d’Ivry') needs no verb. A word shown next to a number or a name ('stations', 'Line') is judged with that number or name.",
    [
      "A reader cannot tell what it labels or what it does in that place, or it uses marketing words ('Embark', 'Discover', 'Découvrez'), or it uses Title Case",
      "Clear but wordier than needed for that place, or a button that does something is phrased without a verb",
      "Clear, short, sentence case, and in the form that its place on the page needs",
    ],
  ),
  t4_praise: TELLS.t4_praise,
} as const;

/**
 * U2 per string (rubric U2). State adds `role` and `siblings` ({key: text} of the other strings of
 * the same role in the same locale). U2 is derived in code from these Nouls, so a conflict lowers
 * only the strings that take part in it.
 */
export const UI_CONSISTENCY_QUESTIONS = {
  word_conflict: noul(
    "Does `text` use a different word from `siblings` for the same thing, such as 'line' and 'route', 'entry' and 'note', or 'notice' and 'texte'? Different words for different things (a line and a branch, a station and a stop list, a map and a list view) do not count. If `text` uses no word that a sibling names differently, answer no.",
  ),
} as const;

/** Added for action strings (role "action") only. */
export const UI_VERB_QUESTIONS = {
  verb_mix: noul(
    "`text` is a button or link label and `siblings` are the other button and link labels. Does `text` use a different verb form for its action from the labels in `siblings` that start with a verb, such as an infinitive ('Choisir une ligne') where the others use an imperative ('Choisissez une station'), or the reverse? A label without a verb (a destination or a name) does not count; answer no.",
  ),
} as const;

/** Nouls where yes means the good outcome. Code inverts them before thresholds. */
export const GOOD_WHEN_YES = new Set(["t25_explains_name"]);

/** Nouls that rank units for review but never count as tells or gates. */
export const HINT_ONLY = new Set(["t19_calque", "native", "fr_calque", "metonymy", "S6_judged"]);

/** Nouls combined in code into rubric S4 (see S4_PARTS). */
export const S4_NOULS = new Set(Object.keys(S4_PARTS));

export const UNIT_HINTS = { fr: FR_HINTS, en: EN_HINTS } as const;

/** Rubric tell id for each tell Noul, used for the composite penalty. */
export const TELL_ID: Record<string, string> = {
  t2_inflated: "T2",
  t4_praise: "T4",
  t5_neg_parallel: "T5",
  t6_tricolon: "T6",
  t7_vague_attribution: "T7",
  t9_closer: "T9",
  t12_false_range: "T12",
  t13_stock_metaphor: "T13",
  t14_grandiosity: "T14",
  t16_synonym_cycling: "T16",
};
