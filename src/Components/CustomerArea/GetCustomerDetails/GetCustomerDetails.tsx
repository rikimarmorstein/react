import { useEffect, useState } from "react";
import Customer from "../../../Models/Customer";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./GetCustomerDetails.css";

function GetCustomerDetails(): JSX.Element {

    const [customer, setCustomer] = useState<Customer>();
    useEffect(() => {
        (async () => {
            customerService.getCustomerDetails().then((customer) => {
                setCustomer(customer);
            }, (error) => {
                notificationService.error(error);
            });

        })();

    }, []);


    return (
        <div className="GetCustomerDetails">
            {customer &&
                <div>
                    <h3>Name: {customer.firstName} {customer.lastName}</h3>
                    <hr />
                    <h4>Email: {customer.email}</h4>
                    <h4>Password: {customer.password}</h4>
                </div>
            }
        </div>
    );
}

export default GetCustomerDetails;
