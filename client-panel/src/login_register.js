import React,{ useState, useEffect } from 'react';
import login from './log.png';
import register1 from './register.png';
import { Link, useNavigate } from "react-router-dom";
import { env } from "./Env"
import './login_register.css';
import Slider from './slider';
const axios = require("axios");

function Login_register() {

    
// login
    const [User_Name, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
  
  
      // let  UserName= "";
      // let MobileNo = "";
    const Login = async (e) => {
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
  
            navigate("/Slider")
  
          }else{
              alert(res.data.message)
          }
        });
    
      setUsername("");
      setPassword("");
    };

//design
    setTimeout(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");

        if (sign_up_btn != null && container != null) {
            sign_up_btn.addEventListener("click", () => {
                container.classList.add("sign-up-mode");
            });
        }
        if (sign_in_btn != null && container != null) {
            sign_in_btn.addEventListener("click", () => {
                container.classList.remove("sign-up-mode");
            });
        }
    }, 50)


    //register page


    const checkInput = (e) => {
        const onlyDigits = e.target.value.replace(/\D/g, '')
        setMobile_No(onlyDigits)
        // console.log(onlyDigits)
      }
      const [Register_User_Name, setRegister_User_Name] = useState("");
      const [Email, setEmail] = useState("");
      const [Register_Password, setRegister_Password] = useState("");
      const [Mobile_No, setMobile_No] = useState("");

      const register = async (e) => {
        e.preventDefault();
        
    
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    
        if (!Register_User_Name || !regEx.test(Email) || !Register_Password || !Mobile_No) {
          return;
          // toast.warning('please fil data', {
          //   autoClose: 1000,
          // })
        }
    
        const formData = new FormData();
        formData.append("User_Name", Register_User_Name);
        formData.append("Email", Email);
        formData.append("Password", Register_Password);
        formData.append("Mobile_No", Mobile_No);
        // console.log(Email);
        try {
          //  await axios.post("http://localhost:5000/User",formData);
    
          await axios.post("http://localhost:5000/User", formData).then((res) => {
        
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
     
    
        setRegister_User_Name("");
        setEmail("");
        setRegister_Password("");
        setMobile_No("");
      };
    return (
        <>
            <div className="container">
                <div className="forms-container">
                    <div className="signin-signup">
                        {/* login page */}
                        <form action="" className="sign-in-form"  onSubmit={Login}>
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Username" value={User_Name} onChange={(e)=>{setUsername(e.target.value)}}/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password" value={Password} onChange={(e)=>{setPassword(e.target.value)}}/>
                            </div>
                            <input type="submit" value="Login" className="btn solid" onClick={Login}/>
         

                        </form>
                        {/* register page */}
                        <form  className="sign-up-form"  method="post" onSubmit={register}>
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Username" value={Register_User_Name} onChange={(e)=>{setRegister_User_Name(e.target.value)}}/>
                            </div>
                            <div className="input-field">
                                <i className="fa-phone fa"></i>
                                <input type="text" placeholder="Moblie Number"  value={Mobile_No} onChange={(e)=>{checkInput(e)}}/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="email" placeholder="Email" value={Email} onChange={(e)=>{setEmail(e.target.value)}}/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password" value={Register_Password} onChange={(e)=>{setRegister_Password(e.target.value)}}/>
                            </div>
                            <input type="submit" className="btn" value="Sign up"  onClick={register}/>
                        </form>
                    </div>
                </div>
                {/* login_register slider button  */}
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                ex ratione. Aliquid!
                            </p>
                            <button className="btn transparent" id="sign-up-btn">
                                Sign up
                            </button>
                        </div>
                        <img src={login} className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <button className="btn transparent" id="sign-in-btn">
                                Sign in
                            </button>
                        </div>
                        <img src={register1} className="image" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login_register;
