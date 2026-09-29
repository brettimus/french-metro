export interface FutureLine {
  id: string;
  color: string;
  ink: string;
}
// The home page shows the coming-soon section only while lines are still listed.
export const comingSoonMarkup = (
  list: readonly FutureLine[],
  heading: string,
  item: (line: FutureLine) => string,
) =>
  list.length
    ? `<section class="coming-soon" aria-labelledby="soon-title"><h2 id="soon-title">${heading}</h2><div>${list.map(item).join("")}</div></section>`
    : "";
