import { useEffect, useRef, useState } from 'react';
import useFreeDraw from '../../../features/drawing/freeDraw/hooks/useFreeDraw';
import './ProjectContainer.css';
import getWindowSize from '../../../utils/getWindowSize';
import useRectDraw from '../../../features/drawing/rectDraw/hooks/useRectDraw';
import startFreeDraw from '../../../features/drawing/freeDraw/hooks/useFreeDraw';
import startRectDraw from '../../../features/drawing/rectDraw/hooks/useRectDraw';

interface ProjectContainerProps {
  currentToolId: string;
}

const ProjectContainer: React.FC<ProjectContainerProps> = ({ currentToolId }) => {
  const [mouseDownListener, setMouseDownListener] = useState(null);
  const [mouseUpListener, setMouseUpListener] = useState(null);
  const [mouseMoveListener, setMouseMoveListener] = useState(null);
  const setCanvasRef = useRef(null);
  const canvasContainer = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: '', height: '' });

  useEffect(() => {
    setCanvasSize({
      width: getWindowSize('width', canvasContainer),
      height: getWindowSize('height', canvasContainer),
    });
  }, []);

  useEffect(() => {
    if (setCanvasRef.current) {
      console.log('use effect');
      if (currentToolId === 'tool-bar__free-draw') {
        setMouseDownListener(
          startFreeDraw('marker', '#000000', 10, setCanvasRef.current)['initMouseDownListener']
        );
        setMouseUpListener(
          startFreeDraw('marker', '#000000', 10, setCanvasRef.current)['initMouseUpListener']
        );
        setMouseMoveListener(
          startFreeDraw('marker', '#000000', 10, setCanvasRef.current)['initMouseMoveListener']
        );
      } else if (currentToolId === 'tool-bar__rect-draw') {
        setMouseDownListener(
          startRectDraw('fromCorners', '#000000', 10, setCanvasRef.current)['initMouseDownListener']
        );
        setMouseUpListener(
          startRectDraw('fromCorners', '#000000', 10, setCanvasRef.current)['initMouseUpListener']
        );
        setMouseMoveListener(
          startRectDraw('fromCorners', '#000000', 10, setCanvasRef.current)['initMouseMoveListener']
        );
      }
    }
    return () => {
      setMouseDownListener(null);
      setMouseUpListener(null);
      setMouseMoveListener(null);
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
        onMouseDown={mouseDownListener ? mouseDownListener : () => {}}
        onMouseMove={mouseMoveListener ? mouseMoveListener : () => {}}
        onMouseUp={mouseUpListener ? mouseUpListener : () => {}}
      ></canvas>
    </div>
  );
};

export default ProjectContainer;
