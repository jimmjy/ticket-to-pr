import { test } from "node:test";
import assert from "node:assert/strict";
import { sum } from "../src/arrays.js";
test("hidden: sum of empty array is 0", () => {
  assert.equal(sum([]), 0);
  assert.equal(sum([5]), 5);
  assert.equal(sum([1, 2, 3]), 6);
});
