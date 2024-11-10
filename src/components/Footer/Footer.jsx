import React from 'react'
// import logo from '../../imgs/logo.png'
import { Link } from 'react-router-dom'
import style from '../Footer/Footer.module.css'
import imgs from '../../footer-pay.png'
import logo from '../../shofy-removebg-preview.png'

export default function Footer() {
  return (
    <section className= {` ${style.footerr}`}>
      {/* <div className={style.container}>
        <div className="row   ">
          <div className="col-md-4 col-lg-3 mt-4 pt-3">
          <img src={logo} className='' alt="" />
          <p className='para mt-3 '>We are a team of designers and developers that create high quality WordPress</p>
          <div className="icons">
          <a href=''><i className="fa-brands fa-facebook-f"></i></a>
           <a href=''><i className="fa-brands fa-twitter"></i></a>
          <a href=''> <i className="fa-brands fa-linkedin-in"></i></a>
          <a href=''> <i className="fa-brands fa-vimeo-v"></i></a>
          </div>
          </div>
          
          <div className="col-md-4 col-lg-3">
          <h4>My Account</h4>
          <ul className={style.list}>
            <li> <Link to='' >Track Orders</Link></li>
            <li> <Link to=''>Shipping</Link></li>
            <li><Link to="">Wishlist</Link></li>
            <li ><Link to="">My Account</Link> </li>
            <li> <Link>Order History</Link></li>
            <li> <Link>Returns</Link></li>
          </ul>
        </div>
        <div className="col-md-4 col-lg-3">
          <h4>Information</h4>
          <ul >
            <li > <Link to=''>Our Story</Link></li>
            <li> <Link to=''>Careers</Link></li>
            <li><Link to="">Privacy Policy</Link></li>
            <li ><Link to="">Terms & Conditions</Link> </li>
            <li> <Link>Latest News</Link></li>
            <li> <Link>Contact Us</Link></li>
          </ul>
        </div>

        <div className={`col-md-4 col-lg-3 ${style.last}`}>
          <h4>Talk To Us</h4>
          <p className='p-0 m-0 mt-3'>Got Questions? Call us</p>
          <a href="tel:+970-569437506">+970-569437506</a><br/>
          <i className="fa-solid fa-envelope-open me-2 my-3 text-white"></i><a href="mailto:shofy@support.com"  >shofy@support.com</a><br/>
          <i className="fa-solid fa-location-dot me-2 text-white"></i><a  href="https://www.google.com/maps/place/Sleepy+Hollow+Rd,+Gouverneur,+NY+13642%D8%8C+%D8%A7%D9%84%D9%88%D9%84%D8%A7%D9%8A%D8%A7%D8%AA+%D8%A7%D9%84%D9%85%D8%AA%D8%AD%D8%AF%D8%A9%E2%80%AD/@44.3304928,-75.453048,17z/data=!3m1!4b1!4m6!3m5!1s0x4cccddac8972c5eb:0x56286024afff537a!8m2!3d44.3304928!4d-75.453048!16s%2Fg%2F1tdsjdj4?entry=ttu">79 Sleepy Hollow St.
          Jamaica, New York 1432 </a>

        </div>
        

        </div>

   
      
      </div> */}
      <div className="footer2  pb-3  ">
        <div className="row ">
          <div className="col-md-9">
            <p className='ms-5 mt-4'>Copyright © 2022. All Rights Reserved By Movflx</p>
          </div>
          <div className="col-md-3 ">
            <img src={imgs} alt="" className='mt-4' />
          </div>
        </div>
      </div>
    </section>
  )
}
