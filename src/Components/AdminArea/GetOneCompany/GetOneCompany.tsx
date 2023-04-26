import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Company from "../../../Models/Company";
import store from "../../../Redux/Store";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CompanyCard from "../CompanyCard/CompanyCard";
import "./GetOneCompany.css";

function GetOneCompany(): JSX.Element {

    const [company, setCompany] = useState<Company[]>(store.getState().companiesState.companies);
    const [selectedName, setSelectedName] = useState<string>("");
    let companyId: number;

    useEffect(() => {
        (async () => {
            adminService.getAllCompanies().then((arr) => {

                setCompany(arr);
            }, (error) => {
                notificationService.error(error);
            });
        })();
    }, []);


    function handleNameChange(e: ChangeEvent<HTMLInputElement>) {

        const currentName = e.currentTarget.value;
        setSelectedName(currentName);
        let filteredCompanies = store.getState().companiesState.companies;
        const currentNameCase = currentName.toUpperCase();
        filteredCompanies = filteredCompanies.filter((company) => {
            return company.name.toUpperCase().match(currentNameCase);
        }
        )
        setCompany(filteredCompanies);
        filteredCompanies.map((c) => companyId = c.id);
    }
    return (
        <div className="GetOneCompany">

            <form>
                <input type="text" name="name" id="name" onChange={handleNameChange}
                    value={selectedName} />
            </form>

            {company.length > 0 ? company.map((c) => (
                <CompanyCard key={c.id} company={c} />
            )) :
                <h2>No companies</h2>}
        </div>
    );
}

export default GetOneCompany;
