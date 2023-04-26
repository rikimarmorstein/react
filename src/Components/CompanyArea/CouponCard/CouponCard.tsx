import { NavLink } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import { BsFillPencilFill } from "react-icons/bs";
import "./CouponCard.css";


interface CouponCardProps {
    coupon: Coupon;
}

function CouponCard(props: CouponCardProps): JSX.Element {
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
        <div className="CouponCard">
            <div>
                category: {props.coupon.category}<br />
                <hr />
                <img src={props.coupon.image} alt="" /><br />
                title: {props.coupon.title}<br />
                description: {props.coupon.description}<br />
                start date: {formatDate(props.coupon.startDate)}<br />
                end date: {formatDate(props.coupon.endDate)}<br />
                amount: {props.coupon.amount}<br />
                price: {props.coupon.price}
                <div>

                </div>
            </div><br />
            <NavLink to={"/company/coupon/" + props.coupon.id} title="Edit and cancel"><BsFillPencilFill /></NavLink>
        </div>
    );
}

export default CouponCard;
