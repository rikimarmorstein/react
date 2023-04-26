import axios from "axios";
import Coupon from "../Models/Coupon";
import { fetchCouponAction } from "../Redux/CouponState";
import store from "../Redux/Store";
import appConfig from "../Utils/Config";

class AllCouponsService {

  public async getAllCoupons(): Promise<Coupon[]> {
    if (store.getState().couponsState.coupons.length === 0) {
      const response = await axios.get<Coupon[]>(appConfig.allCoupons);
      const coupons = response.data;
      store.dispatch(fetchCouponAction(coupons));
      return coupons;
    }
    return store.getState().couponsState.coupons;
  }

}

const allCouponsService = new AllCouponsService();
export default allCouponsService;