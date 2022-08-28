import React, { useState, useEffect } from 'react'
import {
  CCol,
  CForm,
  CCard,
  CCardTitle,
  CCardBody,
  CFormLabel,
  CFormTextarea,
  CFormInput,
  CRow,
  CButton,
} from '@coreui/react'
import { env } from 'src/environment'
import axios from 'axios'
// import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Ratio } from 'react-bootstrap'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Category from '../Categories/Categoires'
import Pdf from '../Pdf/Pdf'
import { Link } from 'react-router-dom'
// import { func } from 'prop-types';
import { useNavigate } from 'react-router-dom'

toast.configure()
function Contract() {
  const [Movie_Name, setMovie_Name] = useState('')
  const [Provider_Name, setProvider_Name] = useState('')
  const [Provider_Phone, setProvider_Phone] = useState('')
  const [Period, setPeriod] = useState('')
  const [Provider_Ratio, setProviderRatio] = useState('')
  const [Paltform_Ratio, setPaltform_Ratio] = useState('')
  const [Fee, setFee] = useState('')
  const [Payment_Charge, setPayment_Charge] = useState('')
  const [Company_Name, setCompany_Name] = useState('')
  const [Adress, setAdress] = useState('')
  const [CIN, setCIN] = useState('')
  const [Director_Name, setDirector_Name] = useState('')
  const [DIN, setDIN] = useState('')

  const navigate = useNavigate()

  //Provider_Ratio
  const Ratio = (e) => {
    if (100 - parseInt(e.target.value) < 0) return false

    setProviderRatio(e.target.value)
    var Paltform = 100 - parseInt(e.target.value)
    setPaltform_Ratio(isNaN(Paltform) ? 0 : Paltform)
  }

  //phone number validation
  const checkInput = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '')
    setProvider_Phone(onlyDigits)
  }

  //Submit data
  const Submit = async () => {
    if (
      !Movie_Name ||
      !Provider_Name ||
      !Provider_Phone ||
      !Period ||
      !Provider_Ratio ||
      !Paltform_Ratio ||
      !Fee ||
      !Payment_Charge ||
      !Company_Name ||
      !Adress ||
      !CIN ||
      !Director_Name ||
      !DIN
    ) {
      toast.warning('Please Enter Data', {
        autoClose: 2000,
      })
      return
    } else {
      setMovie_Name('')
      setProvider_Name('')
      setProvider_Phone('')
      setPeriod('')
      setProviderRatio('')
      setPaltform_Ratio('')
      setFee('')
      setPayment_Charge('')
      setCompany_Name('')
      setAdress('')
      setCIN('')
      setDirector_Name('')
      setDIN('')
      // <Pdf/>
      navigate('/base/Pdf')
    }

    const formData = new FormData()
    formData.append('Movie_Name', Movie_Name)
    formData.append('Provider_Name', Provider_Name)
    formData.append('Provider_Phone', Provider_Phone)
    formData.append('Period', Period)
    formData.append('Provider_Ratio', Provider_Ratio)
    formData.append('Paltform_Ratio', Paltform_Ratio)
    formData.append('Fee', Fee)
    formData.append('Payment_Charge', Payment_Charge)
    formData.append('Company_Name', Company_Name)
    formData.append('Adress', Adress)
    formData.append('CIN', CIN)
    formData.append('Director_Name', Director_Name)
    formData.append('DIN', DIN)

      await axios.post(env.apiURL + 'Contract',formData,
      {
        headers:{
        "Authorization" : `Bearer ${localStorage.getItem('token')}`,
        "User_Id": localStorage.getItem('userId')
      }}
        
        // toast.success('data inserted', {
        //  autoClose: 2000,}
        
        // )
      )

  }

  return (
    <div>
      <CCard className="mb-4">
        <CCardBody>
          <CCardTitle>
            <b>Add Contract</b>
          </CCardTitle>
          <hr />
          <CForm>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>Title Form</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" readOnly placeholder="Master Content Streaming Agreement" />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>Content (Movie) Name</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  placeholder="Enter Content (Movie) Name"
                  value={Movie_Name}
                  onChange={(e) => {
                    setMovie_Name(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>Application URL</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" readOnly placeholder="https://client-hhg.netlify.app/" />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>Content Provider Name</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  placeholder="Content Provider Name"
                  value={Provider_Name}
                  onChange={(e) => {
                    setProvider_Name(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>Content Provider Phone</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="tel"
                  maxLength="10"
                  placeholder="Content Provider Phone"
                  value={Provider_Phone}
                  onChange={(e) => checkInput(e)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6> Platform Email</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" readOnly placeholder="hhgsoftechteam10@gmail.com" />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>Platform Phone</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" readOnly placeholder="+91 73500****" />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>Period (In Months)</h6>
              </CFormLabel>
              <CCol sm={4}>
                <CFormInput
                  type="number"
                  placeholder="Period (In Months)"
                  value={Period}
                  onChange={(e) => {
                    setPeriod(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>Content Provider Ratio</h6>
              </CFormLabel>
              <CCol sm={4}>
                <CFormInput type="number" value={Provider_Ratio} onChange={Ratio} id="num" />
              </CCol>
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>Paltform Ratio</h6>
              </CFormLabel>
              <CCol sm={4}>
                <CFormInput type="text" readOnly value={Paltform_Ratio} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>Viewer Ship Fee in ($)</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="number"
                  defaultValue="1"
                  value={Fee}
                  onChange={(e) => {
                    setFee(e.target.value)
                  }}
                />
                <p>( The user for one time viewership of content. )</p>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>Payment Gateway Charges(in %)</h6>
              </CFormLabel>
              <CCol sm={4}>
                <CFormInput
                  type="number"
                  defaultValue="6"
                  value={Payment_Charge}
                  onChange={(e) => {
                    setPayment_Charge(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <hr />

            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>Company Name</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  placeholder="Enter Company Name"
                  value={Company_Name}
                  onChange={(e) => {
                    setCompany_Name(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6> Address</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormTextarea
                  type="textarea"
                  placeholder="Enter Address"
                  value={Adress}
                  onChange={(e) => {
                    setAdress(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>CIN</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  placeholder="Enter CIN"
                  value={CIN}
                  onChange={(e) => {
                    setCIN(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>Director Name</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  placeholder="Enter Director Name"
                  value={Director_Name}
                  onChange={(e) => {
                    setDirector_Name(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>DIN</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  placeholder="Enter DIN"
                  value={DIN}
                  onChange={(e) => {
                    setDIN(e.target.value)
                  }}
                />
              </CCol>
            </CRow>

            <hr />
            <CCardTitle>
              <b>Contract With Client</b>
            </CCardTitle>
            <hr />

            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6>Company Name</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" readOnly placeholder="HHG Softech Private Limited" />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6> Address</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormTextarea type="textarea" readOnly placeholder="Surat Gujarat" />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                <h6> Director Name</h6>
              </CFormLabel>
              <CCol sm={10}>
                <CFormTextarea type="textarea" readOnly placeholder="HHG" />
              </CCol>
            </CRow>

           <hr/>
            <CButton
              onClick={Submit}
              style={{
                backgroundImage: 'linear-gradient(360deg,#16222A,#3A6073)',
                marginLeft: '1150px',
              }}
            >
              Submit
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Contract
