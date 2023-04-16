import { CanvasCoordinates } from '../../../globalInterfaces';

export function markerDraw(
  start: CanvasCoordinates | null,
  end: CanvasCoordinates,
  ctx: CanvasRenderingContext2D,
  color: string,
  width: number
) {
  start = start ?? end;
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(start.x, start.y, width / 2, 0, 2 * Math.PI);
  ctx.fill();
}
