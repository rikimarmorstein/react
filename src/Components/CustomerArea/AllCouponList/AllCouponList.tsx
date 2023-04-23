import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import store from "../../../Redux/Store";
import Category from "../../../Models/Category";
import notificationService from "../../../Services/NotificationService";
import CouponCardPurchase from "../CouponDetailsPurchase/CouponDetailsPurchase";
import "./AllCouponList.css";
import allCouponsService from "../../../Services/AllCouponsService";
import {RiRestaurantFill} from "react-icons/ri";
import {ImSearch} from "react-icons/im";
import {MdElectricalServices, MdFastfood} from "react-icons/md";
import {TbBeachOff} from "react-icons/tb";
import {FaGifts} from "react-icons/fa";
function AllCouponList(): JSX.Element {
    let couponId :number;

    // const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponsState.coupons);
    const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const [selectedName, setSelectedName] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");



    useEffect(()=>{
        (async ()=>{
            allCouponsService.getAllCoupons().then((arr)=>{
                setCoupons(arr);
            }, (error)=>{
                notificationService.error(error);
            });
           
        })();

    }, []);


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
    
    function handleNameChange(e:ChangeEvent<HTMLInputElement>) {
    const currentName = e.currentTarget.value;
    setSelectedName(currentName);
    let fillteredCoupons = store.getState().couponsState.coupons;
    const currentNameCase = currentName.toUpperCase();
        fillteredCoupons = fillteredCoupons.filter((coupon)=>{
         return coupon.title.toUpperCase().match(currentNameCase);
        }  
        )
            setCoupons(fillteredCoupons);
    fillteredCoupons.map((c)=> couponId= c.id);
    }
    

    return (
        <div className="AllCouponList" id="up">
            
{/* <label>Sort by category: </label> */}
{/* <select value={selectedCategory} onChange={handleCategoryChange} name="category" id="category">
                    <option value="ALL">ALL</option>
                    <option value={Category.FOOD}>FOOD</option>
                    <option value={Category.ELECTRICITY}>ELECTRICITY</option>
                    <option value={Category.RESTAURANT}>RESTAURANT</option>
                    <option value={Category.VACATION}>VACATION</option>
                </select>
                Until price: <input type="number" name="price" id="price" min={0} onChange={handlePriceChange} value={selectedPrice} />
    <br/> */}
    <form className="formPrice">
<span>Until price:</span> <input type="number" name="price" id="price" placeholder="Until price" min={0} onChange={handlePriceChange} value={selectedPrice} />
</form>
<button onClick={handleCategoryChange} value={Category.FOOD}> <MdFastfood/> <br/>FOOD</button>
<button onClick={handleCategoryChange} value={Category.ELECTRICITY}   ><MdElectricalServices/> <br/> ELECTRICITY</button>
<button onClick={handleCategoryChange} value={Category.RESTAURANT}><RiRestaurantFill/> <br/> RESTAURANT</button>
<button onClick={handleCategoryChange} value={Category.VACATION}><TbBeachOff/><br/> VACATION</button>
<button onClick={handleCategoryChange} value={"ALL"}><FaGifts/> <br/>All COUPONS</button>

                        <form ><ImSearch/>
<input type="text" name="name" id="name" placeholder="Enter coupon title for search" onChange={handleNameChange}
 value={selectedName} /> 
 </form>  <br/> 

    {coupons.length > 0 ? coupons.map((c)=>(
    <CouponCardPurchase key={c.id} coupon={c}/>
)) : 
<h2>No coupons found 🙁</h2>}
<div className="list-top-coupons">
{    coupons.length > 0 && <a href="#up" title="Scroll up">👆</a>
    }</div>
    
        </div>
    );
}

export default AllCouponList;
