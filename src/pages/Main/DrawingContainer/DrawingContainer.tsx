import { useEffect, useRef, useState } from 'react';
import './DrawingContainer.css';
import getWindowSize from '../../../utils/getWindowSize';
import getMarkerDrawHandlers from '../../../features/drawing/markerDraw/getMarkerDrawHandlers';
import getRectDrawHandlers from '../../../features/drawing/rectDraw/getRectDrawHandlers';
import { Eventhandlers } from '../../../globalInterfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getSprayDrawHandlers } from '../../../features/drawing/sprayDraw';
import ERRORS from '../../../data/errors';
import { Alert } from '@mui/material';
import { drawingToolsScheme } from '../../../layouts/ToolBar/schemeData';
import getErasserHandlers from '../../../features/eraser/getErasserHandlers';
import { getCircleDrawHandlers } from '../../../features/drawing/circleDraw';
import compareArrays from '../utils/compareArrays';
import getLineDrawHandlers from '../../../features/drawing/lineDraw/getLineDrawHandlers';
import {
  saveSnapshotToHistory,
  setIsSnapshotEditingActive,
  updateCurrentSnapshotId,
  updateSnapshotHistory,
} from '../../../layouts/ToolBar/OperationsOnHistory/snapshotHistory/redux/snapshotHistorySlice';

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

  const snapshotHistory = useAppSelector((state) => state.snapshotHistory.snapshots);
  const currentSnapshotId = useAppSelector((state) => state.snapshotHistory.currentSnapshotId);
  const isSnapshotEditigActive = useAppSelector(
    (state) => state.snapshotHistory.isSnapshotEditingActive
  );

  const [isError, setIsError] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setCanvasSize({
      width: getWindowSize('width', canvasContainerRef),
      height: getWindowSize('height', canvasContainerRef),
    });
  }, []);

  const handleMouseUp = (e: any) => {
    mouseListeners.mouseUpHandler(e);
    console.log('mouse up!');

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        canvasRef.current.toBlob(function (blob) {
          const cuttedArray = [...snapshotHistory].slice(0, currentSnapshotId + 1);
          dispatch(updateSnapshotHistory(cuttedArray));
          dispatch(saveSnapshotToHistory(URL.createObjectURL(blob!)));
          dispatch(setIsSnapshotEditingActive(false));
          dispatch(updateCurrentSnapshotId(currentSnapshotId + 1));
        });
      }
    }
  };

  useEffect(() => {
    // TODO: Refactor this

    if (snapshotHistory.length === 0) {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');

        if (ctx) {
          canvasRef.current.toBlob(function (blob) {
            dispatch(saveSnapshotToHistory(URL.createObjectURL(blob!)));
          });
        }
      }
    }

    if (isSnapshotEditigActive) {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const readedImage = new Image();

        readedImage.src = snapshotHistory[currentSnapshotId];

        // Waits for image to load so there is no delay in image rendering
        readedImage.onload = function () {
          canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
          canvas.getContext('2d')?.drawImage(readedImage, 0, 0);
        };
      }
    }
  }, [currentSnapshotId, isSnapshotEditigActive, snapshotHistory]);

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
        circle: getCircleDrawHandlers(currentColorHex, currentToolSize, canvasRef.current),
        line: getLineDrawHandlers(currentColorHex, currentToolSize, canvasRef.current),
      };

      // Check if tool data is present if adding new handlers is the case.
      const toolHandlersNames = Object.keys(toolHandlers);
      const toolsSchemaDataIds = drawingToolsScheme.map((tool) => tool.id);

      if (!compareArrays(toolHandlersNames, toolsSchemaDataIds)) {
        const error = new Error('toolHandlers and schemeData should contain the same tool names');
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
            onMouseUp={(e) => handleMouseUp(e)}
          ></canvas>
        </div>
      )}
    </>
  );
};

export default DrawingContainer;
