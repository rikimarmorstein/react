import { NavLink } from "react-router-dom";
import Company from "../../../Models/Company";
import { BsFillPencilFill } from "react-icons/bs";

import "./CompanyCard.css";

interface CompanyCardProps {
    company: Company;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
    return (
        <div className="CompanyCard">
            <div>
                {props.company.name}<br />
                <hr />
                Email: {props.company.email}<br />
                Password: {props.company.password}<br />
            </div>
            <div>
                <NavLink to={"/admin/company/" + props.company.id} title="Edit and cancel"><BsFillPencilFill /></NavLink>
            </div>
        </div>
    );
}

export default CompanyCard;
