import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import { lines } from "../src/data/lines";

const publicDir = join(import.meta.dir, "../public");
const exists = (path: string) => Bun.file(join(publicDir, path)).exists();

describe("public assets", () => {
  test.each(lines.map((line) => [line.id, line.image]))(
    "line %s illustration %s exists",
    async (_id, image) => {
      expect(await exists(image)).toBe(true);
    },
  );

  test.each(["/illustrations/metropolitain.webp", "/favicon.svg"])(
    "%s exists",
    async (path) => {
      expect(await exists(path)).toBe(true);
    },
  );
});
