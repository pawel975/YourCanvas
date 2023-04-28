import { useAppSelector } from '../../redux/hooks';
import ColorSelection from './ColorSelection/ColorSelection';
import './ToolBar.css';
import ToolSelection from './ToolSelection/ToolSelection';
import ToolSizeSelection from './ToolSizeSelection/ToolSizeSelection';
import toolsSchemeData from './toolsSchemeData';

const ToolBar: React.FC = () => {
  const currentToolId = useAppSelector((state) => state.toolSelection.tool);
  const toolSizes = toolsSchemeData.find((tool) => tool.id === currentToolId)?.sizesInPx;
  const hasColorSelection = toolsSchemeData.find(
    (tool) => tool.id === currentToolId
  )?.hasColorSelection;

  return (
    <div className="tool-bar">
      <ToolSelection />
      {toolSizes && <ToolSizeSelection />}
      {hasColorSelection && <ColorSelection />}
    </div>
  );
};

export default ToolBar;
