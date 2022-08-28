import React from "react";
import "./Account.css";
import Header from "./header";

export default function Account() {
  var user = localStorage.getItem("User_Name");
  var mobile = localStorage.getItem("Mobile_No");
  //  <div>
  //         <p>{user}</p>
  //         <p>{mobile}</p>
  //     </div>

  return (
    <>
      <Header />

      <div class="card-container">
        <img
          class="round"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9iVZqj52z-rK9wftb91Fi_YD-59Lwb08nXw&usqp=CAU"
          alt="user"
        />
        <h3>{user}</h3>
        <h6>mobile-{mobile}</h6>
        <p>
          User interface designer and <br />
          front-end developer
        </p>
        <div class="button">
          <button class="primary">Message</button>
          <button class="primary ghost">Following</button>
        </div>
      </div>
    </>
  );
}
