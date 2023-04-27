import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ClientType from "../../../Models/ClientType";
import store from "../../../Redux/Store";
import { FaHome } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import "./Menu.css";

function Menu(): JSX.Element {

    const [clientType, setClientType] = useState<ClientType>();

    useEffect(() => {
        setClientType(store.getState().authState.user?.clientType);
        const unsubscribe = store.subscribe(() => {
            setClientType(store.getState().authState.user?.clientType);

        });
        return unsubscribe;

    }, []);


    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        setCount(store.getState().couponsState.myCoupons?.length);
        const unsubscribe = store.subscribe(() => {
            setCount(store.getState().couponsState.myCoupons?.length);
        });
        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <div className="Menu">
            <div>
                {clientType === undefined && <>

                    <NavLink to="/home"><FaHome />  Home</NavLink>    <span> | </span>
                    <NavLink to="/about">About</NavLink>

                </>}

                {clientType === ClientType.CUSTOMER && <>
                    <span id="spanBag">
                        <NavLink id="myCoupons" to="/customer-coupons" ><MdOutlineShoppingCart id="bag" /><span id="count">{count} </span></NavLink>
                    </span><br />
                    <NavLink to="/customer-home"><FaHome /> Home</NavLink>  <span> | </span>
                    <NavLink to="/about">About</NavLink> <span> | </span>
                    <NavLink to="/customer/all-coupons">All Coupons</NavLink><span> | </span>
                    <NavLink to="/customer-coupons">My Coupons</NavLink><span>

                    </span>
                </>}

                {clientType === ClientType.COMPANY && <>
                    <NavLink to="/company-home"><FaHome /> Home</NavLink> <span> | </span>
                    <NavLink to="/about">About</NavLink>   <span> | </span>
                    <NavLink to="/company/all-coupons">All Coupons</NavLink> <span> | </span>
                    <NavLink to="/company-add-coupon">Add Coupon</NavLink>

                </>}

                {clientType === ClientType.ADMINISTRATOR && <>
                    <NavLink to="/admin-home"><FaHome /> Home</NavLink> <span> | </span>
                    <NavLink to="/about">About</NavLink>   <span> | </span>
                    <NavLink to="/admin/all-companies">All Companies</NavLink><span> | </span>
                    <NavLink to="/admin/add-company">Add Company</NavLink><span> | </span>
                    <NavLink to="/admin/all-customers">All Customers</NavLink><span> | </span>
                    <NavLink to="/admin/add-customer">Add Customer</NavLink>

                </>}
            </div>
        </div>
    );
}

export default Menu;
