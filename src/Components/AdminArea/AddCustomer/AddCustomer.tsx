import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Customer from "../../../Models/Customer";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {const {register, handleSubmit, formState} = useForm<Customer>();

const navigate = useNavigate();

function isValidateEmail(email : string) : boolean{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

function isValidateName(name : string) : boolean{
    const nameRegex = /^[a-zA-Z' ']*$/;
    return nameRegex.test(name)
}

async function send(customer: Customer){
try {
    await adminService.addCustomer(customer);
    notificationService.success("Customer Added");
    navigate("/admin/all-customers");
} catch (error:any) {
    notificationService.error(error);
}
}


return (
    <div className="AddCompany">
        <div>
        <form>
            <h2>Add customer</h2>
            <label>First Name: </label>
            <input type="text" {...register("firstName",
             {
                required:{value:true, message:"Missing first name"} ,
            minLength:{value:2, message:"name too short"},
            validate: (value) => isValidateName(value)|| "Name should contains only letters"
        })} />
            <span>{formState.errors?.firstName?.message}</span>
<br/>
            <label>Last Name: </label>
            <input type="text" {...register("lastName",
             {
                required:{value:true, message:"Missing last name"} ,
            minLength:{value:2, message:"name too short"},
            validate: (value) => isValidateName(value)|| "Name should contains only letters"
        })} />
            <span>{formState.errors?.lastName?.message}</span><br/>
            <label>Email: </label>
            <input type="email" {...register("email",
             {
                required:{value:true, message:"Missing email"} ,
                validate: (value) => isValidateEmail(value)|| "Email must include @ and .",
            minLength:{value:2, message:"email too short"
            }})} />
            <span>{formState.errors?.email?.message}</span><br/>
            <label>Password: </label>
            <input type="password" {...register("password",
             {
                required:{value:true, message:"Missing password"} ,
            minLength:{value:2, message:"password too short"
            }})} />
            <span>{formState.errors?.password?.message}</span>
            <button onClick={handleSubmit(send)} title="Add customer">Add</button>
        </form>
        </div>
         </div>
);
}

export default AddCustomer;
