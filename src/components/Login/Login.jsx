import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginShema } from "../Schema/LoginShema.js";
import axios from "axios";
import { toast } from "react-toastify";
import { EcommerceContext } from "../../Context/ecommerceContext.jsx";
import "./Login.css";
import { ApiContext } from "../../Context/ApiContext.jsx";
import { useLoading } from "../../hooks/use-contexts.js";


export default function Login() {
    let navigate = useNavigate();
    let { saveUserData } = useContext(EcommerceContext);
    let [statusError, setStatusError] = useState("");
    const {changeLoading} = useContext(ApiContext)
    const{loading}=useLoading()


    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginShema,
        onSubmit: sendLoginData,
    });

    async function sendLoginData(values) {
        try {
             
            changeLoading('login',true)
            const {data}=await axios.post("https://ecommerce-backend-olpp.onrender.com/auth/signin", values);
            console.log(data)

            if (data.message == "success") {
                 console.log(data)
                setStatusError("");
                localStorage.setItem("userToken", data.token);
                saveUserData();
                navigate("/Home");
            } else {
                // console.log(data)
                toast.error("somthing error");
            }
        } catch (err) {
            console.log(err.response.data.message);
            setStatusError(err.response.data.message);
        }
        finally{
         changeLoading('login',false)   
        }
    }
    return (
        <div className="container mt-5">
            <div className="forms-container " >
                <div className="form-control signin-form mt-5">
                    <form  onSubmit={handleSubmit}>
                        <h2>Signin</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                            <p className="m-0 p-0  text-danger me-auto">{errors.email}</p>
                        ) : (
                            ""
                        )}

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? (
                            <p className="m-0 p-0  text-danger">{errors.password}</p>
                        ) : statusError ? (
                            <span className="text-danger me-auto">{statusError}</span>
                        ) : (
                            ""
                        )}

                        <div className="d-flex align-items-center mt-4 justify-content-around">
                            <input type="checkbox" name="" id="" className="me-2" />
                            <p className="p-0 m-0 me-5 pe-5">Remember me</p>
                            <Link to="" className="forget me-auto">
                                Forget password?
                            </Link>
                        </div>
                        <button type="submit">
                            {loading.login?
                            (
                                <div className="spinner-border text-center ms-4 text-light "style={{fontSize:'15px',height:'20px',width:'20px'}}  role="status">
                                <span className="sr-only" style={{fontSize:'1px'}}>...</span>
                             </div>
                             

                            )
                            : (
                                <p>Signin</p>
                            )
                            
                        }
                            
                            </button>
                    </form>
                    {/* <span>or signin with</span>
        <div className="socials">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-google-plus-g"></i>
          <i className="fab fa-linkedin-in"></i>
        </div> */}
                </div>
            </div>
            <div className="intros-container">
                <div className="intro-control signin-intro">
                    <div className="intro-control__inner">
                        <h2>Welcome back!</h2>
                        <p className="mb-5">
                            Welcome back! We are so happy to have you here. It's great to see you
                            again. We hope you had a safe and enjoyable time away.
                        </p>
                        <Link to="/register" id="signup-btn">
                            No account yet? Signup.
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
