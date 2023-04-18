import { Link, NavLink } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import gift from "../../../Assets/Images/Gift.gif"
import {AiFillHeart} from "react-icons/ai"
import {BsFillSuitHeartFill} from "react-icons/bs"
import {HiShoppingCart} from "react-icons/hi";
import {RxScissors} from "react-icons/rx"


import "./CouponDetailsPurchase.css";
import { ChangeEvent, useState } from "react";
import store from "../../../Redux/Store";

interface CouponCardProps {
    coupon: Coupon;
}
function CouponDetailsPurchase(props: CouponCardProps): JSX.Element {
    // const [coupons, setCoupons] = useState<Coupon[]>([]);

    
    function formatDate( date: Date) {
        let dateForm = new Date(date),
            month = '' + (dateForm.getMonth() + 1),
            day = '' + dateForm.getDate(),
            year = dateForm.getFullYear();
    
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    

    return (
        <div className="CouponDetailsPurchase">
            {/* <ImGift className="coupon-image"/> */}
            <RxScissors className="coupon-image"/>

            {/* <img className="coupon-image" src={gift} /> */}
{/* <img className="coupon-image" src="" ><ImGift/></img> */}
{/* <ImGift className="coupon-image" /> */}
            <div>
            <div className="container">

                <img src={props.coupon.image} alt="Avatar" className="image"/><br/>
                {/* <hr /> */}
                <div className="middle">
    <div className="text"><NavLink to={"/customer/purchase/" + props.coupon.id} title="Buy"> <HiShoppingCart className="buy"/></NavLink></div>
                </div>                </div>

                
                 {props.coupon.category}<br />

                <hr/>
          <span>     {props.coupon.title} </span>- { props.coupon.description}<br />
                Valid until: {formatDate(props.coupon.endDate)}<br />
                In stock: {props.coupon.amount}<br />
                <h3>  {props.coupon.price} NIS</h3>
                {/* imageName: {props.coupon.imageName}<br /> */}
            </div>

            {/* <div> */}

{/* <br/> */}

                {/* <NavLink to={"/customer/purchase/" + props.coupon.id} title="Buy"> <HiShoppingCart/></NavLink> */}

            {/* </div> */}
        </div>
    );
}

export default CouponDetailsPurchase;
