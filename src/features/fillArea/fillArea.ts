import { CanvasCoordinates } from '../../globalInterfaces';

export function fillArea(canvas: HTMLCanvasElement, color: string, point: CanvasCoordinates) {
  const ctx = canvas.getContext('2d');

  // TODO: Fill only color area that is limited by other colors
  if (ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = new Uint32Array(imageData.data.buffer);
    const clickedPixelColor = data[point.y * imageData.width + point.x];

    for (let pixelIndex = 0; pixelIndex < data.length; pixelIndex++) {
      if (data[pixelIndex] === clickedPixelColor) {
        const pixelY = Math.floor(pixelIndex / imageData.width);
        const pixelX = pixelIndex % imageData.width;

        ctx.fillStyle = color;
        ctx.fillRect(pixelX, pixelY, 1, 1);
      }
    }
  }
}
