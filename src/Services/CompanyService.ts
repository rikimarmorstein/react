import Company from "../Models/Company";
import Coupon from "../Models/Coupon";
import { addCouponAction, deleteCouponAction, fetchCouponAction, updateCouponAction } from "../Redux/CouponState";
import store from "../Redux/Store";
import appConfig from "../Utils/Config";
import tokenAxios from "../Utils/Interceptors";

class CompanyService {

    public async addCoupon(coupon: Coupon): Promise<void> {
        const response = await tokenAxios.post<Coupon>(appConfig.companyUrl, coupon);
        const addedCoupon = response.data;
        store.dispatch(addCouponAction(addedCoupon));
    }

    public async updateCoupon(coupon: Coupon): Promise<void> {
        const response =
            await tokenAxios.put<Coupon>(appConfig.companyUrl, coupon);
        const updatedCoupon = response.data;
        store.dispatch(updateCouponAction(updatedCoupon));
    }

    public async deleteCoupon(couponId: number): Promise<void> {
        await tokenAxios.delete(appConfig.companyUrl + couponId);
        store.dispatch(deleteCouponAction(couponId));
    }

    public async getOneCoupon(couponId: number): Promise<Coupon> {
        return store.getState().couponsState.coupons.find(c => c.id === couponId);
    }

    public async getAllCoupons(): Promise<Coupon[]> {
        // if (store.getState().couponsState.coupons.length === 0) {
        const response = await tokenAxios.get<Coupon[]>(appConfig.companyUrl + "coupons");
        const coupons = response.data;
        store.dispatch(fetchCouponAction(coupons));
        // return coupons;
        // }
        return store.getState().couponsState.coupons;
    }

    public async getCompanyDetails(): Promise<Company> {
        const response = await tokenAxios.get<Company>(appConfig.companyUrl + "details");
        return response.data;
    }

}
const companyService = new CompanyService();
export default companyService;