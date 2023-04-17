import React from 'react';
import DrawingContainer from './DrawingContainer/DrawingContainer';
import './Main.css';
import { useAppSelector } from '../../redux/hooks';

interface MainProps {
  currentToolId: string;
  pickedColorHexId: string;
}

const Main: React.FC<MainProps> = ({ currentToolId, pickedColorHexId }) => {
  const projectType = useAppSelector((state) => state.createNewProjectButton.projectType);

  function renderProject() {
    switch (projectType) {
      case 'blank':
        return <h1>Blank project</h1>;
      case 'drawing':
        return (
          <DrawingContainer
            currentToolId={currentToolId}
            pickedColorHexId={pickedColorHexId}
          />
        );
      default:
        return;
    }
  }

  const newProject = renderProject();

  return <main className="main">{newProject}</main>;
};

export default Main;
