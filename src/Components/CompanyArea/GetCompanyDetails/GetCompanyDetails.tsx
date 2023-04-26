import { useEffect, useState } from "react";
import Company from "../../../Models/Company";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./GetCompanyDetails.css";


function GetCompanyDetails(): JSX.Element {

    const [company, setCompany] = useState<Company>();
    useEffect(() => {
        (async () => {

            companyService.getCompanyDetails().then((company) => {
                setCompany(company);
            }, (error) => {
                notificationService.error(error);
            });

        })();

    }, []);


    return (
        <div className="GetCompanyDetails">
            {company &&
                <div>
                    <h3>Name: {company.name}</h3>
                    <hr />
                    <h4>Email: {company.email}</h4>
                    <h4>Password: {company.password}</h4>
                </div>
            }

        </div>
    );
}

export default GetCompanyDetails;
