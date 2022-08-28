import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import React, { useEffect, useState, useContext } from 'react'

import AppContext from './../../../Context'
import { useNavigate, Link } from 'react-router-dom'

import { env } from '../../../environment'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [User_Name, setUser_Name] = useState('')
  const [Password, setPassword] = useState('')
  const [_, userId, sid, handleLoginState] = useContext(AppContext)

  localStorage.removeItem('user-info')

  const submit = async (e) => {
    e.preventDefault()
    console.log('User_Name,Password', User_Name, Password)
    await axios.post(env.apiURL + 'Mlogin', { User_Name, Password }).then((res) => {
      if (res) {
        localStorage.setItem('sid', res.data.User.sid)
        localStorage.setItem('userId', res.data.User._id)
        localStorage.setItem('token', res.data.auth)
        // localStorage.setItem('userName', res.data.User.User_Name)

        window.location.href = window.location.href
      } else {
        alert('Not valid')
      }
    })
    setUser_Name('')
    setPassword('')
  }

  useEffect(() => {
    if (userId) {
      navigate('/base/View_Video')
    }
  }, [])

  // const data = useContext(Appcontext)
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    {/* <p>{data}</p> */}
                    <br />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={User_Name}
                        onChange={(e) => {
                          setUser_Name(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={Password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          onClick={submit}
                          className="px-4"
                          style={{ backgroundImage: 'linear-gradient(360deg,#16222A,#3A6073)' }}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
