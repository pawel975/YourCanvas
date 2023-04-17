import './App.css';
import Main from './pages/Main/Main';
import NavBar from './layouts/NavBar/NavBar';
import ToolBar from './layouts/ToolBar/ToolBar';
import React, { useState } from 'react';
import { CurrentToolId } from './globalTypes';

const App: React.FC = () => {
  const [currentToolId, setCurrentToolId] = useState<CurrentToolId>('marker-draw');
  const [pickedColorHexId, setPickedColorHexId] = useState<string>('#000000');

  function handleToolbarToolClick(e: MouseEvent) {
    const tool = e.target as HTMLButtonElement;
    setCurrentToolId(tool.id as CurrentToolId);
  }

  function handleToolbarColorClick(e: MouseEvent) {
    const color = e.target as HTMLButtonElement;
    console.log(color);
    setPickedColorHexId(color.id);
  }

  return (
    <div className="app">
      <NavBar />
      <div className="app__creator-wrapper">
        <ToolBar
          currentToolId={currentToolId}
          pickedColorHexId={pickedColorHexId}
          handleToolbarToolClick={handleToolbarToolClick}
          handleToolbarColorClick={handleToolbarColorClick}
        />
        <Main
          pickedColorHexId={pickedColorHexId}
          currentToolId={currentToolId}
        />
      </div>
    </div>
  );
};

export default App;
