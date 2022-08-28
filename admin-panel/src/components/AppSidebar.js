import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import '../'
import nav from 'src/Nav'
// sidebar nav config
// import Nav from '../_nav'



const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/" style={{backgroundImage:"linear-gradient(to right,#16222A,#3A6073)"}}>
        <img className="sidebar-brand-full" src="https://hhgsoftech.com/assets/images/logo/hhg-logo.svg" height={35}/>
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav style={{backgroundImage:"linear-gradient(to right,#16222A,#3A6073)"}}>
        <SimpleBar className="hello">
          <AppSidebarNav items={nav}  />
          {/* <AppSidebarNav element={<Nav />} /> */}
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
