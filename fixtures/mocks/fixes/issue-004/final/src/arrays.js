// Add up a list of numbers.
export function sum(nums) {
  return nums.reduce((total, n) => total + n);
}

// Remove duplicate values, keeping the first occurrence.
export function unique(arr) {
  return [...new Set(arr)];
}

// Split an array into groups of `size`. The last group may be smaller.
export function chunk(arr, size) {
  if (size < 1) throw new RangeError("size must be at least 1");
  const groups = [];
  for (let i = 0; i < arr.length; i += size) {
    groups.push(arr.slice(i, i + size));
  }
  return groups;
}
