import { DrawType } from '../types';
import { freeDraw } from './freeDraw';
import { canvasCoordinates } from './interfaces';

export function drawPicker(
  drawType: DrawType,
  prevPointRef: canvasCoordinates,
  point: canvasCoordinates,
  ctx: CanvasRenderingContext2D,
  color: string,
  width: number
) {
  switch (drawType) {
    case 'freeDraw': {
      freeDraw(prevPointRef, point, ctx, color, width);
      break;
    }
    // case 'rectangel': {
    //   rectDraw(prevPointRef, point, ctx, color, width);
    //   break;
    // }
    default:
      return;
  }
}
