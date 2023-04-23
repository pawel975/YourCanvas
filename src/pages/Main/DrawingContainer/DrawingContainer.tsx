import { useEffect, useRef, useState } from 'react';
import './DrawingContainer.css';
import getWindowSize from '../../../utils/getWindowSize';
import getMarkerDrawHandlers from '../../../features/drawing/markerDraw/getMarkerDrawHandlers';
import getRectDrawHandlers from '../../../features/drawing/rectDraw/getRectDrawHandlers';
import { Eventhandlers } from '../../../globalInterfaces';
import { useAppSelector } from '../../../redux/hooks';
import { getSprayDrawHandlers } from '../../../features/drawing/sprayDraw';
import ERRORS from '../../../data/errors';
import { Alert } from '@mui/material';

interface CanvasSize {
  width: string;
  height: string;
}

type DrawHandlers = {
  [key: string]: Eventhandlers;
};

const DrawingContainer: React.FC = () => {
  const [mouseListeners, setMouseListeners] = useState<Eventhandlers>({
    mouseDownHandler: () => {},
    mouseMoveHandler: () => {},
    mouseUpHandler: () => {},
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: '', height: '' });

  const currentToolId: string | number = useAppSelector((state) => state.toolSelection.tool);
  const currentColorHex: string = useAppSelector((state) => state.colorSelection.color);
  const currentToolSize: number = useAppSelector((state) => state.toolSizeSelection.size);

  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setCanvasSize({
      width: getWindowSize('width', canvasContainerRef),
      height: getWindowSize('height', canvasContainerRef),
    });
  }, []);

  useEffect(() => {
    try {
      if (!canvasRef.current) {
        const error = new Error(`Invalid canvas ref - ${canvasRef.current}`);
        error.name = ERRORS.INVALID_CANVAS_REF;
        throw error;
      }

      const drawHandlers: DrawHandlers = {
        marker: getMarkerDrawHandlers(currentColorHex, currentToolSize, canvasRef.current),
        rect: getRectDrawHandlers(currentColorHex, currentToolSize, canvasRef.current),
        spray: getSprayDrawHandlers(currentColorHex, currentToolSize, canvasRef.current),
      };

      setMouseListeners(drawHandlers[currentToolId]);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  }, [currentToolId, currentColorHex, currentToolSize]);

  return (
    <>
      {isError ? (
        <Alert severity="error">
          Something went wrong, cannot load the canvas, reload the page.
        </Alert>
      ) : (
        <div
          ref={canvasContainerRef}
          className="project-container"
        >
          <canvas
            className="project-canvas"
            width={canvasSize.width}
            height={canvasSize.height}
            ref={canvasRef}
            onMouseDown={mouseListeners.mouseDownHandler}
            onMouseMove={mouseListeners.mouseMoveHandler}
            onMouseUp={mouseListeners.mouseUpHandler}
          ></canvas>
        </div>
      )}
    </>
  );
};

export default DrawingContainer;
