import React, { Suspense, useContext, useEffect } from 'react'
import {  Route, Routes, useNavigate } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import Auth from './../Auth'
import Guest from './../Guest'

// routes config
import routes from '../routes'
import Login from 'src/views/pages/login/Login'
import AppContext from './../Context'

const AppContent = () => {

  const [_,userId] = useContext(AppContext);
  let navigate = useNavigate();

  useEffect(() => {
    if(!userId) navigate("/");
  },[])

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {

            if(userId){
               return <Route key={idx} path={route.path} exact={route.exact} name={route.name} element={<route.element />} />
            }
          })}
          {/* <Route path="/" element={() => <Login/>} /> */}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
