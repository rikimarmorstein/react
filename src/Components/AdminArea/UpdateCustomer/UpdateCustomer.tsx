import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Customer from "../../../Models/Customer";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, TextField } from "@mui/material";
import "./UpdateCustomer.css";

function UpdateCustomer(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<Customer>();

    const navigate = useNavigate();
    const params = useParams();
    const id = +params.customerId;

    useEffect(() => {

        adminService.getOneCustomer(id)
            .then((c) => {
                setValue("firstName", c.firstName)
                setValue("lastName", c.lastName)
                setValue("email", c.email)
                setValue("password", c.password)

            })
            .catch((err) =>
                notificationService.error(err)
            );
    }, []);

    function isValidateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    async function send(customer: Customer) {
        customer.id = id;
        try {
            await adminService.updateCustomer(customer);
            notificationService.success("Customer has been updated");
            navigate("/admin/customer/" + id);
        } catch (error: any) {
            notificationService.error(error)
        }
    }

    return (
        <div className="UpdateCustomer">
            <div>
                <h2>Update customer</h2>
                <form >
                    <label><FaUserAlt /> First Name: </label><br />
                    <TextField type="text" {...register("firstName",
                        {
                            required: { value: true, message: "Missing first name" },
                            minLength: { value: 2, message: "name too short" }
                        })} />
                    <span>{formState.errors?.firstName?.message}</span><br /><br />
                    <label><FaUserAlt /> Last Name: </label><br />
                    <TextField type="text" {...register("lastName",
                        {
                            required: { value: true, message: "Missing last name" },
                            minLength: { value: 2, message: "name too short" }
                        })} />
                    <span>{formState.errors?.lastName?.message}</span><br /><br />
                    <label><MdMarkEmailUnread /> Email: </label><br />
                    <TextField type="email" {...register("email",
                        {
                            required: { value: true, message: "Missing email" },
                            validate: (value) => isValidateEmail(value) || "Email must include @ and .",
                            minLength: {
                                value: 2, message: "email too short"
                            }
                        })} />
                    <span>{formState.errors?.email?.message}</span><br /><br />
                    <label><RiLockPasswordFill /> Password: </label><br />
                    <TextField type="text" {...register("password",
                        {
                            required: { value: true, message: "Missing password" },
                            minLength: {
                                value: 2, message: "password too short"
                            }
                        })} />
                    <span>{formState.errors?.password?.message}</span><br /><br />
                    <Button onClick={handleSubmit(send)}><AiOutlineFileDone /> Save</Button>

                </form></div>
            <div>

                <NavLink id="backToHome" to={"/admin/customer/" + id}>↪</NavLink>
            </div>

        </div>
    );
}

export default UpdateCustomer;
