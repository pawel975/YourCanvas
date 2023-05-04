import { useEffect, useRef, useState } from 'react';
import './DrawingContainer.css';
import getWindowSize from '../../../utils/getWindowSize';
import { getMarkerDrawHandlers } from '../../../features/drawing/markerDraw';
import { getRectDrawHandlers } from '../../../features/drawing/rectDraw';
import { getErasserHandlers } from '../../../features/eraser';
import { getSprayDrawHandlers } from '../../../features/drawing/sprayDraw';
import { getCaptureAreaHandlers } from '../../../features/captureArea';
import { Eventhandlers } from '../../../globalInterfaces';
import { useAppSelector } from '../../../redux/hooks';
import ERRORS from '../../../data/errors';
import { Alert } from '@mui/material';
import toolsSchemeData from '../../../layouts/ToolBar/toolsSchemeData';

interface CanvasSize {
  width: string;
  height: string;
}

type ToolHandlers = {
  [key: string]: Eventhandlers;
};

const DrawingContainer: React.FC = () => {
  const [mouseListeners, setMouseListeners] = useState<Eventhandlers>({});
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
        eraser: getErasserHandlers(currentToolSize, canvasRef.current),
        captureArea: getCaptureAreaHandlers(canvasRef.current),
      };

      // Check if tool data is present if adding new handlers is the case.
      if (Object.keys(toolHandlers).length !== toolsSchemeData.length) {
        const error = new Error(
          'toolHandlers and toolsSchemeData should contain equal count of elements as they refer to the amount of tools.'
        );
        error.name = ERRORS.INVALID_TOOL_CODE_SYNC;
        throw error;
      }

      if (toolHandlers[currentToolId]) setMouseListeners(toolHandlers[currentToolId]);
      else {
        const error = new Error(`Tool handlers for '${currentToolId}' doesn't exist.`);
        error.name = ERRORS.INVALID_TOOL_ID;
        throw error;
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  }, [currentToolId, currentColorHex, currentToolSize]);

  useEffect(() => {
    document.addEventListener(
      'paste',
      (e) => mouseListeners.onPasteHandler && mouseListeners.onPasteHandler(e)
    );

    document.addEventListener(
      'keydown',
      (e) => mouseListeners.onKeyDownHandler && mouseListeners.onKeyDownHandler(e)
    );

    return () => {
      document.removeEventListener('paste', (e) => mouseListeners.onPasteHandler!(e));
      document.removeEventListener('keydown', (e) => mouseListeners.onKeyDownHandler!(e));
    };
  }, [mouseListeners]);

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
            onPaste={mouseListeners.onPasteHandler}
            onKeyDown={mouseListeners.onKeyDownHandler}
          ></canvas>
        </div>
      )}
    </>
  );
};

export default DrawingContainer;
