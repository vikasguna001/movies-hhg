import React, { useState, useEffect, useCallback } from 'react'
import './table.css';
import ImageViewer from "react-simple-image-viewer";
import {Row,Col} from "react-bootstrap";
import swal from 'sweetalert'
import {
  CCard,
  CCardBody,
  CCardHeader,
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
  CContainer,
  CFormSelect
} from '@coreui/react'
import {env} from '../../../environment'


// import { DocsCallout } from 'src/components'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
// import { func } from 'prop-types';
const axios = require('axios');
toast.configure()
const Tables = () => {
  
  const [id, setId] = useState(0);
  const [Language, setLanguage] = useState('');
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)

  function openhandler() {
    setLanguage('')
    setVisible2(true)
  }

  // const update = (e) =>
  // {

  // }
  const submit = async () => {
    if (!Language) {
      toast.warning("data Fild", {
        autoClose: 2000,

      });
      return;

    }

    if (id == 0) {
      const formData = new FormData();
      formData.append("language", Language);

      try {
        const res = await axios.post(
          env.apiURL+"InsertBanner",
          formData,{
            headers:{
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
  
            }}
        );
        debugger;

        setList([...list, res.data.data])

        console.log(res);
      } catch (ex) {
        console.log(ex);
      }
      setVisible2(false)
      setLanguage('');
    }
    else {

     
      const formData = new FormData();
      formData.append("language", Language);
      formData.append("Id", id);

      try {
        const res = await axios.post(
          env.apiURL+"UpdateBanner",formData,{
          headers:{
        "Authorization" : `Bearer ${localStorage.getItem('token')}`

          }}

          // body: JSON.stringify(update),
        );
        

        if (res.data.status == "success") {
          getdata('');
          toast.success("data Updated", {
            autoClose: 1500
          })
        }
      } catch (ex) {
        console.log(ex);
      setLanguage('');

      }

    }

    document.getElementById("demo").innerHTML = "ADD DATA";
  setVisible1(false)

    setId(0)
    setLanguage('');
   
  }

  //new add 
  


  const edithandler = async (id) => {
    setVisible1(true)
    axios.get(env.apiURL+`finddata/${id}`, { 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },

    }).then((result) => {

      setId(id)
      setLanguage(result.data.data.language)
  

    })
  }
 

  function getdata() {
    axios.get(env.apiURL+`finddata`,{
      headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    })
      .then(function (res) {
        console.log(res.data);
        setList(res.data.data); 
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    getdata();
  }, [])

  const deletehandler = async (id) => {
    swal(
      {
        title: "Are you sure Delete Your Data?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(env.apiURL+`DeleteBanner/${id}`,{
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
          })
            .then(res => {
              const users = res.data;
              getdata();
            }
            )
          toast.error("data deleted", {
            autoClose: 1500
          });
        }
      
      });
  }
  return (
    <>


      {/* insert data  */}
      <br /> < br />
      <CModal visible={visible2} onClose={() => setVisible1(false)}>
        <CModalHeader onClick={() => setVisible2(false)}>
          <CModalTitle>Language Form</CModalTitle>
        </CModalHeader>
        <CModalBody>          
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Language</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" value={Language} onChange={(e) => { setLanguage(e.target.value) }} placeholder="Type Your Language" />
            </div>
          </CForm>              
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible2(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={submit} className="btn1" id="demo">Save</CButton>
        </CModalFooter>
      </CModal>

      {/*Table and search  */}


      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CInputGroup className="flex-nowrap">
              <CInputGroupText color='primary' className="btn1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>&nbsp;&nbsp;&nbsp;Search
              </CInputGroupText>
              <CFormInput placeholder="Search"  value={search} onChange={(e) => { setSearch(e.target.value) }} aria-label="Username" aria-describedby="addon-wrapping" />
              <CButton style={{ marginLeft:"650px",borderRadius:"5px"}} className="btn1" onClick={() => openhandler()}>Add Language</CButton>
            </CInputGroup>
            <br></br>

            <CTable style={{ textAlign: "center" }}  hover>
              <CTableHead>
                <CTableRow style={{backgroundImage: 'linear-gradient(to right ,#0F2027,#203A43,#2c5364)'}}>
                  <CTableHeaderCell style={{color:"white"}}>No</CTableHeaderCell>
                  <CTableHeaderCell style={{color:"white"}}>Language</CTableHeaderCell>
                  <CTableHeaderCell style={{color:"white"}}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  list.reverse().map((item, i) => {
                    return (<>
                      <CTableRow key={i} style={{backgroundImage: 'linear-gradient(to right,#16222A,#3A6073)'}}>
                        <CTableDataCell  style={{ paddingTop: "20px",color:"white" }}>{i + 1}</CTableDataCell>
                        <CTableDataCell  style={{ paddingTop: "20px",color:"white" }}>{item.language}</CTableDataCell>
                        <CTableDataCell  style={{ paddingTop: "20px" }}>
                          <CButton color="success"  variant="outline" value="Update" onClick={() => edithandler(item._id)} >
                            <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                          </CButton>

                          &nbsp;&nbsp;&nbsp;&nbsp;

                          <CButton color="danger" variant="outline"  value="delete" onClick={() => deletehandler(item._id)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16"  height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>


                      {/* update model */}
                      {/* <CModal alignment="center" visible={visible1} onClose={() => setVisible1(false)}>
                          <CModalHeader>
                            <CModalTitle>Update Language</CModalTitle>
                          </CModalHeader>
                          <CModalBody>
                            <CForm>
                              <div className="mb-3">
                                <CFormLabel htmlFor="exampleFormControlInput1">Tital</CFormLabel>
                                <CFormInput type="text" value={Language} onChange={(e) => { setLanguage(e.target.value) }}
                                  id="exampleFormControlInput1"
                                  placeholder="Enter your Tital"
                                />
                              </div>
                          </CForm>

                          </CModalBody>
                          <CModalFooter>
                            <CButton color="secondary"  onClick={() => setVisible1(false)}>
                              Close
                            </CButton>
                            <CButton color="primary" onClick={submit} id="demo" className="btn1" type="submit">
                              Update
                            </CButton>
                          </CModalFooter>
                      </CModal> */}


                      <CModal visible={visible1} onClose={() => setVisible2(false)}>
                      <CModalHeader onClick={() => setVisible1(false)}>
                        <CModalTitle>Update Language</CModalTitle>
                      </CModalHeader>
                      <CModalBody>          
                        <CForm>
                        <div className="mb-3">
                                <CFormLabel htmlFor="exampleFormControlInput1">Tital</CFormLabel>
                                <CFormInput type="text" value={Language} onChange={(e) => { setLanguage(e.target.value) }}
                                  id="exampleFormControlInput1"
                                  placeholder="Enter your Tital"
                                />
                         </div>
                        </CForm>              
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible1(false)}>
                          Close
                        </CButton>
                        <CButton color="primary" onClick={submit} className="btn1" id="demo">Update</CButton>
                      </CModalFooter>
                    </CModal>
                      </>
                      )
                  }
                  )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

     

    </>
  )
}
export default Tables;
