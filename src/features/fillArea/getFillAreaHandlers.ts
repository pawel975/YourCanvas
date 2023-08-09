import ERRORS from '../../data/errors';
import { Eventhandlers } from '../../globalInterfaces';
import computePointInCanvas from '../utils/computePointInCanvas';
import { fillArea } from './fillArea';

export default function getFillAreaHandlers(
  color: string,
  canvas: HTMLCanvasElement
): Eventhandlers {
  const mouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    try {
      const point = computePointInCanvas(canvas, e.clientX, e.clientY);

      fillArea(canvas, color, point);
    } catch (error) {
      console.error(error);
    }
  };

  const mouseMoveHandler = () => {};

  const mouseUpHandler = () => {};

  return {
    mouseDownHandler: mouseDownHandler,
    mouseMoveHandler: mouseMoveHandler,
    mouseUpHandler: mouseUpHandler,
  };
}
