import './App.css';
import Main from './pages/Main/Main';
import NavBar from './layouts/NavBar/NavBar';
import ToolBar from './layouts/ToolBar/ToolBar';
import React, { useState } from 'react';
import { CurrentToolId } from './globalTypes';

const App: React.FC = () => {
  const [isProjectActive, setIsProjectActive] = useState<boolean>(false);
  const [currentToolId, setCurrentToolId] = useState<CurrentToolId>('marker-draw');
  const [pickedColorId, setPickedColorId] = useState<string>('black');

  function createNewProject() {
    setIsProjectActive(true);
  }

  function handleToolbarToolClick(e: MouseEvent) {
    const tool = e.target as HTMLButtonElement;
    setCurrentToolId(tool.id as CurrentToolId);
  }

  function handleToolbarColorClick(e: MouseEvent) {
    const color = e.target as HTMLButtonElement;
    setPickedColorId(color.id);
  }

  return (
    <div className="app">
      <NavBar createNewProject={createNewProject} />
      <div className="app__creator-wrapper">
        <ToolBar
          currentToolId={currentToolId}
          pickedColorId={pickedColorId}
          handleToolbarToolClick={handleToolbarToolClick}
          handleToolbarColorClick={handleToolbarColorClick}
        />
        <Main
          pickedColorId={pickedColorId}
          currentToolId={currentToolId}
          isProjectActive={isProjectActive}
        />
      </div>
    </div>
  );
};

export default App;
