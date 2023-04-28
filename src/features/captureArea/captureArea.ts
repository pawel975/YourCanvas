import { CanvasCoordinates } from '../../globalInterfaces';

export function captureArea(
  start: CanvasCoordinates | null,
  end: CanvasCoordinates,
  ctx: CanvasRenderingContext2D
) {
  start = start ?? end;
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
  ctx.stroke();

  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(start.x, start.y, 3, 0, 2 * Math.PI);
  ctx.fill();
}
