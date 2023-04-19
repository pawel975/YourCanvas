import computePointInCanvas from '../utils/computePointInCanvas';
import { sprayDraw } from './sprayDraw';

export default function getMarkerDrawHandlers(
  color: string,
  drawWidth: number,
  canvas: HTMLCanvasElement
): {
  mouseDownHandler: () => void;
  mouseMoveHandler: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  mouseUpHandler: () => void;
} {
  let isDrawing: boolean = false;

  const mouseDownHandler = () => {
    isDrawing = true;
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      const point = computePointInCanvas(canvas, e.clientX, e.clientY);
      const ctx = canvas.getContext('2d');

      if (ctx) {
        sprayDraw(point, ctx, color, drawWidth);
      } else {
        console.error('Invalid canvas context');
      }
    }
  };

  const mouseUpHandler = () => {
    isDrawing = false;
  };

  return {
    mouseDownHandler: mouseDownHandler,
    mouseMoveHandler: mouseMoveHandler,
    mouseUpHandler: mouseUpHandler,
  };
}
