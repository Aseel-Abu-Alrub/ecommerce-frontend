import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "./ProductDetails.css";
import Rating from "react-rating";
import {format} from 'date-fns'
import dateFormat from "dateformat";
import { useCart, useEcommerce, useLoading } from "../../hooks/use-contexts.js";
import { confirm } from "react-confirm-box";
import Loading from "../Loading/Loading.jsx";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import axios from "axios";


export default function ProductDetails() {
    const { getProductDetails, ratingProduct,updateColor,updateSize,user,review } = useEcommerce();
    const { addToCart,count,setCount,getcart } = useCart();
    const { loading } = useLoading();
    const [product, setProduct] = useState({});
    const[quantity,setQuantity]=useState(0)
    const[size,setSize]=useState('')
    const[color,setColor]=useState('')
    const[error,setError]=useState('')
    const[reviews,setReviews]=useState([])
    let[inc,setInc]=useState(1)
    let { id } = useParams();
    
    const token=localStorage.getItem("userToken")

    let colors = [ 
           '#a8d1d1','#ffcbcb','#fd8a8a','#57838d','#c29ba3','#50b4d8'
           ,'#c05780','#53051d'
    ]; 
      
    // selecting random color 
    const random_color = colors[(Math.floor(  Math.random() * colors.length))]; 
      


    async function getProductDetailsFun() {
        let res = await getProductDetails(id);
        setProduct(res.newProduct);
        await getcart()
    }

    const images = [
        {
            original: `${product.mainImage ? product.mainImage.secure_url : ""}`,
            thumbnail: `${product.subImages ? product.subImages[0].secure_url : ""}`,
        },
        {
            original: `${product.subImages ? product.subImages[1].secure_url : ""}`,
            thumbnail: `${product.subImages ? product.subImages[1].secure_url : ""}`,
        },
        {
            original: `${product.subImages ? product.subImages[2].secure_url : ""}`,
            thumbnail: `${product.subImages ? product.subImages[2].secure_url : ""}`,
        },
        {
            original: `${product.subImages ? product.subImages[3].secure_url : ""}`,
            thumbnail: `${product.subImages ? product.subImages[3].secure_url : ""}`,
        },
    ];

    async function ratingProductFun(Pid) {
        await ratingProduct(Pid);
    }

    async function addToCartFun(productId,quantityy){
     
    if(!size){
        toast.warning("please select size")
        return
        }        
       const res=await addToCart(productId,quantityy)
       console.log(res)
       setCount(res.cart?.products.length) 
       console.log(size) 
      
    }
   
  function handleIncreament(e){
    e.preventDefault()
    if(quantity<15)
    setQuantity(prevCount=>prevCount+1)
  }

  function handleDecreament(e){
    e.preventDefault()
    if(quantity>1){
        setQuantity(prevCount=>prevCount-1)

    }
  }

  async function updateColorFun(productId,Color){
    let res=await updateColor(productId,Color)
    setColor(res.product.Color);
    console.log(res.product.Color)

    console.log(res)
  }
  async function updateSizeFun(productId,Size){
    let res=await updateSize(productId,Size)
    console.log(res)
    setSize(res.product.Size)
  }

  async function reviewFun(){
    let res=await review(id)
    setReviews(res.review) 
    console.log(reviews)
  }
  
let {values,handleChange,handleSubmit}=useFormik({
initialValues:{
  comment:'',
  rating:inc


},onSubmit:addReview
})

async function addReview(values){
try{
const{data}=await axios.post(`https://ecommerce-backend-olpp.onrender.com/review/${id}`,values,
    {headers:{Authorization:`Aseel__${token}`}}
    
)
toast.success("review added successfuly")
reviewFun(id)
values.rating=setInc(1)
values.comment=''
// console.log(data)  
}
catch(err){
    console.log(err.response.data.message)
    setError(err.response.data.message)
    toast.error(err.response.data.message || "Something went wrong");
  
}

}


    useEffect(() => {
        getProductDetailsFun();
        reviewFun()

    }, []);

    if(loading.details){
       return <Loading/> 
    }
    return (
        <div className=" d-flex bg-white " style={{ position: "" }}>
            <div className="row mt-5 ms-4">
                <div className="col-md-6 px-5">
                    <div className="title mt-5 pt-5  ">
                        <ImageGallery
                            items={images}
                            thumbnailPosition="left"
                            infinite="false"
                            disableThumbnailScroll="true"
                        />
                        ;
                    </div>
                </div>


                <div className="col-md-6 mt-5 pt-5 ">
                    <h2 className="">{product.name}</h2>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="text-danger mt-5 fs-5 fw-bold ">
                            ${product.finalPrice?.toFixed(2)}
                            {product.discount ? (
                                <del className="text-dark fs-6 ms-2">
                                    ${product.discount ? product.price.toFixed(2) : ""}
                                </del>
                            ) : (
                                ""
                            )}{" "}
                            {product.discount ? (
                                <span
                                    className="ms-5 text-white fs-6  px-3"
                                    style={{ backgroundColor: "red" }}
                                >
                                    %{product.discount}
                                </span>
                            ) : (
                                ""
                            )}{" "}
                        </p>
                        <Rating
                            star={5}
                            emptySymbol={
                                <i className="fa-regular fa-star " style={{ color: "#FACF19" }}></i>
                            }
                            fullSymbol={
                                <i className="fa-solid fa-star" style={{ color: "#FACF19" }}></i>
                            }
                            name="simple-controlled"
                            initialRating={product.rating}
                            style={{ marginTop: "40px", marginRight: "100px" }}
                            stop={5}
                            // onChange={()=>{ratingProductFun(productt._id)}}
                            onClick={() => {
                                ratingProductFun(product._id);
                            }}
                        />
                    </div>
                   
                    <p className="mb-3 fs-5 fw-bold">color: <span className="text-capitalize ms-1">{color?color:product.mainColor?product.mainColor:product.Color}</span></p>
                    <nav className="clrr nav nav-pills mb-3" id="pills-tab" role="tablist">

                    <p className="nav-item d-flex mt-4" role="presentation">

                    {product.colors
                        ? product.colors.map((clr, index) => {
                              return (
                                  <span
                                      key={index}
                                      className="nav-link colors ms-3 "
                                      id="pills-clr2-tab"
                                              data-bs-toggle="pill"
                                              data-bs-target="#pills-clr2"
                                              type="button"
                                              role="tab"
                                              aria-controls="pills-clr2"
                                              aria-selected="true"
                                      style={{
                                          backgroundColor: `${clr.color}`,
                                          width: "30px",
                                          height: "30px",
                                          borderRadius: "50%",
                                          display: "inline-block",
                                          
                                      }}
                                      onClick={()=>updateColorFun(product._id,clr.color)}

                                  ></span>
                              );
                          })
                        : ""}
                  </p>
                  </nav>
                    <hr className="mt-5" />
                    <p className="mb-3 mt-5 fs-5 fw-bold text-secondary">Select size</p>
                    <nav className=" size nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <p className="nav-item d-flex mt-4" role="presentation">
                            {product.size
                                ? product.size.map((siz, index) => {
                                      return (
                                          <span
                                              key={index}
                                              className="nav-link mx-2 px-4 text-dark  border border-secondary  size "
                                              id="pills-home-tab"
                                              data-bs-toggle="pill"
                                              data-bs-target="#pills-home"
                                              type="button"
                                              role="tab"
                                              aria-controls="pills-home"
                                              aria-selected="true"
                                              onClick={(e)=>updateSizeFun(product._id,siz.sizee)}
                                          >
                                              {siz.sizee}
                                          </span>
                                      );
                                  })
                                : ""}
                        </p>
                    </nav>
                    <div className="d-flex align-items-center me-2">
                     <div className="inc-dec me-4">
                     <span style={{cursor:'pointer'}} onClick={handleIncreament}><i className="fa-solid fa-plus me-3"></i> </span>
                  
                  <span className="border border-secondary  rounded text-center" style={{width:'50px',display:'inline-block'}} >{quantity} </span>

                
                <span style={{cursor:'pointer'}} onClick={handleDecreament}><i className="fa-solid fa-minus ms-2"></i></span>
                        
                     </div>   
                  
                 
                    <button
                        className="btn text-light me-5 pe-5 "
                        style={{ backgroundColor: "#17696A ",width:'300px' }}
                        onClick={() => addToCartFun(product._id,quantity)}
                    >
                        {loading.addToCart ? (
                            <div className="spinner-border text-center ms-4 text-light "style={{fontSize:'15px',height:'20px',width:'20px'}}  role="status">
                               <span className="sr-only" style={{fontSize:'1px'}}>...</span>
                            </div>
                        ) : (
                            <>
                                <i className="fa-solid fa-cart-shopping ms-5 px-3"></i> Add to Cart
                            </>
                        )}
                    </button> 
                    </div> 
                    <h5 className="mt-5">description</h5>
                    <p className="mt-4 mb-5 w-75 text-capitalize" >{product.discription}</p>
                </div>

                {reviews?
                <div className="review mb-5 pb-5 ">
                <h4>Customer reviews({reviews.length})</h4>
                {/* <div className="card w-50 p-4 "> */}
                  {reviews.map((rev)=>{
                   return <div className="card w-50 ps-5 mt-5 position-relative  reunded " style={{boxShadow:'0 0 100px 0 #eee',borderColor:'#eee'}}>
                     <div className="review d-flex align-items-center">
                 <p className="text-center position-absolute  " style={{width:'40px',height:'40px',top:'-10px',left:'-10px',backgroundColor:'#53051d' ,borderRadius:'50%',color:'white'}}> <span className="mt-2" style={{display:'inline-block'}}>{rev?rev.createdBy.userName.slice(0,1):''}</span></p>
                   
                   <div className="comment  pt-4">
                  <div className="d-flex ">

                   <p className="">{rev.createdBy.userName?rev.createdBy.userName:''}</p>
                  <p className="position-absolute end-0 me-3 text-secondary">{dateFormat(rev.createdAt,'mmmm d, yyyy  ')}</p>

                  </div>
                    <Rating
                        star={5}
                            emptySymbol={
                                    <i className="fa-regular fa-star " style={{ color: "#ddd" }}></i>
                                }
                                fullSymbol={
                                    <i className="fa-solid fa-star" style={{ color: "#FACF19" }}></i>
                                }
                                initialRating={rev.rating} 
                                style={{}}
                            
                                stop={5}
                         quiet={true}
                                
                                
                     />

                 
                     <p className=" pt-4 text-secondary">{rev.comment}</p>   
                   </div>
                   </div>
                   </div>
                  
                  
                  })}
                {/* </div> */}
                <div className=" d-flex align-items-start mt-5 ">
                    <div className="d-flex align-items-center">
                    <p className="text-center mt-5" style={{width:'40px',height:'40px',backgroundColor:'#57838d',borderRadius:'50%',color:'white'}}> <span className="mt-2" style={{display:'inline-block'}}>{user?user.userName.slice(0,1):''}</span></p>
                    <span className="text-dark mt-4 ms-4">{user.userName?user.userName:''}</span> 
                    </div>
                <div className="ms-5 mt-4">
                <form onSubmit={handleSubmit}>
                  <Rating
                         star={5}
                           emptySymbol={
                                <i className="fa-regular fa-star " style={{ color: "#ddd" }}></i>
                            }
                            fullSymbol={
                                <i className="fa-solid fa-star" style={{ color: "#FACF19" }}></i>
                            }
                            name="rating"
                             initialRating={inc}
                            value={values.rating} 
                            style={{ margin: "26px" }}
                            stop={5}
                            onChange={()=>handleChange}
                            quiet={true}
                            onClick={() => {
                            setInc(inc+1)
                            values.rating=inc+1
                            }}
                        />

                 
                <textarea name="comment" className="form-control "placeholder="write review" style={{width:'400px',height:'100px'}} value={values.comment} onChange={handleChange}></textarea>
                
                <button type="submit" className="btn btn-primary mt-4 ">Add review</button>
                 </form>
                </div>
                

                </div>

                          


               
               
             
               </div>
                    :""}
               
            </div>
 
        </div>
    );
}
 