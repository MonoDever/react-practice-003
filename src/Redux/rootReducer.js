import { combineReducers } from "redux";
import accountReducer from "./account/AccountReducer";
import productReducer from "./product/ProductReducer";

export default combineReducers({
    account : accountReducer,
    product : productReducer
});