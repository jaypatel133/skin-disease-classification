import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./login.css";
const Login = () => {
  return (
    <div className="text-center box">
      <div className="row vh-100 bg">
        <div className="col col-lg-9 col-md-12 col-md-12 cen">
          <div className="row">
            <h1 className="display-5 fw-bold lh-2 ">Login To Your Account</h1>
            <br />
            <p>Login using social network</p>
            <a class="btn btn-lg btn-google btn-block text-uppercase btn-outline" href="#"><img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Signup Using Google</a>
            <div className="col-7 col-lg-3 container">
              <form className="">
                <div className="mb-4 ">
                  <input
                    type="text"
                    class="form-control col-xs-2"
                    placeholder="Email"
                  ></input>
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    class="form-control col-xs-2"
                    placeholder="Password"
                  ></input>
                </div>
                <div className="mb-4">
                  <button
                    type="button"
                    className="btn btn_login btn-lg px-5 me-md-2 "
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col col-lg-3 d-none d-lg-block login_bg">
        <div className="cen_im">
          <img className="log_img" src={process.env.PUBLIC_URL + '/doc_pic.png'} /> 
        </div>
          
        </div>
      </div>
    </div>
    // 
  );
};

export default Login;
