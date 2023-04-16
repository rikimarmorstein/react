import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Company from "../../../Models/Company";
import store from "../../../Redux/Store";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CompanyCard from "../CompanyCard/CompanyCard";
import "./GetOneCompany.css";

function GetOneCompany(): JSX.Element {

    const [company, setCompany] = useState<Company[]>(store.getState().companiesState.companies);
    const [selectedName, setSelectedName] = useState<string>("");
    const {register, handleSubmit, formState} = useForm<Company>();
    const params = useParams();
    const name = params.name;
    const id =8 ;
    const navigate = useNavigate();
    let companyId :number;

     useEffect(()=>{
        (async ()=>{
            adminService.getAllCompanies().then((arr)=>{

                setCompany(arr);
            }, (error)=>{
             notificationService.error(error);
            });
        })();
    }, []);


function handleNameChange(e:ChangeEvent<HTMLInputElement>) {
    
    const currentName = e.currentTarget.value;
    setSelectedName(currentName);
    let fillteredCompanies = store.getState().companiesState.companies;
    const currentNameCase = currentName.toUpperCase();
           fillteredCompanies = fillteredCompanies.filter((company)=>{
                return company.name.toUpperCase().match(currentNameCase) ;
         }  
        )
    setCompany(fillteredCompanies);
    fillteredCompanies.map((c)=> companyId= c.id);
    }
    return (
        <div className="GetOneCompany">
           
<form>
 <input type="text" name="name" id="name" onChange={handleNameChange}
 value={selectedName} /> 
 </form>

{company.length > 0 ? company.map((c)=>(
    <CompanyCard key={c.id} company={c}/>
)) : 
<h2>No companies</h2>}
      </div>
    );
}

export default GetOneCompany;
