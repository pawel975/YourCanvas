import { MarkerIcon, RectangleIcon } from './Tool/icons';

const toolsSchemeData = [
  {
    id: 'marker',
    icon: <MarkerIcon />,
    sizesInPx: [1, 2, 4, 6, 8, 10, 12, 14, 16],
  },
  {
    id: 'rect',
    icon: <RectangleIcon />,
    sizesInPx: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 60],
  },
];

export default toolsSchemeData;
