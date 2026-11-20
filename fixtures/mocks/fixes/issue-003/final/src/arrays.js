// Add up a list of numbers.
export function sum(nums) {
  return nums.reduce((total, n) => total + n, 0);
}

// Remove duplicate values, keeping the first occurrence.
export function unique(arr) {
  return [...new Set(arr)];
}
