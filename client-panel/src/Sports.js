import React, { useCallback } from "react";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import './Sports.css'
import { Carousel, Row, Col, Container } from "react-bootstrap";

export default function Sports() {
  const navigate = useNavigate();
  const handleclick = useCallback(
    () => navigate("/Movie", { replace: false }),
    [navigate]
  );

  return (
    <div>
      <Header />
      <Carousel>
        <Carousel.Item
          style={{ height: "500px", boxShadow: "10px 0px blue" }}
          onClick={handleclick}
        >
          {/* <Container> */}
          <Row>
            <Col xl="7" lg="6" sm="6" xs="12">
              <img
                style={{ float: "left", boxShadow: "-2px -10px 15px blue" }}
                className="d-block w-100"
                src="https://static.toiimg.com/photo/80495408.cms?resizemode=4"
                alt="First slide"
              />
            </Col>

            <Col
              xl="5"
              lg="6"
              sm="6"
              xs="12"
              style={{ color: "white", padding: "80px 60px" }}
              className="media"
            >
              {/* <Carousel.Caption> */}
              <h3>First slide label2</h3>
              <h6>
                2hr 5min &#8226; 2017 &#8226; Action &#8226; 15+ &#8226; English
              </h6>
              <p>
                Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla
                vitae elit libero, a pharetra augue mollis interdum.Nulla vitae
                elit libero, a pharetra...
              </p>
              {/* </Carousel.Caption> */}
            </Col>
          </Row>
        </Carousel.Item>

        <Carousel.Item
          style={{ height: "500px", boxShadow: "10px 0px blue" }}
          onClick={() => handleclick()}
        >
          <Row>
            <Col xl="7" lg="6" sm="6" xs="12">
              <img
                style={{ float: "left", boxShadow: "-2px -10px 15px blue" }}
                className="d-block w-100"
                src="https://www.iwmbuzz.com/wp-content/uploads/2019/12/the-first-look-of-kgf-2-now-revealed.jpg"
                alt="First slide"
              />
            </Col>

            <Col
              xl="5"
              lg="6"
              sm="6"
              xs="12"
              style={{ color: "white", padding: "80px 60px" }}
              className="media"
            >
              {/* <Carousel.Caption> */}
              <h3>First slide label2</h3>
              <h6>
                2hr 5min &#8226; 2017 &#8226; Action &#8226; 15+ &#8226; English
              </h6>
              <p>
                Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla
                vitae elit libero, a pharetra augue mollis interdum.Nulla vitae
                elit libero, a pharetra...
              </p>
              {/* </Carousel.Caption> */}
            </Col>
          </Row>
        </Carousel.Item>

        <Carousel.Item
          style={{ height: "500px", boxShadow: "10px 0px blue" }}
          onClick={() => handleclick()}
        >
          <Row>
            <Col xl="7" lg="6" sm="6" xs="12">
              <img
                style={{ float: "left", boxShadow: "-2px -10px 15px blue" }}
                className="d-block w-100"
                src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/6535/846535-h"
                alt="First slide"
              />
            </Col>

            <Col
              xl="5"
              lg="6"
              sm="6"
              xs="12"
              style={{ color: "white", padding: "80px 60px" }}
              className="media"
            >
              {/* <Carousel.Caption> */}
              <h3>First slide label2</h3>
              <h6>
                2hr 5min &#8226; 2017 &#8226; Action &#8226; 15+ &#8226; English
              </h6>
              <p>
                Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla
                vitae elit libero, a pharetra augue mollis interdum.Nulla vitae
                elit libero, a pharetra...
              </p>
              {/* </Carousel.Caption> */}
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
      <h4 class="treanding">Latest & Treanding</h4>
      {/* <!-- Flickity HTML init --> */}
      <div
        class="main"
        style={{ marginLeft: "20px" }}
        data-flickity='{  "wrapAround": true }'
      >
        {/* "groupCells": true, */}
        {/* "freeScroll": true */}
       <p style={{ marginRight: "10px" }}>
        <img style={{width:"100%",opacity:"0.6"}}
          class="carousel-cell1"
          src="https://secure-media1.hotstarext.com/t_web_hs_3x/r1/thumbs/PCTV/71/10771/PCTV-10771-hcdl.jpg"
        />
        <span><b>Cricket</b></span>
        </p>
        <p style={{ marginRight: "10px" }}>
        <img style={{width:"100%",opacity:"0.6"}}
          class="carousel-cell1"
          src="https://secure-media1.hotstarext.com/t_web_hs_3x/r1/thumbs/PCTV/73/10773/PCTV-10773-hcdl.jpg"
        />
         <span><b>FootBall</b></span>
        </p>
        <p style={{ marginRight: "10px" }}>
        <img style={{width:"100%",opacity:"0.6"}}
          class="carousel-cell1"
          src="https://secure-media1.hotstarext.com/t_web_hs_3x/r1/thumbs/PCTV/74/10774/PCTV-10774-hcdl.jpg"
        />
        <span><b>Sport Car Racing</b></span>
        </p>
        <p style={{ marginRight: "10px" }}>
        <img style={{width:"100%",opacity:"0.6"}}
          class="carousel-cell1"
          src="https://secure-media1.hotstarext.com/t_web_hs_3x/r1/thumbs/PCTV/77/10777/PCTV-10777-hcdl.jpg"
        />
        <span><b>Hockey</b></span>
        </p>
        <p style={{ marginRight: "10px" }}>
        <img style={{width:"100%",opacity:"0.6"}}
          class="carousel-cell1"
          src="https://secure-media1.hotstarext.com/t_web_hs_3x/r1/thumbs/PCTV/72/10772/PCTV-10772-hcdl.jpg"
        />
        <span><b>Kabbadi</b></span>
        </p>
        <p style={{ marginRight: "10px" }}>
        <img style={{width:"100%",opacity:"0.6"}}
          class="carousel-cell1"
          src="https://secure-media1.hotstarext.com/t_web_hs_3x/r1/thumbs/PCTV/76/10776/PCTV-10776-hcdl.jpg"
        />
         <span><b>Squash Tennis</b></span>
        </p>
        <p style={{ marginRight: "10px" }}>
        <img style={{width:"100%",opacity:"0.6"}}
          class="carousel-cell1"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/7238/1057238-h-558d0c93818b"
        />
         <span><b>Rugby</b></span>
        </p>
        <p style={{ marginRight: "10px" }}>
        <img  style={{width:"100%",opacity:"0.6"}}
          class="carousel-cell1"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/5883/345883-h"
        />
         <span><b>Martial Arts</b></span>
       </p>
       <p style={{ marginRight: "10px" }}>
        <img style={{width:"100%",opacity:"0.6"}}
          class="carousel-cell1"
          src="https://secure-media1.hotstarext.com/t_web_hs_3x/r1/thumbs/PCTV/27/14927/PCTV-14927-hcdl.jpg"
        />
        <span><b>Athletic</b></span>
       </p>
       <p style={{ marginRight: "10px" }}>
        <img  style={{width:"100%",opacity:"0.6"}}
          class="carousel-cell1"
          src="https://secure-media1.hotstarext.com/t_web_hs_3x/r1/thumbs/PCTV/57/18057/PCTV-18057-hcdl.jpg"
        />
        <span><b>Golf</b></span>
       </p>
       <p style={{ marginRight: "10px" }}>
        <img  style={{width:"100%",opacity:"0.6"}}
          class="carousel-cell1"
          src="https://secure-media1.hotstarext.com/t_web_hs_3x/r1/thumbs/PCTV/36/14736/PCTV-14736-hcdl.jpg"
        />
         <span><b>Table Tannis</b></span>
       </p>
       <p style={{ marginRight: "10px" }}>
        <img style={{width:"100%",opacity:"0.6"}}
          class="carousel-cell1"
          src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1_5x/sources/r1/cms/prod/9456/639456-h"
        />
        <span><b>Khelo India</b></span>
       </p>
        {/* <img class="carousel-cell" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/1499/1191499-v-cc78e3c5aed4" />
    <img class="carousel-cell" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/726/1160726-v-074c91bb1d69" />
    <img class="carousel-cell" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/1/1130001-v-88663d1d21bc" />
    <img class="carousel-cell" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/5288/1105288-v-61f6f6df0137" />
    <img class="carousel-cell" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/9995/1209995-v-2019636a6a65" />
    <img class="carousel-cell" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/343/1160343-v-3d229f0828e8" />
    <img class="carousel-cell" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/6980/1136980-v-b14c4fea23b6" />
    <img class="carousel-cell" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/4910/1104910-v-6e6a4b59535e" />
    <img class="carousel-cell" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/1623/1161623-v-093e48b42747" />
    <img class="carousel-cell" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/8875/1068875-v-5475120bd859" />
    <img class="carousel-cell" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/9145/1119145-v-3f05b9dced09" />
    <img class="carousel-cell" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/8726/1108726-v-27e44421a513" />
    <img class="carousel-cell" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/5466/1115466-v-6c7716c884a1" /> */}
      </div>

      {/* <h1>Flickity - lazyLoad: 2 adjacent</h1> */}

{/* <!-- Flickity HTML init --> */}
{/* <div class="carousel"
   data-flickity='{ "lazyLoad": 2, "initialIndex": 2 }'>
  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/tulip.jpg" alt="tulip" />
  </div>
  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/grapes.jpg" alt="grapes" />
  </div>
  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/raspberries.jpg" alt="raspberries" />
  </div>
  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/wolf.jpg" alt="wolf" />
  </div>
  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/shore.jpg" alt="sea" />
  </div>
  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/leaf-droplets.jpg" alt="leaf droplets" />
  </div>
  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/gulls.jpg" alt="gulls" />
  </div>
  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/touch-screen.jpg" alt="touch screen" />
  </div>
  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>
  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>  <div class="carousel-cell">
    <img class="carousel-cell-image"
      data-flickity-lazyload="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/van.jpg" alt="van" />
  </div>
</div> */}

    </div>
  );
}
