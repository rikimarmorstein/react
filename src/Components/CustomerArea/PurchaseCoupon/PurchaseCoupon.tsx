import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import CouponCardPurchase from "../CouponCardPurchase copy/CouponCardPurchase";
import "./PurchaseCoupon.css";


function PurchaseCoupon(): JSX.Element {
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
            await customerService.purchaseCoupon(id);
            notificationService.success("coupon Added");

            navigate("/customer-coupons");
        } catch (error: any) {
            notificationService.error(error);
        }
    }


    return (
        <div className="PurchaseCoupon">
            {coupon && <CouponCardPurchase key={id} coupon={coupon} />}
        </div>
    );
}

export default PurchaseCoupon;
