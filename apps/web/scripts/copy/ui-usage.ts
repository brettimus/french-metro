/**
 * Where each UI string (apps/web/src/i18n.ts) appears, read from apps/web/src/app.ts and
 * coming-soon.ts. Sent to Jev with U1 (clarity and form) and used to group siblings for U2.
 * When app.ts changes the place of a string, update its entry here.
 */

/** Sibling group for U2: strings of one type are compared with each other. */
export type UiRole = "action" | "heading" | "label" | "message";

export type UiUsage = { role: UiRole; usage: string };

const a = (usage: string): UiUsage => ({ role: "action", usage });
const h = (usage: string): UiUsage => ({ role: "heading", usage });
const l = (usage: string): UiUsage => ({ role: "label", usage });
const m = (usage: string): UiUsage => ({ role: "message", usage });

export const UI_USAGE: Record<string, UiUsage> = {
  brand: a("Link text of the site name in the page header; it goes to the home page"),
  title: h("Main heading (h1) of the home page; also the document title of the home page"),
  subtitle: m("Paragraph under the home page heading; also the meta description"),
  choose: l("aria-label of the section that holds the line cards on the home page"),
  explore: a("Link text at the foot of each line card ('Explore the line →'); also the start of the card link's aria-label, followed by the line number"),
  line: l("Word before a line number: line page heading (h1) 'Line 4', header line-link aria-labels, station sheet header, document title"),
  stations: l("Count word after a number on line cards and the line page ('26 stations')"),
  soon: l("End of the aria-label of a future line badge ('Line 8 · Coming soon')"),
  other: h("Heading (h2) of the home page section that lists lines not yet published"),
  home: a("Back link at the top of a line page ('← All lines'); goes to the home page"),
  map: a("Toggle button that shows the route map view on a line page"),
  list: a("Toggle button that shows the station list view on a line page"),
  search: l("Placeholder and aria-label of the station search field on a line page"),
  noResults: m("Status message when the station search finds nothing"),
  why: h("Heading (h2) above the name explanation in the station sheet; also a small label in the station preview"),
  history: h("Heading (h2) above the context note in the station sheet"),
  sources: a("Summary of the collapsible source list in the station sheet; also an external link in the map legend"),
  people: h("Heading (h2) above links to people related to the station"),
  arrived: l("Label before the year the station joined the line ('On this line since 1900')"),
  close: l("aria-label of the icon-only close button of the station sheet and the about dialog"),
  next: l("Small label above the link to the next station in the station sheet"),
  previous: l("Small label above the link to the previous station in the station sheet"),
  branches: l("Small label above the links to the next stations where the line forks"),
  terminus: l("Text shown instead of a next or previous station link at the end of the line"),
  copy: a("Button in the station sheet that copies the page link"),
  copied: m("Status message after the link was copied"),
  copyError: m("Status message when copying the link failed"),
  read: l("Count word after 'n / total' in the reading progress of a line page ('3 / 26 entries opened')"),
  about: a("Footer button that opens the about dialog"),
  aboutTitle: h("Heading (h1) of the about dialog"),
  aboutText: m("First paragraph of the about dialog"),
  aboutSources: m("Paragraph of the about dialog on sources, illustrations and the non-RATP status"),
  aboutPrivacy: m("Small paragraph of the about dialog on reading progress and AI illustrations"),
  aboutLanguage: m("Paragraph of the about dialog on the available languages"),
  signCredit: m("Start of the credit sentence in the about dialog, followed by the photographer's name as a link"),
  official: a("External footer link to RATP maps and travel information"),
  schematic: l("Note in the map legend under the route map"),
  instruction: l("Hint above the route map that tells the reader what to do"),
  skip: a("Skip link, first focusable element of every page; goes to the main content"),
  unknown: h("Heading (h1) of the not-found page"),
  returnHome: a("Link on the not-found page that goes to the home page ('… →')"),
  open: a("Call to action at the end of the station preview card; the whole card is a link to the station sheet"),
  featured: l("Small label (kicker) above the featured station links in the line sidebar"),
  reset: a("Button under the reading progress that clears it"),
  sourceDate: m("Small note under the source links in the station sheet"),
  chooseLanguage: l("aria-label of the language switch (FR / EN links)"),
  routeLabel: l("aria-label of the route section of a line page, followed by the line number"),
  independent: l("Footer text that states the site's status"),
  switchLine: l("aria-label of the header navigation that lists the line badges"),
  alsoOn: l("Label before the line badges under a station name in the station sheet, for a station that other lines also serve; also the aria-label of that navigation"),
  selectStation: l("aria-label of the map/list view switch and of the previous/next station navigation"),
  keyHint: m("Help paragraph in the line sidebar about keyboard navigation"),
};

export const uiUsage = (key: string): UiUsage => {
  const usage = UI_USAGE[key];
  if (!usage) throw new Error(`No usage note for UI key "${key}"; add one to ui-usage.ts`);
  return usage;
};
