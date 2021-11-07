import { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import { getProducts } from "./helper/coreapicalls";
import StripeCheckout from "./StripeCheckout";


const Cart = () => {
    
   const [products, setProducts] = useState([]);
   const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart())
    }, [reload]);

   const loadAllProducts = (products) => { 
       return(
           <div>
             <h2>This section is load product</h2>
             {products.map((product,index)=>(
                 <Card key={index} product={product} removeFromCart={true}
                 addtoCart={false } setReload={setReload} reload={reload} />
             ))}
           </div>
       )
   }

   const loadCheckout = () => {
       return(
           <div>
                <h2>CheckOut</h2>
           </div>
       )
   }
    

    return ( 
        <Base title="Cart Page" decription="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">{products.length > 0 ? loadAllProducts(products) : (<h3>No Product in cart</h3>) }</div>
                <div className="col-6"><StripeCheckout 
                products={products}
                setReload = {setReload}
                /></div>
            </div>
        </Base>
     );
}
 
export default Cart;