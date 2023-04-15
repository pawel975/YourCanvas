import { freeDrawPicker } from './freeDrawPicker';
import { FreeDrawType } from './types';
import { CanvasCoordinates } from '../../../globalInterfaces';
import computePointInCanvas from '../utils/computePointInCanvas';

export default function getFreeDrawHandlers(
  drawType: FreeDrawType,
  color: string,
  drawWidth: number,
  canvas: HTMLCanvasElement
): {
  mouseDownHandler: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  mouseMoveHandler: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  mouseUpHandler: (e: React.MouseEvent<HTMLCanvasElement>) => void;
} {
  let isDrawing: boolean = false;

  let prevPoint: CanvasCoordinates | null = null;

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      const point = computePointInCanvas(canvas, e.clientX, e.clientY);
      const ctx = canvas.getContext('2d');

      if (ctx) {
        freeDrawPicker(drawType, prevPoint, point, ctx, color, drawWidth);
      } else {
        console.error('Invalid canvas context');
      }

      prevPoint = point;
    }
  };

  const mouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing = true;
  };

  const mouseUpHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing = false;
    prevPoint = null;
  };

  return {
    mouseDownHandler: mouseDownHandler,
    mouseMoveHandler: mouseMoveHandler,
    mouseUpHandler: mouseUpHandler,
  };
}
