import React,{useContext} from 'react'
// import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button} from 'react-bootstrap';
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import { logo } from 'src/assets/brand/logo'
import AppContext from './../Context'
import './style.css'
const AppHeader = () => {

  const [_,__,___,____,handleLogout] = useContext(AppContext)
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <>
     <CHeader position="sticky" className="mb-4">
       <CContainer>
          <CHeaderToggler
           className="ps-1"
           onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
         >
           <CIcon icon={cilMenu} size="lg"   />
         </CHeaderToggler> 
          <CHeaderBrand className="mx-auto d-md-none" to="/">
           <CIcon icon={logo} height={48} alt="Logo" />
         </CHeaderBrand>
        
         
        <CHeaderNav style={{marginLeft:"1100px"}}>
          <CNavItem>
            <CNavLink href="#">
              <Button className="btn1" onClick={handleLogout} type="button" ><b>Logout</b></Button> 
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
        </CHeaderNav>
      </CContainer>
      
    </CHeader> 
    </>
  )
}

export default AppHeader
