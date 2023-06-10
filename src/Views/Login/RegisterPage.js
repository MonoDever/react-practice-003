import React, { useEffect, useState } from "react";
import { RegisterUser } from "../../Services/UserService";
import '../../Styles/LoginCSS/LoginStyle.css'
import Turnstile from "react-turnstile";
import { Hasher, ValidateEmail, ValidatePassword,PasswordInformation,CheckConfirmPassword } from "./CommonFunctionLogin";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const initDisplayValidate = { "email": "none", "password": "none", "confirmPassword": "none" };
    const [displayValidate, setDisplayValidate] = useState(initDisplayValidate);
    const [enableSubmit, setEnableSubmit] = useState("disabled");
    const initUserModel = { "username": "", "password": "", "firstname": "", "lastname": "" };
    const [status, setStatus] = useState("");

    useEffect(() => {
        let elSubmit = document.getElementById("registersubmit");
        console.log(`status : ${status}`);
        if (email !== "" && password !== "" && confirmPassword !== "") {
            elSubmit.disabled = false;
        } else {
            elSubmit.disabled = true;
        }
    }, [email, password, confirmPassword])
    
    function ClearError(event) {
        let newDisplayValidate = displayValidate;
        if (event === "email") {
            newDisplayValidate.email = "none";
        }
        if (event === "password") {
            newDisplayValidate.password = "none";
        }
        if (event === "confirmPassword") {
            newDisplayValidate.confirmPassword = "none";
        }
        setDisplayValidate(newDisplayValidate);
    }

    function CallReisterUser(input) {
        RegisterUser(input).then(response => {
            console.log(`response : ${JSON.stringify(response)}`);
            if (response.status) {
                alert(`Success`);
            } else {
                alert(`Unsuccess`);
            }
        })
    }
    async function Submit() {
        let newDisplayValidate = initDisplayValidate;

        let validateEmailResult = ValidateEmail(email);
        if (validateEmailResult === true) {
            newDisplayValidate.email = "none";
        } else {
            newDisplayValidate.email = "inline";
        }

        let validatePasswordResult = ValidatePassword(password);
        if (validatePasswordResult === true) {
            newDisplayValidate.password = "none";
        } else {
            newDisplayValidate.password = "inline";
        }

        let validateConfirmPasswordResult = CheckConfirmPassword(password,confirmPassword);
        if (validateConfirmPasswordResult === true) {
            newDisplayValidate.confirmPassword = "none";
        } else {
            newDisplayValidate.confirmPassword = "inline";
        }

        setDisplayValidate(newDisplayValidate);

        if (validateEmailResult === true && validatePasswordResult === true && validateConfirmPasswordResult === true) {
            var hashedPassword = Hasher(password);
            const userModel = initUserModel;
            userModel.username = email;
            userModel.password = hashedPassword;
            userModel.firstname = "test";
            userModel.lastname = "test"
            CallReisterUser(userModel);
        }

    }

    function TurnstileWidget() {

        return (
            <div className="turnstile">
                <Turnstile
                    sitekey="0x4AAAAAAAEifWGXyXvyJjT_"
                    onVerify={(token) => setStatus(token)}
                />
            </div>
        );
    }

    function GotoLoginPage(){
        navigate("/login",{replace:true});
    }
    return (
        <div className="container-fluid layout_main">
            <div className="layout_register">
                <h1>Register</h1>
                <div className="row">
                    <label className="col-sm-2">Email</label>
                    <div className="col-10">
                        <input className="col-12" placeholder="Specify email"
                            onChange={(e) => { setEmail(e.target.value); ClearError("email"); }} value={email} />
                        <label className="label_error" style={{ display: displayValidate.email }} >*email address is invalid.</label>
                    </div>
                </div>
                <br />
                <div className="row">
                    <label className="col-sm-2">Password</label>
                    <div className="col-10">
                        <input className="col-12" placeholder="Specify password"
                            onChange={(e) => { setPassword(e.target.value); ClearError("password") }} value={password} type="password" />
                        {/* PasswordInformation */}
                        <PasswordInformation />
                        <label className="label_error" style={{ display: displayValidate.password }} >*password is invalid.</label>
                    </div>

                </div>
                <br />
                <div className="row">
                    <label className="col-sm-2">Confirm Password</label>
                    <div className="col-10">
                        <input className="col-12" placeholder="Specify confirm password"
                            onChange={(e) => { setConfirmPassword(e.target.value); ClearError("confirmPassword") }} value={confirmPassword} type="password" />
                        <label className="label_error" style={{ display: displayValidate.confirmPassword }} >*ConfirmPassword not equal first password.</label>
                    </div>
                </div>
                <br />
                {/* TurnstileWidget */}
                {/* <TurnstileWidget /> */}
                <div className="row">
                    <div className="col-sm-4">

                    </div>
                    <div className="btn_center col-sm-4">
                        <button id="registersubmit" className="button_submit"
                            type="button"
                            onClick={() => Submit()}>Submit</button>
                    </div>
                    <div className="btn_end col-sm-4">
                    <button id="registersubmit" className="btn_forgotpassword"
                            type="button" onClick={() => GotoLoginPage()}
                        >Login <i class='fas fa-angle-double-right'></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}