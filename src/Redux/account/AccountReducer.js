import accountTypes from "./AccountType";

const initialState = {
    account: {
        username: "",
        email: ""
    }
}

function accountReducer(state = initialState, action) {
    switch (action.type) {
        case accountTypes.SET_USERNAME:
            return {
                ...state,
                account: { ...state, username: action.payload }
            };
        case accountTypes.SET_EMAIL:
            return {
                ...state, account: { ...state, email: action.payload }
            };
        default:
            return state;
    }
}

export default accountReducer;