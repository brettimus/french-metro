import { describe, expect, test } from "bun:test";
import { lines, getLine } from "../src/data/lines";
import {
  parseRoute,
  routeUrl,
  neighbours,
  normalizeSearch,
} from "../src/routing";
import { mapLayout, mapNeighbour, riverCrossings } from "../src/map";
import { messages } from "../src/i18n";
import { createHandler } from "../src/handler";
import { join } from "node:path";

const handler = createHandler(join(import.meta.dir, "../public"));
describe("atlas routes", () => {
  test("localized routes preserve line and station", () => {
    for (const locale of ["fr", "en"] as const) {
      expect(parseRoute(routeUrl(locale))).toEqual({ locale, valid: true });
      expect(parseRoute(routeUrl(locale, "7", "les-gobelins"))).toEqual({
        locale,
        lineId: "7",
        stationId: "les-gobelins",
        valid: true,
      });
    }
    for (const path of [
      "/de",
      "/en/lines/9",
      "/fr/lines/7/extra",
      "/fr//lines/7",
      "//fr",
      "/en/lines/7/stations/Bad ID",
    ])
      expect(parseRoute(path).valid).toBe(false);
  });
  test("all station deep links serve the app in both languages", async () => {
    for (const line of lines)
      for (const station of line.stations)
        for (const locale of ["fr", "en"] as const) {
          const res = await handler(
            new Request(
              "http://localhost" + routeUrl(locale, line.id, station.id),
            ),
          );
          expect(res.status).toBe(200);
          expect(await res.text()).toContain(`lang="${locale}"`);
        }
  });
  test("unknown stations, lines and missing files remain 404", async () => {
    for (const path of [
      "/en/lines/7/stations/not-a-station",
      "/fr/lines/9",
      "/missing.js",
      "/missing/index.html",
    ]) {
      expect(
        (await handler(new Request("http://localhost" + path))).status,
      ).toBe(404);
    }
    expect((await handler(new Request("http://localhost/%zz"))).status).toBe(
      400,
    );
  });
  test("unknown localized pages render a recoverable 404, while missing assets do not", async () => {
    const page = await handler(new Request("http://localhost/en/lines/99"));
    expect(page.status).toBe(404);
    expect(await page.text()).toContain('id="app"');
    const asset = await handler(new Request("http://localhost/fr/missing.js"));
    expect(asset.status).toBe(404);
    expect(await asset.text()).not.toContain('id="app"');
  });
  test("encoded station links agree between server and browser routing", async () => {
    const path = "/fr/lines/7/stations/les%2Dgobelins";
    expect(parseRoute(path).stationId).toBe("les-gobelins");
    expect((await handler(new Request("http://localhost" + path))).status).toBe(
      200,
    );
    expect(parseRoute("/%zz").valid).toBe(false);
  });
  test("HEAD does not send page or health content", async () => {
    for (const path of ["/fr/lines/7", "/healthz"]) {
      const res = await handler(
        new Request("http://localhost" + path, { method: "HEAD" }),
      );
      expect(res.status).toBe(200);
      expect(await res.text()).toBe("");
    }
  });
});
describe("route graph and content", () => {
  test("all 110 entries have complete bilingual text, sources, and map points", () => {
    expect(lines.map((line) => line.id)).toEqual(["4", "5", "7", "14"]);
    expect(getLine("4")!.stations.length).toBe(29);
    expect(getLine("5")!.stations.length).toBe(22);
    expect(getLine("7")!.stations.length).toBe(38);
    expect(getLine("14")!.stations.length).toBe(21);
    for (const line of lines) {
      const ids = line.stations.map((s) => s.id);
      expect(new Set(ids).size).toBe(ids.length);
      const covered = new Set(line.paths.flat());
      expect([...covered].sort()).toEqual([...ids].sort());
      for (const path of line.paths)
        expect(new Set(path).size).toBe(path.length);
      expect(
        mapLayout(line)
          .points.map((p) => p.station.id)
          .sort(),
      ).toEqual([...ids].sort());
      for (const name of line.termini)
        expect(line.stations.some((s) => s.name === name)).toBe(true);
      for (const s of line.stations) {
        for (const locale of ["en", "fr"] as const) {
          expect(s.etymology[locale].length).toBeGreaterThan(50);
          expect(s.context[locale].length).toBeGreaterThan(50);
        }
        expect(s.sources.length).toBeGreaterThan(0);
        for (const source of s.sources)
          expect(new URL(source.url).protocol).toBe("https:");
      }
    }
  });
  test("river crossings join adjacent stations and termini end each path", () => {
    for (const line of lines) {
      for (const [a, b] of riverCrossings[line.id] || []) {
        expect(
          line.paths.some(
            (path) => path.indexOf(a) >= 0 && path[path.indexOf(a) + 1] === b,
          ),
        ).toBe(true);
      }
      for (const path of line.paths) {
        expect(neighbours(line, path[0]!).previous).toHaveLength(0);
        expect(neighbours(line, path.at(-1)!).next).toHaveLength(0);
      }
    }
  });
  test("displayed copy contains no em dashes", () => {
    expect(JSON.stringify(messages)).not.toContain("—");
    for (const line of lines) expect(JSON.stringify(line)).not.toContain("—");
  });
  test("Maison Blanche forks without connecting southern termini", () => {
    const line = getLine("7")!;
    expect(line.paths.map((p) => p.length)).toEqual([34, 33]);
    expect(
      neighbours(line, "maison-blanche")
        .next.map((s) => s.id)
        .sort(),
    ).toEqual(["le-kremlin-bicetre", "porte-ditalie"]);
    for (const id of ["mairie-divry", "villejuif-louis-aragon"])
      expect(neighbours(line, id).next).toHaveLength(0);
    for (const id of ["le-kremlin-bicetre", "porte-ditalie"])
      expect(neighbours(line, id).previous.map((s) => s.id)).toEqual([
        "maison-blanche",
      ]);
  });
  test("fork arrow keys follow the left and right branch positions", () => {
    const line = getLine("7")!;
    expect(mapNeighbour(line, "maison-blanche", "ArrowLeft")?.id).toBe(
      "le-kremlin-bicetre",
    );
    expect(mapNeighbour(line, "maison-blanche", "ArrowRight")?.id).toBe(
      "porte-ditalie",
    );
    expect(mapNeighbour(line, "maison-blanche", "ArrowUp")?.id).toBe("tolbiac");
    expect(mapNeighbour(line, "mairie-divry", "ArrowDown")).toBeUndefined();
  });
  test("search ignores accents, apostrophe styles and dashes", () => {
    expect(normalizeSearch("Châtelet")).toBe("chatelet");
    expect(normalizeSearch("Villejuif–Louis Aragon")).toBe(
      normalizeSearch("villejuif-louis aragon"),
    );
    expect(normalizeSearch("Porte d’Italie")).toBe(
      normalizeSearch("porte d'italie"),
    );
  });
});
