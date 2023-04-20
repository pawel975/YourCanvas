import { useEffect, useRef, useState } from 'react';
import './DrawingContainer.css';
import getWindowSize from '../../../utils/getWindowSize';
import getMarkerDrawHandlers from '../../../features/drawing/markerDraw/getMarkerDrawHandlers';
import getRectDrawHandlers from '../../../features/drawing/rectDraw/getRectDrawHandlers';
import { Eventhandlers } from '../../../globalInterfaces';
import { useAppSelector } from '../../../redux/hooks';
import { getSprayDrawHandlers } from '../../../features/drawing/sprayDraw';

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
      switch (currentToolId) {
        case 'marker':
          setMouseListeners(
            getMarkerDrawHandlers(currentColorHex, currentToolSize, canvasRef.current)
          );
          break;
        case 'rect':
          setMouseListeners(
            getRectDrawHandlers(currentColorHex, currentToolSize, canvasRef.current)
          );
          break;
        case 'spray':
          setMouseListeners(
            getSprayDrawHandlers(currentColorHex, currentToolSize, canvasRef.current)
          );
          break;
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
