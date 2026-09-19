import { lines, getLine, comingSoon } from "./data/lines";
import type { Locale, MetroLine, Station } from "./data/types";
import { t } from "./i18n";
import {
  parseRoute,
  routeUrl,
  neighbours,
  normalizeSearch,
  type Route,
} from "./routing";
import { mapLayout, mapNeighbour } from "./map";
import { illustration } from "./illustrations";
const linkIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m10 13 4-2m-5 5H7a4 4 0 0 1 0-8h3m4 0h3a4 4 0 0 1 0 8h-3"/></svg>`;
const closeIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18"/></svg>`;
const app = document.getElementById("app")!;
const dialog = document.getElementById("station-dialog") as HTMLDialogElement;
const about = document.getElementById("about-dialog") as HTMLDialogElement;
const esc = (s: string | number) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
let state: Route = parseRoute(location.pathname);
let pageKey = "";
let activeTransition:
  | { skipTransition: () => void; finished: Promise<void> }
  | undefined;
let visited = new Set<string>();
try {
  const saved = JSON.parse(localStorage.getItem("metro-names-read") || "[]");
  if (Array.isArray(saved))
    visited = new Set(saved.filter((x) => typeof x === "string"));
} catch {
  /* Storage is optional. */
}
const readKey = (line: MetroLine, station: Station) =>
  `${line.id}:${station.id}`;
const lineStyle = (line: MetroLine) =>
  `--route:${line.color};--route-ink:${line.textColor}`;
const badge = (id: string, color: string, ink: string, small = false) =>
  `<span class="line-badge ${small ? "small" : ""}" style="--badge:${color};--badge-ink:${ink}">${esc(id)}</span>`;
const lineBadge = (line: MetroLine, small = false) =>
  badge(line.id, line.color, line.textColor, small);
const href = (line?: MetroLine, station?: Station, locale = state.locale) =>
  routeUrl(locale, line?.id, station?.id);
