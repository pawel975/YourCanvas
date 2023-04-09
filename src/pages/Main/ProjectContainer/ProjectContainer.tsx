import { useEffect, useRef, useState } from 'react';
import useOnDraw from '../../../hooks/useOnDraw';
import './ProjectContainer.css';
import getWindowSize from '../../../utils/getWindowSize';

const ProjectContainer: React.FC = () => {
  const setCanvasRef = useOnDraw('freeDraw', '#000000', 10);
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
