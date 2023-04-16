import { useForm } from "react-hook-form";
import Coupon from "../../../Models/Coupon";
import { NavLink, useNavigate } from "react-router-dom";
import Category from "../../../Models/Category";
import companyService from "../../../Services/CompanyService";

import "./AddCoupon.css";
import notificationService from "../../../Services/NotificationService";

function AddCoupon(): JSX.Element {
    const {register, handleSubmit, formState} = useForm<Coupon>();

    const navigate = useNavigate();

    async function send(coupon: Coupon){
    try {
        // coupon.image = (coupon.image as FileList)[0];
        await companyService.addCoupon(coupon);

        notificationService.success("Coupon Added");
    
        navigate("/company/all-coupons");
    } catch (error:any) {
        console.dir(error.message);
        console.log(error);
        
        notificationService.error(error);
    }
    }


    return (
        <div className="AddCoupon">
			<form onSubmit={handleSubmit(send)}>
                <h2>Add Coupon</h2>
                <label>Category: </label>
                <select defaultValue="" required {...register("category")}>
                    <option disabled value="">Select Category</option>
                    <option value={Category.FOOD}>FOOD</option>
                    <option value={Category.ELECTRICITY}>ELECTRICITY</option>
                    <option value={Category.RESTAURANT}>RESTAURANT</option>
                    <option value={Category.VACATION}>VACATION</option>
                </select>
                
                <label>Title: </label>
                <input type="text" {...register("title",
                 {
                    required:{value:true, message:"Missing title"} ,
                minLength:{value:1, message:"title too short"
                }})} />
                <span>{formState.errors?.title?.message}</span>
                <br/>

                <label>Description: </label>
                <input type="text" {...register("description",
                 {
                    required:{value:true, message:"Missing description"} ,
                minLength:{value:1, message:"description too short"
                }})} />
                <span>{formState.errors?.description?.message}</span>
                <br/>

                <label>startDate: </label>
                <input type="date" {...register("startDate",
                 {
                    required:{value:true, message:"Missing startDate"} ,
                minLength:{value:1, message:"start date too short"
                }})} />
                <span>{formState.errors?.startDate?.message}</span>
                <br/>

                <label>endDate: </label>
                <input type="date" {...register("endDate",
                 {
                    required:{value:true, message:"Missing endDate"} ,
                minLength:{value:1, message:"end date too short"
                }})} />
                <span>{formState.errors?.endDate?.message}</span>
                <br/>

                <label>amount: </label>
                <input type="number" {...register("amount",
                 {
                    min:{value:1, message:"Amount cannot be negative or zero"},
                    required:{value:true, message:"Missing amount"} ,
                minLength:{value:1, message:"amount too short"
                }})} />
                <span>{formState.errors?.amount?.message}</span>
                <br/>

                <label>price: </label>
                <input type="number" {...register("price",
                 {
                    min:{value:1, message:"Price cannot be negative or zero"},
                    required:{value:true, message:"Missing price"} 
                   })} step="0.01"/>
                <span>{formState.errors?.price?.message}</span>
<br/>
                 <label>Image address: </label>
                {/* <input type="file" formAction="/uploadFile" formMethod="POST" formEncType="uploadFile/form-data"{...register("image")} /> */}
                 <input type="text" {...register("image")} /> 

                <button>Add</button>

            </form>
        </div>
    );
}
    // public imageName:string;
    // public image: File | FileList;


export default AddCoupon;
