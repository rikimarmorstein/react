import Coupon from "../Models/Coupon";
import Customer from "../Models/Customer";
import store from "../Redux/Store";
import {  addPurcahseCouponAction, fetchCouponAction, fetchCouponPurchasesAction } from "../Redux/CouponState";
import appConfig from "../Utils/Config";
import tokenAxios from "../Utils/Interceptors";
import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import CustomerUserModel from "../Models/CustomerUserModel";
import ClientType from "../Models/ClientType";


class CustomerService{
    // public async getAllCoupons():Promise<Coupon[]>{
    //     // if(couponsStore.getState().coupons.length===0){
    // const response=await tokenAxios.get<Coupon[]>(appConfig.customerUrl+"all-coupons");
    // console.log("data"+response.data);
    
    // const coupons = response.data;
    // this.getCustomerCoupons();
    // store.dispatch(fetchCouponAction(coupons));
    // // return coupons;    
    // // }
    // return store.getState().couponsState.coupons;
    // }
    


    public async getCustomerCoupons():Promise<Coupon[]>{
        if(store.getState().couponsState.myCoupons.length<=1){
    const response=await tokenAxios.get<Coupon[]>(appConfig.customerUrl+"coupons");
    const coupons = response.data;
    store.dispatch(fetchCouponPurchasesAction(coupons));
    return coupons;    
    }
    return store.getState().couponsState.myCoupons;
    }

    public async purchaseCoupon(couponId: number):Promise<void>{
        // if(couponsStore.getState().coupons.length===0){
     const response=
    await tokenAxios.post<Coupon>(appConfig.customerUrl+"purchase/"+couponId);
    // const couponp = response.data;
    // couponsStore.dispatch(fetchCouponAction(coupon));
    // }
    const purchasedCoupon = response.data;
    store.dispatch(addPurcahseCouponAction(purchasedCoupon));
    // return couponp;
       }

//redux???
public async getCustomerDetails():Promise<Customer>{
    const response=await tokenAxios.get<Customer>(appConfig.customerUrl+"details");
console.log(response.data);

    return  response.data;
}
}
const customerService = new CustomerService();
export default customerService;
