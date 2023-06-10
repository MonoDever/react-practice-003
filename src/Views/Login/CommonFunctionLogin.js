import bcryptjs from "bcryptjs";

export const token = "token";
export function ValidatePassword(input) {
    //The string must contain at least 1 lowercase alphabetical character
    //The string must contain at least 1 uppercase alphabetical character
    //The string must contain at least 1 numeric character
    //The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
    //The string must be eight characters or longer
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;
    let output = input.match(pattern);
    if (output != null) {
        return true;
    } else {
        return false;
    }
}
export function ValidateEmail(input) {
    var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var output = input.match(pattern);
    if (output != null) {
        return true;
    } else {
        return false;
    }
}
export function CheckConfirmPassword(password,confirmPassword) {
    if (password === confirmPassword) {
        return true;
    } else {
        return false;
    }
}
export function Hasher(password) {
    const saltRounds = 10;
    const plaintextPassword = password;

    const hashed = bcryptjs.hashSync(plaintextPassword, saltRounds);
    const compare = bcryptjs.compareSync(plaintextPassword, hashed);
    if (compare === true) {
        return hashed
    } else {
        alert("hasher error occur");
    }
}
export function HashedCompare(password, hashedPassword) {
    const compare = bcryptjs.compareSync(password, hashedPassword);
    return compare;
}
export function SetToken(jwtToken,username) {
    document.cookie = `auth=${jwtToken}; max-age=3600; secure; samesite=strict`;
    document.cookie = `username=${username}; max-age=3600; secure; samesite=strict `;
}
export function GetCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

export const PasswordInformation = () => {

    function DisplayPasswordInformation() {
        const co = document.getElementById("guideline");

        co.classList.toggle("toggle");
        if (co.style.maxHeight) {
            co.style.maxHeight = null;
            co.style.borderWidth = "0px";
        } else {
            co.style.maxHeight = co.scrollHeight + "px";
            co.style.borderWidth = "1px";
        }
    }

    return (
        <div >
            <i id="guidelineicon" class='far fa-question-circle icon_collapsible'
                onClick={(e) => DisplayPasswordInformation()}><span className="span_passwordinformation"> Strong password guideline.</span></i>
            <div id="guideline" className="div_passwordinformation" >
                <li className="label_passwordinfomation">The string must contain at least 1 lowercase alphabetical character</li>
                <li className="label_passwordinfomation">The string must contain at least 1 uppercase alphabetical character</li>
                <li className="label_passwordinfomation">The string must contain at least 1 numeric character</li>
                <li className="label_passwordinfomation">The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict</li>
                <li className="label_passwordinfomation">The string must be eight characters or longer</li>
            </div>
        </div>
    )
}