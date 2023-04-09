import { Ref, RefObject, useEffect, useRef } from 'react';
import { CanvasCoordinates } from '../../../../globalInterfaces';
import { RectDrawType } from '../types';
import { rectDrawPicker } from '../rectDrawPicker';

export default function useRectDraw(
  drawType: RectDrawType,
  color: string,
  drawWidth: number
): Ref<HTMLCanvasElement> {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isDrawingRef = useRef(false);

  // const mouseMoveListenerRef = useRef<any>(null);
  const mouseDownListenerRef = useRef<any>(null);
  const mouseUpListenerRef = useRef<any>(null);

  const startPointRef = useRef({ x: 0, y: 0 });
  const endPointRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      // if (mouseMoveListenerRef.current) {
      //   window.removeEventListener('mousemove', mouseMoveListenerRef.current);
      // }
      if (mouseUpListenerRef.current) {
        window.removeEventListener('mousemove', mouseUpListenerRef.current);
      }
    };
  }, []);

  function setCanvasRef(ref: HTMLCanvasElement) {
    if (!ref) return;
    if (canvasRef.current) {
      canvasRef.current.removeEventListener('mousedown', mouseDownListenerRef.current!);
    }
    canvasRef.current = ref;
    // initMouseMoveListener();
    initMouseDownListener();
    initMouseUpListener();
  }

  // function initMouseMoveListener() {
  //   const mouseMoveListener = (e: MouseEvent) => {
  //     if (isDrawingRef.current) {
  //       const point = computePointInCanvas(e.clientX, e.clientY);
  //       const ctx = canvasRef.current?.getContext('2d');

  //       rectDrawPicker(drawType, prevPointRef.current, point, ctx!, color, drawWidth);

  //       prevPointRef.current = point;
  //     }
  //   };
  //   mouseMoveListenerRef.current = mouseMoveListener;
  //   window.addEventListener('mousemove', mouseMoveListener);
  // }

  function initMouseDownListener() {
    if (!canvasRef.current) return;
    const mouseDownListener = (e: MouseEvent) => {
      isDrawingRef.current = true;
      const point = computePointInCanvas(e.clientX, e.clientY);
      startPointRef.current = {
        x: point.x,
        y: point.y,
      };
    };

    mouseDownListenerRef.current = mouseDownListener;
    canvasRef.current.addEventListener('mousedown', mouseDownListener);
  }

  function initMouseUpListener() {
    const mouseUpListener = (e: MouseEvent) => {
      isDrawingRef.current = false;
      const point = computePointInCanvas(e.clientX, e.clientY);
      endPointRef.current = {
        x: point.x,
        y: point.y,
      };
      const ctx = canvasRef.current?.getContext('2d');

      rectDrawPicker(drawType, startPointRef.current, endPointRef.current, ctx!, color, drawWidth);
    };

    mouseUpListenerRef.current = mouseUpListener;
    window.addEventListener('mouseup', mouseUpListener);
  }

  function computePointInCanvas(clientX: number, clientY: number): CanvasCoordinates {
    if (canvasRef.current) {
      const boundingRect = canvasRef.current.getBoundingClientRect();
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

  return setCanvasRef;
}
