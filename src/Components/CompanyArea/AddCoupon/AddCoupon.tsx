import { useForm } from "react-hook-form";
import Coupon from "../../../Models/Coupon";
import { useNavigate } from "react-router-dom";
import Category from "../../../Models/Category";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import "./AddCoupon.css";

function AddCoupon(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<Coupon>();
    const navigate = useNavigate();

    async function send(coupon: Coupon) {

        try {
            await companyService.addCoupon(coupon);
            notificationService.success("Coupon Added");
            navigate("/company/all-coupons");
        } catch (error: any) {
            notificationService.error(error);
        }
    }


    return (
        <div className="AddCoupon">
            <form>
                <h2>Add Coupon</h2>
                <label>Category: </label>
                <FormControl variant="outlined" style={{ 'width': '100%' }} >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                        defaultValue={Category.FOOD}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        required {...register("category")}>
                        <MenuItem value={Category.FOOD}>FOOD</MenuItem>
                        <MenuItem value={Category.ELECTRICITY}>ELECTRICITY</MenuItem>
                        <MenuItem value={Category.RESTAURANT}>RESTAURANT</MenuItem>
                        <MenuItem value={Category.VACATION}>VACATION</MenuItem>
                    </Select>
                </FormControl><br /><br />
                <label>Title: </label><br />
                <TextField type="text" {...register("title",
                    {
                        required: { value: true, message: "Missing title" },
                        minLength: {
                            value: 1, message: "title too short"
                        }
                    })} />
                <span>{formState.errors?.title?.message}</span><br /><br />

                <label>Description: </label><br />
                <TextField type="text" {...register("description",
                    {
                        required: { value: true, message: "Missing description" },
                        minLength: {
                            value: 1, message: "description too short"
                        }
                    })} />
                <span>{formState.errors?.description?.message}</span><br /><br />

                <label>startDate: </label><br />
                <TextField type="date" {...register("startDate",
                    {
                        required: { value: true, message: "Missing startDate" },
                        minLength: {
                            value: 1, message: "start date too short"
                        }
                    })} />
                <span>{formState.errors?.startDate?.message}</span><br /><br />

                <label>endDate: </label><br />
                <TextField type="date" {...register("endDate",
                    {
                        required: { value: true, message: "Missing endDate" },
                        minLength: {
                            value: 1, message: "end date too short"
                        }
                    })} />
                <span>{formState.errors?.endDate?.message}</span><br /><br />

                <label>amount: </label><br />
                <TextField type="number" {...register("amount",
                    {
                        min: { value: 1, message: "Amount cannot be negative or zero" },
                        required: { value: true, message: "Missing amount" },
                        minLength: {
                            value: 1, message: "amount too short"
                        }
                    })} />
                <span>{formState.errors?.amount?.message}</span><br /><br />

                <label>price: </label><br />
                <TextField type="number" {...register("price",
                    {
                        min: { value: 0, message: "Price cannot be negative" },
                        required: { value: true, message: "Missing price" }
                    })}
                />
                <span>{formState.errors?.price?.message}</span><br /><br />
                <label>Image address: </label><br />
                <TextField type="text" {...register("image")} />

                <Button onClick={handleSubmit(send)}>Add</Button>

            </form>
        </div>
    );
}



export default AddCoupon;
