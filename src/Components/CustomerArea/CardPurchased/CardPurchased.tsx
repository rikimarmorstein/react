import Coupon from "../../../Models/Coupon";
import "./CardPurchased.css";

interface CouponCardProps {
    coupon: Coupon;
}
function CardPurchased(props: CouponCardProps): JSX.Element {

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
        <div className="CardPurchased">
            <div>
                <img src={props.coupon.image} alt="" /><br />
                <h5>{props.coupon.company.name} company</h5>

                <h3>{props.coupon.category}</h3>
                {props.coupon.title}<br />
                {props.coupon.description}<br />
                valid until: {formatDate(props.coupon.endDate)}<br />
                {props.coupon.price} NIS
            </div>
        </div>
    );
}

export default CardPurchased;
