import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import { logoutAction as logoutCompany } from "../../../Redux/CompanyState";
import { logoutAction as logoutCoupon} from "../../../Redux/CouponState";
import { logoutAction as logoutCustomer } from "../../../Redux/CustomerState";
import authService from "../../../Services/AuthService";
import {FaUserAlt} from "react-icons/fa";
import {CgUserList} from "react-icons/cg";

import {FiLogOut} from "react-icons/fi";

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

    
    // const [count, setCount]= useState<number>(0);

    // useEffect(()=>{
    //     setCount(store.getState().couponsState.myCoupons.length);
    //     const unsubscribe = store.subscribe(()=>{
    //     setCount(store.getState().couponsState.myCoupons.length);
    //         });
    //         return ()=>{
    //             unsubscribe(); 
    //         };
    // },[]);

    // if(count===0)return null;


    return (
        <div className="AuthMenu">
            {!user &&
                <>
                    <span > 
                    <NavLink to="/login" title="Login"> <CgUserList className="login"/></NavLink></span>
                    {/* <br/>Login */}
                </>
            }
            {user &&
                <>
                    <span >{user.clientType==="CUSTOMER" &&  <NavLink id="details" to="/customerDetails"><FaUserAlt title="Customer details" /></NavLink> }  Hello {user.name} | </span>
                    <NavLink to="" onClick={logout} id="logout">Logout <FiLogOut className="out"/></NavLink>
                    {/* <br/>{user.clientType==="CUSTOMER" &&  <NavLink id="details" to="/customerDetails"><FaUserAlt title="Customer details" /></NavLink> } */}
                </>   }
                
                {/* <br/> */}
{/* {user.clientType==="CUSTOMER" && 
<>
<NavLink to="/customer-coupons"><TbShoppingBag id="bag"/><span id="count">{count} </span></NavLink>
</>} */}
{/* <span id="bag"><TbShoppingBag/></span><span id="count"> {count}</span> */}

         
        </div>
    );
}

export default AuthMenu;
