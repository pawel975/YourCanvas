import React from 'react';
import ProjectContainer from './ProjectContainer/ProjectContainer';
import './Main.css';

interface MainProps {
  isProjectActive: boolean;
  currentToolId: string;
  pickedColorHexId: string;
}

const Main: React.FC<MainProps> = ({ currentToolId, isProjectActive, pickedColorHexId }) => {
  return (
    <main className="main">
      {isProjectActive && (
        <ProjectContainer
          currentToolId={currentToolId}
          pickedColorHexId={pickedColorHexId}
        />
      )}
    </main>
  );
};

export default Main;
