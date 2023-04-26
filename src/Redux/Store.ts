import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { companyReducer } from "./CompanyState";
import { couponReducer } from "./CouponState";
import { customerReducer } from "./CustomerState";

const reducers = combineReducers({ companiesState: companyReducer, customersState: customerReducer, couponsState: couponReducer, authState: authReducer });
const store = createStore(reducers);

export default store;
