import { test } from "node:test";
import assert from "node:assert/strict";
import { truncate } from "../src/strings.js";
test("hidden: truncate", () => {
  assert.equal(truncate("Hello world", 8), "Hello...");
  assert.equal(truncate("short", 10), "short");
  assert.equal(truncate("exactly8", 8), "exactly8");
});
