import Category from "./Category";

class Coupon{

    public id: number;
	public category: Category ;
	public title: string;
	public description: string;
	public startDate: Date;
	public endDate: Date;
	public amount: number;
	public price: number;
	public image: string;
    

}

export default Coupon;