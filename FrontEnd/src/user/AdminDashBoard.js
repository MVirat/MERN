import React from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";



const AdminDashBoard = () => {

  const {user:{name,email,role}} = isAutheticated();

  const adminLeftside = () => {
    return(
      <div className="card">
        <h4 className="card-header bg-dark text-white">Adimn Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-info">Create Category</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-info">Manage Category</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-info">Create Product</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-info">Manage Product</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-info">Manage Order</Link>
          </li>
        </ul>
      </div>
    ) 
  }
  const adminRightside = () => {
      return(
        <div className="card mb-4">
          <h4 className="card-header">Admin Information</h4>
          <ul className="list-group">
            <li className="list-group-item">
             <span className="badge badge-success mr-2">Name: </span>{name}
            </li>
            <li className="list-group-item">
             <span className="badge badge-success mr-2">Email: </span>{email}
            </li>
            <li className="list-group-item">
             <span className="badge badge-danger mr-2">Admin Area</span>
            </li>
          </ul>
        </div>
      )
  }

  return (
    <Base title="Welcome to Admin area" 
    decription="Manage all of your product here"
    className="container bg-info p-4">
    <div className="row">
    <div className="col-3">{adminLeftside()}</div>
    <div className="col-9">{adminRightside()} </div>
    </div>
      
      
    </Base>
  );
};

export default AdminDashBoard;



