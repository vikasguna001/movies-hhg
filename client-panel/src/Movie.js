import React, { useEffect, useState } from "react";
import Header from "./header";
import { useParams } from "react-router-dom";
import Pricing from "./Pricing";
import Subscribe from "./Subscribe";
import {env} from './Env'
const axios = require("axios");


export default function Movie() {
  const [Show, setShow] = useState(true);
  const [Url, setUrl] = useState();
  const { id } = useParams();

  useEffect(() => {
 
    axios.get(env.apiURL +`demo/${id}`).then(function (res) {
      debugger;
      if (res.data.status != undefined) {
        setShow(res.data.status);
      }
      setUrl( env.apiURL +`demo/${id}`);
    });
  
}, []);
  return (
    <>
      <Header />
      {Show == false ? (
       <Subscribe/>
      ) : (
        <video
          config={{ file: { attributes: { controlsList: "nodownload" } } }}
          src={Url}
          controls="true"
          preload="auto"
          id="_video"
          width="100%"
        ></video>
      )}
    </>
  );
}
