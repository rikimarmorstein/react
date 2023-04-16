import { createStore } from "redux";
import Company from "../Models/Company";


// 1. products state - the data we need at global application level
export class CompanyState {
    public companies: Company[] = [];
}

// 2. Action Types - list of actions - enum
export enum CompanyActionType {
    FetchCompanies = "FetchCompanies",
    AddCompany="AddCompany",
    UpdateCompany="UpdateCompany",
    DeleteCompany="DeleteCompany",
    Logout="Logout"
}

// 3. Action - an interface describing a single command
export interface CompaniesAction {
    type: CompanyActionType; // action type
    payload: any; // action data
}

// 4. action creators - functions to create action objects
export function fetchCompanyAction(companies: Company[]): CompaniesAction {
    return { type: CompanyActionType.FetchCompanies, payload: companies };
}
// export function fetchOneCompanyAction(company: Company): CompaniesAction {
//     return { type: CompanyActionType.FetchCompany, payload: company };
// }

export function addCompanyAction(company: Company): CompaniesAction {
    return { type: CompanyActionType.AddCompany, payload: company };
}

export function updateCompanyAction(company: Company): CompaniesAction {
    return { type: CompanyActionType.UpdateCompany, payload: company };
}

export function deleteCompanyAction(id: number): CompaniesAction {
    return { type: CompanyActionType.DeleteCompany, payload: id };
}
export function logoutAction(): CompaniesAction {
    return { type: CompanyActionType.Logout, payload: {} };
}
// 5. reducer - a single function performing any of the above actions

export function companyReducer(currentState: CompanyState = new CompanyState(), action: CompaniesAction): CompanyState {
    const newState = { ...currentState }; // duplicate current state

    switch (action.type) {
        case CompanyActionType.FetchCompanies: // here payload is all products
            newState.companies = action.payload;
            break;
            // case CompanyActionType.FetchCompany: 
            // newState.companies = action.payload;
            // break;
        case CompanyActionType.AddCompany: // here payload is a single product to add
                newState.companies.push(action.payload);
            break;
        case CompanyActionType.UpdateCompany: // here payload is a single product to update
            const indexToUpdate = newState.companies.findIndex(c => c.id === action.payload.id);
            if (indexToUpdate >= 0) newState.companies[indexToUpdate] = action.payload;
            break;
        case CompanyActionType.DeleteCompany: // here payload is an id of product to delete
            const indexToDelete = newState.companies.findIndex(c => c.id === action.payload);
            if (indexToDelete >= 0) newState.companies.splice(indexToDelete, 1);
            break;
            case CompanyActionType.Logout: 
            newState.companies=[];
            break;
    }

    return newState;
}

// 6 Products Store object to manage all products state

// export const companiesStore = createStore(companyReducer);

