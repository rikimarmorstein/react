import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Company from "../../../Models/Company";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import { BsFillTrash3Fill , BsFillPencilFill} from "react-icons/bs";
import { Button } from "@mui/material";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    const params = useParams();
    const companyId = +params.companyId;
    const [company, setCompany] = useState<Company>();
    const navigate = useNavigate();

    useEffect(() => {
        adminService.getOneCompany(companyId).then((c) => setCompany(c))
            .catch((e) => notificationService.error(e));
    }, []);


    async function deleteCompany() {

        if (window.confirm("Are you sure?")) {
            try {
                await adminService.deleteCompany(companyId);
                notificationService.success("company deleted");

                navigate("/admin/all-companies");

            } catch (error: any) {
                notificationService.error(error);
            }
        }
    }


    function edit() {
        navigate("/admin/company-update/" + companyId);
    }

    return (
        <div className="CompanyDetails">
            <div>
                {company && (
                    <>
                        <h3>Name: {company.name}</h3>
                        <hr />
                        <h3>Email: {company.email}</h3>
                        <h3>Password: {company.password}</h3><br />
                        <Button onClick={deleteCompany}><BsFillTrash3Fill /> Delete</Button><br />
                        <Button onClick={edit}><BsFillPencilFill /> Edit</Button>
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
