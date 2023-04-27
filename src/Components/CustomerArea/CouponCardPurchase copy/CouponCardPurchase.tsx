import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import store from "../../../Redux/Store";
import companyService from "../../../Services/CompanyService";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import { HiShoppingCart } from "react-icons/hi";
import "./CouponCardPurchase.css";


interface CouponCardProps {
    coupon: Coupon;
}
function CouponCardPurchase(props: CouponCardProps): JSX.Element {
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


    const [coupon, setCoupon] = useState<Coupon>();

    const navigate = useNavigate();
    const params = useParams();
    const id = +params.couponId;
    useEffect(() => {

        companyService.getOneCoupon(id)
            .then((c) => {
                setCoupon(c)
            })
            .catch((err) =>
                notificationService.error(err)
            );
    }, []);

    async function purchase() {
        try {
            if (store.getState().authState.token != undefined) {
                await customerService.purchaseCoupon(id);
                notificationService.success("Coupon purchased");
                navigate("/customer-coupons");
            } else {
                notificationService.error("You need to login");
                navigate("/login");

            }
        } catch (error: any) {

            notificationService.error(error);
        }
    }


    return (
        <div className="CouponCardPurchase">
            <div>
                <img src={props.coupon.image} alt="" /><br />
                <h5>{props.coupon.company.name} company</h5>
                <h3>{props.coupon.category}</h3>
                <h2>{props.coupon.title}</h2>
                <h3>{props.coupon.description}</h3><br />
                valid until: {formatDate(props.coupon.endDate)}<br />
                amount: {props.coupon.amount}<br />
                {props.coupon.price} NIS<br />
            </div>
            <div className="purchase">

                {store.getState().authState.token != undefined &&
                    store.getState().couponsState.myCoupons.findIndex((coupon) => coupon.id === props.coupon.id) >= 0 ?
                    <button disabled={true} onClick={purchase}> <HiShoppingCart /></button>
                    : <button onClick={purchase} title="purchase"><HiShoppingCart /></button>
                }

                {store.getState().authState.token != undefined && store.getState().couponsState.myCoupons.findIndex((coupon) => coupon.id === props.coupon.id) >= 0
                    && <h4>You cannot purchase more than one coupon of the same type</h4>}

            </div>
            <div>   {store.getState().authState.token == undefined ? <NavLink id="backToHome" to="/home" title="Back"> ↪ </NavLink> :
                <NavLink id="backToHome" to="/customer/all-coupons" title="Back"> ↪ </NavLink>}
            </div>
        </div>
    );
}

export default CouponCardPurchase;
