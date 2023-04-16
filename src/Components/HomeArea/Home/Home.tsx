import { ChangeEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import allCouponsService from "../../../Services/AllCouponsService";
import companyService from "../../../Services/CompanyService";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import CompanyList from "../../AdminArea/CompanyList/CompanyList";
import Login from "../../AuthArea/Login/Login";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";
import CouponList from "../../CompanyArea/CouponList/CouponList";
import CouponCardPurchase from "../../CustomerArea/CouponCardPurchase copy/CouponCardPurchase";
import CouponDetailsPurchase from "../../CustomerArea/CouponDetailsPurchase/CouponDetailsPurchase";
import Loading from "../../SharedArea/Loading/Loading";
import {ImSearch} from "react-icons/im";

import "./Home.css";
import store from "../../../Redux/Store";

function Home(): JSX.Element {
    
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [selectedName, setSelectedName] = useState<string>("");
    let couponId :number;

    useEffect(()=>{
        (async ()=>{
            allCouponsService.getAllCoupons().then((arr)=>{
                setCoupons(arr);
            }, (error)=>{
                notificationService.error(error);
            });
           
        })();

    }, []);
    function handleNameChange(e:ChangeEvent<HTMLInputElement>) {
    
        const currentName = e.currentTarget.value;
        console.log(currentName);
        setSelectedName(currentName);
        let fillteredCompanies = store.getState().couponsState.coupons;
        const currentNameCase = currentName.toUpperCase();
        // const b = currentName.toUpperCase;
        // if (currentName != "ALL") {
            fillteredCompanies = fillteredCompanies.filter((coupon)=>{
             return coupon.title.toUpperCase().match(currentNameCase);
                    
            }  
                      
            )
            // console.log(fillteredCompanies);
                setCoupons(fillteredCompanies);
        // console.log(fillteredCompanies);
            fillteredCompanies.map((c)=> couponId= c.id);
        // console.log(fillteredCompanies.length);
        }

    return (
        <div className="Home" id="coupons-list-top">
						<h1 className="fluttering">Top Coupons</h1>
                        <form ><ImSearch/>
<input type="text" name="name" id="name" placeholder="Enter coupon title for search" onChange={handleNameChange}
 value={selectedName} /> 
 </form>   
{coupons.length===0 &&<h2>No data for search results 🙁</h2>}
{coupons.map((c)=>(
    <CouponDetailsPurchase key={c.id} coupon={c}/>
))}
{
    coupons.length > 0 && <a id="top" href="#coupons-list-top" title="Scroll up">👆</a>
        }

           
           

        </div>
    );
}

export default Home;
