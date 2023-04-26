import { CanvasCoordinates } from '../../globalInterfaces';

export function eraser(
  start: CanvasCoordinates | null,
  ctx: CanvasRenderingContext2D,
  rubberSize: number
) {
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.rect(start!.x, start!.y, rubberSize, rubberSize);
  ctx.fill();
}
