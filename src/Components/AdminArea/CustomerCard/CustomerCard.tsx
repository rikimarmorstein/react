import { NavLink } from "react-router-dom";
import Customer from "../../../Models/Customer";
import { BsFillPencilFill } from "react-icons/bs";
import "./CustomerCard.css";


interface CustomerCardProps {
    customer: Customer;
}
function CustomerCard(props: CustomerCardProps): JSX.Element {

    return (
        <div className="CustomerCard">
            <div>
                {props.customer.firstName} { }
                {props.customer.lastName}<br />
                <hr />
                Email: {props.customer.email}<br />
                Password: {props.customer.password}<br />
            </div>
            <div>
                <NavLink to={"/admin/customer/" + props.customer.id} title="Edit and cancel"><BsFillPencilFill /></NavLink>
            </div>
        </div>
    );
}


export default CustomerCard;
