import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { env } from '../../environment'
import { CCard, CCardBody, CButton, CCardTitle } from '@coreui/react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

toast.configure()
export default function Pdf() {
  const [list, setList] = useState([])
  // const [Contract_pdf, setContract_pdf] = useState('')
  const navigate = useNavigate()

  function getdata() {
    axios
      .get(env.apiURL + `Contract_find_data`)
      .then(function (res) {
        console.log(res.data.data)
        setList(res.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  //Submit data
  const Approval = async (id) => {
    var Status = '0'
    const formData = new FormData()
    formData.append('Id', id)
    formData.append('Status', Status)

    try {
      await axios.post(env.apiURL + 'Contract_update_data', formData)
    } catch (ex) {
      console.log(ex)
    }
  }
  
  const Reject = async (id) => {
    var Status = '3'
    const formData = new FormData()
    formData.append('Id', id)
    formData.append('Status', Status)

    try {
      await axios.post(env.apiURL + 'Contract_update_data', formData)
    } catch (ex) {
      console.log(ex)
    }
    navigate('/base/Contract')
  }

  useEffect(() => {
    getdata()
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CCardTitle>
            <h3>Contact Details</h3>
          </CCardTitle>
          <hr />
          {list.map((item, i) => {
            return (
              <>
                <iframe
                  key={i}
                  src={env.apiURL + `${item.Contract_pdf}`}
                  width="100%"
                  height="800px"
                ></iframe>
                <hr></hr>
                <CButton
                  onClick={() => Reject(item._id)}
                  style={{
                    backgroundImage: 'linear-gradient(360deg,#16222A,#3A6073)',
                    marginLeft: '1000px',
                  }}
                >
                  Reject
                </CButton>
                <CButton
                  onClick={() => Approval(item._id)}
                  style={{
                    backgroundImage: 'linear-gradient(360deg,#16222A,#3A6073)',
                    marginLeft: '1100px',
                    marginTop: '-65px',
                  }}
                >
                  Approval
                </CButton>
              </>
            )
          })}
        </CCardBody>
      </CCard>
    </>
  )
}
