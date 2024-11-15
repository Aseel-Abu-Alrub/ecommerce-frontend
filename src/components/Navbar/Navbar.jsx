import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EcommerceContext } from "../../Context/ecommerceContext.jsx";
import logo from "../../shofy-removebg-preview.png";
import user2 from "../../user.png";
import style from "./Navbar.module.css";
import { useCart } from "../../hooks/use-contexts.js";

export default function Navbar({ logout }) {
    let { user } = useContext(EcommerceContext);
    let{getcart,count}=useCart()

  
    useEffect(() => {
        console.log({ user });
       
    }, []);

    return (
        <nav
            className="navbar navbar-expand-lg  bg-body-tertiary "
               style={{
                //  position:"fixed",
                //  width: "100%",
                 zIndex: "1000",
                top:0,
                boxShadow: "0 0 10px 0px gray",
            }}
        > 
            <div className="container-fluid">
                <Link className="navbar-brand" to="">
                    <img src={logo} alt="logo" className="w-75" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto">
                        <li className={`${style.navItem} nav-item`}>
                            <Link
                                className={`${style.navLink} nav-link active first mx-3`}
                                aria-current="page"
                                to=""
                            >
                                Home
                            </Link>
                        </li>
                        <li className={`${style.navItem} nav-item`}>
                            <Link className={` nav-link mx-3 `} aria-current="page" to="product">
                                Product
                            </Link>
                        </li>
                        <li className={`${style.navItem} nav-item`}>
                            <Link className={`nav-link mx-3`} aria-current="page" to="about">
                                About
                            </Link>
                        </li>
                        <li className={`${style.navItem} nav-item`}>
                            <Link className={`nav-link mx-3`} aria-current="page" to="contact">
                                Contact
                            </Link>
                        </li>
                    </ul>
                    {user ? 
                        <>
                            <ul className="navbar-nav ms-auto d-flex justify-content-center align-items-center">
                                <li className="nav-item  ">
                                    <i className="fa-regular fa-heart fs-5 me-4"></i>
                                    <Link to="cart" className={style.cart}>
                                        <i className={`fa-solid fa-cart-shopping me-4 fs-5  `}>{count? <span className='text-white py-1 ' style={{backgroundColor:'red',fontSize:'9px',position:'absolute',top:'-15px',left:'14px',borderRadius:'50%',width:'18px',height:'18px',textAlign:'center'}} >{count}</span>:''}</i>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <div className="dropdown ">
                                        <button
                                            className={`btn btn-secondary  border-0  bg-light`}
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <div className="d-flex  header  ">
                                                <img
                                                    src={user2}
                                                    className="me-4 "
                                                    alt="user"
                                                    style={{ width: "35px", height: "35px" }}
                                                />
                                                <span className={style.activee}></span>
                                            </div>
                                        </button>
                                        <ul
                                            className="dropdown-menu  "
                                            style={{ marginLeft: "-110px" }}
                                        >
                                            <li>
                                                <div className="dropdown-item">
                                                    {" "}
                                                    <h6 className="  mt-2 mb-1  position-relative">
                                                        {user ? user.userName : ""}
                                                    </h6>
                                                </div>
                                            </li>
                                            <li>
                                              <a classname="dropdown-item">
                                                Profile
                                                 </a>

                                            </li>

                                            <li>
                                                <a className="dropdown-item">
                                                    {" "}
                                                    <p className="btn p-0 my-3 " onClick={logout}>
                                                        Logout{" "}
                                                    </p>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </>
                    : 
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="register">
                                    Signup
                                </Link>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    );
}
