import React, { useState, useEffect, useCallback } from 'react'
import './table.css'
// import * as React from 'react';
// import DashboardIcon from '@mui/icons-material/Dashboard'
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ImageViewer from 'react-simple-image-viewer'
import swal from 'sweetalert'
import { FaHandPointRight } from "react-icons/fa";
import { CFormSelect, CCardImage, CCardTitle, CCardText, CCard, CCardBody, CCardHeader, CCol, CTable, CForm, CFormLabel, CFormInput, CFormTextarea, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CInputGroup, CInputGroupText, CModalBody, CModalTitle, CModalHeader, CModalFooter, CModal, CRow, } from '@coreui/react'
import { toast } from 'react-toastify'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import 'react-toastify/dist/ReactToastify.css'
import {
  BrowserRouter as Router,
  useParams,
  useLocation
} from "react-router-dom";
import {env} from '../../../environment'


// import zIndex from '@mui/material/styles/zIndex'
const axios = require('axios')
toast.configure()

const SubCategoires = () => {
  const [alignment, setAlignment] = React.useState('left')
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment)
  }
  const [id, setId] = useState(0)
  const [maintitle, setmaintitle] = useState('')
  const [subtitle, setsubtitle] = useState('')
  const [imageval, setImageval] = useState('')
  const [list, setList] = useState([])
  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [search, setSearch] = useState('')
  const [subcat, setsubcat] = useState('')
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [categry, setcategry] = useState([])
  const [query, setQuery] = useState('');

  // -----------------------------------------------------------------------
  const openImageViewer = useCallback((index) => {
    setCurrentImage([index])
    setIsViewerOpen(true)
  }, [])
  // -----------------------------------------------------------------------
  const saveFile = (e) => {
    setImageval(e.target.files[0])
  }

  function openhandler() {
    setsubcat('')
    setmaintitle('')
    setsubtitle('')
    setImageval('')
    setVisible(true)
  }

  // -----------------------------------------------------------------------
  const submit = async (e) => {
    if (!maintitle || !subcat || !subtitle || !imageval) {
      toast.warning('data Fild...!', {
        autoClose: 2000,
      })
      return
    }
    if (id == 0) {
      const formData = new FormData()
      formData.append('image', imageval)
      formData.append('subcategorie', subcat)
      formData.append('category', maintitle)
      formData.append('description', subtitle)
      try {
        const res = await axios.post(env.apiURL+'kInsertBanner', formData,{
          headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
      })

        setList([...list, res.data.data])
        toast.success('New Add...!', {
          autoClose: 2000,
        })
        console.log(res)
      } catch (ex) {
        console.log(ex)
      }
      setVisible(false)
      setsubcat('')
      setmaintitle('')
      setsubtitle('')
      setImageval('')
    } else {
      const formData = new FormData()
      formData.append('image', imageval)
      formData.append('subcategorie', subcat)
      formData.append('category', maintitle)
      formData.append('description', subtitle)
      formData.append('Id', id)
      try {
        const res = await axios.post(env.apiURL+'kUpdateBanner', formData,{
          headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
      })

        if (res.data.status == 'success') {
          getdata()   
      // findonesubcatogory();

          toast.success('New Updated...!', {
            autoClose: 2000,
          })
        // getdata()

        }
      } catch (ex) {
        console.log(ex)

      }
    }
    setmaintitle('')
    setsubcat('')
    setsubtitle('')
    setImageval('')
    setVisible1(false)
    setId(0)

  }
  // -----------------------------------------------------------------------
  const edithandler = async (id) => {
    // debugger;
    
    setVisible1(true)
    axios
      .get(env.apiURL+`kfinddata/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((result) => {
        setId(id)
        setsubcat(result.data.data.subcategorie)
        setmaintitle(result.data.data.category)
        setsubtitle(result.data.data.description)
        setImageval(result.data.data.image_user)
     

      })

        setsubcat('')
        setmaintitle('')
        setsubtitle('')
        setImageval('')
  }
  // 
  function getdata() {
    axios
      .get(env.apiURL+"kfinddata/?category="+categoryName,{
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    })
      .then(function (res) {
        console.log(res.data);
        setList(res.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  // ----------------------------------------------
  function category() {
    axios
      .get(env.apiURL+`vfinddata`,{
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    })
      .then(function (res) {
        console.log(res.data.data)
        setcategry(res.data.data)
        // setList(res.data.data);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  
var categoryName;

  useEffect(() => {
    let url = new URL(window.location.href);
    categoryName = url.searchParams.get("category");
    setQuery(categoryName)
    category();
    getdata();

  }, [])
  // -----------------------------------------------------------------------
  const deletehandler = async (id) => {
    swal({
      title: 'Are you sure Delete Your Data?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(env.apiURL+`kDeleteBanner/${id}`,{
          headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
      }).then((res) => {
          const users = res.data
          getdata()
          // findonesubcatogory();
        })
        toast.error('Data Deleted...!', {
          autoClose: 2000,
        })
      } else {
        toast.info('News Data Safe...!', {
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

      {/*model popup*/}
      <br />
      <br />
    
      <CModal visible={visible} onClose={() => setVisible1(false)}>
        <CModalHeader onClick={() => setVisible(false)}>
          <CModalTitle>Sub Category Form</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
              <CFormSelect aria-label="Default select example" onChange={(e) => { setmaintitle(e.target.value) }}>
                <option align="center" selected value={category}>Select Category</option>
                {categry.map((item, i) => (
                  <option key={i}>{item.category}</option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Sub Category</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" value={subcat} onChange={(e) => { setsubcat(e.target.value) }} placeholder="Enter Sub Category" />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
              <CFormTextarea id="exampleFormControlTextarea1" value={subtitle} maxLength="200" onChange={(e) => { setsubtitle(e.target.value) }} placeholder="Enter Description"
                rows="3"
              ></CFormTextarea>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="formFileMultiple">Select Image</CFormLabel>
              <CFormInput type="file" id="formFileMultiple" placeholder="Select Image" onChange={saveFile} />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="secondary" onClick={() => setVisible(false)}>Close </CButton> */}
          <CButton className="btn1" onClick={submit} id="demo">Save</CButton>        
        </CModalFooter>
      </CModal>
      {/*card and search  */}
      <CCol xs={12} id="table1" style={{ display: 'none' }}>
        <CCard className="mb-2">
          <CCardBody>
            <CInputGroup className="flex-nowrap">
              <CInputGroupText color="primary" className="btn1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>&nbsp;&nbsp;&nbsp;Search
              </CInputGroupText>
              <CFormInput placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} aria-label="Username" aria-describedby="addon-wrapping" />
              <ToggleButtonGroup style={{ marginLeft: '400px', width: '100px', height: '40px' }} value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
                <ToggleButton value="center" aria-label="left aligned" onClick={table1}>
                  <TableViewRoundedIcon />
                </ToggleButton>
                <ToggleButton value="left" aria-label="centered" onClick={table2}>
                  <FormatListNumberedIcon />
                </ToggleButton>
              </ToggleButtonGroup>
              <CButton style={{ marginLeft: '30px', borderRadius: "5px" }} className="btn1" onClick={() => openhandler()}>Add Sub Category</CButton>
            </CInputGroup>
            <br></br>
            {list
              .filter((data) => data.category.match(new RegExp(search, 'i')))
              .map((item, i) => {
                return (
                  <>
                    <CCard style={{ width: '19.5rem', display: 'inline-block', margin: '1px 1px', backgroundImage: 'linear-gradient(360deg,#16222A,#3A6073)', borderRadius: '10px' }}>
                      <div className="hover01 column">
                        <div>
                          <figure>
                            <img src={env.apiURL+`${item.image_user}`} width="282px" height="200px" key={i} onClick={() => openImageViewer(env.apiURL+'' + item.image_user)} />
                          </figure>
                          <span>Hover</span>
                        </div>
                      </div>
                      <CCardBody>
                        <CCardTitle style={{ color: 'white', textAlign: "center", backgroundColor: "#3A6073" }}>{item.category}</CCardTitle>
                        <CCardText style={{ color: 'white' }}><FaHandPointRight style={{ color: "#3A6073" }} /> {item.subcategorie}</CCardText>
                        <CCardText className='font'><FaHandPointRight style={{ color: "#3A6073" }} /> {item.description}</CCardText>
                        <CButton value="Update" color='success' variant="outline" onClick={() => edithandler(item._id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                          </svg>
                        </CButton>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <CButton color="danger" variant="outline" value="delete" onClick={() => deletehandler(item._id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16" >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                          </svg>
                        </CButton>
                      </CCardBody>
                    </CCard>
                    {/* update model */}
                    <CModal alignment="center" visible={visible1} onClose={() => setVisible(false)}>
                      <CModalHeader onClick={()=> setVisible1(false)}><CModalTitle>Update Sub Category Form</CModalTitle></CModalHeader>
                      <CModalBody>
                        <CForm>
                          <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
                            <CFormSelect aria-label="Default select example" value={category} onChange={(e) => { setmaintitle(e.target.value) }}>
                              <option align="center" selected> Select category</option>
                              {categry.map((item, i) => (
                                <option key={i}>{item.category}</option>
                              ))}
                            </CFormSelect>
                          </div>
                          <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">Sub Category</CFormLabel>
                            <CFormInput type="text" value={subcat} onChange={(e) => { setsubcat(e.target.value) }} id="exampleFormControlInput1" placeholder="Enter your Tital" />
                          </div>
                          <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                            <CFormTextarea value={subtitle} maxLength="200" onChange={(e) => { setsubtitle(e.target.value) }} id="exampleFormControlTextarea1" placeholder="Enter Your Sub-Tital" rows="3" ></CFormTextarea>
                          </div>
                        </CForm>
                        <div>
                          <CRow>
                            <CCol xl="5">
                              <CFormLabel htmlFor="formFile">Update Image</CFormLabel>
                              <CFormInput type="file" onChange={saveFile} id="hello" />
                            </CCol>
                            <CCol>
                              <img style={{ height: '200px', width: '250px', borderRadius: '6px' }} src={env.apiURL+'' + imageval} ></img>
                            </CCol>
                          </CRow>
                        </div>
                      </CModalBody>
                      <CModalFooter>
                        {/* <CButton color="secondary" onClick={() => setVisible1(false)}>Close</CButton> */}
                        <CButton color="primary" onClick={submit} id="demo" className="btn1" type="submit">Update</CButton>
                      </CModalFooter>
                    </CModal>
                  </>
                )
              })}
            {/* image click evenet */}
            {isViewerOpen && (<ImageViewer src={currentImage} currentIndex={0} disableScroll={false} closeOnClickOutside={true} onClose={setIsViewerOpen} color="white" backgroundStyle={{ backgroundColor: '#3A6073', backgroundSize: 'cover', zIndex: '2', }} />)}
          </CCardBody>
        </CCard>
      </CCol>
      {/* table and search */}
      <CCol xs={12} id="table2">
        <CCard className="mb-4">
          <CCardBody>
            <CInputGroup className="flex-nowrap">
              <CInputGroupText className="btn1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>&nbsp;&nbsp;&nbsp;Search
              </CInputGroupText>
              <CFormInput placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} aria-label="Username" aria-describedby="addon-wrapping" />
              <ToggleButtonGroup style={{ marginLeft: '400px', width: '100px', height: '40px' }} value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
                <ToggleButton value="center" aria-label="left aligned" onClick={table1}>
                  <TableViewRoundedIcon />
                </ToggleButton>
                <ToggleButton value="left" aria-label="centered" onClick={table2}>
                  <FormatListNumberedIcon />
                </ToggleButton>
              </ToggleButtonGroup>
              <CButton style={{ marginLeft: '30px', borderRadius: "5px" }} className="btn1" onClick={() => openhandler()}>Add Sub Category</CButton>
            </CInputGroup>
            <br />
            {/* table */}
            <CTable style={{ textAlign: 'center' }} hover>
              <CTableHead >
                <CTableRow style={{ backgroundImage: 'linear-gradient(to right,#16222A,#3A6073)' }}>
                  <CTableHeaderCell style={{ color: "white" }}>Id</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "white" }}>Category</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "white" }}>Sub Category</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "white" }}>Image</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "white" }}>Description</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "white" }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list
                  .filter((data) => data.category.match(new RegExp(search, 'i')))
                  .reverse()
                  .map((item, i) => {
                    return (
                      <>
                        <CTableRow key={i} style={{ backgroundImage: 'repeating-linear-gradient(to right,#16222A,#3A6073)' }}>
                          <CTableDataCell style={{ paddingTop: '30px', color: "white" }}>{i + 1}</CTableDataCell>
                          <CTableHeaderCell style={{ paddingTop: '30px', color: "white" }} >{item.category}</CTableHeaderCell>
                          <CTableDataCell style={{ paddingTop: '30px', color: "white" }}>{item.subcategorie}</CTableDataCell>
                          <CTableDataCell >
                            <div className="hover01 column1">
                              <figure className='figure1'>
                                <img src={env.apiURL+`${item.image_user}`} width="250px" height="150px" key={i} onClick={() => openImageViewer(env.apiURL+'' + item.image_user)} />
                              </figure>
                            </div>
                            {isViewerOpen && (<ImageViewer src={currentImage} currentIndex={0} disableScroll={false} closeOnClickOutside={true} onClose={setIsViewerOpen} backgroundStyle={{ backgroundColor: '#3A6073', zIndex: '2' }} />)}
                          </CTableDataCell>
                          <CTableDataCell className='font1' style={{ paddingTop: '30px', width: "400px", color: "white" }}>{item.description}</CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '30px', color: "white" }}>
                            <CButton color="success" variant="outline" value="Update" onClick={() => edithandler(item._id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                              </svg>
                            </CButton>&nbsp;&nbsp;&nbsp;&nbsp;
                            <CButton color="danger" variant="outline" value="delete" onClick={() => deletehandler(item._id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
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
    </>
  )
}
export default SubCategoires;