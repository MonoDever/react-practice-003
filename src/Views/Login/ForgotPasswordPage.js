import React, { useState } from "react";
import { ForgotPassword } from "../../Services/UserService";
import { ValidateEmail } from "./CommonFunctionLogin";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const initMailRequestModel = { "toEmail": "", "subject": null, "body": null, "link": null, "attachments": null };
    const [email, setEmail] = useState("");
    const initDisplayValidate = { "email": "none" };
    const [displayValidate, setDisplayValidate] = useState(initDisplayValidate);

    async function CallForgotPassword(input) {
        var response = await ForgotPassword(input);
        console.log(`response : ${JSON.stringify(response)}`)
        if (response !== false && response.status) {
            return response;
        } else {
            return false;
        }
    }

    function ClearError(event) {
        let newDisplayValidate = displayValidate;
        if (event === "email") {
            newDisplayValidate.email = "none";
        }
        setDisplayValidate(newDisplayValidate);
    }

    async function Submit() {
        var mailRequestModel = initMailRequestModel;
        mailRequestModel.toEmail = email;

        let newDisplayValidate = initDisplayValidate;
        var validateEmailResult = ValidateEmail(email);
        if (validateEmailResult === true) {
            newDisplayValidate.email = "none";
        } else {
            newDisplayValidate.email = "inline";
        }
        setDisplayValidate(newDisplayValidate);

        if (validateEmailResult === true) {
            var response = await CallForgotPassword(mailRequestModel);
            if (response === false) {
                alert('call error');
                return;
            } else {
                alert("Successs");
            }
        } else {
            return;
        }
    }
    function GotoLoginPage(){
        navigate("/login",{replace:true});
    }
    return (
        <div className="layout_main">
            <div className="forgot_layout">

                <h1>Forgot  Password</h1>
                <div className="row">
                    <label className="col-sm-2">Email</label>
                    <div className="col-10">
                        <input className="col-12" placeholder="Specify email"
                            onChange={(e) => {setEmail(e.target.value);ClearError("email")}} value={email} />
                        <label className="label_error" style={{ display: displayValidate.email }} >*email address is invalid.</label>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="btn_start col-sm-4">
                    <button id="registersubmit" className="btn_register"
                            type="button" onClick={() => GotoLoginPage()}
                        ><i class='fas fa-angle-double-left'></i> Login</button>
                    </div>
                    <div className="btn_center col-sm-4">
                        <button className="button_submit"
                            type="button" onClick={() => Submit()}
                        >Submit</button>
                    </div>
                    <div className="btn_start col-sm-4"></div>
                </div>
            </div>
        </div>
    )
}