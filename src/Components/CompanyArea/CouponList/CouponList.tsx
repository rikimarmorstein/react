import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Category from "../../../Models/Category";
import Coupon from "../../../Models/Coupon";
import store from "../../../Redux/Store";

import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import Loading from "../../SharedArea/Loading/Loading";
import CouponCard from "../CouponCard/CouponCard";
import {RiRestaurantFill} from "react-icons/ri";
import {ImSearch} from "react-icons/im";
import {MdElectricalServices, MdFastfood} from "react-icons/md";
import {TbBeachOff} from "react-icons/tb";
import {FaGifts} from "react-icons/fa";
import "./CouponList.css";

function CouponList(): JSX.Element {

    let couponId :number;

    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponsState.coupons);
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const [selectedName, setSelectedName] = useState<string>("");

    useEffect(()=>{
        (async ()=>{
            companyService.getAllCoupons().then((arr)=>{

                setCoupons(arr);
            }, (error)=>{
                console.log("error"+error);
                
                notificationService.error(error);
            });
           
        })();

    }, []);


// function handleCategoryChange(e:ChangeEvent<HTMLSelectElement>) {
//     const currentCategory = e.currentTarget.value;
//     setSelectedCategory(currentCategory);
//     let fillteredCoupons = store.getState().couponsState.coupons;
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
//     let fillteredCoupons = store.getState().couponsState.coupons;
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


function handleFoodChange() {
    let fillteredCoupons = store.getState().couponsState.coupons;
    fillteredCoupons = fillteredCoupons.filter((coupon)=>{
            return coupon.category === "FOOD";
    })
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
    if (selectedPrice != 0) {
        fillteredCoupons = fillteredCoupons.filter((coupon)=>{
               return coupon.price <= selectedPrice;
        })
    }

setCoupons(fillteredCoupons);
fillteredCoupons.map((c)=> couponId= c.id);
}

    return (
        <div className="CouponList" id="coupons-list-top">
		{/* <NavLink id="plus" to="new">add 🔴</NavLink> */}

{/* {companies.length===0 &&<Loading/>} */}
<form className="formPrice">
<span>Until price:</span> <input type="number" name="price" id="price" placeholder="Until price" min={0} onChange={handlePriceChange} value={selectedPrice} />
</form>
<button onClick={handleFoodChange} > <MdFastfood/> <br/>FOOD</button>
<button onClick={handleELECTRICITYChange} ><MdElectricalServices/> <br/> ELECTRICITY</button>
<button onClick={handleRESTAURANTChange} ><RiRestaurantFill/> <br/> RESTAURANT</button>
<button onClick={handleVACATIONChange} ><TbBeachOff/><br/> VACATION</button>
<button onClick={handleAllChange} ><FaGifts/> <br/>All</button>

                        <form ><ImSearch/>
<input type="text" name="name" id="name" placeholder="Enter coupon title for search" onChange={handleNameChange}
 value={selectedName} /> 
 </form>  <br/> 

{/* <label>Sort by category: </label>
<select value={selectedCategory} onChange={handleCategoryChange} name="category" id="category">
                    <option value="ALL">ALL</option>
                    <option value={Category.FOOD}>FOOD</option>
                    <option value={Category.ELECTRICITY}>ELECTRICITY</option>
                    <option value={Category.RESTAURANT}>RESTAURANT</option>
                    <option value={Category.VACATION}>VACATION</option>
                </select>

                Until price: <input type="number" name="price" id="price" min={0} onChange={handlePriceChange} value={selectedPrice} />
<br/> */}
{coupons.length > 0 ? coupons.map((c)=>(
    <CouponCard key={c.id} coupon={c}/>
)) : 
<h2>No coupons</h2>}


<br/>
{/* {coupons.length===0 && store.getState().couponsState.coupons.length>0  && 
{store.getState().couponsState.coupons.length===0 &&  <span> No coupons</span>}
<br/><br/><br/> */}
{
    coupons.length > 0 && <a id="list-top-coupon" href="#coupons-list-top" title="Scroll up">👆</a>
    }
{/* <NavLink id="backToHome" to="/company-home">↪</NavLink> */}


       {/* <form >         
                            <label>Category: </label>
                <select defaultValue="" required {...register("category")}>
                    <option disabled value="">Select...</option>
                    <option value={Category.FOOD}>FOOD</option>
                    <option value={Category.ELECTRICITY}>ELECTRICITY</option>
                    <option value={Category.RESTAURANT}>RESTAURANT</option>
                    <option value={Category.VACATION}>VACATION</option>
                </select>
               </form>
<button onClick={handleSubmit(couponsByCategory)}>category</button> */}{/* <form >
                            <label>Category: </label>
                <select defaultValue="" required {...register("category")}>
                    <option disabled value="">Select...</option>
                    <option value={Category.FOOD}>FOOD</option>
                    <option value={Category.ELECTRICITY}>ELECTRICITY</option>
                    <option value={Category.RESTAURANT}>RESTAURANT</option>
                    <option value={Category.VACATION}>VACATION</option>
                </select>
               </form>
<button onClick={handleSubmit(couponsByCategory)}>category</button> */}
        </div>
    );
}


export default CouponList;
