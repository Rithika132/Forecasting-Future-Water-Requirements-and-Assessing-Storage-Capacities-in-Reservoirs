// engine.js
// Simple forecasting engine using linear regression on historical water usage data.

/**
 * Fit a straight line (y = m*x + b) to the given points using least squares.
 * @param {number[]} y - array of usage values, evenly spaced in time
 * @returns {{m:number,b:number}} slope and intercept
 */
function linearRegression(y) {
  const n = y.length;
  const x = y.map((_, i) => i);
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
  const sumXX = x.reduce((acc, xi) => acc + xi * xi, 0);

  const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const b = (sumY - m * sumX) / n;
  return { m, b };
}

/**
 * Forecast the next `periods` values after the given historical records.
 * @param {Array<{date:string, usage:number}>} records
 * @param {number} periods - how many future points to predict
 * @returns {Array<{date:string, usage:number}>}
 */
function forecast(records, periods = 4) {
  const values = records.map(r => r.usage);
  const { m, b } = linearRegression(values);

  const lastDate = new Date(records[records.length - 1].date);
  const results = [];

  for (let i = 1; i <= periods; i++) {
    const predictedIndex = values.length - 1 + i;
    const predictedUsage = Math.round((m * predictedIndex + b) * 100) / 100;

    const futureDate = new Date(lastDate);
    futureDate.setDate(futureDate.getDate() + 7 * i); // weekly steps, matching sample data
    const isoDate = futureDate.toISOString().slice(0, 10);

    results.push({ date: isoDate, usage: predictedUsage });
  }

  return results;
}

module.exports = { linearRegression, forecast };