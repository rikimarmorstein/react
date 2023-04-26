import { ChangeEvent, useEffect, useState } from "react";
import Customer from "../../../Models/Customer";
import store from "../../../Redux/Store";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CustomerCard from "../CustomerCard/CustomerCard";
import { ImSearch } from "react-icons/im";
import "./CustomerList.css";

function CustomerList(): JSX.Element {
    const [customers, setCustomers] = useState<Customer[]>(store.getState().customersState.customers);
    const [selectedName, setSelectedName] = useState<string>("");
    let customerId: number;

    useEffect(() => {
        (async () => {
            adminService.getAllCustomers().then((arr) => {
                setCustomers(arr);
            }
                , (error) => {
                    notificationService.error(error);
                }
            );
        })();
    }, []);

    function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
        const currentName = e.currentTarget.value;
        setSelectedName(currentName);
        let filteredCompanies = store.getState().customersState.customers;
        const currentNameCase = currentName.toUpperCase();
        filteredCompanies = filteredCompanies.filter((customer) => {
            let lastFirst = customer.lastName + " " + customer.firstName;
            let firstLast = customer.firstName + " " + customer.lastName;
            return lastFirst.toUpperCase().match(currentNameCase) || firstLast.toUpperCase().match(currentNameCase);
        }
        )
        setCustomers(filteredCompanies);
        filteredCompanies.map((c) => customerId = c.id);
    }


    return (
        <div className="CustomerList" id="customers-list-top">
            <form ><ImSearch />
                <input type="text" name="name" id="name" placeholder="Enter customer name for search" onChange={handleNameChange}
                    value={selectedName} />
            </form>
            {customers.map((c) => (
                <CustomerCard key={c.id} customer={c} />
            ))}
            {store.getState().customersState.customers.length === 0 && <h1> No Customers</h1>}<br />
            <div className="list-top-customer">{
                customers.length > 0 && <a href="#customers-list-top" title="Scroll up">👆</a>
            }</div>
        </div>
    );
}

export default CustomerList;
