import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Company from "../../../Models/Company";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import {BsFillTrash3Fill} from "react-icons/bs";
import {BsFillPencilFill} from "react-icons/bs";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    const params = useParams();
    const companyId = +params.companyId;
    const [company, setCompany]=useState<Company>();
    const navigate = useNavigate();

    useEffect(()=>{
        adminService.getOneCompany(companyId).then((c)=>setCompany(c))
        .catch((e)=>notificationService.error(e));
    }, []);
    


   async function deleteCompany(){

   if(window.confirm("Are you sure?")){
       try {
   await adminService.deleteCompany(companyId);
   notificationService.success("company deleted");

   navigate("/admin/all-companies");

} catch (error:any) {
   notificationService.error(error);
} }
}
    return (
        <div className="CompanyDetails">
            <div>
		{company && (
                <>
                    <h3>Name: {company.name}</h3>
                    <hr/>
                    <h3>Email: {company.email}</h3>
                    <h3>Password: {company.password}</h3>
                    <br/>
                    <button><NavLink to={"/admin/company/"+companyId} onClick={deleteCompany}><BsFillTrash3Fill/>   Delete </NavLink>
                    </button>
                    <button>
                    <NavLink to={"/admin/company-update/"+companyId} ><BsFillPencilFill/>   Edit</NavLink>
               </button>
                </>
                
                )}  
              </div>
              <div>
              <NavLink id="backToHome" to="/admin/all-companies">↪</NavLink>
              </div>
                </div>
    );
}

export default CompanyDetails;
