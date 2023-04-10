import { Ref, useEffect, useRef } from 'react';
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

  const mouseMoveListenerRef = useRef<any>(null);
  const mouseDownListenerRef = useRef<any>(null);
  const mouseUpListenerRef = useRef<any>(null);

  const startPointRef = useRef<CanvasCoordinates>({ x: 0, y: 0 });
  const endPointRef = useRef<CanvasCoordinates>({ x: 0, y: 0 });
  const snapshotRef = useRef<ImageData | undefined>(undefined);

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
        endPointRef.current = computePointInCanvas(e.clientX, e.clientY);
        const ctx = canvasRef.current?.getContext('2d');

        if (snapshotRef.current) {
          ctx?.putImageData(snapshotRef.current, 0, 0);
        }

        rectDrawPicker(
          drawType,
          startPointRef.current,
          endPointRef.current,
          ctx!,
          color,
          drawWidth
        );
      }
    };
    mouseMoveListenerRef.current = mouseMoveListener;
    window.addEventListener('mousemove', mouseMoveListener);
  }

  function initMouseDownListener() {
    if (!canvasRef.current) return;
    const mouseDownListener = (e: MouseEvent) => {
      isDrawingRef.current = true;
      startPointRef.current = computePointInCanvas(e.clientX, e.clientY);
      const ctx = canvasRef.current?.getContext('2d');

      if (canvasRef.current) {
        snapshotRef.current = ctx?.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
    };

    mouseDownListenerRef.current = mouseDownListener;
    canvasRef.current.addEventListener('mousedown', mouseDownListener);
  }

  function initMouseUpListener() {
    const mouseUpListener = (e: MouseEvent) => {
      isDrawingRef.current = false;
      const ctx = canvasRef.current?.getContext('2d');

      snapshotRef.current = ctx?.getImageData(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
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
