import { createKernel3x3, createKernel7x7 } from "./gaussian";

let input;
let canvas: HTMLCanvasElement;
let canvas_out: HTMLCanvasElement;


function init() {
  var kernel = createKernel3x3();
  console.log(kernel);

  var kernel2 = createKernel7x7();
  console.log(kernel2);
  input = get("input-img");
  canvas = get("canvas") as HTMLCanvasElement;
  canvas_out = get("canvas-out") as HTMLCanvasElement;

  input.addEventListener("change", (e: Event) => {
    let event = e.target as HTMLInputElement;

    if (event.files === null || event.files.length < 0 || !event.files[0]) {
      return;
    }

    let file = event.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {

      var img = new Image();
      img.src = (e.target?.result as string);

      img.onload = () => {
        drawImage(img, canvas);
        processImg(canvas, canvas_out);
      }
    }

    reader.readAsDataURL(file);
  });

}

function processImg(canvasIn: HTMLCanvasElement, canvasOut: HTMLCanvasElement) {
  let ctxIn = canvasIn.getContext("2d");
  let ctxOut = canvasOut.getContext("2d");
  let w = canvasIn.width;
  let h = canvasIn.height;

  canvasOut.width = w;
  canvasOut.height = h;

  let imgData = ctxIn?.getImageData(0, 0, w, h);
  let outImgData = ctxOut?.createImageData(w, h);

  if (imgData === undefined || imgData === null) {
    throw new Error("cant create image data");
  }

  if (outImgData === undefined || outImgData === null) {
    throw new Error("cant create image data");
  }

  let dataIn = imgData.data;
  let dataOut = outImgData.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let pixel_pos = (y * w + x) * 4;
      dataOut[pixel_pos] = dataIn[pixel_pos] || 0;
      dataOut[pixel_pos + 1] = dataIn[pixel_pos + 1] || 0;
      dataOut[pixel_pos + 2] = dataIn[pixel_pos + 2] || 0;
      dataOut[pixel_pos + 3] = dataIn[pixel_pos + 3] || 0;
    }
  }

  ctxOut?.putImageData(outImgData, 0, 0);
}

function drawImage(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  let ctx = canvas.getContext("2d");

  canvas.width = img.width;
  canvas.height = img.height;

  ctx?.drawImage(img, 0, 0);
}

function get(id: string): HTMLElement {
  var elemtn = document.getElementById(id);

  if (elemtn === null)
    throw new Error("cant find element " + id);

  return elemtn;
}


window.onload = init;
