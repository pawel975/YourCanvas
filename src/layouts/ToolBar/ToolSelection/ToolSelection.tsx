import Tool from './Tool/Tool';
import toolsSchemeData from './toolsSchemeData';
import './ToolSelections.css';

interface ToolSelectionProps {
  currentToolId: string;
  handleToolbarToolClick: Function;
}

const ToolSelection: React.FC<ToolSelectionProps> = ({ currentToolId, handleToolbarToolClick }) => {
  const tools = toolsSchemeData.map((tool) => {
    const { id, icon } = tool;

    return (
      <Tool
        key={id}
        icon={icon}
        id={id}
        active={id === currentToolId}
        handleToolbarToolClick={handleToolbarToolClick}
      />
    );
  });

  return (
    <fieldset className="tool-selection">
      <legend>Tools</legend>
      {tools}
    </fieldset>
  );
};

export default ToolSelection;
