import { CanvasCoordinates } from '../../globalInterfaces';

export function fillArea(
  canvas: HTMLCanvasElement,
  color: string,
  point: CanvasCoordinates | null
) {
  // TODO: Creat fillArea tool, steps:
  // 1) Capture clicked pixel
  // 2) Capture all surrounding pixels that has the same color
  // 3) Change color on picked one
  console.log(point, 'captured pixel');
  console.log(canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height));
}
