import ColorSelection from './ColorSelection/ColorSelection';
import './ToolBar.css';
import ToolSelection from './ToolSelection/ToolSelection';

interface ToolBarProps {
  currentToolId: string;
  pickedColorId: string;
  handleToolbarToolClick: Function;
  handleToolbarColorClick: Function;
}

const ToolBar: React.FC<ToolBarProps> = ({
  currentToolId,
  pickedColorId,
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
        pickedColorId={pickedColorId}
        handleToolbarColorClick={handleToolbarColorClick}
      />
    </div>
  );
};

export default ToolBar;
