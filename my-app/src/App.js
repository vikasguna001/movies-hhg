import React, { Suspense, useEffect, useState } from 'react'
import Appcontext from './Context'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import './App.css'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login   = React.lazy(() => import('./views/pages/login/Login'))
const Register= React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  const [User_Name, setUser_Name] = useState('')
  const [userId, setUserId] = useState('')
  const [sid, setsid] = useState('')

  function handleLogout() {
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    localStorage.removeItem('sid')
    localStorage.removeItem('token')
    window.location.href = window.location.href
  }

  function handleLoginState() {
    let name = localStorage.getItem('userName')
    let user = localStorage.getItem('userId')
    let sid =  localStorage.getItem('sid')

    if (user) {
      setUser_Name(name)
      setUserId(user)
      setsid(sid)
      // setUserStatus(true)
    } else {
      setUser_Name('')
      setUserId('')
      setsid('')
    }
  }

  useEffect(() => {
    handleLoginState()
  }, [])

  return (
    <BrowserRouter>
      <Appcontext.Provider value={[User_Name, userId, sid,handleLoginState, handleLogout]}>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/" name="Login Page" element={<Login />} />
            <Route path="/register" name="Register Page" element={<Register />} />
            <Route path="/404" name="Page 404" element={<Page404 />} />
            <Route path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </Appcontext.Provider>
    </BrowserRouter>
  )
}

export default App
