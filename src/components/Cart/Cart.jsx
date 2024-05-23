import React, { useContext, useEffect } from 'react'
import { CartContext } from '../Context/cartContext.jsx'

export default function Cart() {
  const{getcart}=useContext(CartContext)

  async function getCartFun(){
    let res=await getcart()
    console.log(res)
  }

useEffect(()=>{
  getCartFun()
},[])

  return (
    <div className='d-flex bg-light'>Cart</div>
  )
}
