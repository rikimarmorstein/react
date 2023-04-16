import { EnumType } from "typescript";
import Category from "./Category";
import Company from "./Company";

class Coupon{

    public id: number;
    // public company: Company;
	public category: Category ;//string
	public title: string;
	public description: string;
	public startDate: Date;
	public endDate: Date;
	public amount: number;
	public price: number;
	public image: string;
    // public imageName:string;
	// public image: File | FileList;
	// private List<Customer> purchases;

}

export default Coupon;