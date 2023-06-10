import React, { useState } from "react";
import '../../Styles/LoginCSS/LoginStyle.css'
import { ValidateEmail, ValidatePassword, HashedCompare, Hasher, SetToken, GetCookie } from "../Login/CommonFunctionLogin"
import { Login } from "../../Services/UserService";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const initUserModel = { "username": "", "password": "", "firstname": "", "lastname": "" }
    const [userEntity, setUserEntity] = useState(null);
    
    async function CallLogin(input) {
        var response = await Login(input);
        console.log(`response : ${JSON.stringify(response)}`)
        if (response.status) {
            return response;
        } else {
            return false;
        }
    }
    async function Submit() {
        const validateEmailResult = ValidateEmail(email);
        const validatePasswordResult = ValidatePassword(password);
        const elDisplayError = document.getElementById("display_error");
        if (validateEmailResult !== true || validatePasswordResult !== true) {
            elDisplayError.style.display = "inline";
            return;
        } else {
            elDisplayError.style.display = "none";
        }
        var hashedPassword = Hasher(password);
        const userModel = initUserModel;
        userModel.username = email;
        userModel.password = hashedPassword;

        var response = await CallLogin(userModel);
        if (response === false) {
            alert('call error');
            return;
        }
        var compareResult = HashedCompare(password, response.user.password);
        if (compareResult) {
            SetToken(response.user.auth,response.user.username);
            alert("Login Success");
            GotoUserInformation();
        }else{
            alert("Login UnSuccess");
        }
    }
    function GotoUserInformation(){
        navigate("/userinformation",{replace:false});
    }
    function GotoRegisterPage(){
        navigate("/register",{replace:true});
    }
    function GotoForgotPasswordPage(){
        navigate("/forgotpassword",{replace:false});
    }
    return (
        <div className="layout_main">
            <div className="login_layout">
                <h1>Login</h1>
                <div className="row">
                    <label className="col-sm-2">Email</label>
                    <div className="col-10">
                        <input className="col-12" placeholder="Specify email"
                            onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                </div>
                <br />
                <div className="row">
                    <label className="col-sm-2">Password</label>
                    <div className="col-10">
                        <input className="col-12" placeholder="Specify password"
                            onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                </div>
                <br />
                <label id="display_error" className="label_error" style={{ display: "none" }} >*email or password is invalid.</label>
                <div className="row">
                    <div className="btn_start col-sm-4">
                        <button id="registersubmit" className="btn_register"
                            type="button" onClick={() => GotoRegisterPage()}
                        ><i class='fas fa-angle-double-left'></i> Register</button>
                    </div>
                    <div className="btn_center col-sm-4">
                        <button id="registersubmit" className="button_submit"
                            type="button" onClick={() => Submit()}
                        >Submit</button>
                    </div>
                    <div className="btn_end col-sm-4">
                        <button id="registersubmit" className="btn_forgotpassword"
                            type="button" onClick={() => GotoForgotPasswordPage()}
                        >Forgot password <i class='fas fa-angle-double-right'></i></button>
                    </div>
                </div>

            </div>
        </div>
    )
}