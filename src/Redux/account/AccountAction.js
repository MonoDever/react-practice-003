import accountTypes from "./AccountType";

export function setUsername(value){
    return {
        type:accountTypes.SET_USERNAME,
        payload:value
    }
}

export function setEmail(value){
    return {
        type:accountTypes.SET_EMAIL,
        pauload:value
    }
}