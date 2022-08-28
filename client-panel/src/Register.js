import React, { useState } from "react";
import "./login.css";
import { env } from "./Env"
import { Link, useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify'

// import 'react-toastify/dist/ReactToastify.css'
// import { func } from 'prop-types';
const axios = require("axios");
// toast.configure()
export default function Register() {
  const [User_Name, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Mobile_No, setMobile_No] = useState("");
  const navigate = useNavigate();

  const checkInput = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '')
    setMobile_No(onlyDigits)
    // console.log(onlyDigits)
  }


  const submit = async (e) => {
    e.preventDefault();
    

    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

    if (!User_Name || !regEx.test(Email) || !Password || !Mobile_No) {
      return;
      // toast.warning('please fil data', {
      //   autoClose: 1000,
      // })
    }

    const formData = new FormData();
    formData.append("User_Name", User_Name);
    formData.append("Email", Email);
    formData.append("Password", Password);
    formData.append("Mobile_No", Mobile_No);
    // console.log(Email);
    try {
      //  await axios.post("http://localhost:5000/User",formData);

      await axios.post(env.apiURL +"User", formData).then((res) => {
    
        if (res.data.status) {
          localStorage.setItem('User_Name', res.data.data.User_Name)
    
          localStorage.setItem('Mobile_No', res.data.data.Mobile_No)
        localStorage.setItem('token', res.data.auth)
          navigate("/Slider");
        } else {
          alert("Email  Already Existed");
        }
      });
    } catch (ex) {
      console.log(ex);
    }
    // console.log("token");
 

    setUsername("");
    setEmail("");
    setPassword("");
    setMobile_No("");
  };
  //
  return (
    <>
      <div className="container1">
    <h2>Create account</h2>
    <form method="post" onSubmit={submit}>
      <div className="box">
        <input type="text" placeholder="Enter Username" required      value={User_Name}
            onChange={(e)=>{setUsername(e.target.value)}}/>
      </div>
      <div className="box">
        <input type="tel"  placeholder="Enter mobile number" required maxLength="10"     value={Mobile_No}
            onChange={(e)=>{checkInput(e)}}/>
      </div>
      <div className="box">
        <input type="email" placeholder="Enter Email"	required   value={Email}
            onChange={(e)=>{setEmail(e.target.value)}} />
      </div>
      <div className="box">
        <input type="password" placeholder="Enter Password"	required maxLength="15"  value={Password}
            onChange={(e)=>{setPassword(e.target.value)}}/>
      </div>
      <input style={{padding:"10px 35px",borderRadius:"60px",letterSpacing:"2px",fontWeight:"bold",marginTop:"30px",marginBottom:"10px"}} type="submit" onClick={submit} />
    </form>
    <Link to="/" style={{color:"yellow",textDecoration:"none"}}>Log in..??</Link>

  </div>
    </>
  );
}
