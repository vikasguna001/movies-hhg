import React, { useState, useEffect } from 'react'
import { env } from '../../environment'
import { Link } from 'react-router-dom'
// import Data from './Data'


import {
  CCard,
  CCardBody,
  CTableDataCell,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,

  CButton,
} from '@coreui/react'
const axios = require('axios')
function View_Contract () {
  const [list, setList] = useState([])
  const [Visible , setVisible] = useState()

// setVisible(false)
// document.getElementById('hello').style.display = "none"

  function Action(contract){
    console.log(contract) 
    // alert("hy");

setVisible(true)

// document.getElementById('myModal').style.display = "none"




  }
  // const [list, setList] = useState([])
  function getdata() {
    axios
      .get(env.apiURL + `getjoindata`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(function (res) {
        // console.log(res.data.data)
        setList(res.data.data)
      })
      .catch(function (error) {
        // console.log(error)
      })
  }
    
  useEffect(() => {
    getdata()
  }, [])

  return (
    <>
    
      <br />
      <CCol xs={12} id="table2">
        <CCard className="mb-4">
          <CCardBody>
            <CTable style={{ textAlign: 'center' }} hover>
              <CTableHead>
                <CTableRow style={{ backgroundImage: 'linear-gradient(to right,#16222A,#3A6073)' }}>
                  <CTableHeaderCell style={{ color: 'white' }}>ID</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Username </CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Email Id </CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Mobile</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Total Videos</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Total </CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>Status</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: 'white' }}>
                    Action & Contract Action
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {list.map((item, i) => {
                  return (
                    <>
                      <CTableRow 
                        key={i}
                        style={{ backgroundImage: 'linear-gradient(to right,#16222A,#3A6073)' }}
                      >
                        <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                          {' '}
                          {i + 1}{' '}
                        </CTableDataCell>
                        <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                          {' '}
                          {item.User_Name}{' '}
                        </CTableDataCell>
                        <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                          {' '}
                          {item.Email}{' '}
                        </CTableDataCell>
                        <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                          {' '}
                          {item.Mobile_no}{' '}
                        </CTableDataCell>
                        <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                          {' '}
                          {item.videos.length}{' '}
                        </CTableDataCell>
                        <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                          {' '}
                          {/* {item.contract.length}{' '} */}
                        </CTableDataCell>
                        <CTableDataCell style={{ paddingTop: '30px', color: '#FFF' }}>
                          {' '}
                          {/* {item.contract.length}{' '} */}
                        </CTableDataCell>
                        <CTableDataCell style={{ paddingTop: '20px', color: '#FFF' }}>
                            <CButton onClick={Action} style={{backgroundColor:"white",color:"black"}} className="btn btn-primary position-relative">
                            Action Contract
                            <div className="text-center">
                            </div>
                            
                              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                              {item.contract.length}
                                <span className="visually-hidden">unread messages</span>
                              </span>
                            

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

export default View_Contract
