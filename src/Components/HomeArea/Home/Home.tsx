import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
import {RiRestaurantFill} from "react-icons/ri";
import {ImSearch} from "react-icons/im";
import {MdElectricalServices, MdFastfood} from "react-icons/md";
import {TbBeachOff} from "react-icons/tb";
import {FaGifts} from "react-icons/fa";

import store from "../../../Redux/Store";
import { Button, FormControlLabel, Paper, Slide, Switch, Theme, createStyles, makeStyles } from "@mui/material";
import React from "react";
import { log } from "console";
import "./Home.css";
import Category from "../../../Models/Category";

function Home(): JSX.Element {
    
    // const [coupons, setCoupons] = useState<Coupon[]>([]);
    // const [selectedName, setSelectedName] = useState<string>("");
    // const [selectedCategory, setSelectedCategory] = useState<Coupon[]>([]);
    // const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponsState.myCoupons);
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);
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
        function handlePriceChange(e:ChangeEvent<HTMLInputElement>) {
            const currentPrice = +e.currentTarget.value;
            setSelectedPrice(currentPrice);
               let fillteredCoupons = store.getState().couponsState.coupons;
           if (currentPrice != 0) {
                    fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                            return coupon.price <= currentPrice;
                    })
                }
                if (selectedCategory != "ALL") {
                    fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                        return coupon.category === selectedCategory;
                     })
                 }
                    setCoupons(fillteredCoupons);  
            }
        function handleCategoryChange(e:FormEvent<HTMLButtonElement>) {
            let currentCategory = e.currentTarget.value;
             setSelectedCategory(currentCategory);
             let fillteredCoupons = store.getState().couponsState.coupons;
              if (currentCategory != "ALL") {
             fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                  return coupon.category === currentCategory;
                })
               }setSelectedCategory(currentCategory);
               if (selectedPrice != 0) {
               fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                   return coupon.price <= selectedPrice;
                  })
                  }
                   setCoupons(fillteredCoupons);
                  fillteredCoupons.map((c)=> couponId= c.id);
              }
      

    return (
        <div className="Home" id="coupons-list-top">
            <h1 className="fluttering">Top Coupons</h1>

<form className="formPrice">
<span>Until price:</span> <input type="number" name="price" id="price" placeholder="Until price" min={0} onChange={handlePriceChange} value={selectedPrice} />
</form>

<button onClick={handleCategoryChange} value={Category.FOOD}> <MdFastfood/> <br/>FOOD</button>
<button onClick={handleCategoryChange} value={Category.ELECTRICITY}   ><MdElectricalServices/> <br/> ELECTRICITY</button>
<button onClick={handleCategoryChange} value={Category.RESTAURANT}><RiRestaurantFill/> <br/> RESTAURANT</button>
<button onClick={handleCategoryChange} value={Category.VACATION}><TbBeachOff/><br/> VACATION</button>
<button onClick={handleCategoryChange} value={"ALL"}><FaGifts/><br/>All COUPONS</button>
						
                        <form ><ImSearch/>
<input type="text" name="name" id="name" placeholder="Enter coupon title for search" onChange={handleNameChange}
 value={selectedName} /> 
 </form>  <br/> 
{coupons.length===0 &&<h2>No coupons found 🙁</h2>}
{coupons.map((c)=>(
    <CouponDetailsPurchase key={c.id} coupon={c}/>
))}
<div className="top">
{
    coupons.length > 0 && <a href="#coupons-list-top" title="Scroll up">👆</a>
        }</div>
        </div>
    );
}

export default Home;
