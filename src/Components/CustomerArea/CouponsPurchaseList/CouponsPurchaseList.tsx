import { ChangeEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import store from "../../../Redux/Store";
import Category from "../../../Models/Category";

import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import Loading from "../../SharedArea/Loading/Loading";
import CouponCardPurchase from "../CouponCardPurchase copy/CouponCardPurchase";
import CouponDetailsPurchase from "../CouponDetailsPurchase/CouponDetailsPurchase";
import {ImGift} from "react-icons/im"

import "./CouponsPurchaseList.css";
import CardPurchased from "../CardPurchased/CardPurchased";

function CouponsPurchaseList(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponsState.myCoupons);
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);


    useEffect(()=>{
        (async ()=>{
            customerService.getCustomerCoupons().then((arr)=>{
                setCoupons(arr);
            }, (error)=>{
                notificationService.error(error);
            });
           
        })();

    }, []);


    function handleCategoryChange(e:ChangeEvent<HTMLSelectElement>) {
        const currentCategory = e.currentTarget.value;
        setSelectedCategory(currentCategory);
        let fillteredCoupons = store.getState().couponsState.myCoupons;
        if (currentCategory != "ALL") {
            fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                    return coupon.category === currentCategory;
            })
        }
    
        if (selectedPrice != 0) {
            fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                    return coupon.price <= selectedPrice;
            })
        }
        setCoupons(fillteredCoupons);
    }
    
    
    function handlePriceChange(e:ChangeEvent<HTMLInputElement>) {
        const currentPrice = +e.currentTarget.value;
        setSelectedPrice(currentPrice);
        let fillteredCoupons = store.getState().couponsState.myCoupons;
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
    
    

    return (
        <div className="CouponsPurchaseList" id="up-list-purchase">

<label>Sort by category: </label>
<select value={selectedCategory} onChange={handleCategoryChange} name="category" id="category">
                    <option value="ALL">ALL</option>
                    <option value={Category.FOOD}>FOOD</option>
                    <option value={Category.ELECTRICITY}>ELECTRICITY</option>
                    <option value={Category.RESTAURANT}>RESTAURANT</option>
                    <option value={Category.VACATION}>VACATION</option>
                </select>

                Until Price: <input type="number" name="price" id="price" min={0} onChange={handlePriceChange} value={selectedPrice} />
    <br/>
    {coupons.length > 0 ? coupons.map((c)=>(
    <CardPurchased key={c.id} coupon={c}/>
)) : 
<h2>No coupons,
To purchase click here ⬇<br/>
<NavLink to="/customer/all-coupons">I want to purchase a coupon</NavLink></h2>


}

<br/>
{/*         
        	{coupons.map((c)=>(
    <CouponDetailsPurchase key={c.id} coupon={c}/>))}
{coupons.length===0 && <Loading/>}<br/> */}
{    coupons.length > 0 && <a id="list-top" href="#up-list-purchase" title="Scroll up">👆</a>
    }<br/><br/>
{/* <NavLink id="backToHome" to="/customer">↪</NavLink> */}
        </div>
    );
}

export default CouponsPurchaseList;
