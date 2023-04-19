import { CanvasCoordinates } from '../../../globalInterfaces';

export function sprayDraw(
  point: CanvasCoordinates,
  ctx: CanvasRenderingContext2D,
  color: string,
  width: number
) {
  function getRandomOffset(radius: number) {
    const randomAngle = Math.random() * (2 * Math.PI); // get angle in radians
    const randomRadius = Math.random() * radius;
    return {
      x: Math.cos(randomAngle) * randomRadius, // Math.cos(angle) generates value between -1 and 1
      y: Math.sin(randomAngle) * randomRadius, // Math.sin(angle) generates value between -1 and 1
    };
  }

  const generateSprayPoints = () => {
    const amountOfPoints = width ** 2 / 4;
    for (let i = 0; i < amountOfPoints; i++) {
      const offset = getRandomOffset(width / 2);
      const x = point.x + offset.x;
      const y = point.y + offset.y;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  };

  generateSprayPoints();
}
