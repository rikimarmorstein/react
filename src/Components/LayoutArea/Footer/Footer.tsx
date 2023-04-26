import { BsGithub } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import "./Footer.css";


function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <span>&copy; Riki Marmorstein &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp; <a href="https://github.com/rikimarmorstein?tab=repositories" target="newwin" title="To my github"><BsGithub className="git" /></a>
                <a href="https://wa.me/972559339449?text=%D7%9C%D7%A9%D7%9C%D7%99%D7%97%D7%AA%20%D7%94%D7%95%D7%93%D7%A2%D7%94
" target="newwin" title="Chat on WhatsApp"><BsWhatsapp className="whatsapp" /></a>&nbsp;&nbsp;
                <a href="mailto:rikim1010@gmail.com?subject=to deer chv&body=my deer i so want to back to you" className="email" title="Send an email" target="newwin"><MdAlternateEmail /></a>



            </span>
        </div>
    );
}
export default Footer;
