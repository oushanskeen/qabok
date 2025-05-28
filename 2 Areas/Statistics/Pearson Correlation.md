https://www.youtube.com/watch?v=k7IctLRiZmo

```js
function pearsonCorrelation(x, y) {
  if (x.length !== y.length) throw new Error("Arrays must be the same length.");

  const n = x.length;
  const avgX = x.reduce((a, b) => a + b) / n;
  const avgY = y.reduce((a, b) => a + b) / n;

  let numerator = 0;
  let denomX = 0;
  let denomY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - avgX;
    const dy = y[i] - avgY;
    numerator += dx * dy;
    denomX += dx * dx;
    denomY += dy * dy;
  }

  return numerator / Math.sqrt(denomX * denomY);
}

// Example usage:
const x = [1, 2, 3, 4, 5];
const y = [2, 4, 6, 8, 10];

console.log("Pearson:", pearsonCorrelation(x, y)); // Output: ~1

```