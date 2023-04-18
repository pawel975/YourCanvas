import React from 'react';
import DrawingContainer from './DrawingContainer/DrawingContainer';
import './Main.css';
import { useAppSelector } from '../../redux/hooks';
import BlankProject from './BlankProject/BlankProject';

const Main: React.FC = () => {
  const projectType = useAppSelector((state) => state.createNewProjectButton.projectType);

  function renderProject() {
    switch (projectType) {
      case 'blank':
        return <BlankProject />;
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
