import { CanvasCoordinates } from '../../globalInterfaces';

export default function computePointInCanvas(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number
): CanvasCoordinates {
  if (canvas) {
    const boundingRect = canvas.getBoundingClientRect();
    return {
      x: Number(String((clientX - boundingRect.left).toFixed(0))),
      y: Number(String((clientY - boundingRect.top).toFixed(0))),
    };
  } else {
    console.error('Point reference to window, canvas ref is null');
    return {
      x: clientX,
      y: clientY,
    };
  }
}
