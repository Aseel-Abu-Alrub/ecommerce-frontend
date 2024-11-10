import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import { EcommerceContext } from '../../Context/ecommerceContext.jsx'
import { useCart } from '../../hooks/use-contexts.js'

export default function Layout() {
  const{count}=useCart()
  let{setUser}=useContext(EcommerceContext)
  let navigate=useNavigate()

function logout(){
localStorage.removeItem("userToken")
 setUser(null)
navigate('/login')
}

  return (
    <>
      <Navbar logout={logout} />
      <Outlet />
     <Footer/>
    </>

  )
}
