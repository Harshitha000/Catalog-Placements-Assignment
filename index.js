const fs = require("fs");

function decodeYValue(base, value) {
  return parseInt(value, base);
}

function lagrangeInterpolation(points) {
  let secret = 0;
  for (let i = 0; i < points.length; i++) {
    const [x_i, y_i] = points[i];
    let li = 1;
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        const [x_j] = points[j];
        li *= (0 - x_j) / (x_i - x_j);
      }
    }
    secret += y_i * li;
  }
  return secret;
}

function solvePolynomial(inputFile) {
  const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));
  const n = data.keys.n;
  const k = data.keys.k;
  const points = [];
  for (let key in data) {
    if (key === "keys") continue;
    const x = parseInt(key);
    const base = parseInt(data[key].base);
    const value = data[key].value;
    const y = decodeYValue(base, value);
    points.push([x, y]);
  }

  const requiredPoints = points.slice(0, k);
  const secret = lagrangeInterpolation(requiredPoints);
  console.log(`The value of const term c is: ${secret}`);
}

solvePolynomial("./testcase1.json");
solvePolynomial("./testcase2.json");
