import { CanvasCoordinates } from '../../globalInterfaces';

export function eraser(
  start: CanvasCoordinates | null,
  end: CanvasCoordinates,
  ctx: CanvasRenderingContext2D,
  rubberSize: number
) {
  start = start ?? end;
  ctx.beginPath();
  ctx.lineWidth = rubberSize;
  ctx.strokeStyle = '#FFFFFF';
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.rect(start.x, start.y, rubberSize, rubberSize);
  ctx.fill();
}
