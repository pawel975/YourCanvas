import ERRORS from '../../data/errors';
import { CanvasCoordinates, Eventhandlers } from '../../globalInterfaces';
import computePointInCanvas from '../utils/computePointInCanvas';
import { eraser } from './eraser';

export default function getErasserHandlers(
  rubberSize: number,
  canvas: HTMLCanvasElement
): Eventhandlers {
  let isErasing: boolean = false;

  let prevPoint: CanvasCoordinates | null = null;

  const mouseDownHandler = () => {
    isErasing = true;
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    try {
      if (isErasing) {
        const point = computePointInCanvas(canvas, e.clientX, e.clientY);
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          const error = new Error('Invalid canvas context');
          error.name = ERRORS.INVALID_CONTEXT;
          throw error;
        }

        eraser(prevPoint, point, ctx, rubberSize);
        prevPoint = point;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mouseUpHandler = () => {
    isErasing = false;
    prevPoint = null;
  };

  return {
    mouseDownHandler: mouseDownHandler,
    mouseMoveHandler: mouseMoveHandler,
    mouseUpHandler: mouseUpHandler,
  };
}
