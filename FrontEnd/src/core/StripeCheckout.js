import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";


const StripeCheckout = ({products, setReload = f => f , reload = undefined}) => {

    const [data, setData] = useState({
        loading:false,
        success:false,
        error : "",
        address:""
    });

    const tokenn = isAutheticated() && isAutheticated().token;
    const userId = isAutheticated() && isAutheticated().user._id;
    
    const getFinalAmount = () => {
        let amount = 0
        products.map(p => (
            amount = amount + p.price
        ))
        return amount
    }

    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response);
            const {status} = response;
            console.log("STATUS",status);

            const orderData ={
                products: products
                
            }
            createOrder(userId,tokenn,orderData);

            cartEmpty(()=>{
                console.log("Did we got a crash")
            })
            
            setReload(!reload);
        }).catch(error => console.log(error))
    }

    const showStripeButton = () => {
        return isAutheticated() ? (<StripeCheckoutButton 
            stripeKey="pk_test_51JnXZ4SDNjzhFpd70KLlcvcYc6vJJjosizBCUccqEkNlG9KhykPUvlVH6hWOoQvr7CttDOx8McYwA0kgnMdoVE0i00afSPFQf8" 
            token={makePayment} 
            amount={getFinalAmount() * 100 } 
            name="Buy Tshirt"
             shippingAddress 
             billingAddress >
            <button className="btn btn-success">Pay With Strip</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin"><button className="btn btn-warning">Signin</button></Link>
            )  ;     }

    return ( 
        <div>
        <h3 className="text-white">Stripe {getFinalAmount()}</h3>
        {showStripeButton()}
        </div>
     );
}
 
export default StripeCheckout;