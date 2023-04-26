import Coupon from "../Models/Coupon";
import Customer from "../Models/Customer";
import store from "../Redux/Store";
import { addPurchaseCouponAction, fetchCouponPurchasesAction, updateCouponAction } from "../Redux/CouponState";
import appConfig from "../Utils/Config";
import tokenAxios from "../Utils/Interceptors";



class CustomerService {

    public async getCustomerCoupons(): Promise<Coupon[]> {
        if (store.getState().couponsState.myCoupons.length <= 1) {
            const response = await tokenAxios.get<Coupon[]>(appConfig.customerUrl + "coupons");
            const coupons = response.data;
            store.dispatch(fetchCouponPurchasesAction(coupons));
            return coupons;
        }
        return store.getState().couponsState.myCoupons;
    }

    public async purchaseCoupon(couponId: number): Promise<void> {
        const response =
            await tokenAxios.post<Coupon>(appConfig.customerUrl + "purchase/" + couponId);
        const purchasedCoupon = response.data;
        store.dispatch(addPurchaseCouponAction(purchasedCoupon));
        store.dispatch(updateCouponAction(purchasedCoupon));

    }

    public async getCustomerDetails(): Promise<Customer> {
        const response = await tokenAxios.get<Customer>(appConfig.customerUrl + "details");
        return response.data;
    }

}

const customerService = new CustomerService();
export default customerService;
