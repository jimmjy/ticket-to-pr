import { test } from "node:test";
import assert from "node:assert/strict";
import { capitalizeWords } from "../src/strings.js";
test("hidden: capitalizeWords", () => {
  assert.equal(capitalizeWords("hello big world"), "Hello Big World");
  assert.equal(capitalizeWords("iPhone app"), "IPhone App");
});
