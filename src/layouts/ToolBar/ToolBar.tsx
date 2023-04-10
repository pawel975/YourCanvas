import './ToolBar.css';

interface ToolBarProps {
  handleToolbarToolClick: Function;
}

const ToolBar: React.FC<ToolBarProps> = ({ handleToolbarToolClick }) => {
  return (
    <div className="tool-bar">
      <button
        onClick={(e) => handleToolbarToolClick(e)}
        id="tool-bar__free-draw"
      >
        Free Draw
      </button>
      <button
        onClick={(e) => handleToolbarToolClick(e)}
        id="tool-bar__rect-draw"
      >
        Rectangel
      </button>
    </div>
  );
};

export default ToolBar;
