import { FreeDrawType } from './types';
import { freeDraw } from './freeDraw';
import { CanvasCoordinates } from '../../../globalInterfaces';

export function freeDrawPicker(
  drawType: FreeDrawType,
  prevPoint: CanvasCoordinates | null,
  point: CanvasCoordinates,
  ctx: CanvasRenderingContext2D,
  color: string,
  width: number
) {
  switch (drawType) {
    case 'marker': {
      freeDraw(prevPoint, point, ctx, color, width);
      break;
    }
    case 'spray': {
      //TODO: Implement spray fraw function
      break;
    }
    default:
      return;
  }
}
