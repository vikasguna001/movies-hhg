import React from 'react'
import { Container, Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header';
import { env } from './Env'
import './Language.css';
export default function Language() {
  return (
    <>
        <Header/> 
        {/* <Container >   */}
        {/* <div className='container'>
      hy
        </div> */}
            <Row className='hovr_img1'>
                <Col  xl="3" md="4" xs="6" className='my-3 hovr_img'>
                  <span><h3>Hindi</h3></span>
                    <img width="100%" src="https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/old_images/LANGUAGE/5710/5710/5710-h"></img>
                </Col>
                <Col xl="3" md="4" xs="6" className='my-3 hovr_img'>
                <span><h3>English</h3></span>
                    <img width="100%" src="https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/old_images/LANGUAGE/5708/5708/5708-h"></img>
                </Col>
                <Col xl="3" md="4" xs="6" className='my-3 hovr_img'>
                <span><h3>Gujrati</h3></span>
                    <img width="100%" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/1381/1121381-h-6c23f89e0ba2"></img>
                </Col>
                <Col xl="3" md="4" xs="6" className='my-3 hovr_img'>
                <span><h3>Telugu</h3></span>
                    <img width="100%" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/old_images/LANGUAGE/5712/5712/5712-h"></img>
                </Col>
               
                <Col xl="3" md="4" xs="6" className='my-3 hovr_img'>
                <span><h3>Tamil</h3></span>
                    <img width="100%" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/9021/549021-h"></img>
                </Col>
                <Col xl="3" md="4" xs="6" className='my-3 hovr_img'>
                <span><h3>kannada</h3></span>
                    <img width="100%" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/old_images/LANGUAGE/5715/5715/5715-h"></img>
                </Col>
                <Col xl="3" md="4" xs="6" className='my-3 hovr_img'>
                <span><h3>Bengali</h3></span>
                    <img width="100%" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/old_images/LANGUAGE/5709/5709/5709-h"></img>
                </Col>
                <Col xl="3" md="4" xs="6" className='my-3 hovr_img'>
                <span><h3>Marathi</h3></span>
                    <img width="100%" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/old_images/LANGUAGE/5711/5711/5711-h"></img>
                </Col>
            </Row>
        {/* </Container> */}
        {/* <img width="2050px" src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/old_images/LANGUAGE/5711/5711/5711-h"></img> */}

    </>
  )
}
