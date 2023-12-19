import React, { useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import axios from "./api/axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./login_2.css";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { motion } from "framer-motion"


const Login_v2 = (props) => {
  // const { setAuth } = useAuth();
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const LOGIN_URL = "/user/login";

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    // console.log(result);
    // console.log(user);
    setValidUser(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    // console.log(result);
    // console.log(user);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);





  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    //todo
    const t1 = USER_REGEX.test(user);
    const t2 = PWD_REGEX.test(pwd);
    if(!t1 || !t2)
    {
      setErrMsg("Invalid Entry");
      return;
    }

    try{
      const response = await axios.post(LOGIN_URL,JSON.stringify({user,password:pwd}),{
        headers:{'content-Type': 'application/json'},
        withCredentials: true
      });
      
      console.log(response?.data);
      // setAuth({user,pwd});
      setSuccess(true);
      localStorage.setItem('Auth',JSON.stringify({user}));  
      props.setIsLogin(true); 
      window.location.reload(true);                                                                                   
      
      // props.setLogin(true);
      // props.setUser(user);

    }catch(err){
      if(!err?.response){
        setErrMsg('No Server Response')
      }
      else if(err.response?.status === 409)
      {
        setErrMsg("Username or Password is incorrect")
      }
      else
      {
        setErrMsg("Login Failed")
      }
    }
  
  }





  return (
    <motion.div
    initial={{ opacity: 0 }}
      animate={{  opacity: 1 }}
      exit={{opacity: 0 }}
     className="main ">
    
      <div className="main_box">
        <div className="card">
          <div className="card-body">
            <div className="container text-center">
              <div className="row myrow">
                <div className="col col-lg-7 log_pr cen ">
                  <div className="row log_row cen ">
                    <div className="col-10 ">
                      <h1 className="display-5 fw-bold lh-2 ">
                        Login To Your Account
                      </h1>
                      <form

                       className="">
                        <div className="mb-4 ">
                          <div className="field field_v2">
                            <label htmlFor="last-name" className="ha-screen-reader">
                              Name
                            </label>
                            <input
                              id="last-name"
                              className="field__input"
                              placeholder="e.g. Melnikov"
                              onChange={(e) => setUser(e.target.value)}
                              required
                              aria-invalid={validUser ? "false" : "true"}
                              aria-describedby="unidnote"
                              onFocus={() => setUserFocus(true)}
                              onBlur={() => setUserFocus(false)}
                            />
                            <span
                              className="field__label-wrap"
                              aria-hidden="true"
                            >
                              <span className="field__label">Name</span>
                            </span>
                          </div>
                          <p style={{color:'red'}} className={userFocus && user && !validUser ? " " : "none"}>4 to 24 characters.<br/>Must begin with a letter.
                          <br/>Letters, numbers, underscores, hyphens allowed.</p>
                        </div>
                        <div className="mb-4">
                          <div className="field field_v2">
                            <label htmlFor="Password" className="ha-screen-reader">
                              Password
                            </label>
                            <input
                              type="Password"
                              id="Password"
                              className="field__input"
                              placeholder=" "
                              onChange={(e) => setPwd(e.target.value)}
                              required
                              aria-invalid={validPwd ? "false" : "true"}
                              aria-describedby="pwdnote"
                              onFocus={() => setPwdFocus(true)}
                              onBlur={() => setPwdFocus(false)}
                            />
                            <span
                              className="field__label-wrap"
                              aria-hidden="true"
                            >
                              <span className="field__label">Password</span>
                            </span>
                          </div>
                          <p style={{color:'red'}} className={pwdFocus && pwd && !validPwd ? " " : "none"}>
                          8 to 24 char.<br/>Must include upper and lower case letter
                          <br/>Allowed special Char:!@#$%</p>
                        </div>
                        <div className="mb-4">
                          <button
                            type="button"
                            className="btn btn_login btn-lg px-5 me-md-2 "
                            disabled={ !validPwd || !validUser}
                            onClick={handleSubmit}
                          >
                            Sign In
                          </button>
                        </div>
                        <p style={{color:'red'}} className={errMsg ? " " : "none"}>{errMsg}</p>
                        <p style={{color:'green'}} className={success ? " " : "none"}>Login</p>
                        {/* {success && setIsLogin()} */}
                      </form>
                      {/* <p>Or</p>
                        <a className="btn btn-lg btn-google btn-block btn-outline google_log" href="#"><img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Signup Using Google</a> */}
                      <p>
                        <Link to="/Registration">Sign Up</Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col col-lg-3 d-none d-lg-block login_BG ">
                  <div className="pic_br ">
                    <motion.img
                      className="login_img"
                      initial={{ opacity: 0 ,x: 50}}
                        animate={{  opacity: 1 , x: 0}}
                        exit={{opacity: 0 }}
                        transition={{duration: 1}}
                      src={process.env.PUBLIC_URL + "/doc_pic.png"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    
  );
};

export default Login_v2;
