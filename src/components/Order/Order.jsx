import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useCart, useEcommerce } from '../../hooks/use-contexts.js'

export default function Order({total}) {
    const[error,setError]=useState('')
    const{count}=useCart()
    const{order}=useEcommerce()
    const[orderr,setOrder]=useState('')
   const token=localStorage.getItem("userToken")


    const{values,errors,handleChange,handleSubmit}=useFormik({
        initialValues:{
         copounName:"",
         address:"",
         phone:"",
     
        },
        onSubmit:sendOrderData
        })
   
      
   async function sendOrderData(values){
     try{
     const {data}=await axios.post('https://ecommerce-backend-olpp.onrender.com/order',values,{headers:{Authorization:`Aseel__${token}`}})
     console.log(data)
     if(data.message=='success'){
      setError('') 
     }
     
     }
     catch(err){
       console.log(err)
       setError(err.response.data.message)
     }
   
   }

async function orderFun(){
  const res=await order()
  setOrder(res.order)
  console.log(res.order)
}

useEffect(()=>{
  orderFun()  
},[])


  return (
    <div className="title border  " style={{width:'100%'}}>
    <h5 className="text-center mt-4">order summary</h5>
    <hr className="w-75 ms-5  text-dark" />
    <div className="d-flex justify-content-between">
    <p className="ms-3 text-secondary">Subtotal ({count} items)</p>
    <span className="me-3">${total.toFixed(2)}</span>
    </div>

    <hr className=" mx-3" /> 
    {/* <span>{total.toFixed(2)}</span> */}
     <p className='ms-3'>Shipping Address</p>
    <form onSubmit={handleSubmit} className="mx-3 mt-4">
      <div className="address">
      <label htmlFor="" className="form-label"> Address <span className="text-danger">*</span></label>
      <input type="text" name="address" id="" className="form-control " value={values.address} onChange={handleChange} />
      </div>

      <div className="phone mt-3">
      <label htmlFor="" className="form-label"> Phone Number <span className="text-danger">*</span></label>
      <input type="text" name="phone" id="" className="form-control " value={values.phone} onChange={handleChange} />
      </div>
      <hr className=" mx-2 mt-4" />

      <div className="mt-4 coupon ">
      <label htmlFor="" className="form-label">Coupon Code <span className="text-secondary">(Optional)</span></label>
      <p className='text-secondary'>Coupon code will be applied on the checkout page</p>
      <div className="d-flex">
      <input type="text" name="copounName" id="" className="form-control w-50" value={values.copounName} placeholder="XXXXXXXX" onChange={handleChange} />
      <button type="submit" className="btn p-0 ms-3  mt-1" style={{color:'#17696A'}}>Check Coupon</button>
        </div>
       <p  className="text-danger mt-2 text-capitalize">{error}</p>
      </div>
       <div className="d-flex justify-content-between mt-4">
       <p>Total</p>
       <span className='me-3'>${orderr.finalPrice?orderr.finalPrice:'0.00'}</span>
       </div>
      <button type="submit" className="btn text-white w-75 ms-5  mt-4" style={{backgroundColor:'#17696A'}}>CHECKOUT</button>
      <button type="submit" className="btn border mb-4 w-75 ms-5  mt-4" >CONTINUE SHOPPING</button>

    </form>
    
 
    </div>
  )
}
