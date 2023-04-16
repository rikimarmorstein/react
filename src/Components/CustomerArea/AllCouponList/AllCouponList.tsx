import { ChangeEvent, useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import store from "../../../Redux/Store";
import Category from "../../../Models/Category";
import notificationService from "../../../Services/NotificationService";
import CouponCardPurchase from "../CouponDetailsPurchase/CouponDetailsPurchase";
import "./AllCouponList.css";
import allCouponsService from "../../../Services/AllCouponsService";

function AllCouponList(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponsState.coupons);
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);



    useEffect(()=>{
        (async ()=>{
            allCouponsService.getAllCoupons().then((arr)=>{
                setCoupons(arr);
            }, (error)=>{
                notificationService.error(error);
            });
           
        })();

    }, []);


    function handleCategoryChange(e:ChangeEvent<HTMLSelectElement>) {
        const currentCategory = e.currentTarget.value;
        setSelectedCategory(currentCategory);
        let fillteredCoupons = store.getState().couponsState.coupons;
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
    


    return (
        <div className="AllCouponList" id="up">
            
<label>Sort by category: </label>

<select value={selectedCategory} onChange={handleCategoryChange} name="category" id="category">
                    <option value="ALL">ALL</option>
                    <option value={Category.FOOD}>FOOD</option>
                    <option value={Category.ELECTRICITY}>ELECTRICITY</option>
                    <option value={Category.RESTAURANT}>RESTAURANT</option>
                    <option value={Category.VACATION}>VACATION</option>
                </select>
                Until price: <input type="number" name="price" id="price" min={0} onChange={handlePriceChange} value={selectedPrice} />
    <br/>
    {coupons.length > 0 ? coupons.map((c)=>(
    <CouponCardPurchase key={c.id} coupon={c}/>
)) : 
<h2>No coupons</h2>}

{    coupons.length > 0 && <a id="list-top-coupons" href="#up" title="Scroll up">👆</a>
    }
    
        </div>
    );
}

export default AllCouponList;
