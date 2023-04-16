import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";
import CouponCardPurchase from "../CouponCardPurchase copy/CouponCardPurchase";
import "./PurchaseCoupon.css";


function PurchaseCoupon(): JSX.Element {
    // const {register, handleSubmit, formState, setValue} = useForm<number>();
    const [coupon, setCoupon] = useState<Coupon>();

    const navigate = useNavigate();
    const params = useParams();
    const id = +params.couponId;
    

    
    useEffect(()=>{
        // await adminService.getOneCompany(companyId);
// notificationService.success("Company has been updated");
    companyService.getOneCoupon(id)
    .then((c)=>{
        setCoupon(c)
        // setValue("category", c.category);
        // setValue("title", c.title);
        // setValue("description", c.description);
        // setValue("startDate", c.startDate);
        // setValue("endDate", c.endDate);
        // setValue("amount", c.amount);
        // setValue("price", c.price);
        // setValue("imageName", c.imageName);
    })
.catch((err)=>
 notificationService.error(err)
);
},[]);

    async function purchase(){
        try {
            await customerService.purchaseCoupon(id);
    
            notificationService.success("coupon Added");
        
            navigate("/customer-coupons");
        } catch (error:any) {
            console.dir(error.message);
            // alert(error.message);
            console.log(error);
            
            notificationService.error(error);
        }
    }
     
    
    return (
        <div className="PurchaseCoupon">
            { coupon && <CouponCardPurchase key={id} coupon={coupon}  />}
            {/* <button onClick={purchase}>kl</button> */}
			</div>
    );
}

export default PurchaseCoupon;
