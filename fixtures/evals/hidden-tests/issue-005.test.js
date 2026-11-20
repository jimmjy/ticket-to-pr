import { test } from "node:test";
import assert from "node:assert/strict";
import { isPalindrome } from "../src/strings.js";
test("hidden: isPalindrome ignores case and punctuation", () => {
  assert.equal(isPalindrome("A man, a plan, a canal: Panama"), true);
  assert.equal(isPalindrome("No lemon, no melon"), true);
  assert.equal(isPalindrome("hello"), false);
});
