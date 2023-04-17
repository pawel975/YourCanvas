import './App.css';
import Main from './pages/Main/Main';
import NavBar from './layouts/NavBar/NavBar';
import ToolBar from './layouts/ToolBar/ToolBar';
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="app">
      <NavBar />
      <div className="app__creator-wrapper">
        <ToolBar />
        <Main />
      </div>
    </div>
  );
};

export default App;
