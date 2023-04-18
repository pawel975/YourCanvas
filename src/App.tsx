import './App.css';
import Main from './pages/Main/Main';
import NavBar from './layouts/NavBar/NavBar';
import ToolBar from './layouts/ToolBar/ToolBar';
import React from 'react';
import { useAppSelector } from './redux/hooks';

const App: React.FC = () => {
  const projectType = useAppSelector((state) => state.createNewProjectButton.projectType);

  return (
    <div className="app">
      <NavBar />
      <div className="app__creator-wrapper">
        {projectType !== 'blank' && <ToolBar />}
        <Main />
      </div>
    </div>
  );
};

export default App;
