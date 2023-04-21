import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
import {RiRestaurantFill} from "react-icons/ri";
import {ImSearch} from "react-icons/im";
import {MdElectricalServices, MdFastfood} from "react-icons/md";
import {TbBeachOff} from "react-icons/tb";
import {FaGifts} from "react-icons/fa";
import CardPurchased from "../CardPurchased/CardPurchased";
import "./CouponsPurchaseList.css";

function CouponsPurchaseList(): JSX.Element {
    let couponId :number;

    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponsState.myCoupons);
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const [selectedName, setSelectedName] = useState<string>("");


    useEffect(()=>{
        (async ()=>{
            customerService.getCustomerCoupons().then((arr)=>{
                setCoupons(arr);
            }, (error)=>{
                notificationService.error(error);
            });
           
        })();

    }, []);


    // function handleCategoryChange(e:ChangeEvent<HTMLSelectElement>) {
    //     const currentCategory = e.currentTarget.value;
    //     setSelectedCategory(currentCategory);
    //     let fillteredCoupons = store.getState().couponsState.myCoupons;
    //     if (currentCategory != "ALL") {
    //         fillteredCoupons = fillteredCoupons.filter((coupon)=>{
    //                 return coupon.category === currentCategory;
    //         })
    //     }
    
    //     if (selectedPrice != 0) {
    //         fillteredCoupons = fillteredCoupons.filter((coupon)=>{
    //                 return coupon.price <= selectedPrice;
    //         })
    //     }
    //     setCoupons(fillteredCoupons);
    // }
    
    
    // function handlePriceChange(e:ChangeEvent<HTMLInputElement>) {
    //     const currentPrice = +e.currentTarget.value;
    //     setSelectedPrice(currentPrice);
    //     let fillteredCoupons = store.getState().couponsState.myCoupons;
    //     if (currentPrice != 0) {
    //         fillteredCoupons = fillteredCoupons.filter((coupon)=>{
    //                 return coupon.price <= currentPrice;
    //         })
    //     }
    //     if (selectedCategory != "ALL") {
    //         fillteredCoupons = fillteredCoupons.filter((coupon)=>{
    //                 return coupon.category === selectedCategory;
    //         })
    //     }
    //     setCoupons(fillteredCoupons);
    // }
    
    
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

    
    function handleFoodChange(e:FormEvent<HTMLButtonElement>) {
        const currentCategory = e.currentTarget.value;
    setSelectedCategory(currentCategory);
        let fillteredCoupons = store.getState().couponsState.coupons;
        fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                return coupon.category === "FOOD";
        })
        setSelectedCategory("FOOD");

        if (selectedPrice != 0) {
                    fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                           return coupon.price <= selectedPrice;
                    })
                }
            
    setCoupons(fillteredCoupons);
    fillteredCoupons.map((c)=> couponId= c.id);
    }
    function handleELECTRICITYChange() {
        let fillteredCoupons = store.getState().couponsState.coupons;
        fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                return coupon.category === "ELECTRICITY";
        })    
            setSelectedCategory("ELECTRICITY");

        if (selectedPrice != 0) {
            fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                   return coupon.price <= selectedPrice;
            })
        }
    
setCoupons(fillteredCoupons);
fillteredCoupons.map((c)=> couponId= c.id);
}
    function handleRESTAURANTChange() {
        let fillteredCoupons = store.getState().couponsState.coupons;
        fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                return coupon.category === "RESTAURANT";
        })
        setSelectedCategory("RESTAURANT");
        if (selectedPrice != 0) {
            fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                   return coupon.price <= selectedPrice;
            })
        }
    
setCoupons(fillteredCoupons);
fillteredCoupons.map((c)=> couponId= c.id);
}
    function handleVACATIONChange() {
        let fillteredCoupons = store.getState().couponsState.coupons;
        fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                return coupon.category === "VACATION";
        })  
              setSelectedCategory("VACATION");

        if (selectedPrice != 0) {
            fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                   return coupon.price <= selectedPrice;
            })
        }
    
setCoupons(fillteredCoupons);
fillteredCoupons.map((c)=> couponId= c.id);
}

    function handleAllChange() {
        let fillteredCoupons = store.getState().couponsState.coupons;
        fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                return coupon;
        })  
              setSelectedCategory("ALL");

        if (selectedPrice != 0) {
            fillteredCoupons = fillteredCoupons.filter((coupon)=>{
                   return coupon.price <= selectedPrice;
            })
        }
    
setCoupons(fillteredCoupons);
fillteredCoupons.map((c)=> couponId= c.id);
}


    return (
        <div className="CouponsPurchaseList" id="up-list-purchase">
{/* 
<label>Sort by category: </label>
<select value={selectedCategory} onChange={handleCategoryChange} name="category" id="category">
                    <option value="ALL">ALL</option>
                    <option value={Category.FOOD}>FOOD</option>
                    <option value={Category.ELECTRICITY}>ELECTRICITY</option>
                    <option value={Category.RESTAURANT}>RESTAURANT</option>
                    <option value={Category.VACATION}>VACATION</option>
                </select>

                Until Price: <input type="number" name="price" id="price" min={0} onChange={handlePriceChange} value={selectedPrice} />
    <br/> */}
    <form className="formPrice">
<span>Until price:</span> <input type="number" name="price" id="price" placeholder="Until price" min={0} onChange={handlePriceChange} value={selectedPrice} />
</form>

<button onClick={handleFoodChange} value={"FOOD"}> <MdFastfood/> <br/>FOOD</button>
<button onClick={handleELECTRICITYChange} value={"ELECTRICITY"}><MdElectricalServices/> <br/> ELECTRICITY</button>
<button onClick={handleRESTAURANTChange} value={"RESTAURANT"}><RiRestaurantFill/> <br/> RESTAURANT</button>
<button onClick={handleVACATIONChange} value={"VACATION"}><TbBeachOff/><br/> VACATION</button>
<button onClick={handleAllChange} value={"All"}><FaGifts/> <br/>All coupons</button>
                      <form ><ImSearch/>
<input type="text" name="name" id="name" placeholder="Enter coupon title for search" onChange={handleNameChange}
 value={selectedName} /> 
 </form>  <br/> 
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
