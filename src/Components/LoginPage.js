import React,{useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router';
import './LoginPage.css';
import image1 from "../images/logo1.svg"
// import ReCAPTCHA from "react-google-recaptcha";
// import { useEffect } from 'react';
import Recaptcha from 'react-google-recaptcha';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import recaptcha from 'react-google-recaptcha/lib/recaptcha';
toast.configure();


function LoginPage() {
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const[payload,setpayload]=useState("")
    const[count,setCount]=useState(false);
    const [data,setdata]=useState(JSON.parse(localStorage.getItem("data"))||[]);
    // const [toggle,settoogle]=useEffect(false);
    const navigate=useNavigate();
    const reRef=useRef();

    //email
    const handleEmail=(e)=>{
        setemail(e.target.value)
      
    }

    //password
    const handlePassword=(e)=>{
        setpassword(e.target.value)
      
    }


    //payload
    const handlePayLoad= async(e)=>{
      e.preventDefault();
      const token=await reRef.current.executeAsync();
      setpayload({email:email,
      password:password,
      reCaptchaToken:token  
    })
        console.log(token);
        reRef.current.reset();
        setCount(true);

    }
  

    useEffect(()=>{
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };
      if(count)
      {
        
        fetch("http://admin.liveexamcenter.in/api/auth/login", requestOptions).then(
      (response) => response.json())
      .then((data)=>{setdata(data);localStorage.setItem("data",JSON.stringify(data));
       })
        setCount(false)
      }
    },[count,payload])


    //toastify msg
    useEffect(()=>{
      if(data.message!==undefined)
      {
        const complete=()=>{
          toast.error(data.message,{autoClose:1000});
        }
        complete();          
      }

      if(data.token)
      {
        navigate("/Login")
      }


    },[data])

    // useEffect(()=>{
    //   console.log(data.token);

    // },[data])




    
  return (
    <div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 col-md-6 d-none d-md-block image-container" />
        <div className="col-lg-6 col-md-6 form-container">
          <div className="col-lg-8 col-md-12 col-sm-9 col-xs-12 form-box text-center">
            <div className="logo mb-3">
              <img src={image1} width="150px" alt="logo"/>
            </div>
            <div className="heading mb-4">
              <h4>Login into your account</h4>
            </div>
            <form>
              <div className="form-input">
                <span><i className="fa fa-envelope" /></span>
                <input type="email" placeholder="Email Address" value={email} required onChange={(e)=>handleEmail(e)} />
              </div>
              <div className="form-input">
                <span><i className="fa fa-lock" /></span>
                <input type="password" placeholder="Password" value={password} required onChange={(e)=>handlePassword(e)}/>
              </div>
              <div className="row mb-3">
                <div className="col-6 d-flex">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="cb1" />
                    <label className="custom-control-label text-white" htmlFor="cb1">Remember me</label>
                  </div>
                </div>
                <div className="col-6 text-right">
                  <a href="forget.html" className="forget-link">Forget Password</a>
                </div>
              </div>
              <div className="text-left mb-3">
                <button type="submit" className="btn" onClick={(e)=>handlePayLoad(e)}>Login</button>
              </div>
              <div className="text-center mb-2">
                <div className="mb-3" style={{color: '#777'}}>or login with</div>
           
                <a href className="btn btn-social btn-google">google</a>
               
              </div>
              <div style={{color: '#777'}}>Don't have an account
                {/* <a href="register.html" className="register-link">Register here</a> */}
              </div>
            <Recaptcha
           
            sitekey="6Ld3COIZAAAAAC3A_RbO1waRz6QhrhdObYOk7b_5"
            size="invisible"
            ref={reRef}  
              />

          {/* <ReCAPTCHA
            sitekey="6LeD0TAUAAAAAMn87w9cRK0k1mHTtZXnlMBp2NKe"
          onChange={onChange}
            /> */}

            </form>
          </div>
        </div>
      </div>
    </div>


  </div>
);


}

export default LoginPage