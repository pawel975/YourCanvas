export interface onDrawParams {
  ctx: CanvasRenderingContext2D;
  point: {
    x: number;
    y: number;
  };
}

export interface useOnDrawProps {
  onDraw: Function;
}
