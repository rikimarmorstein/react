import { NavLink } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import { HiShoppingCart } from "react-icons/hi";
import { RxScissors } from "react-icons/rx"
import "./CouponDetailsPurchase.css";


interface CouponCardProps {
    coupon: Coupon;
}
function CouponDetailsPurchase(props: CouponCardProps): JSX.Element {


    function formatDate(date: Date) {
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
            <RxScissors className="coupon-image" />
            <div>
                <div className="container">

                    <img src={props.coupon.image} alt="Avatar" className="image" /><br />
                    <div className="middle">
                        <div className="text"><NavLink to={"/customer/purchase/" + props.coupon.id} title="Buy"> <HiShoppingCart className="buy" /></NavLink></div>
                    </div></div>
                <h5>{props.coupon.company.name} company</h5>
                {props.coupon.category}<br />
                <hr />
                {props.coupon.title}
                <br />{props.coupon.description}<br />
                Valid until: {formatDate(props.coupon.endDate)}<br />
                In stock: {props.coupon.amount}<br />
                <h3>{props.coupon.price} NIS</h3>
            </div>

        </div>
    );
}

export default CouponDetailsPurchase;
