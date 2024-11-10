import React, { useContext,useState } from 'react'
import header from '../../header.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { EcommerceContext } from '../../Context/ecommerceContext.jsx';
import { useEffect } from 'react';
import style from './Home.module.css'
import { Link, useParams } from 'react-router-dom';
import { useCart, useLoading } from '../../hooks/use-contexts.js';
import Loading from '../Loading/Loading.jsx';

export default function Home() {
const{getCategories,getSpecificCategory}=useContext(EcommerceContext)
let[categories,setCategories]=useState([])
let{getcart}=useCart()
let{loading}=useLoading()

let{id}=useParams()
    let settings = {
      dots: true,
      infinite: true,
      speed:500,
      slidesToShow:4,
      slidesToScroll:1,
      autoplay: true,
       
    }

    async function getCategoriesFun(){
     
      let res=await getCategories()
       setCategories(res.category)
    
        await getcart()

       
      console.log(res)

    }
    // async function getSpecificCategoryFun(){
    // let res=await getSpecificCategory(id)
    
    // }
useEffect(()=>{
      getCategoriesFun() 
      
},[])

    if(loading.category){
      return <Loading/>
    }
  return (
    <section>
    <div className="background">
     <img src={header} alt="" className='w-100' />
    </div>
     <div className="slickk container-fluid ms-5 mt-5">
     <h2 className='my-4'>Category</h2>
     <Slider {...settings}>
      {categories.map((cat)=>{
        return <div className={style.category}>
               <Link className={`${style.linkk} text-dark`} to={`/categories/${cat._id}`}>
                <div className={style.image}>
                <img src={cat.image.secure_url} className=" img-fluid" style={{width:"250px",height:"250px"}}  alt="" />

                </div>
                <p className='mt-3' style={{fontSize:"20px",textTransform:"capitalize"}}>{cat.name}</p>
               </Link>
              </div>
      })} 
      
    </Slider>
     </div>

    </section>
  )
}
