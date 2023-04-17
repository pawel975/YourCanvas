import CreateNewProjectMenu from './CreateNewProjectMenu/CreateNewProjectMenu';
import Logo from './Logo/Logo';
import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="nav-bar">
      <Logo />
      <CreateNewProjectMenu />
    </nav>
  );
};

export default NavBar;
