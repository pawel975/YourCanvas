import { useEffect, useRef, useState } from 'react';
import './DrawingContainer.css';
import getWindowSize from '../../../utils/getWindowSize';
import getMarkerDrawHandlers from '../../../features/drawing/markerDraw/getMarkerDrawHandlers';
import getRectDrawHandlers from '../../../features/drawing/rectDraw/getRectDrawHandlers';
import { Eventhandlers } from './interfaces';
import { useAppSelector } from '../../../redux/hooks';

const DrawingContainer: React.FC = () => {
  const [mouseListeners, setMouseListeners] = useState<Eventhandlers>({
    mouseDownHandler: () => {},
    mouseMoveHandler: () => {},
    mouseUpHandler: () => {},
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: '', height: '' });

  const currentToolId = useAppSelector((state) => state.toolSelection.tool);
  const currentColorHex = useAppSelector((state) => state.colorSelection.color);
  const currentToolSize = useAppSelector((state) => state.toolSizeSelection.size);

  useEffect(() => {
    setCanvasSize({
      width: getWindowSize('width', canvasContainerRef),
      height: getWindowSize('height', canvasContainerRef),
    });
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      if (currentToolId === 'marker') {
        setMouseListeners(
          getMarkerDrawHandlers(currentColorHex, currentToolSize, canvasRef.current)
        );
      } else if (currentToolId === 'rect') {
        setMouseListeners(getRectDrawHandlers(currentColorHex, currentToolSize, canvasRef.current));
      }
    }
  }, [currentToolId, currentColorHex, currentToolSize]);

  return (
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
  );
};

export default DrawingContainer;
