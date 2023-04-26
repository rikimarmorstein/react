import Coupon from "../Models/Coupon";

export class CouponState {
    public coupons: Coupon[] = [];
    public myCoupons: Coupon[] = [];
}

// 2. Action Types - list of actions - enum
export enum CouponActionType {
    FetchCoupons = "FetchCoupons",
    FetchCouponsPurchases = "FetchCouponsPurchases",
    AddCoupon = "AddCoupon",
    AddPurchaseCoupon = "AddPurchaseCoupon",
    UpdateCoupon = "UpdateCoupon",
    DeleteCoupon = "DeleteCoupon",
    Logout = "Logout"
}

// 3. Action - an interface describing a single command
export interface CouponsAction {
    type: CouponActionType; // action type
    payload: any; // action data
}

// 4. action creators - functions to create action objects
export function fetchCouponAction(coupons: Coupon[]): CouponsAction {
    return { type: CouponActionType.FetchCoupons, payload: coupons };
}

export function fetchCouponPurchasesAction(coupons: Coupon[]): CouponsAction {
    return { type: CouponActionType.FetchCouponsPurchases, payload: coupons };
}
export function addCouponAction(coupon: Coupon): CouponsAction {
    return { type: CouponActionType.AddCoupon, payload: coupon };
}
export function updateCouponAction(coupon: Coupon): CouponsAction {
    return { type: CouponActionType.UpdateCoupon, payload: coupon };
}
export function addPurchaseCouponAction(coupon: Coupon): CouponsAction {
    return { type: CouponActionType.AddPurchaseCoupon, payload: coupon };
}
export function deleteCouponAction(id: number): CouponsAction {
    return { type: CouponActionType.DeleteCoupon, payload: id };
}
export function logoutAction(): CouponsAction {
    return { type: CouponActionType.Logout, payload: {} };
}

// 5. reducer - a single function performing any of the above actions

export function couponReducer(currentState: CouponState = new CouponState(), action: CouponsAction): CouponState {
    const newState = { ...currentState }; // duplicate current state

    switch (action.type) {
        case CouponActionType.FetchCoupons: // here payload is all coupons
            newState.coupons = action.payload;
            break;
        case CouponActionType.FetchCouponsPurchases: // here payload is all coupons
            newState.myCoupons = action.payload;
            break;
        case CouponActionType.AddCoupon: // here payload is a single coupon to add
            newState.coupons.push(action.payload);
            break;
        case CouponActionType.AddPurchaseCoupon:
            newState.myCoupons.push(action.payload);
            break;
        case CouponActionType.UpdateCoupon: // here payload is a single coupon to update
            const indexToUpdate = newState.coupons.findIndex(c => c.id === action.payload.id);
            if (indexToUpdate >= 0) newState.coupons[indexToUpdate] = action.payload;
            break;
        case CouponActionType.DeleteCoupon: // here payload is an id of coupon to delete
            const indexToDelete = newState.coupons.findIndex(c => c.id === action.payload);
            if (indexToDelete >= 0) newState.coupons.splice(indexToDelete, 1);
            break;
        case CouponActionType.Logout:
            newState.myCoupons = [];
            newState.coupons = [];
            break;
    }

    return newState;
}

