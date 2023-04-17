import ColorSelection from './ColorSelection/ColorSelection';
import './ToolBar.css';
import ToolSelection from './ToolSelection/ToolSelection';

interface ToolBarProps {
  currentToolId: string;
  pickedColorHexId: string;
  handleToolbarToolClick: Function;
  handleToolbarColorClick: Function;
}

const ToolBar: React.FC<ToolBarProps> = ({
  currentToolId,
  pickedColorHexId,
  handleToolbarToolClick,
  handleToolbarColorClick,
}) => {
  return (
    <div className="tool-bar">
      <ToolSelection
        currentToolId={currentToolId}
        handleToolbarToolClick={handleToolbarToolClick}
      />
      <ColorSelection
        pickedColorHexId={pickedColorHexId}
        handleToolbarColorClick={handleToolbarColorClick}
      />
    </div>
  );
};

export default ToolBar;
