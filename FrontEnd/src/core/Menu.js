import { Fragment } from "react";
import {Link, withRouter  } from "react-router-dom";
import { isAutheticated, signout } from "../auth/helper";


const currentTab = (history, path ) => {
    if(history.location.pathname === path){
        return{color :"#2ecc72"}
    }else{
        return{color :"#FFFFFF"}
    }
}

const Menu = ({history}) => {
    return (
        <div>
        <div className="row">
        <div className="col-6">
        <ul className="nav  bg-dark ">
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>
        {isAutheticated() && isAutheticated().user.role === 0 && (
          <li className="nav-item">
          <Link
            style={currentTab(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            U Dashboard
          </Link>
        </li>
        )}
          
          
           {isAutheticated() && isAutheticated().user.role === 1 && (
            <li className="nav-item ">
            <Link
              style={currentTab(history, "/admin/dashboard")}
              className="nav-link"
              to="/admin/dashboard"
            >
              A. Dashboard
            </Link>
          </li>
           )} 
        
        
      </ul></div>


        <div className="col-6">
        <ul className="nav  bg-dark justify-content-end">
        {!isAutheticated() && (
          <Fragment>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/signup")}
            className="nav-link"
            to="/signup"
          >
            Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/signin")}
            className="nav-link"
            to="/signin"
          >
            Sign In
          </Link>
        </li>
        </Fragment>
        )}

        {isAutheticated() && (
          <li className="nav-item ">
          <span
          className="nav-link text-warning  "
          onClick={()=> {
            signout(() => {
              history.push("/")
            })
          }}>
          Signout 
          </span>
        </li>
        )}
        </ul>
        </div>
        
      </div>    
      </div>    
     );
}
 
export default withRouter(Menu);