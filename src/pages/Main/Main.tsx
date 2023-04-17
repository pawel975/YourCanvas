import React from 'react';
import DrawingContainer from './DrawingContainer/DrawingContainer';
import './Main.css';
import { useAppSelector } from '../../redux/hooks';

const Main: React.FC = () => {
  const projectType = useAppSelector((state) => state.createNewProjectButton.projectType);

  function renderProject() {
    switch (projectType) {
      case 'blank':
        return <h1>Blank project</h1>;
      case 'drawing':
        return <DrawingContainer />;
      default:
        return;
    }
  }

  const newProject = renderProject();

  return <main className="main">{newProject}</main>;
};

export default Main;
