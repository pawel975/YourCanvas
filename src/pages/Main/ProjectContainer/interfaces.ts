export interface Eventhandlers {
  mouseDownHandler: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  mouseMoveHandler: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  mouseUpHandler: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
}
