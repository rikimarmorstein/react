import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import store from "../../../Redux/Store";
import Category from "../../../Models/Category";
import notificationService from "../../../Services/NotificationService";
import CouponCardPurchase from "../CouponDetailsPurchase/CouponDetailsPurchase";
import allCouponsService from "../../../Services/AllCouponsService";
import { RiRestaurantFill } from "react-icons/ri";
import { ImSearch } from "react-icons/im";
import { MdElectricalServices, MdFastfood } from "react-icons/md";
import { TbBeachOff } from "react-icons/tb";
import { FaGifts } from "react-icons/fa";
import { Button } from "@mui/material";
import "./AllCouponList.css";

function AllCouponList(): JSX.Element {
    let couponId: number;

    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponsState.coupons);
    const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const [selectedName, setSelectedName] = useState<string>("");


    useEffect(() => {
        (async () => {
            allCouponsService.getAllCoupons().then((arr) => {
                setCoupons(arr);
            }, (error) => {
                notificationService.error(error);
            });

        })();

    }, []);


    function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
        const currentPrice = +e.currentTarget.value;
        setSelectedPrice(currentPrice);
        let filteredCoupons = store.getState().couponsState.coupons;
        if (currentPrice != 0) {
            filteredCoupons = filteredCoupons.filter((coupon) => {
                return coupon.price <= currentPrice;
            })
        }        
        setCoupons(filteredCoupons);
    }


    function handleCategoryChange(e: FormEvent<HTMLButtonElement>) {
        let currentCategory = e.currentTarget.value;
        let filteredCoupons = store.getState().couponsState.coupons;
        if (currentCategory != "ALL") {
            filteredCoupons = filteredCoupons.filter((coupon) => {
                return coupon.category === currentCategory;
            })
        } 
        if (selectedPrice != 0) {
            filteredCoupons = filteredCoupons.filter((coupon) => {
                return coupon.price <= selectedPrice;
            })
        }
        setCoupons(filteredCoupons);
        filteredCoupons.map((c) => couponId = c.id);
    }

    function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
        const currentName = e.currentTarget.value;
        setSelectedName(currentName);
        let filteredCoupons = store.getState().couponsState.coupons;
        const currentNameCase = currentName.toUpperCase();
        filteredCoupons = filteredCoupons.filter((coupon) => {
            return coupon.title.toUpperCase().match(currentNameCase);
        }
        )
        if (selectedPrice != 0) {
            filteredCoupons = filteredCoupons.filter((coupon) => {
                return coupon.price <= selectedPrice;
            })
        }
        setCoupons(filteredCoupons);
        filteredCoupons.map((c) => couponId = c.id);
    }


    return (
        <div className="AllCouponList" id="up">

            <form className="formPrice">
                <span>Until price:</span> <input type="number" name="price" id="price" placeholder="Until price" min={0} onChange={handlePriceChange} value={selectedPrice} />
            </form>
            <Button variant="outlined" color="primary" type="submit" onClick={handleCategoryChange} value={Category.FOOD}> <MdFastfood /> <br />FOOD</Button>
            <Button variant="outlined" color="primary" type="submit" onClick={handleCategoryChange} value={Category.ELECTRICITY}   ><MdElectricalServices /> <br /> ELECTRICITY</Button>
            <Button variant="outlined" color="primary" type="submit" onClick={handleCategoryChange} value={Category.RESTAURANT}><RiRestaurantFill /> <br /> RESTAURANT</Button>
            <Button variant="outlined" color="primary" type="submit" onClick={handleCategoryChange} value={Category.VACATION}><TbBeachOff /><br /> VACATION</Button>
            <Button variant="outlined" color="primary" type="submit" onClick={handleCategoryChange} value={"ALL"}><FaGifts /><br />All COUPONS</Button>

            <form ><ImSearch />
                <input type="text" name="name" id="name" placeholder="Enter coupon title for search" onChange={handleNameChange}
                    value={selectedName} />
            </form>  <br />

            {coupons.length > 0 ? coupons.map((c) => (
                <CouponCardPurchase key={c.id} coupon={c} />
            )) :
                <h2>No coupons found 🙁</h2>}
            <div className="list-top-coupons">
                {coupons.length > 0 && <a href="#up" title="Scroll up">👆</a>
                }</div>

        </div>
    );
}

export default AllCouponList;
