import React, { useEffect, useState,Component } from "react";
import { connect } from "react-redux";
import { setUsername, setEmail } from "../../Redux/account/AccountAction";
import { setProductId, setProductName } from "../../Redux/product/ProductAction";
import '../../Styles/LoginCSS/LoginStyle.css'
import { GetUserInformation } from "../../Services/UserService";
import { GetCookie } from "./CommonFunctionLogin";

class UserInformationPage extends Component {

    // const initUserInformation = { firstname: "", lastname: "", email: "", phone: "" };
    // const [userInformation, setUserInformation] = useState(initUserInformation);

    // useEffect(()=>{
    //     LoadInformation();
    // },[])

    // async function CallGetUserInformation(input){
    //     var response = await GetUserInformation(input);
    //     console.log(`response : ${JSON.stringify(response)}`)
    //     if (response.status) {
    //         return response;
    //     } else {
    //         return false;
    //     }
    // }

    // async function LoadInformation(){
    //     const username = GetCookie("username")
    //     const userModel = {username : username};
    //     var response = await CallGetUserInformation(userModel);
    //     const info = response.userInformation;
    //     const newInformation = initUserInformation;
    //     newInformation.email = info.username;
    //     setUserInformation(newInformation);
    // }
    render() {
        return (
            <div className="layout_main">
                <div className="userinformation_layout">
                    <h1>UserInformation</h1>
                    <label>Name : {``}</label>
                    <br />
                    <label>Email : {}</label>
                    <br />
                    <label>phone : {}</label>
                </div>
                <label>test {this.props.account.account.username}</label>
                <button onClick={() => { this.props.setUsername("test") }}>click me</button>
                <label>productId {this.props.product.productTest}</label>
                <button onClick={() => { this.props.setProductId("999") }}>click me</button>
            </div>
        );
    }
}

const mapStateToprops = state => {
    return {
        account: state.account,
        product: state.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUsername: (e) => dispatch(setUsername(e)),
        setEmail: (e) => dispatch(setEmail(e)),
        setProductId: (e) => dispatch(setProductId(e)),
        setProductName: (e) => dispatch(setProductName(e))
    }
}

export default connect(mapStateToprops, mapDispatchToProps)(UserInformationPage);