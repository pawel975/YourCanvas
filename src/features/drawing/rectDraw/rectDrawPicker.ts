import { RectDrawType } from './types';
import { rectDraw } from './rectDraw';
import { CanvasCoordinates } from '../../../globalInterfaces';

export function rectDrawPicker(
  drawType: RectDrawType,
  startPoint: CanvasCoordinates,
  endPoint: CanvasCoordinates,
  ctx: CanvasRenderingContext2D,
  color: string,
  width: number
) {
  switch (drawType) {
    case 'fromCorners': {
      rectDraw(startPoint, endPoint, ctx, color, width);
      break;
    }
    case 'fromCenter': {
      //TODO: Implement fromCenter draw function
      break;
    }
    default:
      return;
  }
}
