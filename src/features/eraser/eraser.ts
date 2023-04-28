import { CanvasCoordinates } from '../../globalInterfaces';

export function eraser(
  start: CanvasCoordinates | null,
  ctx: CanvasRenderingContext2D,
  rubberSize: number
) {
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.rect(start!.x - rubberSize / 2, start!.y - rubberSize / 2, rubberSize, rubberSize);
  ctx.fill();
}
