import React, { useState,useEffect } from "react";
import { CheckConfirmPassword, PasswordInformation, ValidatePassword,Hasher } from "./CommonFunctionLogin";
import queryString from "query-string";
import { ResetPassword } from "../../Services/UserService";

export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const initDisplayValidate = { "newPassword": "none", "confirmNewPassword": "none" };
    const [displayValidate, setDisplayValidate] = useState(initDisplayValidate);
    const initUserModel = { "username": "", "password": "", "firstname": null, "lastname": null };

    useEffect(() => {
        let elSubmit = document.getElementById("resetsubmit");
        if (newPassword !== "" && confirmNewPassword !== "") {
            elSubmit.disabled = false;
        } else {
            elSubmit.disabled = true;
        }
    }, [newPassword, confirmNewPassword])

    async function CallResetPassword(input){
        var response = await ResetPassword(input);
        console.log(`response : ${JSON.stringify(response)}`)
        if (response !== false && response.status) {
            return response;
        } else {
            return false;
        }
    }

    function ClearError(event) {
        let newDisplayValidate = displayValidate;
        if (event === "newPassword") {
            newDisplayValidate.newPassword = "none";
        }
        if (event === "confirmNewPassword") {
            newDisplayValidate.confirmNewPassword = "none";
        }
        setDisplayValidate(newDisplayValidate);
    }

    async function Submit() {
        let newDisplayValidate = initDisplayValidate;

        //#region Validate 
         var validateNewPasswordResult = ValidatePassword(newPassword);
         var validateConfirmNewPasswordResult = CheckConfirmPassword(newPassword,confirmNewPassword);
         if(validateNewPasswordResult){
            newDisplayValidate.newPassword = "none";
         }else{
            newDisplayValidate.newPassword = "inline";
         }

         if(validateConfirmNewPasswordResult){
            newDisplayValidate.confirmNewPassword = "none";
         }else{
            newDisplayValidate.confirmNewPassword = "inline";
         }
         setDisplayValidate(newDisplayValidate);
        //#endregion Validate 

        if(validateNewPasswordResult && validateConfirmNewPasswordResult){
            var params = queryString.parse(window.location.search);
            var hashedPassword = Hasher(newPassword);
            const userModel = initUserModel;
            userModel.username = params.email;
            userModel.password = hashedPassword;
            var response = await CallResetPassword(userModel);
            if (response === false) {
                alert('call error');
                return;
            } else {
                alert("Successs");
            }
        }
    }

    return (
        <div className="layout_main">
            <div className="reset_layout">
                <h1>Reset Password</h1>
                <div className="row">
                    <label className="col-sm-2">New Password</label>
                    <div className="col-10">
                        <input className="col-12" placeholder="Specify new password"
                            onChange={(e) => {setNewPassword(e.target.value);ClearError("newPassword")}}
                            value={newPassword} type="password" />
                        <label className="label_error" style={{ display: displayValidate.newPassword }} >*New password is invalid.</label>
                        {/* PasswordInformation */}
                        <PasswordInformation />
                    </div>

                </div>
                <br />
                <div className="row">
                    <label className="col-sm-2">Confirm New Password</label>
                    <div className="col-10">
                        <input className="col-12" placeholder="Specify confirm new password"
                            onChange={(e) => {setConfirmNewPassword(e.target.value);ClearError("confirmNewPassword")}}
                            value={confirmNewPassword} type="password" />
                    <label className="label_error" style={{ display: displayValidate.confirmNewPassword }} >*ConfirmPassword not equal first password.</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="btn_center col-sm-4">
                        <button id="resetsubmit" className="button_submit"
                            type="button"
                            onClick={() => Submit()}>Submit</button>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        </div>
    )
}