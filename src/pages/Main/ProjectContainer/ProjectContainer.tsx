import { useEffect, useRef, useState } from 'react';
import useOnDraw from '../../../hooks/useOnDraw';
import './ProjectContainer.css';
import { onDrawParams } from './interfaces';
import getWindowSize from '../../../utils/getWindowSize';

const ProjectContainer: React.FC = () => {
  const setCanvasRef = useOnDraw({ onDraw });
  const canvasContainer = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: '', height: '' });

  useEffect(() => {
    setCanvasSize({
      width: getWindowSize('width', canvasContainer),
      height: getWindowSize('height', canvasContainer),
    });
  }, []);

  function onDraw(ctx: onDrawParams['ctx'], point: onDrawParams['point']) {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

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
