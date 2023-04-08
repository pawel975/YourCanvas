import { useEffect, useRef, useState } from 'react';
import useOnDraw from '../../../hooks/useOnDraw';
import './ProjectContainer.css';
import { canvasCoordinates } from './interfaces';
import getWindowSize from '../../../utils/getWindowSize';

const ProjectContainer: React.FC = () => {
  const setCanvasRef = useOnDraw(onDraw);
  const canvasContainer = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: '', height: '' });

  useEffect(() => {
    setCanvasSize({
      width: getWindowSize('width', canvasContainer),
      height: getWindowSize('height', canvasContainer),
    });
  }, []);

  function onDraw(
    ctx: CanvasRenderingContext2D,
    point: canvasCoordinates,
    prevPoint: canvasCoordinates
  ) {
    drawLine(prevPoint, point, ctx, '#000000', 5);
  }

  function drawLine(
    start: canvasCoordinates,
    end: canvasCoordinates,
    ctx: CanvasRenderingContext2D,
    color: string,
    width: number
  ) {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
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
