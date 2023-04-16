import { CanvasCoordinates } from '../../../globalInterfaces';
import computePointInCanvas from '../utils/computePointInCanvas';
import { rectDraw } from './rectDraw';

export default function getRectDrawHandlers(
  color: string,
  drawWidth: number,
  canvas: HTMLCanvasElement
): {
  mouseDownHandler: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  mouseMoveHandler: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  mouseUpHandler: (e: React.MouseEvent<HTMLCanvasElement>) => void;
} {
  let isDrawing = false;

  let startPoint: CanvasCoordinates = { x: 0, y: 0 };
  let endPoint: CanvasCoordinates = { x: 0, y: 0 };
  let snapshot: ImageData | undefined = undefined;

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      endPoint = computePointInCanvas(canvas, e.clientX, e.clientY);
      const ctx = canvas.getContext('2d');

      if (ctx && snapshot) {
        ctx.putImageData(snapshot, 0, 0);
        rectDraw(startPoint, endPoint, ctx, color, drawWidth);
      } else {
        console.error('Invalid canvas context or snapshot');
      }
    }
  };

  const mouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing = true;
    startPoint = computePointInCanvas(canvas, e.clientX, e.clientY);
    const ctx = canvas.getContext('2d');

    if (ctx && canvas) {
      snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } else {
      console.error('Invalid canvas context or canvas canvas');
    }
  };

  const mouseUpHandler = () => {
    isDrawing = false;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  };

  return {
    mouseDownHandler: mouseDownHandler,
    mouseMoveHandler: mouseMoveHandler,
    mouseUpHandler: mouseUpHandler,
  };
}
