import React from 'react';
import './header.css';
import { Link, useNavigate } from "react-router-dom";
import { FaSearchengin } from 'react-icons/fa'
import { FaRegUserCircle } from "react-icons/fa";

function Header(props) {
  const navigate = useNavigate();

  
  function handleLogout() {
    localStorage.removeItem('Mobile_No')
    localStorage.removeItem('User_Name')
    localStorage.removeItem('token')

  }


  return (
    <>
    
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-Dark" >
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/Slider" >
            <img src="https://blog.codepen.io/wp-content/uploads/2012/06/Button-Black-Large.png" alt="" width="35" height="34" className="d-inline-block align-text-top filter"/>
            &nbsp;<b style={{color:"white"}}>Moive Maker</b>
          </a>
          <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon bg-white"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-white" aria-current="page" href="/Tv"><b>Tv</b></a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/Movie"><b>Moive</b></a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/Sports"><b>Sports</b></a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/Language"><b>Language</b></a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <b>Category</b>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Hindi</a></li>
                  <li><a className="dropdown-item" href="#">Bangli</a></li>
                  <li><a className="dropdown-item" href="#">English</a></li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" style={{height:"50px",position:"relative",width:"25%"}}>
              <input  className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn " style={{marginTop:"5px",position:"absolute",width:"15%",top:"-5px",borderRadius:"0px",left:"85%",height:"50px"}} type="submit"><b style={{width:"110%"}}><FaSearchengin/></b></button>
            </form> &nbsp;&nbsp;&nbsp;&nbsp;
         
            <div class="dropdown" >
            <FaRegUserCircle class="dropbtn" />
{/* <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
    Dropdown Example <span class="caret"></span>
</button> */}

<ul class="dropdown-menu">
    <li><a href="/Account">My Account</a></li>
    <li><a href="#">Watchlist</a></li>
    <li onClick={()=>handleLogout()}><a href="/">Logout</a></li>
</ul>

</div>        

         
            {/* <button className="btn"style={{width:"10%",letterSpacing:"2px",height:"50px"}} onClick={handleLogout}>Logout</button> */}
          </div>
        </div>
      </nav>
      </div>
      <div>

     
      </div>



        
    
      
     

        </>




    )
}
export default Header;