import type { Locale, MetroLine, Station } from "./data/types";
export interface Route {
  locale: Locale;
  lineId?: "7" | "14";
  stationId?: string;
  valid: boolean;
}
export function parseRoute(pathname: string): Route {
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    return { locale: "fr", valid: false };
  }
  if (pathname.includes("//") || !pathname.startsWith("/"))
    return { locale: "fr", valid: false };
  const parts = pathname.replace(/\/$/, "").split("/").filter(Boolean);
  if (!parts.length) return { locale: "fr", valid: true };
  const locale = parts[0] === "en" ? "en" : "fr";
  if (!["en", "fr"].includes(parts[0]!)) return { locale, valid: false };
  if (parts.length === 1) return { locale, valid: true };
  if (parts[1] !== "lines" || !["7", "14"].includes(parts[2] ?? ""))
    return { locale, valid: false };
  const lineId = parts[2] as "7" | "14";
  if (parts.length === 3) return { locale, lineId, valid: true };
  if (
    parts.length === 5 &&
    parts[3] === "stations" &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(parts[4]!)
  )
    return { locale, lineId, stationId: parts[4], valid: true };
  return { locale, valid: false };
}
export function routeUrl(
  locale: Locale,
  lineId?: string,
  stationId?: string,
): string {
  return `/${locale}${lineId ? `/lines/${lineId}` : ""}${stationId ? `/stations/${stationId}` : ""}`;
}
/** Graph neighbours preserve the fork instead of linking the two southern branches. */
export function neighbours(
  line: MetroLine,
  id: string,
): { previous: Station[]; next: Station[] } {
  const previous = new Set<string>(),
    next = new Set<string>();
  for (const path of line.paths) {
    const i = path.indexOf(id);
    if (i < 0) continue;
    if (i > 0) previous.add(path[i - 1]!);
    if (i < path.length - 1) next.add(path[i + 1]!);
  }
  const get = (ids: Set<string>) =>
    [...ids]
      .map((id) => line.stations.find((s) => s.id === id)!)
      .filter(Boolean);
  return { previous: get(previous), next: get(next) };
}
export function normalizeSearch(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’'–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
