import { useEffect, useRef, useState } from 'react';
import './ProjectContainer.css';
import getWindowSize from '../../../utils/getWindowSize';
import startFreeDraw from '../../../features/drawing/freeDraw/hooks/startFreeDraw';
import startRectDraw from '../../../features/drawing/rectDraw/hooks/startRectDraw';

interface ProjectContainerProps {
  currentToolId: string;
}

const ProjectContainer: React.FC<ProjectContainerProps> = ({ currentToolId }) => {
  const [mouseListeners, setMouseListeners] = useState({
    mouseDown: null,
    mouseMove: null,
    mouseUp: null,
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

  const handleDown = (e: any) => {
    mouseListeners.mouseDown(e);
  };

  const handleMove = (e: any) => {
    mouseListeners.mouseMove(e);
  };

  const handleUp = (e: any) => {
    mouseListeners.mouseUp(e);
  };

  useEffect(() => {
    if (setCanvasRef.current) {
      console.log(setCanvasRef.current);
      console.log('use effect');
      if (currentToolId === 'tool-bar__free-draw') {
        setMouseListeners(startFreeDraw('marker', '#000000', 10, setCanvasRef.current));
      } else if (currentToolId === 'tool-bar__rect-draw') {
        setMouseListeners(startRectDraw('fromCorners', '#000000', 10, setCanvasRef.current));
      }
    }
    return () => {
      // setMouseDownListener(null);
      // setMouseUpListener(null);
      // setMouseMoveListener(null);
    };
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
