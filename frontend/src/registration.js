import React, { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./registration.css";
import axios from "./api/axios";
import { Link} from "react-router-dom";
import { motion } from "framer-motion"

const Registration = () => {
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
  const REGISTER_URL = '/user/register'

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // useRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    // console.log(result);
    // console.log(user);
    setValidUser(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    // console.log(result);
    // console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    // console.log(result);
    // console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatchPwd(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd, matchPwd]);


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
      const response = await axios.post(REGISTER_URL,JSON.stringify({user,email,password:pwd}),{
        headers:{'content-Type': 'application/json'},
        withCredentials: true
      });
      
      console.log(response.data);
      setSuccess(true);

    }catch(err){
      if(!err?.response){
        setErrMsg('No Server Response')
      }
      else if(err.response?.status === 409)
      {
        setErrMsg("Username Taken")
      }
      else
      {
        setErrMsg("Registration Failed")
      }
    }
  
  }


  return (
    <div className="main ">
      <div className="main_box">
        <div className="card">
          <div className="card-body">
            <div className="container text-center">
              <div className="row row_reg">
                <div className="col col-lg-1 d-none d-lg-block"></div>
                <div className="col col-lg-3 d-none d-lg-block reg_BG ">
                  <div className="reg_pic_pr ">
                    <motion.img

                initial={{ opacity: 0, x:-50 }}
                        animate={{  opacity: 1,x:0}}
                        exit={{opacity: 0 }}
                        transition={{duration: 1}}
                      className="Reg_img"
                      src={process.env.PUBLIC_URL + "/rev_doc_pic.png"}
                    />
                  </div>
                </div>
                <div className="col col-lg-7 reg_pr cen ">
                  <div className="row log_row cen ">
                    <div className="col-10 ">
                      <h1 className="display-5 fw-bold lh-2 ">
                      {/* todo */}
                        {/* <p ref={errRef} className={errRef ? " " : "none"}>
                          {errMsg}
                        </p> */}
                        Register your Account
                      </h1>
                      <form className="">
                        <div className="mb-4 ">
                          <div className="field field_v2">
                            <label htmlFor="name" className="ha-screen-reader">
                              Name
                            </label>
                            <input

                              id="name"
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
                            <label htmlFor="Email" className="ha-screen-reader">
                              Email
                            </label>
                            <input
                              id="Email"
                              className="field__input"
                              placeholder="e.g. xyz@gmial.com"
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              aria-invalid={validEmail ? "false" : "true"}
                              aria-describedby="pwdnote"
                              onFocus={() => setEmailFocus(true)}
                              onBlur={() => setEmailFocus(false)}
                            />
                            <span
                              className="field__label-wrap"
                              aria-hidden="true"
                            >
                              <span className="field__label">Email</span>
                            </span>
                          </div>
                          <p style={{color:'red'}} className={emailFocus && email && !validEmail ? " " : "none"}>Enter valid Email</p>
                        </div>
                        <div className="mb-4">
                          <div className="field field_v2">
                            <label
                              htmlFor="Password"
                              className="ha-screen-reader"
                            >
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
                          <p style={{color:'red'}} className={pwdFocus && !validPwd ? " " : "none"}>
                          8 to 24 char.<br/>Must include upper and lower case letter
                          <br/>Allowed special Char:!@#$%</p>

                        </div>
                        <div className="mb-4">
                          <div className="field field_v2">
                            <label
                              htmlFor="ConfPassword"
                              className="ha-screen-reader"
                            >
                              Conf. Password
                            </label>
                            <input
                              type="password"
                              id="ConfPassword"
                              className="field__input"
                              placeholder=" "
                              onChange={(e) => setMatchPwd(e.target.value)}
                              required
                              aria-invalid={validMatchPwd ? "false" : "true"}
                              aria-describedby="pwdnote"
                              onFocus={() => setMatchPwdFocus(true)}
                              onBlur={() => setMatchPwdFocus(false)}
                            />
                            <span
                              className="field__label-wrap"
                              aria-hidden="true"
                            >
                              <span className="field__label">
                                Conf. Password
                              </span>
                            </span>
                          </div>
                          <p style={{color:'red'}} className={matchPwdFocus && !validMatchPwd ? " " : "none"}>
                          Must match the first password input field.</p>
                        </div>
                        <div className="mb-4">
                          <button
                            type="button"
                            className="btn btn_login btn-lg px-5 me-md-2 "
                            disabled={!validEmail || !validPwd || !validMatchPwd || !validUser}
                            onClick={handleSubmit}
                          >
                            Sign Up
                          </button>
                        </div>
                        <p style={{color:'red'}} className={errMsg ? " " : "none"}>{errMsg}</p>
                        <p style={{color:'green'}} className={success ? " " : "none"}>Registration is Compleat Your Can Login now!</p>
                      </form>
                      <p><Link to="/login">Sign In</Link></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
