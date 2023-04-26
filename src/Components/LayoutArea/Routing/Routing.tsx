import { Route, Routes } from "react-router-dom";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import AdminArea from "../../AdminArea/AdminArea/AdminArea";
import CompanyDetails from "../../AdminArea/CompanyDetails/CompanyDetails";
import CompanyList from "../../AdminArea/CompanyList/CompanyList";
import CustomerDetails from "../../AdminArea/CustomerDetails/CustomerDetails";
import CustomerList from "../../AdminArea/CustomerList/CustomerList";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import CompanyArea from "../../CompanyArea/CompanyArea/CompanyArea";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import Login from "../../AuthArea/Login/Login";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import CouponList from "../../CompanyArea/CouponList/CouponList";
import CustomerArea from "../../CustomerArea/CustomerArea/CustomerArea";
import CouponDetails from "../../CompanyArea/CouponDetails/CouponDetails";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import GetCompanyDetails from "../../CompanyArea/GetCompanyDetails/GetCompanyDetails";
import GetCustomerDetails from "../../CustomerArea/GetCustomerDetails/GetCustomerDetails";
import AllCouponList from "../../CustomerArea/AllCouponList/AllCouponList";
import PurchaseCoupon from "../../CustomerArea/PurchaseCoupon/PurchaseCoupon";
import CouponsPurchaseList from "../../CustomerArea/CouponsPurchaseList/CouponsPurchaseList";
import About from "../../HomeArea/About/About";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">

            <Routes>
                <Route path="/home" element={<Home />} />
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />

//admin
                <Route path="/admin-home" element={<AdminArea />} />
                <Route path="/admin/add-company" element={<AddCompany />} />
                <Route path="/admin/all-companies" element={<CompanyList />} />
                <Route path="/admin/company/:companyId" element={<CompanyDetails />} />
                <Route path="/admin/company-update/:companyId" element={<UpdateCompany />} />
                <Route path="/admin/company-delete/:companyId" element={<></>} />
                <Route path="/admin/add-customer" element={<AddCustomer />} />
                <Route path="/admin/all-customers" element={<CustomerList />} />
                <Route path="/admin/customer/:customerId" element={<CustomerDetails />} />
                <Route path="/admin/customer-update/:customerId" element={<UpdateCustomer />} />
//company
                <Route path="/company-home" element={<CompanyArea />} />
                <Route path="/company/coupon/:couponId" element={<CouponDetails />} />
                <Route path="/company/coupon-update/:couponId" element={<UpdateCoupon />} />
                <Route path="/company/all-coupons" element={<CouponList />} />
                <Route path="/company/companyDetails" element={<CompanyArea />} />
                <Route path="/companyDetails" element={<GetCompanyDetails />} />
                <Route path="/company-add-coupon" element={<AddCoupon />} />

  //customer
                <Route path="/customer-home" element={<CustomerArea />} />
                <Route path="/customer/all-coupons" element={<AllCouponList />} />
                <Route path="/customer/purchase/:couponId" element={<PurchaseCoupon />} />
                <Route path="/customer-coupons" element={<CouponsPurchaseList />} />
                <Route path="/customerDetails" element={<GetCustomerDetails />} />

                <Route path="*" element={<PageNotFound />} />

            </Routes>

        </div>
    );
}

export default Routing;
