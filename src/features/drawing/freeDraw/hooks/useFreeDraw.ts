import { Ref, useEffect, useRef } from 'react';
import { freeDrawPicker } from '../freeDrawPicker';
import { FreeDrawType } from '../types';
import { CanvasCoordinates } from '../../../../globalInterfaces';

export default function useFreeDraw(
  drawType: FreeDrawType,
  color: string,
  drawWidth: number
): Ref<HTMLCanvasElement> {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isDrawingRef = useRef(false);

  const mouseMoveListenerRef = useRef<any>(null);
  const mouseDownListenerRef = useRef<any>(null);
  const mouseUpListenerRef = useRef<any>(null);

  const prevPointRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener('mousemove', mouseMoveListenerRef.current);
      }
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
    initMouseMoveListener();
    initMouseDownListener();
    initMouseUpListener();
  }
  function initMouseMoveListener() {
    const mouseMoveListener = (e: MouseEvent) => {
      if (isDrawingRef.current) {
        const point = computePointInCanvas(e.clientX, e.clientY);
        const ctx = canvasRef.current?.getContext('2d');

        freeDrawPicker(drawType, prevPointRef.current, point, ctx!, color, drawWidth);

        prevPointRef.current = point;
      }
    };
    mouseMoveListenerRef.current = mouseMoveListener;
    window.addEventListener('mousemove', mouseMoveListener);
  }

  function initMouseDownListener() {
    if (!canvasRef.current) return;
    const mouseDownListener = () => {
      isDrawingRef.current = true;
    };
    mouseDownListenerRef.current = mouseDownListener;
    canvasRef.current.addEventListener('mousedown', mouseDownListener);
  }

  function initMouseUpListener() {
    const mouseUpListener = () => {
      isDrawingRef.current = false;
      prevPointRef.current = null;
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
