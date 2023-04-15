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
  const setCanvasRef = useRef(null);
  const canvasContainer = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: '', height: '' });

  useEffect(() => {
    setCanvasSize({
      width: getWindowSize('width', canvasContainer),
      height: getWindowSize('height', canvasContainer),
    });
  }, []);

  const handleDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    mouseListeners.mouseDownHandler(e);
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    mouseListeners.mouseMoveHandler(e);
  };

  const handleUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    mouseListeners.mouseUpHandler(e);
  };

  useEffect(() => {
    if (setCanvasRef.current) {
      if (currentToolId === 'tool-bar__free-draw') {
        setMouseListeners(getFreeDrawHandlers('marker', '#000000', 10, setCanvasRef.current));
      } else if (currentToolId === 'tool-bar__rect-draw') {
        setMouseListeners(getRectDrawHandlers('fromCorners', '#000000', 10, setCanvasRef.current));
      }
    }
  }, [currentToolId]);

  return (
    <div
      ref={canvasContainer}
      className="project-container"
    >
      <canvas
        className="project-canvas"
        width={canvasSize.width}
        height={canvasSize.height}
        ref={setCanvasRef}
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
      ></canvas>
    </div>
  );
};

export default ProjectContainer;
