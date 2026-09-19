import {
  stations,
  lineSource,
  extensionSource,
  type Station,
} from "./stations";
import { illustration, ornament } from "./illustrations";
const $ = <T extends HTMLElement>(id: string) =>
  document.getElementById(id) as T;
const map = $("map");
const list = $("station-list");
const search = $<HTMLInputElement>("station-search");
const dialog = $<HTMLDialogElement>("story-dialog");
const about = $<HTMLDialogElement>("about-dialog");
let selected = 6;
let opener: HTMLElement | null = null;
let visited = new Set<string>();
try {
  const saved: unknown = JSON.parse(
    localStorage.getItem("metro-stories-read") || "[]",
  );
  if (Array.isArray(saved))
    visited = new Set(
      saved.filter(
        (x): x is string =>
          typeof x === "string" && stations.some((s) => s.id === x),
      ),
    );
} catch {
  /* Reading progress is optional. */
}
const norm = (v: string) =>
  v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const count = () => {
  $("visited-count").textContent = `${visited.size} of 21 stories explored`;
};
const path = stations.map((s, i) => `${i ? "L" : "M"}${s.x} ${s.y}`).join(" ");
map.innerHTML = `<svg viewBox="0 0 960 1110" class="route-svg" aria-hidden="true"><defs><pattern id="paper-grid" width="38" height="38" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".7" fill="#cfc8b7" opacity=".4"/></pattern></defs><rect width="960" height="1110" fill="url(#paper-grid)"/>
<path class="district-outline" d="M170 206Q230 124 425 152T764 300L831 473Q910 647 746 772L520 826Q238 716 182 511Z"/>
<path class="street" d="M210 180L725 745M156 379L768 222M233 646L837 380M183 470L737 701M323 169L696 759M207 728L677 183"/>
<path class="river" d="M-30 417C137 372 128 522 292 508S451 501 487 559 689 506 730 643 788 676 990 719"/>
<path class="river-inner" d="M-30 417C137 372 128 522 292 508S451 501 487 559 689 506 730 643 788 676 990 719"/>
<text class="river-label" x="352" y="527" transform="rotate(12 352 527)">La Seine</text>
<text class="district-label" x="177" y="207">LE GRAND PARIS</text><text class="district-label" x="697" y="371">RIVE DROITE</text><text class="district-label" x="285" y="752">RIVE GAUCHE</text><text class="district-label" x="264" y="1030">PLUS LOIN, LA VILLE</text>
${ornament("modern", 170, 25, 180)}${ornament("station", 640, 130, 210)}${ornament("garden", 100, 255, 175)}${ornament("church", 130, 355, 220)}${ornament("station", 718, 402, 200)}${ornament("market", 315, 553, 180)}${ornament("towers", 726, 661, 210)}${ornament("garden", 315, 810, 205)}${ornament("plane", 727, 947, 195)}
<path class="route-shadow" d="${path}"/><path class="route-line" d="${path}"/>
<g class="compass" transform="translate(864 65)"><circle r="28"/><path d="M0 17V-17m-7 9l7-9 7 9"/><text y="-38" text-anchor="middle">N</text></g>
</svg><div class="map-stations">${stations.map((s, i) => `<button class="station-node ${i === 6 ? "is-preview" : ""} ${i > 11 ? "label-left" : ""}" data-station="${i}" style="left:${s.x / 9.6}%;top:${s.y / 11.1}%" aria-label="${s.name}: ${s.title}"><span class="node-dot"></span><span class="node-label">${s.name}${i === 0 ? "<small>NORTHERN TERMINUS</small>" : i === 20 ? "<small>SOUTHERN TERMINUS</small>" : ""}</span></button>`).join("")}</div><div class="map-stamp">PARIS<br><strong>en chemin</strong><br>DEPUIS 1998</div>`;
list.innerHTML = stations
  .map(
    (s, i) =>
      `<button class="station-row" data-station="${i}"><span class="row-number">${String(i + 1).padStart(2, "0")}</span><span><strong>${s.name}</strong><small>${s.title}</small></span><span class="row-year">${s.opened}</span><span aria-hidden="true">↗</span></button>`,
  )
  .join("");
