// Turn a title into a URL-friendly slug.
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// True if the string reads the same forwards and backwards.
export function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}
