import productTypes from "./ProductType";

const initialState = {
    product: {
        productId: "",
        productName: ""
    },
    productTest : ""
}

function productReducer(state = initialState, action) {
    switch (action.type) {
        case productTypes.SET_PRODUCTID:
            return {
                ...state,
                productTest : action.payload
            };
        case productTypes.SET_PRODUCTNAME:
            return {
                ...state,
                product: { ...state, productName: action.payload }
            };
        default:
            return state;
    }
}

export default productReducer;