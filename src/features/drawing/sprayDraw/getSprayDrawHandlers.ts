import ERRORS from '../../../data/errors';
import { Eventhandlers } from '../../../globalInterfaces';
import computePointInCanvas from '../utils/computePointInCanvas';
import { sprayDraw } from './sprayDraw';

export default function getMarkerDrawHandlers(
  color: string,
  drawWidth: number,
  canvas: HTMLCanvasElement
): Eventhandlers {
  let isDrawing: boolean = false;

  const mouseDownHandler = () => {
    isDrawing = true;
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    try {
      if (isDrawing) {
        const point = computePointInCanvas(canvas, e.clientX, e.clientY);
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          const error = new Error('Invalid canvas context');
          error.name = ERRORS.INVALID_CONTEXT;
          throw error;
        }

        sprayDraw(point, ctx, color, drawWidth);
      }
    } catch (error) {
      console.error(error);
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
