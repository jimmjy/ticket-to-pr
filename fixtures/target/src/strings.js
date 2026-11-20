// Turn a title into a URL-friendly slug.
export function slugify(str) {
  return str.toLowerCase().replace(/ /g, "-");
}

// True if the string reads the same forwards and backwards.
export function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}
