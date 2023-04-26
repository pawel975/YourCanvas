import ERRORS from '../../data/errors';
import { Eventhandlers } from '../../globalInterfaces';
import computePointInCanvas from '../utils/computePointInCanvas';
import { eraser } from './eraser';

export default function getErasserHandlers(
  rubberSize: number,
  canvas: HTMLCanvasElement
): Eventhandlers {
  let isErasing: boolean = false;

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

        eraser(point, ctx, rubberSize);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mouseUpHandler = () => {
    isErasing = false;
  };

  return {
    mouseDownHandler: mouseDownHandler,
    mouseMoveHandler: mouseMoveHandler,
    mouseUpHandler: mouseUpHandler,
  };
}
