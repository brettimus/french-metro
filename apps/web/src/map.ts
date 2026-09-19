import { neighbours } from "./routing";
import type { LineId, MetroLine, Station } from "./data/types";
// River crossings follow adjacent station pairs, not decorative map geography.
export const riverCrossings: Partial<
  Record<LineId, readonly (readonly [string, string])[]>
> = {
  "4": [
    ["chatelet", "cite"],
    ["cite", "saint-michel"],
  ],
  "5": [["quai-de-la-rapee", "gare-dausterlitz"]],
  "7": [["sully-morland", "jussieu"]],
  "14": [["cour-saint-emilion", "bibliotheque-francois-mitterrand"]],
};
export interface Point {
  station: Station;
  x: number;
  y: number;
  branch: boolean;
  left: boolean;
}
export function mapLayout(line: MetroLine): {
  points: Point[];
  height: number;
  paths: string[];
  rivers: number[];
} {
  const trunk = line.stations.filter((s) => !s.branch || s.branch === "trunk");
  const points: Point[] = trunk.map((station, i) => ({
    station,
    x: 395 + Math.sin(i * 0.31) * 82,
    y: 58 + i * 51,
    branch: false,
    left: 395 + Math.sin(i * 0.31) * 82 > 448,
  }));
  const last = points.at(-1)!;
  const branched = line.paths.length > 1;
  if (branched) {
    for (const [branch, x] of [
      ["ivry", 590],
      ["villejuif", 210],
    ] as const) {
      line.stations
        .filter((s) => s.branch === branch)
        .forEach((station, i) =>
          points.push({
            station,
            x,
            y: last.y + 100 + i * 82,
            branch: true,
            left: false,
          }),
        );
    }
  }
  const lookup = new Map(points.map((p) => [p.station.id, p]));
  const paths = line.paths.map((path) =>
    path
      .map((id, i) => {
        const p = lookup.get(id)!;
        return `${i ? "L" : "M"}${p.x} ${p.y}`;
      })
      .join(" "),
  );
  const rivers = (riverCrossings[line.id] || []).flatMap(([a, b]) => {
    const from = lookup.get(a),
      to = lookup.get(b);
    return from && to ? [(from.y + to.y) / 2] : [];
  });
  return {
    points,
    height: Math.max(...points.map((p) => p.y)) + 95,
    paths,
    rivers,
  };
}

/** At a fork, horizontal arrows follow the branch's visible side. */
export function mapNeighbour(
  line: MetroLine,
  id: string,
  key: string,
): Station | undefined {
  const { previous, next } = neighbours(line, id);
  if (next.length > 1 && (key === "ArrowLeft" || key === "ArrowRight")) {
    const positions = new Map(
      mapLayout(line).points.map((point) => [point.station.id, point.x]),
    );
    const branches = [...next].sort(
      (a, b) => positions.get(a.id)! - positions.get(b.id)!,
    );
    return key === "ArrowLeft" ? branches[0] : branches.at(-1);
  }
  return key === "ArrowUp" || key === "ArrowLeft" ? previous[0] : next[0];
}
