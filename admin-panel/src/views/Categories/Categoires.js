import React, { useState, useEffect, useCallback } from 'react'
import './table.css'
import ImageViewer from 'react-simple-image-viewer'
import swal from 'sweetalert'
import { FaHandPointRight } from "react-icons/fa";
import {CCardTitle, CCardText,  CCard,  CCardBody,  CCardHeader,  CCol,  CTable,  CForm,  CFormLabel,  CFormInput,  CFormTextarea,  CButton,  CTableHead,  CTableRow,  CTableHeaderCell,  CTableBody,  CTableDataCell,  CInputGroup,  CInputGroupText,  CModalBody,  CModalTitle,  CModalHeader,  CModalFooter,  CModal,  CRow,  CFormSelect,} from '@coreui/react'
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded'
import ToggleButton from '@mui/material/ToggleButton'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Link} from "react-router-dom";
import SubCategoires from '../base/subcategoires/subcategoires';
// import queryString from 'query-string'
import {env} from '../../environment'

const axios = require('axios')
toast.configure()

const Category = () => {
  const [id, setId] = useState(0)
  const [category, setcategory] = useState('')
  const [Description, setDescription] = useState('')
  const [imageval, setImageval] = useState('')
  const [list, setList] = useState([])
  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [search, setSearch] = useState('')
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [alignment, setAlignment] = React.useState('left')

  //toggle button
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment)
  }

  //image zooming
  const openImageViewer = useCallback((index) => {
    setCurrentImage([index])
    setIsViewerOpen(true)
  }, [])

  //image uploding
  const saveFile = (e) => {
    setImageval(e.target.files[0])
  }

  //new add 
  function openhandler() {
    setcategory('')
    setDescription('')
    setImageval('')
    setVisible(true)
  }

  //submit 
  const submit = async () => {
    // value black not submit
    if (!category || !Description || !imageval) {
      toast.warning('data Fild...!', {
        autoClose: 2000,
      })
      return
    }

    //insert and update code 
    if (id == 0) {
      const formData = new FormData()
      formData.append('image', imageval)
      formData.append('category', category)
      formData.append('Description', Description)
      
      try {
        const res = await axios.post(env.apiURL+'vInsertBanner', formData ,{
          headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
      })
        setList([...list, res.data.data])
        toast.success('New Add...!', {
          autoClose: 2000,
        })
        console.log(res)
      } 
      catch (ex) 
      {
        console.log(ex)
      }
      setVisible(false)
      setcategory('')
      setDescription('')
      setImageval('')
    } 
    else 
    {
      const formData = new FormData()
      formData.append('image', imageval)
      formData.append('category', category)
      formData.append('Description', Description)
      formData.append('Id', id)
      try {
        const res = await axios.post(env.apiURL+'vUpdateBanner', formData , {
          headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
      })
        if (res.data.status == 'success') {
          getdata()
          toast.success('Updated Data...!', {
            autoClose: 2000,
          })          
        }
      } catch (ex) {
        console.log(ex)
      }
    }
    setcategory('')
    setDescription('')
    setImageval('')
    setVisible1(false)
    setId(0)
  }
      
  const pass = async (name) => {
        
  }   

