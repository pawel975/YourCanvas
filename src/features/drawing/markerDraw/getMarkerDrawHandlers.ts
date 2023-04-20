import ERRORS from '../../../data/errors';
import { CanvasCoordinates, Eventhandlers } from '../../../globalInterfaces';
import computePointInCanvas from '../utils/computePointInCanvas';
import { markerDraw } from './markerDraw';

export default function getMarkerDrawHandlers(
  color: string,
  drawWidth: number,
  canvas: HTMLCanvasElement
): Eventhandlers {
  let isDrawing: boolean = false;

  let prevPoint: CanvasCoordinates | null = null;

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

        markerDraw(prevPoint, point, ctx, color, drawWidth);
        prevPoint = point;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mouseUpHandler = () => {
    isDrawing = false;
    prevPoint = null;
  };

  return {
    mouseDownHandler: mouseDownHandler,
    mouseMoveHandler: mouseMoveHandler,
    mouseUpHandler: mouseUpHandler,
  };
}
