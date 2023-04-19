import "./Header.css";
import giftImage from "../../../Assets/Images/Gift.gif";
import {ImGift} from "react-icons/im";
function Header(): JSX.Element {
    return (
        <div className="Header">
			{/* <img src={giftImage}/> */}
                 <h1>Coupons</h1><ImGift className="logo"/>
                <h2>By Riki</h2>
                <h3>ghjkjhg</h3>
        </div>
    );
}

export default Header;
