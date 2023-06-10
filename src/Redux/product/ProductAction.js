import productTypes from "./ProductType";

export function setProductId(value){
    return{
        type:productTypes.SET_PRODUCTID,
        payload:value
    }
}

export function setProductName(value){
    return{
        type:productTypes.SET_PRODUCTNAME,
        payload:value
    }
}