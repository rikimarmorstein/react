import { createStore } from "redux";
import Customer from "../Models/Customer";

export class CustomerState {
    public customers: Customer[] = [];
}

export enum CustomerActionType {
    FetchCustomers="FetchCustomers",
    AddCustomer="AddCustomer",
    UpdateCustomer="UpdateCustomer",
    DeleteCustomer="DeleteCustomer",
    Logout="Logout"
}

export interface CustomersAction {
    type: CustomerActionType; // action type
    payload: any; // action data
}

export function fetchCustomerAction(customers: Customer[]): CustomersAction {
    return { type: CustomerActionType.FetchCustomers, payload: customers };
}

export function addCustomerAction(customer: Customer): CustomersAction {
    return { type: CustomerActionType.AddCustomer, payload: customer };
}

export function updateCustomerAction(customer: Customer): CustomersAction {
    return { type: CustomerActionType.UpdateCustomer, payload: customer };
}

export function deleteCustomerAction(id: number): CustomersAction {
    return { type: CustomerActionType.DeleteCustomer, payload: id };
}
export function logoutAction(): CustomersAction {
    return { type: CustomerActionType.Logout, payload: {} };
}


export function customerReducer(currentState: CustomerState = new CustomerState(), action: CustomersAction): CustomerState {
    const newState = { ...currentState }; // duplicate current state

    switch (action.type) {
        case CustomerActionType.FetchCustomers: // here payload is all products
            newState.customers = action.payload;
            break;
        case CustomerActionType.AddCustomer: // here payload is a single product to add
                newState.customers.push(action.payload);
            break;
        case CustomerActionType.UpdateCustomer: // here payload is a single product to update
            const indexToUpdate = newState.customers.findIndex(c => c.id === action.payload.id);
            if (indexToUpdate >= 0) newState.customers[indexToUpdate] = action.payload;
            break;
        case CustomerActionType.DeleteCustomer: // here payload is an id of product to delete
            const indexToDelete = newState.customers.findIndex(c => c.id === action.payload);
            if (indexToDelete >= 0) newState.customers.splice(indexToDelete, 1);
            break;
            case CustomerActionType.Logout: 
            newState.customers=[];
            break;
    }

    return newState;
}


// export const customersStore = createStore(customerReducer);
