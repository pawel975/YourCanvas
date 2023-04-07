import React from "react";
import ProjectContainer from "./ProjectContainer/ProjectContainer";
import "./Main.css";

interface MainProps {
  isProjectActive: boolean;
}

const Main: React.FC<MainProps> = ({ isProjectActive }) => {
  return (
    <main className="main">{isProjectActive && <ProjectContainer />}</main>
  );
};

export default Main;
