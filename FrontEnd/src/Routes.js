import {Switch, Route , BrowserRouter as Router  } from "react-router-dom";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageCategories from "./admin/ManageCategories";
import ManageProducts from "./admin/ManageProducts";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import AdminDashBoard from "./user/AdminDashBoard";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/cart";
import UpdateACategory from "./admin/UpdateCategory"



const Routers = () => {
    return ( 
        <Router>
            <Switch>
                
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/cart" exact component={Cart} />
                <PrivateRoute  path="/user/dashboard" exact component={UserDashBoard} />
                <AdminRoute  path="/admin/create/category" exact component={AddCategory} />
                <AdminRoute  path="/admin/dashboard" exact component={AdminDashBoard} />
                <AdminRoute  path="/admin/categories" exact component={ManageCategories} />
                <AdminRoute  path="/admin/categories/update/:categoryId" exact component={UpdateACategory} />
                <AdminRoute  path="/admin/create/product" exact component={AddProduct} />
                <AdminRoute  path="/admin/products" exact component={ManageProducts} />
                <AdminRoute  path="/admin/product/update/:productId" exact component={UpdateProduct} />
                
            </Switch> 
        </Router>
     );
}
 
export default Routers;