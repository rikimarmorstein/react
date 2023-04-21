import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Customer from "../../../Models/Customer";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import {BsFillTrash3Fill} from "react-icons/bs";
import {BsFillPencilFill} from "react-icons/bs";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {
    const params = useParams();
    const customerId = +params.customerId;
    const [customer, setCustomer]=useState<Customer>();
    const navigate = useNavigate();

    useEffect(()=>{
        adminService.getOneCustomer(customerId).then((c)=>setCustomer(c))
        .catch((e)=>notificationService.error(e));
    }, []);
    


   async function deleteCustomer(){

   if(window.confirm("Are you sure?")){
       try {
   await adminService.deleteCustomer(customerId);
   notificationService.success("customer deleted");

   navigate("/admin/all-customers");

} catch (error:any) {
   notificationService.error(error);

} }
}

function edit(){
    navigate("/admin/customer-update/"+customerId);

}

    return (
        <div className="CompanyDetails">
            <div>
		{customer && (
                <>
                    <h3>First Name: {customer.firstName}</h3>
                    <h3>Last Name: {customer.lastName}</h3>
                    <hr/>
                    <h3>Email: {customer.email}</h3>
                    <h3>Password: {customer.password}</h3>
                    <br/>
<button onClick={deleteCustomer}><BsFillTrash3Fill/> Delete</button>
<button onClick={edit} > <BsFillPencilFill/>   Edit  </button>
                </>
            )}   
            </div>
            <div>
            <NavLink id="backToHome" to="/admin/all-customers">↪</NavLink>
               </div> 
                </div>
    );
}

export default CustomerDetails;
