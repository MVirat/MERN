import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { getProducts } from "./helper/adminapicall";
import { deleteProduct } from "./helper/adminapicall";



const ManageProducts = () => {

    const [products, setproducts] = useState([]);

    const { user, token } = isAutheticated();

    const preload = () => {
        getProducts().then(data =>{
            if (data.error) {
                console.log(data.error);
            }else{
                setproducts(data)
            }
        })
    }

    useEffect(() => {
        preload();
    }, []);

    const deleteThisProduct = productId => {
        deleteProduct(productId,user._id,token).then(data =>{
            if (data && data.error) {
                console.log(data.error);
            }else{
                preload();
            }
         })
    }

    return ( 
    <Base title="Welcome admin" description="Manage products here">

       <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
       </Link>
     
      
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">All Products:</h2>
            {products.map((product,index)=>{
                return(
                <div key={index} className=" row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button onClick={() => {deleteThisProduct(product._id)}} className="btn btn-danger">
                    Delete
                  </button>
                </div>
             </div>)
            })}

        </div>
      </div>
    </Base>
     );
}


 export default ManageProducts;