import { useEffect, useRef, useState } from 'react';
import './ProjectContainer.css';
import getWindowSize from '../../../utils/getWindowSize';
import getFreeDrawHandlers from '../../../features/drawing/freeDraw/getFreeDrawHandlers';
import getRectDrawHandlers from '../../../features/drawing/rectDraw/getRectDrawHandlers';
import { Eventhandlers } from './interfaces';

interface ProjectContainerProps {
  currentToolId: string;
}

const ProjectContainer: React.FC<ProjectContainerProps> = ({ currentToolId }) => {
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
      if (currentToolId === 'tool-bar__free-draw') {
        setMouseListeners(getFreeDrawHandlers('marker', '#000000', 10, canvasRef.current));
      } else if (currentToolId === 'tool-bar__rect-draw') {
        setMouseListeners(getRectDrawHandlers('fromCorners', '#000000', 10, canvasRef.current));
      }
    }
  }, [currentToolId]);

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
