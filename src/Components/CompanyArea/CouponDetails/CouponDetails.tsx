import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { Button } from "@mui/material";
import "./CouponDetails.css";

function CouponDetails(): JSX.Element {

    const params = useParams();
    const couponId = +params.couponId;
    const [coupon, setCoupon] = useState<Coupon>();
    const navigate = useNavigate();

    useEffect(() => {
        companyService.getOneCoupon(couponId).then((c) => setCoupon(c))
            .catch((e) => notificationService.error(e));
    }, []);



    async function deleteCoupon() {

        if (window.confirm("Are you sure?")) {
            try {
                await companyService.deleteCoupon(couponId);
                notificationService.success("coupon deleted");

                navigate("/company/all-coupons");

            } catch (error: any) {
                notificationService.error(error);

            }
        }
    }
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
        <div className="CouponDetails">
            <div>
                {coupon && (
                    <>
                        <h3>Category: {coupon.category}</h3>
                        <hr />
                        <h3>Title: {coupon.title}</h3>
                        <h3>Description: {coupon.description}</h3>
                        <h3>Start date: {formatDate(coupon.startDate)}</h3>
                        <h3>End date: {formatDate(coupon.endDate)}</h3>
                        <h3>Amount: {coupon.amount}</h3>
                        <h3>Price: {coupon.price}</h3>
                        <img src={coupon.image} alt="" /><br /><br />

                        <Button ><NavLink to={"/company/coupon/" + couponId} onClick={deleteCoupon}> <BsFillTrash3Fill /> Delete </NavLink></Button>
                        <Button ><NavLink to={"/company/coupon-update/" + couponId} > <BsFillPencilFill />  Edit </NavLink></Button>

                    </>
                )}
            </div>
            <div>
                <NavLink id="backToHome" to="/company/all-coupons">↪</NavLink>
            </div>
        </div>
    );
}

export default CouponDetails;
