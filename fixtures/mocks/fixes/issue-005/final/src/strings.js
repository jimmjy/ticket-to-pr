// Turn a title into a URL-friendly slug.
export function slugify(str) {
  return str.toLowerCase().replace(/ /g, "-");
}

// True if the string reads the same forwards and backwards,
// ignoring letter case and anything that is not a letter or number.
export function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === clean.split("").reverse().join("");
}
