import { LegacyRef, useRef } from 'react';
import { useOnDrawProps } from '../pages/Main/ProjectContainer/interfaces';

export default function useOnDraw({ onDraw }: useOnDrawProps): LegacyRef<HTMLCanvasElement> {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function setCanvasRef(ref: HTMLCanvasElement) {
    if (!ref) return;
    canvasRef.current = ref;
    initMouseMoveListener();
  }

  function initMouseMoveListener() {
    const mouseMoveListener = (e: MouseEvent) => {
      const point = computePointInCanvas(e.clientX, e.clientY);
      const ctx = canvasRef.current!.getContext('2d');
      if (onDraw) onDraw(ctx, point);
    };
    window.addEventListener('mousemove', mouseMoveListener);
  }

  function computePointInCanvas(clientX: number, clientY: number): object | null {
    if (canvasRef.current) {
      const boundingRect = canvasRef.current.getBoundingClientRect();
      return {
        x: String((clientX - boundingRect.left).toFixed(0)),
        y: String((clientY - boundingRect.top).toFixed(0)),
      };
    } else {
      return null;
    }
  }

  return setCanvasRef;
}
