import { Ref } from 'react';
import { freeDrawPicker } from '../freeDrawPicker';
import { FreeDrawType } from '../types';
import { CanvasCoordinates } from '../../../../globalInterfaces';

export default function startFreeDraw(
  drawType: FreeDrawType,
  color: string,
  drawWidth: number,
  element: any
): any {
  let isDrawingRef = false;

  let prevPointRef = null as any;

  const initMouseMoveListener = (e: MouseEvent) => {
    if (isDrawingRef) {
      console.log('mouseMove free');

      const point = computePointInCanvas(e.clientX, e.clientY);
      const ctx = element?.getContext('2d');

      freeDrawPicker(drawType, prevPointRef, point, ctx!, color, drawWidth);

      prevPointRef = point;
    }
  };

  const initMouseDownListener = () => {
    console.log('mouseDown free');
    isDrawingRef = true;
  };

  const initMouseUpListener = () => {
    console.log('mouseUp free');
    isDrawingRef = false;
    prevPointRef = null;
  };

  function computePointInCanvas(clientX: number, clientY: number): CanvasCoordinates {
    if (element) {
      const boundingRect = element.getBoundingClientRect();
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

  return {
    mouseDown: initMouseDownListener,
    mouseMove: initMouseMoveListener,
    mouseUp: initMouseUpListener,
  };
}
