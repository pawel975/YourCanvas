import React from 'react';
import ProjectContainer from './ProjectContainer/ProjectContainer';
import './Main.css';

interface MainProps {
  isProjectActive: boolean;
  currentToolId: string;
}

const Main: React.FC<MainProps> = ({ currentToolId, isProjectActive }) => {
  return (
    <main className="main">
      {isProjectActive && <ProjectContainer currentToolId={currentToolId} />}
    </main>
  );
};

export default Main;
