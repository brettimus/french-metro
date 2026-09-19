import type { MetroLine, Station } from "./data/types";
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
  return { points, height: Math.max(...points.map((p) => p.y)) + 95, paths };
}
