import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify, isPalindrome } from "../src/strings.js";

test("slugify lowercases and joins words with dashes", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});

test("isPalindrome detects a simple palindrome", () => {
  assert.equal(isPalindrome("racecar"), true);
  assert.equal(isPalindrome("hello"), false);
});

test("slugify strips punctuation and collapses spaces", () => {
  assert.equal(slugify("Hello,  World!"), "hello-world");
});
