import React, { useState, useEffect, useCallback } from 'react'
import './table.css'
import ImageViewer from 'react-simple-image-viewer'
import swal from 'sweetalert'
import {
  CCardImage,
  CCardTitle,
  CCardText,
  CCard,
  CCardBody,
  CFormCheck,
  CCol,
  CTable,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CButton,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ImPointRight } from 'react-icons/im'
import { SubTitle } from 'chart.js'
import SubCategoires from '../subcategoires/subcategoires'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import { FaHandPointRight } from 'react-icons/fa'
import { env } from '../../../environment'
import { Button, Form } from 'react-bootstrap'
// import React from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
// import videop from ''

const axios = require('axios')
toast.configure()
const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad']

const Add_Video = () => {
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState(0)
  const [title, settitle] = useState('')
  const [method, setmethod] = useState('')
  const [rdate, setrdate] = useState('')
  const [edate, setedate] = useState('')
  const [status, setstatus] = useState('')
  const [banner, setBanner] = useState('')
  const [language1, setLanguage1] = useState([])
  const [language, setLanguage] = useState()
  const [category, setcategory] = useState('')
  const [category1, setcategory1] = useState([])
  const [subcategory1, setsubcategory1] = useState([])
  const [subcategory, setsubcategory] = useState('')
  const [Description, setDescription] = useState('')
  const [imageval, setImageval] = useState('')
  const [banner_video, setbanner_video] = useState('')
  const [Trailer_video, setTrailer_video] = useState('')
  const [list, setList] = useState([])
  const [search, setSearch] = useState('')
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const [alignment, setAlignment] = React.useState('left')

  

  //toggle button
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment)
  }
  // -------------------OPEN IMAGE------------------//
  const openImageViewer = useCallback((index) => {
    setCurrentImage([index])
    setIsViewerOpen(true)
  }, [])

  // -------------------PRINT IMAGE------------------//
  const saveFile = (e) => {
    console.log(e)
    setImageval(e.target.files[0])
    // setbanner_img(e.target.files[0])
  }
  const saveFile1 = (e) => {
    console.log(e.target)
    setbanner_video(e.target.files[0])
  }

  const saveFile2 = (e) => {
    console.log(e.target)
    setTrailer_video(e.target.files[0])
  }

  
  // --------------------ONSUBMIT--------------------//

  const submit = async () => {
    if (!Description) {
      toast.warning('data Fild...!', {
        autoClose: 200,
      })
      return
    }

    // -----------------INSERT DATA--------------//

    if (id == 0) {
      debugger
      const formData = new FormData()
      formData.append('image', imageval)
      formData.append('category', category)
      formData.append('language', language)
      formData.append('subcategory', subcategory)
      formData.append('Description', Description)
      formData.append('banner_video', banner_video)
      formData.append('Trailer_video', Trailer_video)
      formData.append('title', title)
      formData.append('method', method)
      formData.append('rdate', rdate)
      formData.append('status', status)
      formData.append('banner', banner)
      formData.append('edate', edate)
      // formData.append('sid', sid) 

      // try {
      await axios
        .post(env.apiURL + 'viInsertBanner', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            userId: localStorage.getItem('userId'),
          },
        })
        .then((r) => {
          console.log(formData)
          setList([...list, r.data.data])
        })
      debugger

      toast.success('New Add...!', {
        autoClose: 2000,
      })
      // console.log(res)
      // } catch (ex) {
      //   console.log(ex)
      // }
      settitle('')
      setmethod('')
      // setsid('')
      setrdate('')
      setstatus('')
      setBanner('')
      setedate('')
      setcategory('')
      setsubcategory('')
      setDescription('')
      setImageval('')
      setLanguage('')
      setbanner_video('')
      setTrailer_video('')
    } else {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('method', method)
      formData.append('rdate', rdate)
      formData.append('edate', edate)
      formData.append('status', status)
      formData.append('banner', banner)
      formData.append('category', category)
      formData.append('subcategory', subcategory)
      formData.append('image', imageval)
      formData.append('language', language)
      formData.append('banner_video', banner_video)
      formData.append('Trailer_video', Trailer_video)
      formData.append('Description', Description)
      formData.append('Id', id)
      // formData.append('sid', sid)
      try {
        const res = await axios.post(env.apiURL + 'viUpdateBanner', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
          "User_Id": localStorage.getItem('userId')
        },
        })
        debugger
        if (res.data.status == 'success') {
          getdata()
          toast.success('Data Updated...!', {
            autoClose: 2000,
          })
        }
      } catch (ex) {
        console.log(ex)
      }
    }
   
    setcategory('')
    setsubcategory('')
    settitle('')
    setmethod('')
    setrdate('')
    setstatus('')
    setBanner('')
    setedate('')
    setLanguage('')
    setDescription('')
    setImageval('')
    setbanner_video('')
    setTrailer_video('')
    setId(0)
    // setsid('')
  
  
   
  }

  // --------------------EDIT DATA--------------------//

  const edithandler = async (id) => {
    
    axios
      .get(env.apiURL + `vifinddata/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((result) => {
        setId(id)
        // setId(result.data.data.sid)
        settitle(result.data.data.title)
        setmethod(result.data.data.method)
        setrdate(result.data.data.rdate)
        setedate(result.data.data.edate)
        setstatus(result.data.data.status)
        setcategory(result.data.data.category)
        setsubcategory(result.data.data.subcategory)
        setDescription(result.data.data.Description)
        setLanguage(result.data.data.language)
        setImageval(result.data.data.image_user)
        setbanner_video(result.data.data.banner_video)
        setTrailer_video(result.data.data.Trailer_video)

        //document.getElementById('submit').innerHTML = 'Upadte'
      })
    //setVisible6(false)
  }

  // --------------------API FUNCTION------------------------//
  function getdata() {
    axios
      .get(env.apiURL + `vifinddata`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(function (res) {
        console.log(res.data)
        setList(res.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function cata_data() {
    axios
      .get(env.apiURL + `vfinddata`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(function (res) {
        console.log(res.data)
        setcategory1(res.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function subcata_data() {
    axios
      .get(env.apiURL + `kfindonedata`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(function (res) {
        console.log(res.data)
        setsubcategory1(res.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function Language_Data() {
    axios
      .get(env.apiURL + `finddata`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(function (res) {
        console.log(res.data)
        setLanguage1(res.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  // -----------------------API FUNCTION CALLING-----------------------//
  useEffect(() => {
    getdata()
    Language_Data()
    subcata_data()
    cata_data()
  }, [])



  function videoplay() {
    alert()
    ;<video src="https://www.youtube.com/watch?v=c22sPrhLg6M" height="200px"></video>
  }
  function step() {}
  // -----------------------DELETE DATA----------------------------------------------//
  const deletehandler = async (id) => {
    swal({
      title: 'Are you sure Delete Your Data?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(env.apiURL + `viDeleteBanner/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          })
          .then((res) => {
            const users = res.data
            getdata()
          })
        toast.error('Data Delete...!', {
          autoClose: 2000,
        })
      }
    })
  }

  function table1() {
    document.getElementById('table1').style.display = 'block'
    document.getElementById('table2').style.display = 'none'
  }
  function table2() {
    document.getElementById('table1').style.display = 'none'
    document.getElementById('table2').style.display = 'block'
  }

  return (
    <>
      <br />
      <br />
      {/*Table and search  */}

      <CCol xs={12} id="table2">
        <CCard className="mb-4">
          <CCardBody>
            {/* <p>hy </p> */}
            {/* <button onClick={videoplay}>clickme</button> */}
            <CInputGroup className="flex-nowrap ">
              <CInputGroupText color="primary" className="btn1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
                &nbsp;&nbsp;&nbsp;Search
              </CInputGroupText>

              <CFormInput
                placeholder="Search "
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />

              <ToggleButtonGroup
                style={{ marginLeft: '400px', width: '100px', height: '40px' }}
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                <ToggleButton value="center" aria-label="left aligned" onClick={table1}>
                  <TableViewRoundedIcon />
                </ToggleButton>
                <ToggleButton value="left" aria-label="centered" onClick={table2}>
                  <FormatListNumberedIcon />
                </ToggleButton>
              </ToggleButtonGroup>

              {/* <Link to="/base/Video">
                <CButton  style={{ marginLeft: '50px', borderRadius: '5px' }}  className="btn1"  >  Add Video </CButton>
                
              </Link> */}

            <Link to="/base/Add_Video">
                  <CButton style={{ marginLeft: '50px', borderRadius: '5px' }}  className="btn1" >
                    Add Video
                  </CButton>
             </Link>
            </CInputGroup>
            <br></br>
            <CTable style={{ textAlign: 'center' }} hover>
              <CTableHead>
                <CTableRow style={{ backgroundImage: 'linear-gradient(to right,#16222A,#3A6073)' }}>
                  <CTableHeaderCell style={{ color: 'white' }}>No</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Title</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Rating</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Subscribe</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Discription</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Contract</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Trailer time </CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Video time</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Country</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Cast</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Publish</CTableHeaderCell>



                  <CTableHeaderCell scope="col2" style={{ color: 'white' }}>
                    image
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ color: 'white' }}>
                    Action
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list
                  // .filter((data) => data.title.match(new RegExp(search, 'i')))
                  .reverse()
                  .map((item, i) => {
                    return (
                      <>
                        <CTableRow
                          key={i}
                          style={{ backgroundImage: 'linear-gradient(to right,#16222A,#3A6073)' }}
                        >
                          <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                            {i + 1}
                          </CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                            {item.Title}
                          </CTableDataCell>
                          <CTableDataCell
                            style={{
                              paddingTop: '30px',
                              color: '#FFF',
                              textTransform: 'capitalize',
                            }}
                          >
                            {item.Rating}
                          </CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                            {item.Subscribe}
                          </CTableDataCell>
                          <CTableDataCell
                            className="font"
                            style={{ paddingTop: '30px', color: '#FFF', height: '170px' }}
                          >
                            {item.Discription}
                          </CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                            {item.Contract}
                          </CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                            {item.Trailer_time}
                          </CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                            {item.Video_time}
                          </CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                            {item.Country}
                          </CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                            {item.Cast}
                            {/* <ReactPlayer url={"http://localhost:5000/" + item.banner_video } height="300px"  width="400px"  controls={true} style={{margin:"20px"}} /> */}
                          </CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                            {item.Publish}
                          </CTableDataCell>

                          <CTableDataCell style={{ paddingTop: '10px', color: '#FFF' }}>
                            <div className="hover01  column1">
                              <figure className="figure1">
                                <img
                                  src={env.apiURL + `${item.image_user}`}
                                  width="250px"
                                  height="150px"
                                  key={i}
                                  onClick={() => openImageViewer(env.apiURL + '' + item.image_user)}
                                />
                              </figure>
                            </div>
                            {isViewerOpen && (
                              <ImageViewer
                                src={currentImage}
                                currentIndex={0}
                                disableScroll={false}
                                closeOnClickOutside={true}
                                onClose={setIsViewerOpen}
                                backgroundStyle={{ backgroundColor: '#3A6073', zIndex: '2' }}
                              />
                            )}
                          </CTableDataCell>
                          {/* <CTableDataCell color="success" style={{ paddingTop: "30px" }}><img src={env.apiURL+`${item.banner_img}`} width="100px"></img></CTableDataCell> */}

                          <CTableDataCell style={{ paddingTop: '30px' }}>
                          <Link to="/base/Add_Video">
                            <CButton
                              color="success"
                              variant="outline"
                              value="Update"
                              onClick={() => edithandler(item._id)}
                            >
                              <svg  xmlns="http://www.w3.org/2000/svg" width="16"  height="16" fill="currentColor" className="bi bi-pencil-square"  viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                  fillRule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                />
                              </svg>
                            </CButton>
                            </Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <CButton
                              color="danger"
                              variant="outline"
                              value="delete"
                              onClick={() => deletehandler(item._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash3"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                              </svg>
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      </>
                    )
                  })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      {/* card forment */}
      <CCol xs={12} id="table1" style={{ display: 'none' }}>
        <CCard className="mb-4">
          <CCardBody>
            <CInputGroup className="flex-nowrap">
              <CInputGroupText className="btn1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
                &nbsp;&nbsp;&nbsp;Search
              </CInputGroupText>
              <CFormInput
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />

              {/* toggle button  */}
              <ToggleButtonGroup
                style={{ marginLeft: '400px', width: '100px', height: '40px' }}
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                <ToggleButton value="center" aria-label="left aligned" onClick={table1}>
                  <TableViewRoundedIcon />
                </ToggleButton>
                <ToggleButton value="left" aria-label="centered" onClick={table2}>
                  <FormatListNumberedIcon />
                </ToggleButton>
              </ToggleButtonGroup>

              <Link to="/base/Add_Video">
                  <CButton style={{ marginLeft: '50px', borderRadius: '5px' }}  className="btn1" >
                    Add Video
                  </CButton>
             </Link>
            </CInputGroup>
            <br></br>
            {list
              // .filter((data) => data.title.match(new RegExp(search, 'i')))
              // .reverse()
              .map((item, i) => {
                return (
                  <>
                    <CCard
                      key={i}
                      style={{
                        width: '19.5rem',
                        display: 'flex',
                        display: 'inline-block',
                        margin: '5px 1px',
                        borderRadius: '10px',
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                        backgroundImage: 'linear-gradient(360deg,#16222A,#3A6073)',
                      }}
                    >
                      <div className="hover01 column">
                        <figure>
                          <img
                            src={env.apiURL + `${item.image_user}`}
                            width="282px"
                            height="200px"
                            key={i}
                            onClick={() => openImageViewer(env.apiURL + '' + item.image_user)}
                          />
                        </figure>
                      </div>
                      {isViewerOpen && (
                        <ImageViewer
                          src={currentImage}
                          currentIndex={0}
                          disableScroll={false}
                          closeOnClickOutside={true}
                          onClose={setIsViewerOpen}
                          backgroundStyle={{
                            backgroundColor: '#3A6073',
                            zIndex: '2',
                            backgroundSize: 'cover',
                          }}
                        />
                      )}
                      <CCardBody>
                        <CCardTitle
                          style={{
                            color: 'white',
                            textAlign: 'center',
                            backgroundColor: '#3A6073',
                            textTransform: 'capitalize',
                          }}
                        >
                          <b>{item.title}</b>
                        </CCardTitle>
                        <CCardText style={{ color: 'white' }}>
                          <FaHandPointRight style={{ color: '#3A6073' }} /> {item.Title}
                        </CCardText>
                        <CCardText style={{ color: 'white' }}>
                          <FaHandPointRight style={{ color: '#3A6073' }} /> {item.Rating}
                        </CCardText>
                        <CCardText style={{ color: 'white' }}>
                          <FaHandPointRight style={{ color: '#3A6073' }} /> {item.Subscribe}
                        </CCardText>
                        <CCardText style={{ color: 'white' }}>
                          <FaHandPointRight style={{ color: '#3A6073' }} /> {item.Contract}
                        </CCardText>
                        <CCardText style={{ color: 'white' }}>
                          <FaHandPointRight style={{ color: '#3A6073' }} /> {item.Country}
                        </CCardText>
                        <CCardText style={{ color: 'white' }}>
                          <FaHandPointRight style={{ color: '#3A6073' }} /> {item.Trailer_time}
                        </CCardText>
                        <CCardText style={{ color: 'white' }}>
                          <FaHandPointRight style={{ color: '#3A6073' }} /> {item.Video_time}
                        </CCardText>
                        <CCardText style={{ color: 'white' }}>
                          <FaHandPointRight style={{ color: '#3A6073' }} />
                          {item.Discription}
                        </CCardText>
                        {/* update button */}
                        <Link to="/base/Add_Video">
                            <CButton
                              color="success"
                              variant="outline"
                              value="Update"
                              onClick={() => edithandler(item._id)}
                            >
                              <svg  xmlns="http://www.w3.org/2000/svg" width="16"  height="16" fill="currentColor" className="bi bi-pencil-square"  viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                  fillRule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                />
                              </svg>
                            </CButton>
                            </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {/* delete button */}
                        <CButton
                          color="danger"
                          variant="outline"
                          value="delete"
                          onClick={() => deletehandler(item._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                          </svg>
                        </CButton>
                      </CCardBody>
                    </CCard>
                  </>
                )
              })}
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}
export default Add_Video
