import React from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Home.css";

const handleSubmit = () =>{
  localStorage.removeItem("Auth");
  window.location.reload(true);   
}

const Login = () => {
  const savedItem = localStorage.getItem("Auth");
  const parsedItem = JSON.parse(savedItem);
  return (
    <div>
      <div className="nav_f">
        <ul className="nav nav_b">
          <li className="nav-item">
            <Link
              className="nav-link nav-link-text active"
              aria-current="page"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link nav-link-text" to="Upload">
              Upload
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link nav-link-text" to="demo">
              Demo
            </Link>
          </li>
          {parsedItem ? <button className="btn btn_login btn-sm px-3 me-md-1 position-absolute end-0 mt-1" onClick={handleSubmit}>Sign Out</button>: <div><a className="btn btn_login btn-sm px-3 me-md-1 position-absolute end-0 mt-1" href="/login" >Sign In</a> </div>}
        </ul>
      </div>

      <Outlet></Outlet>
    </div>
  );
};

export default Login;
