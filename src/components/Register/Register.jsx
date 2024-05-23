import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerSchema } from '../Schema/RegisterSchema.js'
import'../Register/Register.css'

export default function Register() {
    let navigate=useNavigate()
    let[error,setError]=useState([])
    let[statusError,setStatusError]=useState('')
    const {values,errors,handleChange,handleSubmit,touched,handleBlur}=useFormik({
      initialValues:{
       userName:'',
       email:'',
       password:'',
      cPassword:''  
      },onSubmit:sendRegisterData,
      validationSchema:registerSchema
    })

    async function sendRegisterData(values){
     try{
      let{data}=await axios.post("https://car-rental-zvty.onrender.com/auth/signup",values)
     
     if(data.message=='success'){
      toast.success("confirm your Email!")
      navigate('/login') 
      setError([]) 
     
     }
     
    
     }
     catch(err){
     
      if(err.response.data.message=='email already exists'){
        setStatusError(err.response.data.message)
      }
      else
      setError(err.response.data.validationError)

      
      // console.log(statusError)
    //  setError(err.response.data. validationError)
    //toast.error(err.response.data.message)

     } 
     
  

    }
   

  return (
    <div class="container mt-5">
  <div class="forms-container ">
    <div class={`${errors.userName &&errors.password?' form-control signup-form':'form-control signup-form'}` }>
      <form action="#" onSubmit={handleSubmit}>
        <h2 className='mt-5 pt-5'>Signup</h2>
        <input type="text" placeholder="UserName"  value={values.userName} name='userName' onChange={handleChange} onBlur={handleBlur} className={errors.userName&&touched.userName?'is-invalid ':'is-valid'}/>
        {errors.userName&&touched.userName?<p className='m-0 p-0  text-danger'>{errors.userName}</p>:''}
        <input type="email" placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur} name='email'  />
        {errors.email&&touched.email?<p className='m-0 p-0  text-danger'>{errors.email}</p>:statusError?<span className='text-danger'>{statusError}</span>:''}

        <input type="password"  placeholder="Password"  value={values.password} name='password' onChange={handleChange} onBlur={handleBlur} />
        {errors.password&&touched.password?<p className='m-0 p-0  text-danger'>{errors.password}</p>:''}

        <input type="password" placeholder="Confirm password"  value={values.cPassword} name='cPassword' onChange={handleChange} onBlur={handleBlur} />
        {errors.cPassword&&touched.cPassword?<p className='m-0 p-0  text-danger'>{errors.cPassword}</p>:''}
        <div className="d-flex align-items-center justify-content-center terms my-3 ms-0">
        <input type="checkbox" name="" id="" className='me-2' />
        <p className='p-0 m-0'>I accept all <span className='text-primary'>terms</span> & <span className='text-primary'>conditions</span></p>
        </div>
       
        <button type='submit' className=''>Signup</button>
      </form>
      {/* <span>or signup with</span>
      <div class="socials">
        <i class="fab fa-facebook-f"></i>
        <i class="fab fa-google-plus-g"></i>
        <i class="fab fa-linkedin-in"></i>
      </div> */}
    </div>
   
  </div>
  
  <div class="intros-container">
   
    <div class="intro-control signup-intro">
      <div class="intro-control__inner">
        <h2>Come join us!</h2>
        <p className='mb-5'>
          We are so excited to have you here.If you haven't already, create an account to get access to exclusive offers, rewards, and discounts.
        </p>
        <Link to="/login" id="signin-btn">Already have an account? Signin.</Link>
      </div>
    </div>
  </div>
</div>
//       <div className='w-50  m-auto mt-5 mb-5'>
//     <h2 className='mb-5'>Signup</h2>
//   <form  onSubmit={handleSubmit}>
//      <div className="mb-3">
    
//     <label htmlFor="exampleInputName" className="form-label">userName </label>
//     <input type="text" className={errors.userName && touched.userName? "is-invalid form-control":!errors.userName&& touched.userName?"form-control is-valid":"form-control"} id="exampleInputName" name="userName" value={values.userName} onChange={handleChange} onBlur={handleBlur}/>
//     {errors.userName && touched.userName?<p className='text-danger valid'>{errors.userName}</p>:''}
//   </div>
//   <div className="mb-3">

//     <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
//     <input type="email" className={errors.email && touched.email? "is-invalid form-control":!errors.email&& touched.email?"form-control is-valid":"form-control"} id="exampleInputEmail1" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
//     {errors.email && touched.email?<p className='text-danger valid'>{errors.email}</p>:statusError?<span className='text-danger'>{statusError}</span>:''}


//   </div>
//   <div className="mb-3">
   
//     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//     <input type="password" className={errors.password && touched.password? "is-invalid form-control":!errors.password&& touched.password?"form-control is-valid":"form-control"} name='password' value={values.password} onChange={handleChange} id="exampleInputPassword1" />
//     {errors.password && touched.password?<p className='text-danger valid'>{errors.password}</p>:''}

//   </div>
// <div className="mb-3">
//     <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
//     <input type="password" className={errors.cPassword && touched.cPassword? "is-invalid form-control":!errors.cPassword&& touched.cPassword?"form-control is-valid":"form-control"} name='cPassword' value={values.cPassword} onChange={handleChange} id="exampleInputPassword2" />
//     {errors.cPassword && touched.cPassword?<p className='text-danger valid'>{errors.cPassword}</p>:''}

//   </div>
//   <button type='submit' className="btn btn-outline-primary">SignUp</button>
// </form>


//     </div>
  )
}
