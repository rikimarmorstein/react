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
import { Button, FormControlLabel, Paper, Slide, Switch, Theme, createStyles, makeStyles } from "@mui/material";
import React from "react";
import { log } from "console";

function Home(): JSX.Element {
    
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [selectedName, setSelectedName] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<Coupon[]>([]);

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
        setSelectedName(currentName);
        let fillteredCoupons = store.getState().couponsState.coupons;
        const currentNameCase = currentName.toUpperCase();
        // const b = currentName.toUpperCase;
        // if (currentName != "ALL") {
            fillteredCoupons = fillteredCoupons.filter((coupon)=>{
             return coupon.title.toUpperCase().match(currentNameCase);
                    
            }  
                      
            )
            // console.log(fillteredCompanies);
                setCoupons(fillteredCoupons);
        // console.log(fillteredCompanies);
        fillteredCoupons.map((c)=> couponId= c.id);
        // console.log(fillteredCompanies.length);
        }

        
        function handleFoodChange() {
            let fillteredCoupons = store.getState().couponsState.coupons;
            fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                    return coupon.category === "FOOD";
            })
        setCoupons(fillteredCoupons);
        fillteredCoupons.map((c)=> couponId= c.id);
        }
        function handleELECTRICITYChange() {
            let fillteredCoupons = store.getState().couponsState.coupons;
            fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                    return coupon.category === "ELECTRICITY";
            })
        setCoupons(fillteredCoupons);
        fillteredCoupons.map((c)=> couponId= c.id);
        }
        function handleRESTAURANTChange() {
            let fillteredCoupons = store.getState().couponsState.coupons;
            fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                    return coupon.category === "RESTAURANT";
            })
        setCoupons(fillteredCoupons);
        fillteredCoupons.map((c)=> couponId= c.id);
        }
        function handleVACATIONChange() {
            let fillteredCoupons = store.getState().couponsState.coupons;
            fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                    return coupon.category === "VACATION";
            })
        setCoupons(fillteredCoupons);
        fillteredCoupons.map((c)=> couponId= c.id);
        }
    return (
        <div className="Home" id="coupons-list-top">
<button onClick={handleFoodChange} >FOOD</button>
<button onClick={handleELECTRICITYChange} >ELECTRICITY</button>
<button onClick={handleRESTAURANTChange} >RESTAURANT</button>
<button onClick={handleVACATIONChange} >VACATION</button>
<button >ALL</button>
						<h1 className="fluttering">Top Coupons</h1>
                        <form ><ImSearch/>
<input type="text" name="name" id="name" placeholder="Enter coupon title for search" onChange={handleNameChange}
 value={selectedName} /> 
 </form>  <br/> 
{coupons.length===0 &&<h2>No coupons found 🙁</h2>}
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
