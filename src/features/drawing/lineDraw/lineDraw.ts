import { CanvasCoordinates } from '../../../globalInterfaces';

export function lineDraw(
  start: CanvasCoordinates,
  end: CanvasCoordinates,
  ctx: CanvasRenderingContext2D,
  color: string,
  width: number
) {
  start = start ?? end;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.stroke();
}
