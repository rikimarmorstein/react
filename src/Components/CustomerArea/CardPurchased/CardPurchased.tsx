import Coupon from "../../../Models/Coupon";
import "./CardPurchased.css";

interface CouponCardProps {
    coupon: Coupon;
}
function CardPurchased(props: CouponCardProps): JSX.Element {

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
        <div className="CardPurchased">
			 <div>
                <img src={props.coupon.image} alt=""/><br/>
                <h3>{props.coupon.category}</h3>
                <h4> {props.coupon.title} - {props.coupon.description}</h4>
                valid until: {formatDate(props.coupon.endDate)}<br />
                {props.coupon.price} NIS
                {/* imageName: {props.coupon.imageName}<br /> */}
            </div>
        </div>
    );
}

export default CardPurchased;
