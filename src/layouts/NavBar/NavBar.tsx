import CreateNewProjectButton from './CreateNewProjectMenu/CreateNewProjectButton';
import Logo from './Logo/Logo';
import './NavBar.css';

interface NavBarProps {
  createNewProject: Function;
}

const NavBar: React.FC<NavBarProps> = ({ createNewProject }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <CreateNewProjectButton createNewProject={createNewProject} />
    </nav>
  );
};

export default NavBar;
