
import CredentialsModel from "../../../Models/CredentialsModel";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Login from "../../AuthArea/Login/Login";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
		<header>        
                <Header/>
                  <Menu/>
                <AuthMenu/>
                
            </header>
            
            <main>
                <Routing/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default Layout;
