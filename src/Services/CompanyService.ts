import Category from "../Models/Category";
import Company from "../Models/Company";
import Coupon from "../Models/Coupon";
import { addCouponAction, deleteCouponAction, fetchCouponAction, updateCouponAction } from "../Redux/CouponState";
import store from "../Redux/Store";
import appConfig from "../Utils/Config";
import tokenAxios from "../Utils/Interceptors";

class CompanyService{

public async addCoupon(coupon: Coupon): Promise<void> {
    // const formData = new FormData();
    // formData.append("category", coupon.category.toString());
    // formData.append("title", coupon.title);
    // formData.append("description", coupon.description);
    // formData.append("start_date", coupon.startDate.toString());
    // formData.append("end_date", coupon.endDate.toString());
    // formData.append("amount", coupon.amount.toString());
    // formData.append("price", coupon.price.toString());
    // // formData.append("imageName", coupon.imageName);
    // formData.append("image", coupon.image);

    // formData.append("image", coupon.image as File);

//    formData.append("image", coupon.image.toString());
   //file
    const response = await tokenAxios.post<Coupon>(appConfig.companyUrl,  coupon);
    const addedCoupon = response.data;
   store.dispatch(addCouponAction(addedCoupon));
} 
	

public async updateCoupon(coupon: Coupon): Promise<void> {
    // const formData = new FormData();
    // formData.append("id", coupon.id.toString());
    
    // formData.append("category", coupon.category.toString());
    // formData.append("title", coupon.title);
    // formData.append("description", coupon.description);
    // formData.append("startDate", coupon.startDate.toString());
    // formData.append("endDate", coupon.endDate.toString());
    // formData.append("amount", coupon.amount.toString());
    // formData.append("price", coupon.price.toString());
    // // formData.append("imageName", coupon.imageName);
    // formData.append("image", coupon.image );

//    formData.append("image", coupon.image.toString());
   //file
    const response =
    await tokenAxios.put<Coupon>(appConfig.companyUrl, coupon );
    const updatedCoupon = response.data;
   store.dispatch(updateCouponAction(updatedCoupon));
    } 

    public async deleteCoupon(couponId: number): Promise<void> {

        await tokenAxios.delete(appConfig.companyUrl+ couponId);
        store.dispatch(deleteCouponAction(couponId));
    }

    public async getOneCoupon(couponId: number):Promise<Coupon>{

        return store.getState().couponsState.coupons.find(c=>c.id===couponId);  
    }
    
    public async getAllCoupons():Promise<Coupon[]>{

        // if(couponsStore.getState().coupons.length===0){
    const response=await tokenAxios.get<Coupon[]>(appConfig.companyUrl+"coupons");
    const coupons = response.data;
    store.dispatch(fetchCouponAction(coupons));
    // return coupons;    
    // }
    return store.getState().couponsState.coupons;
    }

    // public async getAllCouponsByCategory(category: String):Promise<Coupon[]>{

    //     // if(couponsStore.getState().coupons.length===0){
    // const response=await tokenAxios.get<Coupon[]>(appConfig.companyUrl+"coupons-by-category?category="+ category);
    // const coupons = response.data;
    // store.dispatch(fetchCouponAction(coupons));
    // return coupons;    
    // }
    // console.log(response.data);
    
    // return store.getState().couponsState.coupons;
    // }

    // public async getAllCouponsByCategory2(category: String):Promise<Coupon[]>{
    //     console.log(8);

    //     return store.getState().couponsState.coupons.find(c=>c.category===category),[];
    // }
    // public async getAllCouponsByPrice2(price: number):Promise<Coupon[]>{
    //     console.log(price);
        

                   
    //     store.getState().couponsState.coupons.find((c)=>c.price<price);
    //     return
    //     ;
    // }
    


    // public async getAllCouponsByPrice(price: number):Promise<Coupon[]>{
    //     // if(couponsStore.getState().coupons.length===0){
           
    // const response=await tokenAxios.get<Coupon[]>(appConfig.companyUrl+"coupons-until-price");
    // const coupons = response.data;
    // store.dispatch(fetchCouponAction(coupons));
    // // return coupons;    
    // // }
    // return store.getState().couponsState.coupons;
    // }


    public async getCompanyDetails():Promise<Company>{
        const response=await tokenAxios.get<Company>(appConfig.companyUrl+"details");
        return  response.data;
    }
    
}
const companyService = new CompanyService();
export default companyService;