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

  let kernel = createKernel7x7();
  let w = imgDataIn.width;
  let h = imgDataIn.height;
  let data_out = imgDataOut.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {

      let pos = (y * w + x) * 4;
      let new_values = apply_kernel(imgDataIn, x, y, kernel)

      data_out[pos] = new_values[0];
      data_out[pos + 1] = new_values[1];
      data_out[pos + 2] = new_values[2];
      data_out[pos + 3] = new_values[3];
    }
  }
}

function apply_kernel(imgData: ImageData, x: number, y: number, kernel: number[][]): number[] {
  let data = imgData.data;
  let w = imgData.width, h = imgData.height;
  let offsety = Math.floor(kernel.length / 2);
  let offsetx = Math.floor(kernel[0].length / 2);
  let ix = x - offsetx;
  let ex = ix + kernel[0].length - 1;
  let iy = y - offsety;
  let ey = iy + kernel.length - 1;

  let can_apply_kernel = is_in_bounds(ix, iy, w, h) && is_in_bounds(ex, ey, w, h);

  if (!can_apply_kernel) { //kernel goes outside the image, keep the same color in pixel
    let pos = (y * w + x) * 4;
    return [data[pos], data[pos + 1], data[pos + 2], data[pos + 3]];
  }

  let result = [0, 0, 0, 0]; //rgba pixel values

  for (let j = 0; j < kernel.length; j++) {
    for (let i = 0; i < kernel[0].length; i++) {
      let dx = x - offsetx + i;
      let dy = y - offsety + j;
      let p = (dy * w + dx) * 4;

      result[0] = result[0] + data[p] * kernel[j][i];
      result[1] = result[1] + data[p + 1] * kernel[j][i];
      result[2] = result[2] + data[p + 2] * kernel[j][i];
      result[3] = result[3] + data[p + 3] * kernel[j][i];
    }
  }

  return result;
}

function is_in_bounds(x: number, y: number, width: number, height: number) {
  return x >= 0 && x < width && y >= 0 && y < height;
}



