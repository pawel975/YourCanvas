import Logo from "./Logo/Logo";
import "./NavBar.css";

const NavBar: React.FC = () => {
    return (
        <nav className="nav-bar">
            <Logo/>
        </nav>
    )
}

export default NavBar;