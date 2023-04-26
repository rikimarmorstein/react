import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Company from "../../../Models/Company";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import { FaUserAlt } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, TextField } from "@mui/material";
import "./AddCompany.css";

function AddCompany(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<Company>();

    const navigate = useNavigate();

    function isValidateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    function isValidateName(name: string): boolean {
        const nameRegex = /^[a-zA-Z' ']*$/;
        return nameRegex.test(name)
    }

    async function send(company: Company) {
        try {
            await adminService.addCompany(company);
            notificationService.success("Company Added");
            navigate("/admin/all-companies");
        } catch (error: any) {
            notificationService.error(error);
        }
    }


    return (
        <div className="AddCompany">
            <div>
                <form>
                    <h2>Add Company</h2>
                    <label><FaUserAlt /> Name: </label><br />
                    <TextField type="text" {...register("name",
                        {
                            required: { value: true, message: "Missing name" },
                            validate: (value) => isValidateName(value) || "Name should contains only letters",
                            minLength: { value: 2, message: "name too short" }
                        })} />
                    <span>{formState.errors?.name?.message}</span><br /><br />
                    <label><MdAttachEmail /> Email: </label><br />
                    <TextField type="email" {...register("email",
                        {
                            required: { value: true, message: "Missing email" },
                            validate: (value) => isValidateEmail(value) || "Email must include @ and .",
                            minLength: { value: 2, message: "email too short" }
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
                    <span>{formState.errors?.password?.message}</span><br />
                    <Button onClick={handleSubmit(send)} title="Add company">Add</Button>
                </form>
            </div>
        </div>
    );
}

export default AddCompany;
