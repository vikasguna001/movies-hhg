import React, { useCallback, useEffect, useState } from "react";
import { AiTwotoneStar } from "react-icons/ai";
import Header from "./header";
import "./slider.css";
import { Carousel, Row, Col, Container } from "react-bootstrap";
import Movie from "./Movie";
// import {row,Col} from 'bootstrap'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CArousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { env } from './Env'
function Slider() {
  const [list, setList] = useState([]);
  const [upcoming, setupcoming] = useState([]);
  const [latest, setlatest] = useState([]);
  const [show, setShow] = useState([]);

  useEffect(() => {
    getdata();
    upcoming_data();
    Latest_data();
    Subscribe();
    // Subscribe();
  }, []);

  const navigate = useNavigate();
  const handleclick = (id) => {
    navigate(`/Movie/${id}`, { replace: false });
  };

  function getdata() {
    axios
      .get(env.apiURL+ "bannerfind", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (res) {
        // console.log(res.data.data)
        setList(res.data.data);
      })
      .catch(function (error) {
        // console.log(error)
      });
  }

  function upcoming_data() {
    axios
      .get(env.apiURL+"Upcoming", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (res) {
        // console.log(res.data.data);
        setupcoming(res.data.data);
      })
      .catch(function (error) {
        // console.log(error)
      });
  }
  function Latest_data() {
    axios
      .get(env.apiURL + "Latest", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (res) {
        // console.log(res.data.data);
        setlatest(res.data.data);
      })
      .catch(function (error) {
        // console.log(error)
      });
  }

  function Subscribe() {
    axios.get(env.apiURL + `demo`).then(function (res) {
      console.log(res.data.status);
      if (res.data.status != undefined) {
        setShow(res.data.status);
      }
    });
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1200 },
      items: 9,
    },

    tablet: {
      breakpoint: { max: 1200, min: 991 },
      items: 6,
    },
    mobile: {
      breakpoint: { max: 990, min: 568 },
      items: 3,
    },
    small: {
      breakpoint: { max: 567, min: 0 },
      items: 3,
    },
  };

  return (
    <>
      <Header />

      <Carousel style={{ backgroundColor: "transparent" }}>
        {list.map((item, i) => {
          return (
            <Carousel.Item
              style={{ height: "400px", width: "80%", marginLeft: "80px" }}
              onClick={() => handleclick(item._id)}
            >
              <Row>
                <Col xl="7" lg="6" sm="6" xs="12">
                  <img
                    style={{ float: "left", borderRadius: "10px" }}
                    className="d-block w-100"
                    src={env.apiURL  + item.image_user}
                    alt="First slide"
                  />
                </Col>
                <Col xl="5"    lg="6"    sm="6"   xs="12" style={{ color: "darkwhite", padding: "50px 60px" }}  className="media">
                  {/* <Carousel.Caption>  */}
                  <h1 style={{ color: "white" }}>{item.Title}</h1>
                  <h5 style={{ fontSize: "16px" }}>
                    <b style={{ color: "yellow" }}>&#8226; </b>&nbsp;
                    {item.Categoires}{" "}
                    <b style={{ color: "yellow" }}> &nbsp;&#8226;</b> &nbsp;
                    {item.SubCategoires}
                  </h5>
                  <h5 style={{ fontSize: "16px" }}>
                    <b style={{ color: "yellow" }}>&#8226;</b> &nbsp;
                    {item.Rating}
                    <b style={{ color: "yellow" }}></b>{" "}
                    <b style={{ color: "yellow" }}>&nbsp;&#8226;</b> &nbsp;
                    {item.Subscribe}{" "}
                    <b style={{ color: "yellow" }}>&nbsp;&#8226;</b> &nbsp;
                    {item.Country}
                  </h5>
                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    <b style={{ color: "yellow" }}>&#8226;</b> &nbsp;
                    {item.Discription}
                  </p>
                  {/* </Carousel.Caption> */}
                </Col>
              </Row>
            </Carousel.Item>
          );
        })}
      </Carousel>

      <h4 className="treanding">Upcoming</h4>
  
      <CArousel
        className="main"
        responsive={responsive}
        style={{ marginLeft: "20px" }}
        data-flickity='{ "groupCells": true, "wrapAround": true }'
      >
        {upcoming.map((item, i) => {
          return (
            <img
              style={{ width: "95%" }}
              onClick={() => handleclick(item._id)}
              className="carousel-cell"
              src={env.apiURL + item.image_user}
            />
          );
        })}
      </CArousel>

      {/* </div> */}

      <h4 className="treanding">Latest</h4>
      {/* <!-- Flickity HTML init --> */}
      <CArousel
        className="main"
        responsive={responsive}
        style={{ marginLeft: "20px" }}
        data-flickity='{ "groupCells": true, "wrapAround": true }'
      >
        {latest.map((item, i) => {
          return (
            <img
              style={{ width: "95%" }}
              onClick={() => handleclick(item._id)}
              className="carousel-cell"
              src={env.apiURL + item.image_user}
            />
          );
        })}
      </CArousel>

      <h4 className="treanding">Shows Recommended For You</h4>
      {/* <!-- Flickity HTML init --> */}
      <div
        className="main"
        style={{ marginLeft: "20px" }}
        data-flickity='{ "groupCells": true, "wrapAround": true }'
      >
        {/* "freeScroll": true */}

        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/7428/1037428-v-317a41a941da"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/7527/267527-v"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/8946/38946-v"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/8690/1118690-v-ac3a869c95d5"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/2735/1122735-v-ddd8b431a053"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/322/1160322-v-8218966dc674"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/3034/1103034-v-afeac4412b5d"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/703/1040703-v-c7cc9f63f6b4"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/2876/862876-v"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/7456/267456-h"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/1/1130001-v-88663d1d21bc"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/5288/1105288-v-61f6f6df0137"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/9995/1209995-v-2019636a6a65"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/343/1160343-v-3d229f0828e8"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/6980/1136980-v-b14c4fea23b6"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/4910/1104910-v-6e6a4b59535e"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/1623/1161623-v-093e48b42747"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/8875/1068875-v-5475120bd859"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/9145/1119145-v-3f05b9dced09"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/8726/1108726-v-27e44421a513"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/5466/1115466-v-6c7716c884a1"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/7676/647676-v"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/old_images/vertical/MOVIE/3314/1770003314/1770003314-v"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/6828/556828-v"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/896/580896-v"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/old_images/vertical/MOVIE/4315/1000084315/1000084315-v"
        />
        <img
          className="carousel-cell"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/old_images/vertical/MOVIE/2789/1000212789/1000212789-v"
        />
      </div>
    </>
  );
}

export default Slider;
