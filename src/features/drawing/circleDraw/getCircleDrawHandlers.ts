import ERRORS from '../../../data/errors';
import { CanvasCoordinates, Eventhandlers } from '../../../globalInterfaces';
import computePointInCanvas from '../../utils/computePointInCanvas';
import { circleDraw } from './circleDraw';

export default function getCircleDrawHandlers(
  color: string,
  thickness: number,
  canvas: HTMLCanvasElement
): Eventhandlers {
  let isDrawing: boolean = false;

  let startPoint: CanvasCoordinates = { x: 0, y: 0 };
  let endPoint: CanvasCoordinates = { x: 0, y: 0 };
  let snapshot: ImageData | undefined = undefined;

  const ctx = canvas.getContext('2d');

  const mouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing = true;
    startPoint = computePointInCanvas(canvas, e.clientX, e.clientY);

    if (!ctx) {
      const error = new Error('Invalid canvas context');
      error.name = ERRORS.INVALID_CONTEXT;
      throw error;
    }

    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      endPoint = computePointInCanvas(canvas, e.clientX, e.clientY);

      if (!ctx) {
        const error = new Error('Invalid canvas context');
        error.name = ERRORS.INVALID_CONTEXT;
        throw error;
      }

      if (!snapshot) {
        const error = new Error('Invalid snapshot - snapshot should contain Image Data');
        error.name = ERRORS.INVALID_SNAPSHOT;
        throw error;
      }

      ctx.putImageData(snapshot, 0, 0);
      circleDraw(startPoint, endPoint, ctx, color, thickness);
    }
  };

  const mouseUpHandler = () => {
    isDrawing = false;

    if (!ctx) {
      const error = new Error('Invalid canvas context');
      error.name = ERRORS.INVALID_CONTEXT;
      throw error;
    }

    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  };

  return {
    mouseDownHandler: mouseDownHandler,
    mouseMoveHandler: mouseMoveHandler,
    mouseUpHandler: mouseUpHandler,
  };
}
