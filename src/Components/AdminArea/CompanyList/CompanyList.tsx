import { ChangeEvent, useEffect, useState } from "react";
import Company from "../../../Models/Company";
import store from "../../../Redux/Store";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CompanyCard from "../CompanyCard/CompanyCard";
import { ImSearch } from "react-icons/im";
import "./CompanyList.css";

function CompanyList(): JSX.Element {

    const [companies, setCompanies] = useState<Company[]>(store.getState().companiesState.companies);
    const [selectedName, setSelectedName] = useState<string>("");
    let companyId: number;

    useEffect(() => {
        (async () => {
            adminService.getAllCompanies().then((arr) => {
                setCompanies(arr);
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
        setCompanies(filteredCompanies);
        filteredCompanies.map((c) => companyId = c.id);

    }

    return (
        <div className="CompanyList" id="companies-list-top">

            <form ><ImSearch />
                <input type="text" name="name" id="name" placeholder="Enter company name for search" onChange={handleNameChange}
                    value={selectedName} />
            </form>

            {companies.map((c) => (
                <CompanyCard key={c.id} company={c} />
            ))}

            {store.getState().companiesState.companies.length === 0 && <h1> No Companies</h1>}
            <div className="list-top-company">{
                    companies.length > 0 && <a href="#companies-list-top" title="Scroll up">👆</a>
                }</div>

        </div>
    );
}

export default CompanyList;
