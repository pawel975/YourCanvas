import { Ref, useEffect } from 'react';
import { CanvasCoordinates } from '../../../../globalInterfaces';
import { RectDrawType } from '../types';
import { rectDrawPicker } from '../rectDrawPicker';

export default function startRectDraw(
  drawType: RectDrawType,
  color: string,
  drawWidth: number,
  element: any
): any {
  let isDrawingRef = false;

  let startPointRef = { x: 0, y: 0 } as CanvasCoordinates;
  let endPointRef = { x: 0, y: 0 } as CanvasCoordinates;
  let snapshotRef = undefined as ImageData | undefined;

  const initMouseMoveListener = (e: MouseEvent) => {
    console.log('mouseMove rect');
    if (isDrawingRef) {
      endPointRef = computePointInCanvas(e.clientX, e.clientY);
      const ctx = element?.getContext('2d');

      if (snapshotRef) {
        ctx?.putImageData(snapshotRef, 0, 0);
      }

      rectDrawPicker(drawType, startPointRef, endPointRef, ctx!, color, drawWidth);
    }
  };

  const initMouseDownListener = (e: MouseEvent) => {
    console.log('mouseDown rect');
    isDrawingRef = true;
    startPointRef = computePointInCanvas(e.clientX, e.clientY);
    const ctx = element?.getContext('2d');

    if (element) {
      snapshotRef = ctx?.getImageData(0, 0, element.width, element.height);
    }
  };

  const initMouseUpListener = () => {
    console.log('mouseUp rect');
    isDrawingRef = false;
    const ctx = element?.getContext('2d');

    snapshotRef = ctx?.getImageData(0, 0, element!.width, element!.height);
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
