import { ChangeEvent, useEffect, useState } from "react";
import Company from "../../../Models/Company";
import store from "../../../Redux/Store";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CompanyCard from "../CompanyCard/CompanyCard";
import {ImSearch} from "react-icons/im";
import "./CompanyList.css";

function CompanyList(): JSX.Element {

    const [companies, setCompanies] = useState<Company[]>(store.getState().companiesState.companies);
    const [selectedName, setSelectedName] = useState<string>("");
    let companyId :number;

    
    useEffect(()=>{
        (async ()=>{
            adminService.getAllCompanies().then((arr)=>{
                setCompanies(arr);
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
                    ;
            }  
           )
              setCompanies(fillteredCompanies);
            fillteredCompanies.map((c)=> companyId= c.id);
       
    }
    return (
        <div className="CompanyList" id="companies-list-top">

<form ><ImSearch/>
<input type="text" name="name" id="name" placeholder="Enter company name for search" onChange={handleNameChange}
 value={selectedName} /> 
 </form>

{companies.map((c)=>(
    <CompanyCard key={c.id} company={c}/>
))}

{companies.length===0 && store.getState().companiesState.companies.length>0 }
{store.getState().companiesState.companies.length===0 &&  <span> No companies</span>}
{
    companies.length > 0 && <a id="list-top-company" href="#companies-list-top" title="Scroll up">👆</a>
    }

        </div>
    );
}

export default CompanyList;
