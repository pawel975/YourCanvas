import { useEffect, useRef, useState } from 'react';
import './ProjectContainer.css';
import getWindowSize from '../../../utils/getWindowSize';
import getMarkerDrawHandlers from '../../../features/drawing/markerDraw/getMarkerDrawHandlers';
import getRectDrawHandlers from '../../../features/drawing/rectDraw/getRectDrawHandlers';
import { Eventhandlers } from './interfaces';

interface ProjectContainerProps {
  currentToolId: string;
  pickedColorHexId: string;
}

const ProjectContainer: React.FC<ProjectContainerProps> = ({ currentToolId, pickedColorHexId }) => {
  const [mouseListeners, setMouseListeners] = useState<Eventhandlers>({
    mouseDownHandler: () => {},
    mouseMoveHandler: () => {},
    mouseUpHandler: () => {},
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: '', height: '' });

  useEffect(() => {
    setCanvasSize({
      width: getWindowSize('width', canvasContainerRef),
      height: getWindowSize('height', canvasContainerRef),
    });
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      if (currentToolId === 'marker-draw') {
        setMouseListeners(getMarkerDrawHandlers(pickedColorHexId, 10, canvasRef.current));
      } else if (currentToolId === 'rect-draw') {
        setMouseListeners(getRectDrawHandlers(pickedColorHexId, 10, canvasRef.current));
      }
    }
  }, [currentToolId, pickedColorHexId]);

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

export default ProjectContainer;
