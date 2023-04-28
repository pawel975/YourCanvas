import { useAppSelector } from '../../redux/hooks';
import ColorSelection from './ColorSelection/ColorSelection';
import './ToolBar.css';
import ToolSelection from './ToolSelection/ToolSelection';
import ToolSizeSelection from './ToolSizeSelection/ToolSizeSelection';
import toolsSchemeData from './toolsSchemeData';

const ToolBar: React.FC = () => {
  const currentToolId = useAppSelector((state) => state.toolSelection.tool);
  const toolSizes = toolsSchemeData.find((tool) => tool.id === currentToolId)?.sizesInPx;

  return (
    <div className="tool-bar">
      <ToolSelection />
      {toolSizes && <ToolSizeSelection />}
      <ColorSelection />
    </div>
  );
};

export default ToolBar;
