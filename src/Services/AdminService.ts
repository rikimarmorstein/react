import { log } from "console";
import Company from "../Models/Company";
import Customer from "../Models/Customer";
import { addCompanyAction,  deleteCompanyAction, fetchCompanyAction, updateCompanyAction } from "../Redux/CompanyState";
import { addCustomerAction,  deleteCustomerAction, fetchCustomerAction, updateCustomerAction } from "../Redux/CustomerState";
import store from "../Redux/Store";
import appConfig from "../Utils/Config";
import tokenAxios from "../Utils/Interceptors";

class AdminService{


    public async addCompany(company: Company): Promise<void> {
        // const formData = new FormData();
    
        // formData.append("name", company.name);
        // formData.append("email", company.email);
        // formData.append("password", company.password);
        // console.log(company);
    
        const response = await tokenAxios.post<Company>(appConfig.adminUrl+"company-new",  company);
        const addedCompany = response.data;
        store.dispatch(addCompanyAction(addedCompany));
        // companiesStore.dispatch(addCompanyAction(addedCompany));
    } 
    
    public async updateCompany(company: Company): Promise<void> {
    // const formData = new FormData();
    // formData.append("id", company.id.toString());
    // formData.append("name", company.name);
    // formData.append("email", company.email);
    // formData.append("password", company.password);
    
    const response =
    await tokenAxios.put<Company>(appConfig.adminUrl+"company-update", company );
    const updatedCompany = response.data;
    store.dispatch(updateCompanyAction(updatedCompany));
    // companiesStore.dispatch(updateCompanyAction(updatedCompany));
    } 

    public async deleteCompany(companyId: number): Promise<void> {
        await tokenAxios.delete(appConfig.adminUrl+"company/" + companyId);
        store.dispatch(deleteCompanyAction(companyId));

    // companiesStore.dispatch(deleteCompanyAction(companyId));
}

public async getAllCompanies():Promise<Company[]>{
    if(store.getState().companiesState.companies.length<=1){
const response=await tokenAxios.get<Company[]>(appConfig.adminUrl+"all-companies");
const companies = response.data;

store.dispatch(fetchCompanyAction(companies));
return companies;    
}
return store.getState().companiesState.companies;
}


public async getOneCompany(companyId: number):Promise<Company>{
    // const response=await tokenAxios.get<Company>(appConfig.adminUrl+id);
    // const company = response.data;
    // return company;  
    return store.getState().companiesState.companies.find(c=>c.id===companyId);  
}

public async addCustomer(customer: Customer): Promise<void> {
    // const formData = new FormData();
    // formData.append("firstName", customer.firstName);
    // formData.append("lastName", customer.lastName);
    // formData.append("email", customer.email);
    // formData.append("password", customer.password);
    
    const response = await tokenAxios.post<Customer>(appConfig.adminUrl+"customer-new",  customer);
    const addedCustomer = response.data;
    store.dispatch(addCustomerAction(addedCustomer));
} 

public async updateCustomer(customer: Customer): Promise<void> {
// const formData = new FormData();
// formData.append("id", customer.id.toString());
// formData.append("firstName", customer.firstName);
// formData.append("lastName", customer.lastName);
// formData.append("email", customer.email);
// formData.append("password", customer.password);

const response =
await tokenAxios.put<Customer>(appConfig.adminUrl+"customer-update", customer );
const updatedCustomer = response.data;

store.dispatch(updateCustomerAction(updatedCustomer));
} 
public async deleteCustomer(customerId: number): Promise<void> {
    await tokenAxios.delete(appConfig.adminUrl+"customer/" + customerId);
    store.dispatch(deleteCustomerAction(customerId));
}

public async getOneCustomer(customerId: number):Promise<Customer>{
    return store.getState().customersState.customers.find(c=>c.id===customerId);  
}

public async getAllCustomers():Promise<Customer[]>{
    if(store.getState().customersState.customers.length<=1){
const response=await tokenAxios.get<Customer[]>(appConfig.adminUrl+"all-customers");
const customers = response.data;

store.dispatch(fetchCustomerAction(customers));
return customers;    
}
return store.getState().customersState.customers;
}


}
const adminService = new AdminService();
export default adminService;