function preview(index: number) {
  selected = index;
  const s = stations[index]!;
  $("preview-card").innerHTML =
    `<span class="preview-top"><span class="eyebrow">A STOP ALONG THE WAY</span><span>${String(index + 1).padStart(2, "0")} / 21</span></span><span class="preview-image">${illustration(s.art)}</span><span class="preview-name">${s.name}</span><span class="preview-intro">${s.intro}</span><span class="preview-link">Discover the story <span aria-hidden="true">↗</span></span>`;
  $("preview-card").setAttribute("aria-label", `Read the story of ${s.name}`);
  map
    .querySelectorAll(".station-node")
    .forEach((n, i) => n.classList.toggle("is-preview", i === index));
}
const canAnimate = () =>
  !matchMedia("(prefers-reduced-motion: reduce)").matches;
function transition(fn: () => void) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { finished: Promise<void> };
  };
  if (doc.startViewTransition && canAnimate()) {
    doc.startViewTransition(fn).finished.catch(() => {});
  } else fn();
}
function renderStory(index: number) {
  const s = stations[index]!;
  $("story-content").innerHTML =
    `<div class="story-top"><span class="line-badge">14</span><span>STATION ${String(index + 1).padStart(2, "0")} / 21</span><button class="close-button" id="close-story" aria-label="Close station story">×</button></div><div class="story-art">${illustration(s.art)}<span class="art-caption">A LITTLE HISTORY ABOVE THE LINE</span></div><article class="story-body"><span class="eyebrow">${s.area.toUpperCase()}</span><h2 id="story-name" tabindex="-1">${s.name}</h2><div class="story-meta"><span>LINE 14 ARRIVED · ${s.opened}</span><button id="share-story" class="text-button">Copy story link ↗</button></div><div class="history-heading"><span class="history-year">${s.year}</span><h3>${s.title}</h3></div><p class="story-intro">${s.intro}</p><p>${s.story}</p><div class="look-note"><span aria-hidden="true">✧</span><div><span class="eyebrow">WHEN YOU SURFACE</span><p>${s.look}</p></div></div><details class="sources"><summary>Sources & further reading <span aria-hidden="true">↗</span></summary><a href="${s.source[1]}" target="_blank" rel="noreferrer">${s.source[0]} ↗</a><a href="${s.opened >= 2024 ? extensionSource : lineSource}" target="_blank" rel="noreferrer">RATP · line history & opening dates ↗</a><small>Historical summary, not a live travel guide. Illustration is interpretive.</small></details><div class="story-navigation"><button id="previous-stop" ${index === 0 ? "disabled" : ""}><span>← Previous stop</span><small>${stations[index - 1]?.name ?? "Northern terminus"}</small></button><button id="next-stop" ${index === 20 ? "disabled" : ""}><span>Next stop →</span><small>${stations[index + 1]?.name ?? "Southern terminus"}</small></button></div><p class="story-position">${index + 1} / 21 <span>SAINT-DENIS–PLEYEL → AÉROPORT D’ORLY</span></p></article>`;
  $("close-story").onclick = closeStory;
  $("previous-stop").onclick = () => openStory(index - 1, true);
  $("next-stop").onclick = () => openStory(index + 1, true);
  $("share-story").onclick = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      $("share-story").textContent = "Link copied ✓";
    } catch {
      $("share-story").textContent = "Copy the URL from your address bar";
    }
  };
}
function openStory(index: number, replace = false, fromHash = false) {
  if (!stations[index]) return;
  if (!dialog.open)
    opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
  preview(index);
  visited.add(stations[index]!.id);
  try {
    localStorage.setItem("metro-stories-read", JSON.stringify([...visited]));
  } catch {
    /* Browser storage may be disabled. */
  }
  count();
  map
    .querySelectorAll(".station-node")
    .forEach((n, i) =>
      n.classList.toggle("is-read", visited.has(stations[i]!.id)),
    );
  if (!fromHash)
    history[replace || dialog.open ? "replaceState" : "pushState"](
      { station: true },
      "",
      `#${stations[index]!.id}`,
    );
  transition(() => {
    renderStory(index);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("dialog-open");
    dialog.scrollTop = 0;
    $("story-name").focus({ preventScroll: true });
  });
}
function closeStory() {
  history.replaceState(null, "", location.pathname + location.search);
  dialog.close();
}
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  if (location.hash)
    history.replaceState(null, "", location.pathname + location.search);
  opener?.focus({ preventScroll: true });
});
dialog.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeStory();
});
dialog.addEventListener("click", (e) => {
  if (
    e.target === dialog &&
    (e.clientX < dialog.getBoundingClientRect().left ||
      e.clientX > dialog.getBoundingClientRect().right)
  )
    closeStory();
});
function hashChanged() {
  const index = stations.findIndex((s) => `#${s.id}` === location.hash);
  if (index >= 0) openStory(index, true, true);
  else if (dialog.open) dialog.close();
}
addEventListener("popstate", hashChanged);
addEventListener("hashchange", hashChanged);
for (const container of [map, list]) {
  container
    .querySelectorAll<HTMLButtonElement>("[data-station]")
    .forEach((btn) => {
      const index = Number(btn.dataset.station);
      btn.onclick = () => openStory(index);
      btn.addEventListener("pointerenter", () => preview(index));
      btn.addEventListener("focus", () => preview(index));
      btn.addEventListener("keydown", (e) => {
        if (
          ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(e.key)
        ) {
          e.preventDefault();
          const forward = e.key === "ArrowDown" || e.key === "ArrowRight";
          const next = Math.max(0, Math.min(20, index + (forward ? 1 : -1)));
          container
            .querySelector<HTMLButtonElement>(`[data-station="${next}"]`)
            ?.focus();
        }
      });
    });
}
function setView(isList: boolean) {
  map.hidden = isList;
  list.hidden = !isList;
  $("map-view").setAttribute("aria-pressed", String(!isList));
  $("list-view").setAttribute("aria-pressed", String(isList));
}
$("map-view").onclick = () => {
  search.value = "";
  filter();
  setView(false);
};
$("list-view").onclick = () => setView(true);
function filter() {
  const term = norm(search.value.trim());
  if (term) setView(true);
  let matches = 0;
  list.querySelectorAll<HTMLButtonElement>("[data-station]").forEach((btn) => {
    const s = stations[Number(btn.dataset.station)]!;
    const match = norm(s.name + " " + s.area).includes(term);
    btn.hidden = !match;
    if (match) matches++;
  });
  $("no-results").hidden = matches !== 0;
  list.classList.toggle("is-empty", matches === 0);
}
search.oninput = filter;
search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const first = list.querySelector<HTMLButtonElement>(
      "[data-station]:not([hidden])",
    );
    first?.click();
  }
});
$("preview-card").onclick = () => openStory(selected);
$("start-button").onclick = () => openStory(0);
$("surprise-button").onclick = () => {
  const unread = stations
    .map((_, i) => i)
    .filter((i) => !visited.has(stations[i]!.id));
  const choices = unread.length ? unread : stations.map((_, i) => i);
  openStory(choices[Math.floor(Math.random() * choices.length)]!);
};
$("about-button").onclick = () => {
  about.showModal();
  document.body.classList.add("dialog-open");
};
$("close-about").onclick = () => about.close();
about.onclose = () => document.body.classList.remove("dialog-open");
window.addEventListener("keydown", (e) => {
  if (
    e.key === "/" &&
    !dialog.open &&
    !about.open &&
    !(e.target instanceof HTMLInputElement)
  ) {
    e.preventDefault();
    search.focus();
  }
});
preview(6);
count();
map
  .querySelectorAll(".station-node")
  .forEach((n, i) =>
    n.classList.toggle("is-read", visited.has(stations[i]!.id)),
  );
if (location.hash) hashChanged();
