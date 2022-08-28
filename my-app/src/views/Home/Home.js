import React, { useState, useEffect, useCallback } from 'react'
// import { confirm } from "react-confirm-box";
import './table.css'
import ImageViewer from 'react-simple-image-viewer'
import swal from 'sweetalert'
import {
  CCard,
  CCardBody,
  CCol,
  CTable,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CButton,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CInputGroup,
  CInputGroupText,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModalFooter,
  CModal,
  CRow,
} from '@coreui/react'

import {env} from '../../environment'

// import { DocsCallout } from 'src/components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { func } from 'prop-types';
toast.configure()
const axios = require('axios')
const Home = () => {
  // const [currentImage, setCurrentImage] = useState(0);
  // const [isViewerOpen, setIsViewerOpen] = useState(false);
  // const images = ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"];

  // const openImageViewer = useCallback((index) => {
  //   setCurrentImage([index]);
  //   setIsViewerOpen(true);
  // }, []);
  const [id, setId] = useState(0)
  const [First_Name, setFirst_Name] = useState('')
  const [Last_Name, setLast_Name] = useState('')
  const [User_Name, setUser_Name] = useState('')
  const [Mobile_no,setMobile_no] = useState('')
  const [list, setList] = useState([])
  const [visible, setVisible] = useState(false)
  const [Email, setEmail] = useState('')
  const [Emailmsg, setEmailmsg] = useState('')
  // const [visible2, setVisible2] = useState(false)

  // const [visible1, setVisible1] = useState(false)
  const [search, setSearch] = useState('')
  
    const  open = ()=>{
     setFirst_Name('')
     setLast_Name('')
     setUser_Name('')
     setMobile_no('')
     setEmail('')
     
     setVisible(true)
      }


      //phone number validation
  const checkInput = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '')
    setMobile_no(onlyDigits)
  }

   
    const submit = async () => {
    // console.log(Mobile_no.length)
      const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
      if(!First_Name || !Last_Name || !User_Name || !Mobile_no || !Email)
      {
        toast.warning('please fil data', {
          autoClose: 1000,
        })
      }
    
    if (id === 0 ) {
   

      const formData = new FormData()
      // formData.append("image", imageval);
      if(!First_Name)
      {
        document.getElementById("First_Name").style.border="1px solid red"
        
      }
      else{
        formData.append('First_Name', First_Name)
        document.getElementById("First_Name").style.border="1px solid black"



      }
      if(!Last_Name)
      {
        document.getElementById("Last_Name").style.border="1px solid red"
        // toast.warning('please fil data', {
        //   autoClose: 1000,
        // })
      }
      else{
        formData.append('Last_Name', Last_Name)
        document.getElementById("Last_Name").style.border="1px solid black"


      }
      if(!User_Name)
      {
        document.getElementById("User_Name").style.border="1px solid red"
        
      }
      else{
      formData.append('User_Name', User_Name)
      document.getElementById("User_Name").style.border="1px solid black"


      }
      if(!Mobile_no )
      {
        document.getElementById("Mobile_no").style.border="1px solid red"
        
      }
      else{
      formData.append('Mobile_no', Mobile_no)
      document.getElementById("Mobile_no").style.border="1px solid black"


      }
      if(regEx.test(Email)){
      formData.append('Email', Email)
      document.getElementById("email").style.border="1px solid black"
        

      }
   
      else if (Email === "") {
        setEmailmsg("");
        document.getElementById("email").style.border="1px solid red"

      }
      
      else{
        setEmailmsg("please enter valid email ");
        document.getElementById("email").style.border="1px solid red"
      }


      
      try {
        const res = await axios.post(env.apiURL+'MInsertBanner', formData)
        toast.success('data insrted', {
          autoClose: 2000,
        })
        
        setList([...list, res.data.data])

        console.log(res)
      } catch (ex) {
        console.log(ex)
      }
   
      setFirst_Name('')
      setLast_Name('')
      setUser_Name('')
      setMobile_no('')
      setEmail('')
      // setImageval('');
      setVisible(false)
    // setVisible2(false)

      // setImageval('');
    } else {
      const formData = new FormData()
      // formData.append("image", imageval);
      formData.append('First_Name', First_Name)
      formData.append('Last_Name', Last_Name)
      formData.append('User_Name', User_Name)
      formData.append('Mobile_no', Mobile_no)
      if(regEx.test(Email)){
        formData.append('Email', Email)
  
        }

      formData.append('Id', id)

      try {
        const res = await axios.post(
          env.apiURL+'MUpdateBanner',
          formData,{
          headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}

          }
          // body: JSON.stringify(update),
        )
        debugger

        if (res.data.status === 'success') {
          getdata()
          toast.success('data updated', {
            autoClose: 2000,
          })
        }
      } catch (ex) {
        console.log(ex)
      }
    }

    // await axios.post(env.apiURL+`MEmail`)
    
    setId(0)
    setFirst_Name('')
    setLast_Name('')
    setUser_Name('')
    setMobile_no('')
    setEmail('')
    // setImageval('');
    setVisible(false)
    // setVisible2(false)


  }
    
  const edithandler = async (id) => {
    setVisible(true)
    // setVisible2(true)

    axios
      .get(env.apiURL+`Mfinddata/${id}`, {
        method: 'GET',
        
          headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
  
          
        // headers: {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        // },
      })
      .then((result) => {
        setId(id)
        setFirst_Name(result.data.data.First_Name)
        setLast_Name(result.data.data.Last_Name)
        setUser_Name(result.data.data.User_Name)
        setMobile_no(result.data.data.Mobile_no)
        setEmail(result.data.data.Email)

        // setImageval(result.data.data.image_user)
        document.getElementById('submit').innerHTML = 'Upadte'
      })
    // setVisible(false)
  }

  function getdata() {
    axios
      .get(env.apiURL+`Mfinddata`,{
      headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}

      })
      .then(function (res) {
        console.log(res.data.data)
        setList(res.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getdata()
  }, [])

  //parth hhg
  //parth - surat - Surat1

  const deletehandler = async (id) => {
    swal({
      title: 'Are you sure Delete Your Data?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(env.apiURL+`MDeleteBanner/${id}`,{
          
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
      
            
        }
        ).then((res) => {
          getdata()
        })
        toast.success('data deleted', {
          autoClose: 2000,
        })
      } else {
        toast.info('data Safe', {
          autoClose: 2000,
        })
      }
    })
  }
  // const[text1,settext1] = ('')
  // const buton = (e)=>{
  //   var g = e.target.value;
  //   settext1(g);
  //   document.getElementById('text').style.width="500px";


  // }
  return (
    <>
      <br />
      <br />
      <CModal visible={visible}>       
        <CModalHeader onClick={() => setVisible(false)}>
          <CModalTitle>Admin user Form</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm action="/MInsertBanner" method="POST">
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">First Name</CFormLabel>
              <CFormInput
                type="text"
                id="First_Name"
                value={First_Name}
                onChange={(e) => {
                  setFirst_Name(e.target.value)
                }}
                placeholder="Enter Firstname"
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">Last Name</CFormLabel>
              <CFormInput
                type="text"
                id='Last_Name'
                value={Last_Name}
                onChange={(e) => {
                  setLast_Name(e.target.value)
                }}
                placeholder="Enter Lastname"
                rows="3"
              ></CFormInput>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">User Name</CFormLabel>
              <CFormInput
                type="text"
                id='User_Name'
                value={User_Name}
                onChange={(e) => {
                  setUser_Name(e.target.value)
                }}
                placeholder="Enter Username"
                rows="3"
              ></CFormInput>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">Mobile no</CFormLabel>
              <CFormInput
                type="tel"
                id='Mobile_no'
                value={Mobile_no}
                onChange={(e) => checkInput(e)}
                maxLength="10"
                placeholder="Content Provider Phone"
                rows="3"
              ></CFormInput>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
              <CFormInput
                type="email"
                id='email'
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                placeholder="Enter Email"
              />
            </div>
            <span>{Emailmsg}</span>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton className="btn1" onClick={submit} id="submit">
            Save
          </CButton>
        </CModalFooter>
      </CModal>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CInputGroup className="flex-nowrap">
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
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
              <CButton
                style={{ marginLeft: '650px', borderRadius: '5px' }}
                className="btn1"
                onClick={() => open()}
              >
                Add Admin 
              </CButton>
            </CInputGroup>
            <br></br>

            <CTable style={{ textAlign: 'center' }} hover>
              <CTableHead>
                <CTableRow
                  style={{ backgroundImage: 'linear-gradient(to right ,#0F2027,#203A43,#2c5364)' }}
                >
                  <CTableHeaderCell style={{ color: 'white' }}>No</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>First_Name</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Last_Name</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>User_Name</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Mobile_no</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Email</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list
                  .filter((data) => data.First_Name.match(new RegExp(search, 'i')))
                  .reverse()
                  .map((item, i) => {
                    return (
                      <>
                        <CTableRow
                          key={i}
                          style={{ backgroundImage: 'linear-gradient(to right,#16222A,#3A6073)' }}
                        >
                          <CTableDataCell style={{ paddingTop: '20px', color: 'white' }}>
                            {i + 1}
                          </CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '20px', color: 'white' }}>
                            {item.First_Name}
                          </CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '20px', color: 'white' }}>
                            {item.Last_Name}
                          </CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '20px', color: 'white' }}>
                            {item.User_Name}
                          </CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '20px', color: 'white' }}>
                            {item.Mobile_no}
                          </CTableDataCell>
                          <CTableDataCell style={{ paddingTop: '20px', color: 'white' }}>
                            {item.Email}
                          </CTableDataCell>

                          <CTableDataCell style={{ paddingTop: '20px' }}>
                            <CButton
                              color="success"
                              variant="outline"
                              value="Update"
                              onClick={() => edithandler(item._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-pencil-square"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                  fillRule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                />
                              </svg>
                            </CButton>
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
      {/* edit data */}


      {/* <table border="1" width="50%">
        <tr>
          <td><input  type="text" id='text' style={{width:{text1}}} onChange={(e)=> buton(e)}></input></td>
          <td><input  type="text"></input></td>
          <td><input  type="text"></input></td>
          <td><input  type="text"></input></td>
          <td><input  type="text"></input></td>
       n
        </tr>
      </table> */}
    </>
  )
                }
export default Home
