import {
  CircleIcon,
  EraserIcon,
  LineIcon,
  MarkerIcon,
  RectangleIcon,
  SprayIcon,
  UndoIcon,
  RedoIcon,
} from './icons';

interface DrawingToolsScheme {
  id: string;
  icon: React.ReactNode;
  sizesInPx: number[];
}

interface OperationsOnHistoryScheme {
  id: string;
  icon: React.ReactNode;
}

const drawingToolsScheme: DrawingToolsScheme[] = [
  {
    id: 'marker',
    icon: <MarkerIcon />,
    sizesInPx: [1, 2, 4, 6, 8, 10, 12, 14, 16, 32, 64],
  },
  {
    id: 'rect',
    icon: <RectangleIcon />,
    sizesInPx: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 60],
  },
  {
    id: 'spray',
    icon: <SprayIcon />,
    sizesInPx: [6, 10, 14, 18, 22, 26, 30, 40],
  },
  {
    id: 'eraser',
    icon: <EraserIcon />,
    sizesInPx: [6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 60],
  },
  {
    id: 'circle',
    icon: <CircleIcon />,
    sizesInPx: [6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 60],
  },
  {
    id: 'line',
    icon: <LineIcon />,
    sizesInPx: [6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 60],
  },
];

const operationsOnHistoryScheme: OperationsOnHistoryScheme[] = [
  {
    id: 'undoStep',
    icon: <UndoIcon />,
  },
  {
    id: 'redoStep',
    icon: <RedoIcon />,
  },
];

export { drawingToolsScheme, operationsOnHistoryScheme };
