import CreateNewProjectButton from "./CreateNewProjectButton/CreateNewProjectButton";
import Logo from "./Logo/Logo";
import "./NavBar.css";

const NavBar: React.FC = () => {
    return (
        <nav className="nav-bar">
            <Logo/>
            <CreateNewProjectButton/>
        </nav>
    )
}

export default NavBar;

