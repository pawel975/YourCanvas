import './ToolBar.css';
import ToolSelection from './ToolSelection/ToolSelection';

interface ToolBarProps {
  currentToolId: string;
  handleToolbarToolClick: Function;
}

const ToolBar: React.FC<ToolBarProps> = ({ currentToolId, handleToolbarToolClick }) => {
  return (
    <div className="tool-bar">
      <ToolSelection
        currentToolId={currentToolId}
        handleToolbarToolClick={handleToolbarToolClick}
      />
    </div>
  );
};

export default ToolBar;
