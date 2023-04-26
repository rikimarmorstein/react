import imageLogo from "../../../Assets/Images/rikiLogo.png";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <img src={imageLogo} />
        </div>
    );
}

export default Header;
