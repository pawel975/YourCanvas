import "./App.css";
import Main from "./pages/Main/Main";
import NavBar from "./layouts/NavBar/NavBar";
import ToolBar from "./layouts/ToolBar/ToolBar";
import React, { useState } from "react";

const App: React.FC = () => {
  const [isProjectActive, setIsProjectActive] = useState<boolean>(false);

  function createNewProject() {
    setIsProjectActive(true);
  }

  return (
    <div className="app">
      <NavBar createNewProject={createNewProject} />
      <div className="app__creator-wrapper">
        <ToolBar />
        <Main isProjectActive={isProjectActive} />
      </div>
    </div>
  );
};

export default App;
