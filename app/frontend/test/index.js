function countWays(n, cache = []) {
  if (n < 0) {
    return 0;
  }
  if (!cache[n]) {
    if (n === 0) {
      return (cache[n] = 1);
    } else {
      cache[n] = countWays(n - 1, cache) + countWays(n - 2, cache) + countWays(n - 3, cache);
    }
  }

  return cache[n];
}

console.log("countWays(3) =>", countWays(3));
console.log("countWays(12) =>", countWays(12));
