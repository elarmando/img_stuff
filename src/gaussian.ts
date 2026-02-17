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

export function createKernel7x7() {
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

export function gaussian_filter(imgDataIn: ImageData, imgDataOut: ImageData) {
  if (imgDataIn.width != imgDataOut.width || imgDataIn.height != imgDataOut.height)
    throw new Error("images are not the same size");

  let kernel = createKernel3x3();
  let w = imgDataIn.width;
  let h = imgDataIn.height;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {

    }
  }
}

function apply_kernel(imgData: ImageData, x: number, y: number, kernel: number[][]): number[] {
  let w = imgData.width, h = imgData.height;
  let offsetx = Math.floor(kernel.length / 2);
  let offsety = Math.floor(kernel[0].length / 2);


  let result = [0, 0, 0, 0]; //rgba pixel values

  for (let j = 0; j < kernel.length; j++) {
    for (let i = 0; i < kernel[0].length; i++) {
      let dx = x - offsetx + i;
      let dy = y - offsety + j;

    }
  }

  return result;
}

function isValid(x: number, y: number) {

}