// update data
const edithandler = async (id) => {
  setVisible1(true)
  axios.get(env.apiURL+`vfinddata/${id}`, 
  { method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${localStorage.getItem('token')}`
  }
}).then((result) => 
  {
      setId(id)
      setcategory(result.data.data.category)
      setDescription(result.data.data.Description)
      setImageval(result.data.data.image_user)
  })
   setcategory('')
    setDescription('')
    setImageval('')
}

//find data
function getdata() {
 
  axios
    .get(env.apiURL+`vfinddata`,{
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    })
    .then(function (res) {
      console.log(res.data)
      setList(res.data.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

//api calling
useEffect(() => {
  getdata()
}, [])

//delete data
const deletehandler = async (id) => {
  swal({
      title: 'Are you sure Delete Your Data?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios.delete(env.apiURL+`vDeleteBanner/${id}`,{
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
      }).then((res) => {
        const users = res.data
        getdata()
      })
      toast.error('your data deleted...!', {
        autoClose: 2000,
      })
    } 
    else 
    {
      toast.info('Data Safe...!', {
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
      {/* new add data */}
      <CModal visible={visible} onClose={() => setVisible1(false)}>
          <CModalHeader onClick={() => setVisible(false)}>
            <CModalTitle>Category Form</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    <b>Category</b>
                  </CFormLabel>
                  <CFormInput type="text" id="exampleFormControlInput1" value={category}  onChange={(e) => {setcategory(e.target.value)}} placeholder="Enter Categoires"/>
                </div>

                <div className="mb-3">
                  <CFormLabel htmlFor="formFileMultiple">
                    <b>Select Category Image</b>
                  </CFormLabel>
                  <CFormInput type="file" maxFileSize="1000" id="formFileMultiple" placeholder="your Categoires title" onChange={saveFile} accept=".jpg, .jpeg, .png , .webp"  />
                </div>

                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">
                    <b>Description</b>
                  </CFormLabel>
                  <CFormTextarea value={Description} onChange={(e) => {setDescription(e.target.value)}}  maxLength="200" placeholder="Enter Description"></CFormTextarea>
                </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
              {/* <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton> */}
              <CButton className="btn1" onClick={submit} id="demo">Save</CButton>
          </CModalFooter>
      </CModal>

      {/*card and search  */}
      <CCol xs={12} id="table1"  style={{display: "none"}}>
        <CCard className="mb-4">
          <CCardBody>
            <CInputGroup className="flex-nowrap">
                  <CInputGroupText className="btn1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg>
                    &nbsp;&nbsp;&nbsp;Search
                  </CInputGroupText>
                  <CFormInput placeholder="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} aria-label="Username" aria-describedby="addon-wrapping" />

                  {/* toggle button  */}
                  <ToggleButtonGroup style={{ marginLeft: '400px', width: '100px', height: '40px' }} value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
                    <ToggleButton value="center" aria-label="left aligned" onClick={table1}>
                      <TableViewRoundedIcon />
                    </ToggleButton>
                    <ToggleButton value="left" aria-label="centered" onClick={table2}>
                      <FormatListNumberedIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>

                  <CButton style={{marginLeft: '30px',borderRadius:"5px"}} className="btn1"  onClick={() => setVisible(!visible)}>
                    Add Category
                  </CButton>

            </CInputGroup>
            <br></br>
            {list.filter((data) =>data.category.match(new RegExp(search, 'i'))).reverse().map((item, i) => {
                return (
                  <>
                    <CCard style={{width: '19.5rem',display: 'flex',display: 'inline-block',margin: '5px 1px',borderRadius: '10px',boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',backgroundImage: 'linear-gradient(360deg,#16222A,#3A6073)'}}>
                       <div className="hover01 column">
                          <figure>
                            <img src={env.apiURL+`${item.image_user}`} width="282px" height="200px" key={i}
                              onClick={() =>openImageViewer(env.apiURL+'' + item.image_user)}
                            />
                          </figure>
                        </div>
                        {isViewerOpen && (
                          <ImageViewer src={currentImage} currentIndex={0} disableScroll={false} closeOnClickOutside={true} onClose={setIsViewerOpen}
                              backgroundStyle={{backgroundColor: '#3A6073',zIndex: '2',backgroundSize: 'cover'}}
                          />
                        )}
                      <CCardBody>
                        <CCardTitle style={{ color: 'white', textAlign:"center" ,backgroundColor:"#3A6073",textTransform:"capitalize"   }}>{item.category}</CCardTitle>
                        <CCardText className='font' ><FaHandPointRight style={{color:"#3A6073"}}/> {item.Description}</CCardText>
                        <CCardText >&nbsp;
                        {/* update button */}
                        <Link to={`../base/subcategoires?category=${item.category}`}>
                            <CButton color="info" variant="outline" onClick={() => pass(item.category)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16"  height="16"  fill="currentColor" className="bi bi-bookmark-check" viewBox="0 0 16 16">  <path filRule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/></svg>
                            </CButton>
                            </Link>&nbsp;&nbsp;
                        <CButton  variant="outline" value="Update" color='success' onClick={() => edithandler(item._id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16"  height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" /><path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                          </svg>
                        </CButton>&nbsp;&nbsp;
                        {/* delete button */}
                        <CButton color="danger"  variant="outline" value="delete" onClick={() => deletehandler(item._id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16" >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                          </svg>
                        </CButton>
                        </CCardText>
                    </CCardBody>
                  </CCard>

                  {/* update model */}
                  <CModal alignment="center" visible={visible1} onClose={() => setVisible(false)}>
                    <CModalHeader onClick={() => setVisible1(false)}>
                        <CModalTitle>Update Category Form</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CForm>
                        <div className="mb-3">
                          <CFormLabel htmlFor="exampleFormControlInput1">Categoires</CFormLabel>
                          <CFormInput type="text" value={category} onChange={(e) => {setcategory(e.target.value)}} placeholder="Enter Categoires"/>
                        </div>
                        <div className="mb-3">
                          <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                          <CFormTextarea value={Description} onChange={(e) => {setDescription(e.target.value)}} maxLength="200" placeholder="Enter Categoires"></CFormTextarea>
                        </div>
                      </CForm>

                      <div>
                        <CRow>
                          <CCol xl="5">
                            <CFormLabel htmlFor="formFile">SELECT-IMAGE</CFormLabel>
                            <CFormInput type="file" onChange={saveFile} id="hello" />
                          </CCol>
                          <CCol>
                              <img style={{ height: '200px', width: '250px', borderRadius: '6px' }} src={env.apiURL+'' + imageval}></img>
                          </CCol>
                        </CRow>
                      </div>
                      </CModalBody>
                      <CModalFooter>
                        <CButton className='btn1' onClick={submit} id="demo"  type="submit">UPDATE</CButton>
                      </CModalFooter>
                    </CModal>
                  </>
                )
              })}
          </CCardBody>
        </CCard>
      </CCol>

      {/* table forment */}
      <CCol xs={12} id='table2'>
        <CCard className="mb-4">
          <CCardBody>
            <CInputGroup className="flex-nowrap">
              <CInputGroupText color="primary" className='btn1'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search"  viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                  &nbsp;&nbsp;&nbsp;Search
              </CInputGroupText>
              <CFormInput placeholder="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} aria-label="Username" aria-describedby="addon-wrapping"/>
              
              {/* toggle buttons */}
              <ToggleButtonGroup style={{ marginLeft: '400px', width: '100px', height: '40px' }} value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
                  <ToggleButton value="center" aria-label="left aligned" onClick={table1}>
                    <TableViewRoundedIcon />
                  </ToggleButton>
                  <ToggleButton value="left" aria-label="centered" onClick={table2}>
                    <FormatListNumberedIcon />
                  </ToggleButton>
              </ToggleButtonGroup>

              <CButton style={{ marginLeft: '30px',borderRadius:"5px"}} className="btn1" onClick={() => openhandler()}>
                Add Category
              </CButton>
            </CInputGroup>
            <br />
  

            {/* table formrt */}
            <CTable  hover className='App'>
              <CTableHead >
                <CTableRow style={{backgroundImage: 'linear-gradient(to right,#16222A,#3A6073)' }}>
                  <CTableHeaderCell scope="col" style={{color:"white"}}>Id</CTableHeaderCell>
                  <CTableHeaderCell style={{color:"white"}}>Category</CTableHeaderCell>
                  <CTableHeaderCell style={{color:"white"}}>Image</CTableHeaderCell>
                  <CTableHeaderCell style={{color:"white"}}>Description</CTableHeaderCell>
                  <CTableHeaderCell style={{color:"white"}}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list.filter((data) => data.category.match(new RegExp(search, 'i'))).reverse().map((item, i) => {
                    return (
                      <>
                        <CTableRow key={i} style={{backgroundImage: 'linear-gradient(to right,#16222A,#3A6073)'}}>
                          <CTableDataCell  style={{ paddingTop: '30px',color:"white" }}>{i + 1}</CTableDataCell>
                          <CTableDataCell  style={{ paddingTop: '30px',color:"white",textTransform:"capitalize"   }}>{item.category}</CTableDataCell>
                          <CTableDataCell>
                            <div className="hover01 column1">
                              <figure className='figure1'>
                                <img src={env.apiURL+`${item.image_user}`} width="250px" height="150px" key={i}
                                  onClick={() =>openImageViewer(env.apiURL+'' + item.image_user)}
                                />
                              </figure>
                            </div>
                            {isViewerOpen && (
                              <ImageViewer src={currentImage} currentIndex={0} disableScroll={false} closeOnClickOutside={true} onClose={setIsViewerOpen}
                                backgroundStyle={{backgroundColor: '#3A6073',zIndex: '2'}}
                              />
                            )}
                          </CTableDataCell>
                          <CTableDataCell className='font1' style={{color:"white"}}>{item.Description}</CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '30px' }}>
                          <Link to={`../base/subcategoires?category=${item.category}`}>
                            <CButton color="info" variant="outline" value="Update">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-check" viewBox="0 0 16 16">  <path filRule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/></svg>
                            </CButton>
                            </Link>&nbsp;&nbsp;
                            <CButton color="success" variant="outline" value="Update" onClick={() => edithandler(item._id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square"viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" /><path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>
                            </CButton>
                            &nbsp;&nbsp;
                            <CButton color="danger" variant="outline" value="delete" onClick={() => deletehandler(item._id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" /></svg>
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
export default Category;