function languageLink(locale: Locale) {
  return routeUrl(
    locale,
    state.valid ? state.lineId : undefined,
    state.valid ? state.stationId : undefined,
  );
}
function frame(content: string) {
  const m = t(state.locale);
  return `<a class="skip" href="#main">${m.skip}</a><header class="masthead"><a class="brand" data-route href="${href()}">${m.brand}</a><nav class="header-lines" aria-label="${m.switchLine}">${lines.map((l) => `<a data-route href="${href(l)}" style="--nav-line:${l.color}" ${state.lineId === l.id ? 'aria-current="page"' : ""} aria-label="${m.line} ${l.id}">${lineBadge(l, true)}</a>`).join("")}</nav><nav class="language" aria-label="${m.chooseLanguage}"><a data-route href="${languageLink("fr")}" lang="fr" hreflang="fr" ${state.locale === "fr" ? 'aria-current="true"' : ""}>FR</a><a data-route href="${languageLink("en")}" lang="en" hreflang="en" ${state.locale === "en" ? 'aria-current="true"' : ""}>EN</a></nav></header>${content}<footer><span>${m.independent}</span><button id="about-button">${m.about}</button><a href="https://www.ratp.fr/vos-lignes" target="_blank" rel="noreferrer">${m.official} ↗</a></footer>`;
}
function miniRoute(id: string) {
  return `<svg class="mini-route" viewBox="0 0 100 260" aria-hidden="true" focusable="false"><path d="M50 10V${id === "7" ? "198" : "248"}${id === "7" ? "M50 198L18 246M50 198L82 246" : ""}"/>${[10, 48, 86, 124, 162, 198, ...(id !== "7" ? [246] : [])].map((y) => `<circle cx="50" cy="${y}" r="4"/>`).join("")}${id === "7" ? '<circle cx="18" cy="246" r="5"/><circle cx="82" cy="246" r="5"/>' : ""}</svg>`;
}
function home() {
  const m = t(state.locale);
  return `<main id="main" class="home"><section class="home-heading"><p class="kicker">PARIS · ${m.choose}</p><h1>${m.title}</h1><p>${m.subtitle}</p></section><section class="line-grid" aria-label="${m.choose}">${lines
    .map(
      (line) =>
        `<article class="line-card" style="${lineStyle(line)}"><a class="line-card-link" data-route href="${href(line)}" aria-label="${m.explore} ${line.id}"><div class="card-top">${lineBadge(line)}<span>${line.stations.length} ${m.stations}</span><span class="card-arrow" aria-hidden="true">↗</span></div><h2>${esc(line.termini[0]!)}</h2><p class="termini">${line.termini.slice(1).map(esc).join(" / ")}</p><div class="card-art"><img src="${line.image}" alt="${esc(line.imageAlt[state.locale])}" width="1536" height="1024" decoding="async"/>${miniRoute(line.id)}</div><span class="card-link">${m.explore} <span aria-hidden="true">→</span></span></a><div class="card-featured">${line.featured
          .slice(0, 2)
          .map((id) => line.stations.find((s) => s.id === id))
          .filter((s): s is Station => !!s)
          .map(
            (s) =>
              `<a data-route href="${href(line, s)}">${esc(s.name)} <span aria-hidden="true">↗</span></a>`,
          )
          .join("")}</div></article>`,
    )
    .join(
      "",
    )}</section><section class="coming-soon" aria-labelledby="soon-title"><h2 id="soon-title">${m.other}</h2><div>${comingSoon.map((l) => `<span class="future-line" aria-label="${m.line} ${l.id} · ${m.soon}">${badge(l.id, l.color, l.ink, true)}</span>`).join("")}</div></section></main>`;
}
function mapMarkup(line: MetroLine) {
  const m = t(state.locale);
  const { points, height, paths, rivers } = mapLayout(line);
  return `<div id="map" class="map-canvas" style="--map-height:${height}px"><svg class="route-svg" viewBox="0 0 800 ${height}" preserveAspectRatio="none" aria-hidden="true">${rivers.map((riverY) => `<path class="river" d="M0 ${riverY + 12}C200 ${riverY - 22} 575 ${riverY + 22} 800 ${riverY - 12}"/><text class="river-name" x="95" y="${riverY - 15}">Seine</text>`).join("")}${paths.map((p) => `<path class="route-track" d="${p}"/>`).join("")}</svg><div class="map-stations">${points.map((p) => `<a data-route href="${href(line, p.station)}" class="station-node ${p.left ? "label-left" : ""} ${p.branch ? "branch-node" : ""} ${visited.has(readKey(line, p.station)) ? "is-read" : ""}" data-station="${p.station.id}" style="--label-space:${p.left ? p.x / 8 : 100 - p.x / 8};left:${p.x / 8}%;top:${(p.y / height) * 100}%" aria-label="${esc(p.station.name)}"><span class="node-dot" aria-hidden="true"></span><span class="node-label">${esc(p.station.name)}</span></a>`).join("")}</div></div>`;
}
function linePage(line: MetroLine) {
  const m = t(state.locale);
  return `<main id="main" class="line-page" style="${lineStyle(line)}"><div class="line-heading"><a class="back-link" data-route href="${href()}">← ${m.home}</a><div class="line-heading-title">${lineBadge(line)}<div><h1>${m.line} ${line.id}</h1><p>${esc(line.termini[0]!) + " → " + line.termini.slice(1).map(esc).join(" / ")}</p></div></div></div><div class="atlas-layout"><aside class="line-sidebar"><div class="sidebar-sticky"><p class="line-summary">${esc(line.summary[state.locale])}</p><div class="featured-links"><span class="kicker">${m.featured}</span>${line.featured
    .slice(0, 3)
    .map((id) => line.stations.find((s) => s.id === id))
    .filter((s): s is Station => !!s)
    .map(
      (s) =>
        `<a data-route href="${href(line, s)}">${esc(s.name)} <span>↗</span></a>`,
    )
    .join(
      "",
    )}</div><div id="station-preview"></div><div class="reading-progress"><span id="read-count"></span><button id="reset-progress">${m.reset}</button></div><p class="sidebar-help">${m.keyHint}</p></div></aside><section class="route-section" aria-label="${m.routeLabel} ${line.id}"><div class="route-toolbar"><div class="view-switch" aria-label="${m.selectStation}"><button id="map-view" aria-pressed="true">${m.map}</button><button id="list-view" aria-pressed="false">${m.list}</button></div><label class="search"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8" cy="8" r="5"/><path d="m12 12 5 5"/></svg><input type="search" id="station-search" placeholder="${m.search}" aria-label="${m.search}" autocomplete="off"/></label></div><div class="map-meta"><span id="station-count">${line.stations.length} ${m.stations}</span><span id="station-instruction">${m.instruction}</span></div>${mapMarkup(line)}<div id="station-list" class="station-list" hidden>${line.stations.map((s) => `<a data-route class="station-row" data-station="${s.id}" href="${href(line, s)}"><span class="row-dot" aria-hidden="true"></span><span><strong>${esc(s.name)}</strong><small>${esc(s.area)}</small></span><span class="row-arrow" aria-hidden="true">↗</span></a>`).join("")}</div><div id="search-status" class="search-status" role="status" hidden></div><div class="map-legend" id="map-legend"><span id="schematic-note">${m.schematic}</span><a href="${esc(line.sources[0]?.url || "https://www.ratp.fr/vos-lignes")}" target="_blank" rel="noreferrer">${m.sources} ↗</a></div></section></div></main>`;
}
function updateProgress(line: MetroLine) {
  const el = document.getElementById("read-count");
  if (el)
    el.textContent = `${line.stations.filter((s) => visited.has(readKey(line, s))).length} / ${line.stations.length} ${t(state.locale).read}`;
}
function preview(line: MetroLine, id: string) {
  const s = line.stations.find((s) => s.id === id);
  if (!s) return;
  const el = document.getElementById("station-preview");
  if (el)
    el.innerHTML = `<a class="preview" data-route href="${href(line, s)}"><div class="preview-art">${illustration(s.art)}</div><span class="kicker">${t(state.locale).why}</span><h2>${esc(s.name)}</h2><p>${esc(s.etymology[state.locale])}</p><span class="preview-cta">${t(state.locale).open} <span>↗</span></span></a>`;
  app
    .querySelectorAll<HTMLElement>("[data-station]")
    .forEach((n) =>
      n.classList.toggle("is-selected", n.dataset.station === id),
    );
}
function setupLine(line: MetroLine) {
  const map = document.getElementById("map")!,
    list = document.getElementById("station-list")!,
    input = document.getElementById("station-search") as HTMLInputElement,
    status = document.getElementById("search-status")!;
  const mapButton = document.getElementById("map-view")!,
    listButton = document.getElementById("list-view")!;
  const m = t(state.locale);
  const view = (isList: boolean) => {
    map.hidden = isList;
    list.hidden = !isList;
    document.getElementById("schematic-note")!.hidden = isList;
    mapButton.setAttribute("aria-pressed", String(!isList));
    listButton.setAttribute("aria-pressed", String(isList));
  };
  const filter = () => {
    const term = normalizeSearch(input.value);
    let found = 0;
    list.querySelectorAll<HTMLElement>("[data-station]").forEach((row) => {
      const s = line.stations.find((s) => s.id === row.dataset.station)!;
      row.hidden = !normalizeSearch(s.name + " " + s.area).includes(term);
      if (!row.hidden) found++;
    });
    document.getElementById("station-count")!.textContent =
      `${found} ${found === 1 ? "station" : m.stations}`;
    if (term) view(true);
    document.getElementById("station-instruction")!.hidden = found === 0;
    status.hidden = found > 0;
    status.textContent = found ? "" : m.noResults;
    list.classList.toggle("is-empty", !found);
  };
  mapButton.onclick = () => {
    input.value = "";
    filter();
    view(false);
  };
  listButton.onclick = () => view(true);
  input.oninput = filter;
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const row = list.querySelector<HTMLAnchorElement>(
        "[data-station]:not([hidden])",
      );
      row?.click();
    }
  });
  app.querySelectorAll<HTMLAnchorElement>("[data-station]").forEach((node) => {
    node.addEventListener("pointerenter", () =>
      preview(line, node.dataset.station!),
    );
    node.addEventListener("focus", () => preview(line, node.dataset.station!));
    node.addEventListener("keydown", (e) => {
      if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key))
        return;
      e.preventDefault();
      const listParent = node.closest(".station-list");
      if (listParent) {
        const rows = [
          ...listParent.querySelectorAll<HTMLElement>(
            "[data-station]:not([hidden])",
          ),
        ];
        const step = e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 1;
        rows[rows.indexOf(node) + step]?.focus();
      } else {
        const target = mapNeighbour(line, node.dataset.station!, e.key);
        if (target)
          node
            .closest(".map-stations")
            ?.querySelector<HTMLElement>(`[data-station="${target.id}"]`)
            ?.focus();
      }
    });
  });
  document.getElementById("reset-progress")!.onclick = () => {
    for (const s of line.stations) visited.delete(readKey(line, s));
    saveProgress();
    updateProgress(line);
    app
      .querySelectorAll(".is-read")
      .forEach((el) => el.classList.remove("is-read"));
  };
  preview(line, state.stationId || line.featured[0] || line.stations[0]!.id);
  updateProgress(line);
}
function saveProgress() {
  try {
    localStorage.setItem("metro-names-read", JSON.stringify([...visited]));
  } catch {
    /* Storage is optional. */
  }
}
function stationPanel(line: MetroLine, s: Station) {
  const m = t(state.locale),
    near = neighbours(line, s.id);
  return `<div class="sheet-top">${lineBadge(line, true)}<span>${m.line} ${line.id}</span><nav class="language sheet-language" aria-label="${m.chooseLanguage}">${(["fr", "en"] as Locale[]).map((locale) => `<a data-route href="${routeUrl(locale, line.id, s.id)}" lang="${locale}" hreflang="${locale}" ${state.locale === locale ? 'aria-current="true"' : ""}>${locale.toUpperCase()}</a>`).join("")}</nav><button class="close-button" id="close-station" aria-label="${m.close}">${closeIcon}</button></div><div class="sheet-illustration">${illustration(s.art)}</div><article class="sheet-body"><p class="kicker">${esc(s.area)}</p><h1 id="station-title" tabindex="-1">${esc(s.name)}</h1><section class="name-origin"><h2>${m.why}</h2><p>${esc(s.etymology[state.locale])}</p></section><section class="station-context"><h2>${m.history}</h2><p>${esc(s.context[state.locale])}</p></section>${s.opened ? `<p class="opening-year">${m.arrived} <strong>${s.opened}</strong></p>` : ""}${s.people?.length ? `<section class="person-links"><h2>${m.people}</h2>${s.people.map((p) => `<a href="${esc(p.url[state.locale])}" target="_blank" rel="noreferrer">${esc(p.name)} ↗</a>`).join("")}</section>` : ""}<details class="sources"><summary>${m.sources} <span>+</span></summary>${s.sources.map((source) => `<a href="${esc(source.url)}" target="_blank" rel="noreferrer">${esc(source.label)} ↗</a>`).join("")}<small>${m.sourceDate}</small></details><div class="share-row"><button id="copy-link">${m.copy} ${linkIcon}</button><span id="copy-status" role="status"></span></div><nav class="station-nav" aria-label="${m.selectStation}"><div><span>${m.previous}</span>${near.previous.length ? near.previous.map((n) => `<a data-route href="${href(line, n)}">← ${esc(n.name)}</a>`).join("") : `<span class="end">${m.terminus}</span>`}</div><div><span>${near.next.length > 1 ? m.branches : m.next}</span>${near.next.length ? near.next.map((n) => `<a data-route href="${href(line, n)}">${esc(n.name)} →</a>`).join("") : `<span class="end">${m.terminus}</span>`}</div></nav></article>`;
}
function showStation(line: MetroLine, s: Station) {
  visited.add(readKey(line, s));
  saveProgress();
  updateProgress(line);
  preview(line, s.id);
  app
    .querySelectorAll<HTMLElement>(`[data-station="${s.id}"]`)
    .forEach((n) => n.classList.add("is-read"));
  dialog.style.setProperty("--route", line.color);
  dialog.style.setProperty("--route-ink", line.textColor);
  dialog.innerHTML = stationPanel(line, s);
  if (!dialog.open) dialog.showModal();
  document.body.classList.add("dialog-open");
  dialog.scrollTop = 0;
  document.getElementById("station-title")!.focus({ preventScroll: true });
  document.getElementById("close-station")!.onclick = closeStation;
  document.getElementById("copy-link")!.onclick = async () => {
    const el = document.getElementById("copy-status")!;
    try {
      await navigator.clipboard.writeText(location.href);
      el.textContent = t(state.locale).copied;
    } catch {
      el.textContent = t(state.locale).copyError;
    }
  };
}
function restoreStationFocus(id?: string) {
  if (!id) return;
  const node = [
    ...app.querySelectorAll<HTMLElement>(`[data-station="${id}"]`),
  ].find((el) => el.getClientRects().length > 0);
  node?.focus({ preventScroll: true });
}
function closeStation() {
  const id = state.stationId;
  const base = routeUrl(state.locale, state.lineId);
  const origin = history.state;
  if (
    origin?.modalOrigin === base &&
    Number.isInteger(origin?.modalDepth) &&
    origin.modalDepth > 0
  ) {
    history.go(-origin.modalDepth);
  } else {
    navigate(base, true, false);
    restoreStationFocus(id);
  }
}
function showAbout() {
  const m = t(state.locale);
  about.innerHTML = `<button id="close-about" class="close-button" aria-label="${m.close}">${closeIcon}</button><div class="about-body"><h1 id="about-title">${m.aboutTitle}</h1><p>${m.aboutText}</p><p>${m.aboutSources}</p><p>${m.aboutLanguage}</p><p class="small-copy">${m.aboutPrivacy}</p></div>`;
  about.showModal();
  document.body.classList.add("dialog-open");
  document.getElementById("close-about")!.onclick = () => about.close();
}
function render() {
  state = parseRoute(location.pathname);
  const line = getLine(state.lineId);
  const station = line?.stations.find((s) => s.id === state.stationId);
  const valid =
    state.valid && (!state.lineId || !!line) && (!state.stationId || !!station);
  const m = t(state.locale);
  const key = `${state.locale}:${state.lineId || "home"}:${valid}`;
  document.documentElement.lang = state.locale;
  document.title = `${station ? station.name + " · " : ""}${line ? m.line + " " + line.id : m.title} | Métro / Noms`;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')!.content =
    station?.etymology[state.locale] ||
    line?.summary[state.locale] ||
    m.subtitle;
  if (key !== pageKey) {
    pageKey = key;
    if (dialog.open) dialog.close();
    app.innerHTML = frame(
      !valid
        ? `<main id="main" class="not-found"><p>404</p><h1>${m.unknown}</h1><a data-route href="${href()}">${m.returnHome} →</a></main>`
        : line
          ? linePage(line)
          : home(),
    );
    document.getElementById("about-button")!.onclick = showAbout;
    if (line && valid) setupLine(line);
  } else {
    app
      .querySelectorAll<HTMLAnchorElement>(".language a")
      .forEach((a) => (a.href = languageLink(a.lang as Locale)));
  }
  if (valid && line && station) showStation(line, station);
  else if (dialog.open) {
    dialog.close();
    document.body.classList.remove("dialog-open");
  }
}
function navigate(url: string, replace = false, animate = true) {
  const previousKey = pageKey;
  const action = () => {
    const target = parseRoute(url);
    let entry: { modalOrigin?: string; modalDepth?: number } = {};
    if (target.stationId && !replace) {
      if (state.stationId && history.state?.modalOrigin) {
        entry = {
          modalOrigin: history.state.modalOrigin,
          modalDepth: history.state.modalDepth + 1,
        };
      } else if (
        !state.stationId &&
        state.lineId === target.lineId &&
        state.locale === target.locale
      ) {
        entry = {
          modalOrigin: routeUrl(state.locale, state.lineId),
          modalDepth: 1,
        };
      }
    }
    history[replace ? "replaceState" : "pushState"](entry, "", url);
    render();
    if (previousKey !== pageKey) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("main")?.setAttribute("tabindex", "-1");
      document.getElementById("main")?.focus({ preventScroll: true });
    }
  };
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => {
      skipTransition: () => void;
      finished: Promise<void>;
    };
  };
  if (
    animate &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches &&
    doc.startViewTransition
  ) {
    activeTransition?.skipTransition();
    activeTransition = doc.startViewTransition(action);
    activeTransition.finished.catch(() => {});
  } else action();
}
document.addEventListener("click", (e) => {
  const a = (e.target as Element).closest<HTMLAnchorElement>("a[data-route]");
  if (
    !a ||
    e.defaultPrevented ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey ||
    e.button !== 0
  )
    return;
  e.preventDefault();
  if (about.open) about.close();
  if (a.pathname !== location.pathname) navigate(a.getAttribute("href")!);
});
dialog.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeStation();
});
dialog.addEventListener("close", () =>
  document.body.classList.toggle("dialog-open", dialog.open || about.open),
);
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (
      e.clientX < box.left ||
      e.clientX > box.right ||
      e.clientY < box.top ||
      e.clientY > box.bottom
    )
      closeStation();
  }
});
about.addEventListener("close", () =>
  document.body.classList.toggle("dialog-open", dialog.open || about.open),
);
window.addEventListener("popstate", () => {
  const oldStation = state.stationId;
  if (about.open) about.close();
  render();
  if (!state.stationId) restoreStationFocus(oldStation);
});
window.addEventListener("keydown", (e) => {
  if (
    e.key === "/" &&
    !dialog.open &&
    !about.open &&
    !(e.target instanceof HTMLInputElement)
  ) {
    const input = document.getElementById("station-search");
    if (input) {
      e.preventDefault();
      input.focus();
    }
  }
});
// Keep previously shared Line 14 URLs usable.
if (location.pathname === "/" && location.hash) {
  const oldId = location.hash.slice(1);
  const line = getLine("14");
  if (line?.stations.some((s) => s.id === oldId))
    history.replaceState({}, "", routeUrl("en", "14", oldId));
}
if (location.pathname === "/" && !location.hash)
  history.replaceState({}, "", routeUrl("fr"));
render();
