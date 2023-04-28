import { CanvasCoordinates } from '../../globalInterfaces';

export function captureArea(
  start: CanvasCoordinates | null,
  end: CanvasCoordinates,
  ctx: CanvasRenderingContext2D
) {
  const WIDTH = 1;
  const COLOR = '#000000';
  const DASH_SIZE = [3];

  start = start ?? end;
  ctx.beginPath();
  ctx.lineWidth = WIDTH;
  ctx.strokeStyle = COLOR;
  ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
  ctx.stroke();
  ctx.setLineDash(DASH_SIZE);

  ctx.fillStyle = COLOR;
  ctx.beginPath();
  ctx.arc(start.x, start.y, WIDTH, 0, 2 * Math.PI);
  ctx.fill();
}
