// Turn a title into a URL-friendly slug.
export function slugify(str) {
  return str.toLowerCase().replace(/ /g, "-");
}

// True if the string reads the same forwards and backwards.
export function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}

// Uppercase the first letter of every word.
export function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
