import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { env } from "./Env"



export default function Subscribe() {
  const { id } = useParams();
  const navigate = useNavigate();


  const [subscribe, setsubscribe] = useState([]);

  useEffect(() => {
    Subscribe_data();
  }, []);

  function Subscribe_data() {
    axios
      .get(env.apiURL +`bannerfind_id/${id}`)
      .then(function (res) {
        debugger;
        console.log(res.data.data);
        setsubscribe(res.data.data);
      })
      .catch(function (error) {
        // console.log(error)
      });
  }
  const handleclick = () =>{
   navigate('/Pricing')
  };


  

  return (
    <>
      <Carousel style={{ backgroundColor: "transparent" }}>
        <Carousel.Item
          style={{ height: "400px", width: "80%", marginLeft: "80px" }}
          onClick={() => handleclick()}
        >
          <Row>
            <Col xl="7" lg="6" sm="6" xs="12">
              <img
                style={{ float: "left", borderRadius: "10px" }}
                className="d-block w-100"
                src={env.apiURL  + subscribe.image_user}
                alt="First slide"
              />
            </Col>
            <Col
              xl="5"
              lg="6"
              sm="6"
              xs="12"
              style={{ color: "darkwhite", padding: "50px 60px" }}
              className="media"
            >
              <p style={{color:"yellow"}}>⭐ SUBSCRIBE</p>
              {/* <Carousel.Caption>  */}
              <h1 style={{ color: "white" }}>{subscribe.Title}</h1>
              <h5 style={{ fontSize: "16px" }}>
                <b style={{ color: "yellow" }}>&#8226; </b>&nbsp;
                {subscribe.Categoires}{" "}
                <b style={{ color: "yellow" }}> &nbsp;&#8226;</b> &nbsp;
                {subscribe.SubCategoires}
              </h5>
              <h5 style={{ fontSize: "16px" }}>
                <b style={{ color: "yellow" }}>&#8226;</b> &nbsp;
                {subscribe.Rating}
                <b style={{ color: "yellow" }}></b>{" "}
                <b style={{ color: "yellow" }}>&nbsp;&#8226;</b> &nbsp;
                {subscribe.Subscribe}{" "}
                <b style={{ color: "yellow" }}>&nbsp;&#8226;</b> &nbsp;
                {subscribe.Country}
              </h5>
              <p style={{ fontSize: "16px" }}>
                {" "}
                <b style={{ color: "yellow" }}>&#8226;</b> &nbsp;
                {subscribe.Discription}
              </p>
              {/* </Carousel.Caption> */}
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
