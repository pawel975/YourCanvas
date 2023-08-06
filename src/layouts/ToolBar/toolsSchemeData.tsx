import {
  CircleIcon,
  EraserIcon,
  MarkerIcon,
  RectangleIcon,
  SprayIcon,
} from './ToolSelection/Tool/icons';

interface toolsSchemaDataItem {
  id: string;
  icon: React.ReactNode;
  sizesInPx: number[];
}

const toolsSchemeData: toolsSchemaDataItem[] = [
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
];

export default toolsSchemeData;
