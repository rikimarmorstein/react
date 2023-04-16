import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import { logoutAction as logoutCompany } from "../../../Redux/CompanyState";
import { logoutAction as logoutCoupon} from "../../../Redux/CouponState";
import { logoutAction as logoutCustomer } from "../../../Redux/CustomerState";
import authService from "../../../Services/AuthService";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {


    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        
        setUser(store.getState().authState.user); // First update

        const unsubscribe = store.subscribe(()=>{
            setUser(store.getState().authState.user); // Any other update
        });

        // Will be called when component destroyed
        return unsubscribe; // Stop listening

    }, []);

    function logout(): void {
        authService.logout();
        store.dispatch(logoutCompany());
        store.dispatch(logoutCoupon());
        store.dispatch(logoutCustomer());
        
    }

    return (
        <div className="AuthMenu">
            {!user &&
                <>
                    <span>Hello Guest | </span>
                    <NavLink to="/login">Login</NavLink>
                </>
            }
            {user &&
                <>
                    <span>Hello {user.name} | </span>
                    <NavLink to="" onClick={logout}>Logout</NavLink>
                </>
            }
        </div>
    );
}

export default AuthMenu;
