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
    type: CustomerActionType; 
    payload: any; 
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
    const newState = { ...currentState };

    switch (action.type) {
        case CustomerActionType.FetchCustomers: 
            newState.customers = action.payload;
            break;
        case CustomerActionType.AddCustomer: 
                newState.customers.push(action.payload);
            break;
        case CustomerActionType.UpdateCustomer: 
            const indexToUpdate = newState.customers.findIndex(c => c.id === action.payload.id);
            if (indexToUpdate >= 0) newState.customers[indexToUpdate] = action.payload;
            break;
        case CustomerActionType.DeleteCustomer:
            const indexToDelete = newState.customers.findIndex(c => c.id === action.payload);
            if (indexToDelete >= 0) newState.customers.splice(indexToDelete, 1);
            break;
            case CustomerActionType.Logout: 
            newState.customers=[];
            break;
    }

    return newState;
}


