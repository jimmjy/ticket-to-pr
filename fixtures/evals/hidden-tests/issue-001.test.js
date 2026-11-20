import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify } from "../src/strings.js";
test("hidden: slugify handles punctuation and spacing", () => {
  assert.equal(slugify("Hello,  World!"), "hello-world");
  assert.equal(slugify("  Tips & Tricks -- 2026 "), "tips-tricks-2026");
  assert.equal(slugify("already-a-slug"), "already-a-slug");
});
