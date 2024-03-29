import Tool from './Tool/Tool';
import { drawingToolsScheme } from '../../ToolBar/schemeData';
import './ToolSelections.css';
import { useAppSelector } from '../../../redux/hooks';

const ToolSelection: React.FC = () => {
  const currentToolId = useAppSelector((state) => state.toolSelection.tool);

  const tools = drawingToolsScheme.map((tool) => {
    const { id, icon } = tool;

    return (
      <Tool
        key={id}
        icon={icon}
        id={id}
        active={id === currentToolId}
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
