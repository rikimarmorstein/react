import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Company from "../../../Models/Company";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, TextField } from "@mui/material";
import "./UpdateCompany.css";

function UpdateCompany(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<Company>();

    const navigate = useNavigate();
    const params = useParams();
    const id = +params.companyId;


    function isValidateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    useEffect(() => {
        adminService.getOneCompany(id)
            .then((c) => {
                setValue("name", c.name)
                setValue("email", c.email)
                setValue("password", c.password)
            })
            .catch((err) =>
                notificationService.error(err)
            );
    }, []);

    async function send(company: Company) {
        company.id = id;
        try {
            await adminService.updateCompany(company);
            notificationService.success("Company has been updated");
            navigate("/admin/company/" + id);
        } catch (error: any) {

            notificationService.error(error)
        }
    }


    return (

        <div className="UpdateCompany">
            <div>
                <h2>Update Company</h2>
                <form >
                    <label><FaUserAlt /> Name: </label><br />
                    <TextField type="text" disabled {...register("name",
                        {
                            required: { value: true, message: "Missing name" },
                            minLength: {
                                value: 2, message: "name too short"
                            }
                        })} />
                    <span>{formState.errors?.name?.message}</span><br /><br />
                    <label><MdMarkEmailUnread /> Email: </label>
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
                </form>
            </div>
            <div>
                <NavLink id="backToHome" to={"/admin/company/" + id}>↪</NavLink>
            </div>
        </div>
    );
}

export default UpdateCompany;
