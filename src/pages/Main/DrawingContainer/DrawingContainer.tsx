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
import getRubberHandlers from '../../../features/rubber/getErasserHandlers';
import toolsSchemeData from '../../../layouts/ToolBar/ToolSelection/toolsSchemeData';

interface CanvasSize {
  width: string;
  height: string;
}

type ToolHandlers = {
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

      const toolHandlers: ToolHandlers = {
        marker: getMarkerDrawHandlers(currentColorHex, currentToolSize, canvasRef.current),
        rect: getRectDrawHandlers(currentColorHex, currentToolSize, canvasRef.current),
        spray: getSprayDrawHandlers(currentColorHex, currentToolSize, canvasRef.current),
        rubber: getRubberHandlers(currentToolSize, canvasRef.current),
      };

      // Check if tool data is present if adding new handlers is the case.
      if (Object.keys(toolHandlers).length !== toolsSchemeData.length) {
        const error = new Error(
          'toolHandlers and toolsSchemeData should contain equal count of elements as they refer to the amount of tools.'
        );
        error.name = ERRORS.INVALID_TOOL_CODE_SYNC;
        throw error;
      }

      setMouseListeners(toolHandlers[currentToolId]);
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
