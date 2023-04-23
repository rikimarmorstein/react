import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Category from "../../../Models/Category";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import {AiOutlineFileDone} from "react-icons/ai";

import "./UpdateCoupon.css";

function UpdateCoupon(): JSX.Element {
    
    const {register, handleSubmit, formState, setValue} = useForm<Coupon>();

    
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.couponId;

    
    useEffect(()=>{
       
    companyService.getOneCoupon(id)
    .then((c)=>{
        
        setValue("category", c.category);
        setValue("title", c.title);
        setValue("description", c.description);
        setValue("startDate", c.startDate);
        setValue("endDate", c.endDate);
        setValue("amount", c.amount);
        setValue("price", c.price);
        setValue("image", c.image);
    })
.catch((err)=>
 notificationService.error(err)
);
},[]);



async function send(coupon: Coupon){
    coupon.id=id;

try {
await companyService.updateCoupon(coupon);

notificationService.success("Coupon has been updated");
navigate("/company/coupon/"+id);
} catch (error:any) {
notificationService.error(error)
}
}

    return (
        <div className="UpdateCoupon">
              
                 <form >
			     <h2>Update Coupon</h2>
                 <label>Category: </label>
                <select {...register("category")} name="category" id="category">
                    <option disabled value="">Select...</option>
                    <option value={Category.FOOD}>FOOD</option>
                    <option value={Category.ELECTRICITY}>ELECTRICITY</option>
                    <option value={Category.RESTAURANT}>RESTAURANT</option>
                    <option value={Category.VACATION}>VACATION</option>
                </select>
                <span>{formState.errors?.category?.message}</span>
                <br/>
                <label>Title: </label>
                <input type="text" {...register("title",
                 {
                    required:{value:true, message:"Missing title"} ,
                minLength:{value:1, message:"title too short"
                }})} />
                <span>{formState.errors?.title?.message}</span><br/>
                <label>Description: </label>
                <input type="text" {...register("description",
                 {
                    required:{value:true, message:"Missing description"} ,
                minLength:{value:1, message:"description too short"
                }})} />
                <span>{formState.errors?.description?.message}</span><br/>
                <label>startDate: </label>
                <input type="date" {...register("startDate",
                 {
                    required:{value:true, message:"Missing startDate"} ,
                minLength:{value:1, message:"startDate too short"
                }})} />
                <span>{formState.errors?.startDate?.message}</span><br/>
                <label>endDate: </label>
                <input type="date" {...register("endDate",
                 {
                    required:{value:true, message:"Missing endDate"} ,
                minLength:{value:1, message:"endDate too short"
                }})} />
                <span>{formState.errors?.endDate?.message}</span><br/>
                 <label>amount: </label>
                <input type="number" {...register("amount",
                 {
                    min:{value:1, message:"Amount cannot be negative or zero"},
                    required:{value:true, message:"Missing amount"} ,
                minLength:{value:1, message:"amount too short"
                }})} />
                <span>{formState.errors?.amount?.message}</span><br/>

                <label>price: </label>
                <input type="number" {...register("price",
                 {
                    min:{value:1, message:"Price cannot be negative or zero"},
                    required:{value:true, message:"Missing price"} 
                   })} step="0.01"/>
                <span>{formState.errors?.price?.message}</span><br/>
                 <label>Image address: </label>
                 <input type="text" {...register("image")} /> 

                <button onClick={handleSubmit(send)}><AiOutlineFileDone/> Save</button>

            </form>
<div>
    <NavLink id="backToHome" to={"/company/coupon/"+id}>↪</NavLink>
</div>
    </div>
);
}

export default UpdateCoupon;
