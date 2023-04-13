import { useEffect, useRef, useState } from 'react';
import useFreeDraw from '../../../features/drawing/freeDraw/hooks/useFreeDraw';
import './ProjectContainer.css';
import getWindowSize from '../../../utils/getWindowSize';
import useRectDraw from '../../../features/drawing/rectDraw/hooks/useRectDraw';

interface ProjectContainerProps {
  currentToolId: string;
}

const ProjectContainer: React.FC<ProjectContainerProps> = ({ currentToolId }) => {
  // const setCanvasRef = useFreeDraw('marker','#000000', 10);
  let setCanvasRef = useRectDraw('fromCorners', '#000000', 10);
  // let setCanvasRef = useTool(currentToolId);
  const canvasContainer = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: '', height: '' });

  useEffect(() => {
    setCanvasSize({
      width: getWindowSize('width', canvasContainer),
      height: getWindowSize('height', canvasContainer),
    });
  }, []);

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
      ></canvas>
    </div>
  );
};

export default ProjectContainer;
