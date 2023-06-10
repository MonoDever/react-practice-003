import { connect, useSelector,useDispatch } from "react-redux"
import { setUsername,setEmail } from "../../Redux/account/AccountAction"
import { setProductId,setProductName } from "../../Redux/product/ProductAction"


function NewProduct(props){
    const account = useSelector((state) => state.account);
    const dispatch = useDispatch();

    return(
        <div>
            <label>test {account.account.username}</label>
            <button onClick={() => dispatch(setUsername("test"))}>click me</button>
        </div>
    )
}

export default NewProduct