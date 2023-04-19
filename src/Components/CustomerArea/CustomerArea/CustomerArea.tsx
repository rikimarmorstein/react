import customerService from "../../../Services/CustomerService";
import {TbShoppingBag} from "react-icons/tb";
import "./CustomerArea.css";
import { useEffect, useState } from "react";
import store from "../../../Redux/Store";

function CustomerArea(): JSX.Element {

    customerService.getCustomerCoupons();
    
    
    return (
        <div className="CustomerArea">

            <div id="div">
          <h2>Dear  client,</h2>

<h4>
Welcome to the coupon purchases site,
In this area you can purchase coupons and view your coupon data in an accessible way.
Wishing you much success!
</h4>

<h3>For any question / comment, please contact us at rikim1010@gmail.com</h3>
       </div> {/* <table >  <tr>
        <td >  */}
			{/* <input type="radio" id="regular" name="fav_language" value="regular"/></td> </tr></table> */}
      
        </div>
    );
}

export default CustomerArea;
