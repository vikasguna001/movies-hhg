import React, { useState, useEffect } from 'react'
import { CCardImage,  CCardTitle,  CCard,  CCardBody,  CFormCheck,  CCol,  CFormLabel,  CFormInput,  CFormSelect,  CFormTextarea,  CRow,CButton} from '@coreui/react'
import { Container, Form, Row, Col } from 'react-bootstrap'
import { env } from 'src/environment'
import axios from 'axios'
import './AddVideo.css'
import { toast } from 'react-toastify'

function AddVideo() {
  const [step, setStep] = useState(1)
  const [Title, setTitle] = useState('')
  const [Rating, setRating] = useState('')
  const [Subscribe, setSubscribe] = useState('')
  const [Discription, setDiscription] = useState('')
  const [Contract, setContract] = useState([])
  const [Trailer_time, setTrailer_time] = useState()
  const [Video_time, setVideo_time] = useState('')
  const [Country, setCountry] = useState('')
  const [Country1, setCountry1] = useState([])
  const [Cast, setCast] = useState('')
  const [Categoires, setCategoires] = useState('')
  const [SubCategoires, setSubCategoires] = useState('')
  const [Categoires1, setCategoires1] = useState('')
  const [SubCategoires1, setSubCategoires1] = useState('')

  const [Publish, setPublish] = useState('')
  const [imageval, setImageval] = useState('')
  const [banner_video, setbanner_video] = useState('')
  const [Trailer_video, setTrailer_video] = useState('')

 

    function country () {
      axios.get(env.apiURL + `findCountry`)
      .then(function (res) {
        console.log(res.data)
        setCountry1(res.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    }

  function catagory(){
    axios.get(env.apiURL + `vfinddata`,{
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
      }
      )
      .then(function (res) {
        
        setCategoires1(res.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    }

    function Subcatagory(){
      axios.get(env.apiURL + `kfindonedata`,{
          headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        }
        )
        .then(function (res) {
          
          setSubCategoires1(res.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    
    useEffect(() => {
      country()
      catagory()
      Subcatagory()
    }, [])

        


  const saveFile = (e) => {
    // console.log(e)
    setImageval(e.target.files[0])
    // setbanner_img(e.target.files[0])
  }
  const saveFile1 = (e) => {
    // console.log(e.target)
    setbanner_video(e.target.files[0])
  }

  debugger
  const saveFile2 = (e) => {
    // console.log(e.target)
    setTrailer_video(e.target.files[0])
  }

  const  category_submit = (e) => {
// debugger
    // console.log(e)
   setCategoires(e)
  }
  const  subcategory_submit = (e) => {
    // debugger
        // console.log(e)
       setSubCategoires(e)
      }

  const submit = async (e) => { 
  
    // var User_Id =  localStorage.getItem('userId')
      //  console.log(User_Id)
    
    if(!Title || !Rating || !Subscribe || !Discription || !Contract || !Trailer_time || !Video_time || !Country ||  !Cast  || !Publish)
    {
      toast.warning('please fil data', {
        autoClose: 1000,
      })
      return
    }

    
    // if(Title == '')
    // {
            e.preventDefault();
            const formData = new FormData()
            formData.append('Title', Title)
            formData.append('Rating', Rating)
            formData.append('Subscribe', Subscribe)
            formData.append('Categoires',Categoires)
            formData.append('SubCategoires',SubCategoires)
            formData.append('Discription', Discription)
            formData.append('Contract', Contract)
            formData.append('Trailer_time', Trailer_time)
            formData.append('Video_time', Video_time)
            formData.append('Country', Country)
            formData.append('Cast', Cast)
            formData.append('Publish', Publish)
            formData.append('image_user', imageval)
            formData.append('Trailer_video', Trailer_video)
            formData.append('banner_video', banner_video)

            await axios.post(env.apiURL + 'viInsertBanner',formData,
            {
              
              headers:{
              "Authorization" : `Bearer ${localStorage.getItem('token')}`,
              "UserId": localStorage.getItem('userId')
              
              }

            })
        //   }
        
        // else
        // {
        //   alert("Fill")
        // }
          
      
    setStep(1)
    setTitle('')
    setRating('')
    setSubscribe('')
    setCategoires('')
    setSubCategoires('')
    setDiscription('')
    setDiscription('')
    setContract('')
    setTrailer_time('')
    setVideo_time('')
    setCountry('')
    setCast('')
    setPublish('')
    setImageval('')
    setbanner_video('')
    setTrailer_video('')
 
          } 

  return (
    <>
    <CCard className="mb-4 App">
    <CCardBody>
    <form onSubmit={submit}>
      {step == 1 && (
        <Container>
          <h5 style={{ fontSize: '14px' }}>Note: *filds required. Please fill and click next</h5>
          <Form>
            <Row>
              <Col>
                <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                  <h6>Contract*</h6>
                </CFormLabel>
                <CFormSelect
                  value={Contract}
                  onChange={(e) => {
                    setContract(e.target.value)
                  }}
                >
                  <option>Select Contract</option>
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </CFormSelect>
              </Col>
              <Col xl="6">
                <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                  <h6>Title*</h6>
                </CFormLabel>
                <CFormInput
                  type="text"
                  value={Title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col xl="6">
                <CFormLabel htmlFor="inputEmail3" className="col-sm-6 col-form-label">
                  <h6>Trailer Duration*(HH:MM:SS)</h6>
                </CFormLabel>
                <CFormInput
                  type="time"
                  value={Trailer_time}
                  onChange={(e) => {
                    setTrailer_time(e.target.value)
                  }}
                />
                
              </Col>
              <Col>
                <CFormLabel htmlFor="inputEmail3" className="col-sm-6 col-form-label">
                  <h6>Main Video Duration*(HH:MM:SS)</h6>
                </CFormLabel>
                <CFormInput
                  type="time"
                  value={Video_time}
                  onChange={(e) => {
                    setVideo_time(e.target.value)
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col xl="6">
                <CFormLabel htmlFor="inputEmail3" className="col-sm-6 col-form-label">
                  <h6>Description*</h6>
                </CFormLabel>
                <CFormTextarea
                  style={{ height: '120px' }}
                  type="textarea"
                  value={Discription}
                  onChange={(e) => {
                    setDiscription(e.target.value)
                  }}
                />
              </Col>
              <Col>
                <Row>
                  <Col xl="12">
                    <CFormLabel htmlFor="inputEmail3" className="col-sm-6 col-form-label">
                      <h6>Subscribe Method*</h6>
                    </CFormLabel>
                    <CFormSelect
                      value={Subscribe}
                      onChange={(e) => {
                        setSubscribe(e.target.value)
                      }}
                    >
                      <option>Select Method</option>
                      <option value="Free">Free</option>
                      <option value="Paid">Paid</option>
                    </CFormSelect>
                  </Col>
                  <Col>
                    <CFormLabel htmlFor="inputEmail3" className="col-sm-6 col-form-label">
                      <h6>IMDB Rating(Out Of 10)*</h6>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      value={Rating}
                      onChange={(e) => {
                        setRating(e.target.value)
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col>
                <CFormLabel htmlFor="inputEmail3" className="col-sm-6 col-form-label">
                  <h6>Select Countries*</h6>
                </CFormLabel>
                <Row style={{ paddingTop: '5px' }}>
                  <Col xl="2">
                    <CFormCheck
                      type="radio"
                      name="Countries"
                      value="Include"
                      label="Include"
                      onChange={(e) => {
                        setCountry(e.target.value)
                      }}
                    />
                  </Col>
                  <Col xl="2">
                    <CFormCheck
                      type="radio"
                      name="Countries"
                      value="Exclude"
                      label="Exclude"
                      onChange={(e) => {
                        setCountry(e.target.value)
                      }}
                    />
                  </Col>
                  <br />
                  <Col xl="6 ">
                    <CFormInput
                      type="text"
                      value={Country}
                      onChange={(e) => {
                        setCountry(e.target.value)
                      }}
                    />
                  </Col>
                  <CFormSelect
                    value={Country}
                    onChange={(e) => {
                      setCountry(e.target.value)
                    }}
                    isMulti={true}
                  >
                    <option align="center">Select Country</option>
                    {Country1.map((item, i) => {
                      return <option key={i}>{item.country}</option>
                    })}
                  </CFormSelect>
                </Row>
              </Col>

              <Col>
                <CFormLabel htmlFor="inputEmail3" className="col-sm-6 col-form-label">
                  <h6>Publish Type*</h6>
                </CFormLabel>

                <Row style={{ paddingTop: '5px' }}>
                  <Col xl="2">
                    <CFormCheck
                      type="radio"
                      name="banner"
                      value="Yes"
                      label="Yes"
                      onChange={(e) => {
                        setPublish(e.target.value)
                      }}
                    />
                  </Col>

                  <Col xl="2">
                    <CFormCheck
                      type="radio"
                      name="banner"
                      value="No"
                      label="No"
                      onChange={(e) => {
                        setPublish(e.target.value)
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row style={{ marginTop: '20px' }}>
              <Col xl="12">
                <CFormLabel htmlFor="inputEmail3" className="col-sm-6 col-form-label">
                  <h6>Cast & Crews</h6>
                </CFormLabel>
                <CFormInput
                  type="text"
                  value={Cast}
                  onChange={(e) => {
                    setCast(e.target.value)
                  }}
                />
              </Col>
            </Row>
          </Form>
        </Container>
      )}
      {step == 2 && (
        <>
          <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 5 }}  >  
            {Categoires1.map((item, i) => {
              return(
                <div key={i}>
                  <CCard  value={Categoires} onClick={() => { category_submit(item.category) }}> 
                    <CCardImage  orientation="top"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs5eQ5Opr0NqjS3ue3GJSUJkFNauKAkv5rBw&usqp=CAU" />
                      <CCardTitle  >{item.category}</CCardTitle>
                  </CCard>
                </div>
              )
            })}
          </CRow>
        </>
      )}
      {step == 3 && (
        <>
          <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 5 }}  >  
            {SubCategoires1.map((item, i) => {
              return(
                <div key={i}>
                  <CCard  value={SubCategoires} onClick={() => { subcategory_submit(item.subcategorie) }}> 
                    <CCardImage   orientation="top" style={{width:"100%",height:"150px"}}  src={env.apiURL + `${item.image_user}`} />
                      <CCardTitle style={{textAlign:"center",backgroundColor:"black",color:"white",marginTop:"10px"}}  >{item.subcategorie}</CCardTitle>
                  </CCard>
                </div>
              )
            })}
          </CRow>
        </>
      )}
      {step == 4 && (
        <>
          <div>
            <p>Video Upload Type</p>
            <CFormCheck type="radio" name="status" value="Active" label="Streaming Upload" />
          </div>
          <hr />

          <CRow className="mb-3">
            <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              <h6>Trailer-video</h6>
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput type="file" onChange={saveFile2} accept=".mp4 , video" />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              <h6>Select-Video</h6>
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput type="file" onChange={saveFile1} accept=".mp4 , video" />
            </CCol>
          </CRow>


          <CRow className="mb-3">
            <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              <h6>Upcoming movie poster</h6>
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput type="file" onChange={saveFile} accept=".jpg, .jpeg, .png" />
            </CCol>
          </CRow>
        </>
      )}
      <CButton type="button" className='btn3' onClick={() => setStep(step - 1)} disabled={step == 1 ? true : false}>Prev</CButton>&nbsp;&nbsp;
      <CButton type="button" className='btn2' onClick={() => setStep(step + 1)} disabled={step == 4 ? true : false}>Next</CButton>&nbsp;&nbsp;
      {step >= 4 ? (<CButton className='btn2' onClick={submit}>Submit</CButton> ) : null}
    </form>
  </CCardBody>
  </CCard>
 </>
)}
export default AddVideo
