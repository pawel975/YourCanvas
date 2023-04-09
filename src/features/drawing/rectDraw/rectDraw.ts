import { CanvasCoordinates } from '../../../globalInterfaces';

export function rectDraw(
  start: CanvasCoordinates,
  end: CanvasCoordinates,
  ctx: CanvasRenderingContext2D,
  color: string,
  width: number
) {
  start = start ?? end;
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.rect(start.x, start.y, end.x - start.x, end.y - start.y);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(start.x, start.y, width / 2, 0, 2 * Math.PI);
  ctx.fill();
}
