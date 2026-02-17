export function createKernel3x3(): number[][] {
  let dev = 0.5;
  let res = [];

  for (let y = -1; y <= 1; y++) {
    let row = [];

    for (let x = -1; x <= 1; x++) {
      row.push(G(x, y, dev));
    }

    res.push(row);
  }

  return res;
}

export function createKernel7x7(){
   let dev = 1;
  let res = [];

  for (let y = -3; y <= 3; y++) {
    let row = [];

    for (let x = -3; x <= 3; x++) {
      row.push(G(x, y, dev));
    }

    res.push(row);
  }

  return res;
}

function G(x: number, y: number, standard_dev: number) {
  let sigma_squared = standard_dev * standard_dev;
  let c = 1 / (2 * Math.PI * sigma_squared);
  let exp = -1 * (x * x + y * y) / (2 * sigma_squared);
  return c * Math.exp(exp);
}
