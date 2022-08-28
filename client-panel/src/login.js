import React, { useState, useEffect } from "react";
import './login.css';
import { env } from "./Env"

import { Link, useNavigate } from "react-router-dom";

const axios = require("axios");

export default function Login() {
  const [User_Name, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();


    // let  UserName= "";
    // let MobileNo = "";
  const submit = async (e) => {
    e.preventDefault();

    if (!User_Name || !Password) {
      return;
    }

    console.log("User_Name,Password", User_Name, Password);
    await axios
      .post(env.apiURL +"login", { User_Name, Password })
      .then((res) => {
        if (res.data.status) {
          
          localStorage.setItem("User_Name", res.data.data.User_Name);
         localStorage.setItem('Mobile_No', res.data.data.Mobile_No)
        localStorage.setItem("token", res.data.auth);

          navigate("/Slider");

        }else{
            alert(res.data.message)
        }
      });
  
    setUsername("");
    setPassword("");
  };

 

  return (
    <>
   <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form action="" onSubmit={submit}>
        <h3>Login Here</h3>

        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" value={User_Name} onChange={(e)=>{setUsername(e.target.value)}} />

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" value={Password} onChange={(e)=>{setPassword(e.target.value)}}/>

        <button>Log In</button>
        <div class="social">
          <div class="go"><input type="submit" onClick={submit}/></div>
          <Link to="/Register" style={{color:"yellow",textDecoration:"none"}}>Create  Account</Link>
        </div>
    </form>
   
    </>
  );
}
