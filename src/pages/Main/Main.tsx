import React from 'react';
import ProjectContainer from './ProjectContainer/ProjectContainer';
import './Main.css';

interface MainProps {
  isProjectActive: boolean;
  currentToolId: string;
  pickedColorId: string;
}

const Main: React.FC<MainProps> = ({ currentToolId, isProjectActive, pickedColorId }) => {
  return (
    <main className="main">
      {isProjectActive && (
        <ProjectContainer
          currentToolId={currentToolId}
          pickedColorId={pickedColorId}
        />
      )}
    </main>
  );
};

export default Main;
