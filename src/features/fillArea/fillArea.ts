import { CanvasCoordinates } from '../../globalInterfaces';

export function fillArea(canvas: HTMLCanvasElement, color: string, point: CanvasCoordinates) {
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Transform imageData data to array of pixel parts arrays [red, green, blue, opacity]
    let imageDataPixels: Array<Array<number>> = [];

    for (let i = 0; i < imageData.data.length; i += 4) {
      const red = imageData.data[i];
      const green = imageData.data[i + 1];
      const blue = imageData.data[i + 2];
      const opacity = imageData.data[i + 3];

      imageDataPixels.push([red, green, blue, opacity]);
    }

    // Capture color of clicked pixel
    const pixelPosition = imageData.width * point.y + point.x;
    const clickedPointRGBA = imageDataPixels[pixelPosition];

    // TODO: Change so it's in boundries of element that is clicked in canvas
    // Color every pixel that has the same color as clicked one
    imageDataPixels.forEach((pixelRGBA, pixelIndex) => {
      if (JSON.stringify(pixelRGBA) === JSON.stringify(clickedPointRGBA)) {
        const pixelY = Math.trunc(pixelIndex / imageData.width);
        const pixelX = pixelIndex - imageData.width * pixelY;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.fillRect(pixelX, pixelY, 1, 1);
        ctx.fill();
      }
    });
  }
}
