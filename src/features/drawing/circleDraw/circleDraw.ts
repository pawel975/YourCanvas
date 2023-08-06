import { CanvasCoordinates } from '../../../globalInterfaces';

export function circleDraw(
  start: CanvasCoordinates | null,
  end: CanvasCoordinates,
  ctx: CanvasRenderingContext2D,
  color: string,
  thickness: number
) {
  if (start) {
    const circleRadius = Math.sqrt(
      Math.pow(Math.abs(start.x - end.x), 2) + Math.pow(Math.abs(start.y - end.y), 2)
    );
    //   start = start ?? end;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.arc(start.x, start.y, circleRadius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
