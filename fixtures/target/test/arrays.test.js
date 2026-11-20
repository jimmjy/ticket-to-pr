import { test } from "node:test";
import assert from "node:assert/strict";
import { sum, unique } from "../src/arrays.js";

test("sum adds numbers", () => {
  assert.equal(sum([1, 2, 3]), 6);
});

test("unique removes duplicates", () => {
  assert.deepEqual(unique([1, 1, 2, 3, 3]), [1, 2, 3]);
});
