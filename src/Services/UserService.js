import { GetCookie } from "../Views/Login/CommonFunctionLogin";
const urlPath = "http://localhost:5152/";

export async function RegisterUser(value){
    const subPath = 'api/user/register'
    const response = await fetch(`${urlPath}${subPath}`,{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(value)
    })
    const jsonResponse = await response.json();
    return jsonResponse;
}
export async function Login(value){
    const subPath = 'api/user/login';
    try{
        const response = await fetch(`${urlPath}${subPath}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(value)
        });
        const jsonResponse = await response.json();
        return jsonResponse;
    }catch(error){
        return false;
    }
}
export async function UserInformation(value){
    const subPath = 'api/user/login';
    const response = await fetch(`${urlPath}${subPath}`,{
        method:'GET',
        headers:{'Content-Type':'application/json',
        "Authorization":`Bearer ${GetCookie("auth")}`}
    })
    const jsonResponse = await response.json();
    return jsonResponse;
}
export async function ForgotPassword(value){
    try{
        const subPath = 'api/user/forgotpassword';
        const response = await fetch(`${urlPath}${subPath}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(value)
        })
        const jsonResponse = await response.json();
        return jsonResponse;
    }catch(error){
        return false;
    }
}
export async function ResetPassword(value){
    try{
        const subPath = 'api/user/resetpassword';
        const response = await fetch(`${urlPath}${subPath}`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(value)
        })
        const jsonResponse = await response.json();
        return jsonResponse;
    }catch(error){
        return false;
    }
}
export async function GetUserInformation(value){
    try{
        const auth = GetCookie("auth")
        const subPath = 'api/user/getuserinformation';
        const response = await fetch(`${urlPath}${subPath}`,{
            method:'POST',
            headers:{'Content-Type':'application/json','Authorization':`Bearer ${auth}`},
            body:JSON.stringify(value)
         })
         const jsonResponse = await response.json();
        return jsonResponse;
    }catch(error){
        return false;
    }
}