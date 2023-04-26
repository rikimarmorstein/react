import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Category from "../../../Models/Category";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import { AiOutlineFileDone } from "react-icons/ai";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import "./UpdateCoupon.css";

function UpdateCoupon(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<Coupon>();


    const navigate = useNavigate();
    const params = useParams();
    const id = +params.couponId;


    useEffect(() => {

        companyService.getOneCoupon(id)
            .then((c) => {

                setValue("category", c.category);
                setValue("title", c.title);
                setValue("description", c.description);
                setValue("startDate", c.startDate);
                setValue("endDate", c.endDate);
                setValue("amount", c.amount);
                setValue("price", c.price);
                setValue("image", c.image);
            })
            .catch((err) =>
                notificationService.error(err)
            );
    }, []);



    async function send(coupon: Coupon) {
        coupon.id = id;

        try {
            await companyService.updateCoupon(coupon);

            notificationService.success("Coupon has been updated");
            navigate("/company/coupon/" + id);
        } catch (error: any) {
            notificationService.error(error)
        }
    }

    return (
        <div className="UpdateCoupon">

            <form >
                <h2>Update Coupon</h2>
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
                </FormControl>
                <br /><br />
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
                            value: 1, message: "startDate too short"
                        }
                    })} />
                <span>{formState.errors?.startDate?.message}</span><br /><br />
                <label>endDate: </label><br />
                <TextField type="date" {...register("endDate",
                    {
                        required: { value: true, message: "Missing endDate" },
                        minLength: {
                            value: 1, message: "endDate too short"
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
                <TextField type="number"  {...register("price",
                    {
                        min: { value: 0, message: "Price cannot be negative" },
                        required: { value: true, message: "Missing price" }
                    })} />
                <span>{formState.errors?.price?.message}</span><br /><br />
                <label>Image address: </label><br />
                <TextField type="text" {...register("image")} />

                <Button onClick={handleSubmit(send)}><AiOutlineFileDone /> Save</Button>

            </form>
            <div>
                <NavLink id="backToHome" to={"/company/coupon/" + id}>↪</NavLink>
            </div>
        </div>
    );
}

export default UpdateCoupon;
