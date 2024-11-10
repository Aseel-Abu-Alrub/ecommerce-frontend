import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/cartContext.jsx";
import { ApiContext } from "../../Context/ApiContext.jsx";
import { useCart, useEcommerce, useLoading } from "../../hooks/use-contexts.js";
import Loading from "../Loading/Loading.jsx";
import './Cart.css'
import { confirm } from "react-confirm-box";
import { Link } from "react-router-dom";
import cart2 from '../../cart.jpg'
import Order from "../Order/Order.jsx";


export default function Cart() {
    const { getcart,increaseQuantity,removeItem,decreaseQuantity,setCount } = useCart();
    // const { loading } = useLoading();
    const[cart,setCart]=useState([])
    const[loading,setLoading]=useState(true)
     let totall=0
    let[total,setTotal]=useState(0)
     const options={
       labels:{
        confirmable:"Delete",
        cancellable:"Cancel"
       } ,
       
     }

   

    async function getCartFun() {
        let res = await getcart();
        console.log(res.cart)
          console.log(res.cart.products.length)
          setCount(res.cart.products.length)
    setCart(res.cart?.products)
    res.cart.products.map((q)=>{
         
      totall+=(q.productId.finalPrice*q.quantity)
      

   })
   setTotal(totall)

    
      
    }
    async function removeItemFun(productId){
        const result=await confirm("Are you sure to delete this product?",options)
        if(result){
         let res= await removeItem(productId)
          getCartFun()
           console.log(res)   
         console.log("you click yes")
         return
        }
        console.log("you click no")

    
    } 
    async function IncreaseQuantityFun(productId){
    
     let res=await increaseQuantity(productId)
    //  const quann=res.cart?.products.find((q)=>q.productId._id==productId)
    //  setQuan(quann?.quantity)
    setCart(cart=>
      cart.map((item)=>
        productId===item.productId._id?{...item,quantity:item.quantity+1}:item
      )
    );
    

     res.cart.products.map((q)=>{
         
      totall+=(q.productId.finalPrice*q.quantity)
      

   })
   localStorage.setItem("totalProducts",totall)
   setTotal(totall)
     


     }

     async function decreaseQuantityFun(productId){
    
      let res=await decreaseQuantity(productId)
     //  const quann=res.cart?.products.find((q)=>q.productId._id==productId)
     //  setQuan(quann?.quantity)
     setCart(cart=>
       cart.map((item)=>
         productId===item.productId._id?{...item,quantity:item.quantity-1}:item
       )
     );
     
 
      res.cart.products.map((q)=>{
          
       totall-=(q.productId.finalPrice*q.quantity)
       
 
    })
    localStorage.setItem("totalProducts",totall)
    setTotal(Math.abs(totall)) 
      
 
 
      }
    

   
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
    }, 2000);
        if(cart){
            getCartFun();
            
        }
    }, []);

    // if (loading.getCart) {
    //     return (
    //         <Loading/>
    //     );
    // }
    if(loading){
      return <Loading/>
    }

    return (
        <div className="pt-5 bg-white py-5  ">
           <h2 className="ms-5 text-center">SHOPPING CART</h2>
           <div className="links mt-4 ms-5 text-center">
             <Link className="text-secondary" to='/home'>Home \</Link>
           <Link className="text-secondary" >Shopping Cart</Link>
           </div>
         
          <div className={!cart.length==0?'row':''}>
            <div className={!cart.length==0?'col-lg-9':''}>
            <table class={`table table-light ms-5 m-auto mt-5   ${cart.length>0?'border rounded shadow-lg ':''}  `} style={{width:'96%'}}>
        {!cart.length ==0? 
        <thead>
            <tr >
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col" > <p className="p-0 m-0 ms-5">Actions</p></th>
            </tr>
          </thead> :<div className=" text-center"> 
          <img src={cart2} alt="cart" className="w-25 "/>
          <h3 className="mt-3 ms-4">your Cart is Currently <span className="text-danger bg-white ">Empty</span> !</h3>
          <p className="text-secondary mt-4 ms-4">Must add items on the cart before you proceed to check out.</p>
          <Link className=" btn btn-primary text-white mt-3" to='/product'>Return to Shop</Link>
          </div>}
        
        
          <tbody className="mb-5">
          {cart?cart.map((cartt,index)=>{
                    return <tr className="Cart  " key={index}>
                        <td >
                            <div className="d-flex">
                            <img src={cartt.productId.mainImage.secure_url} className="rounded " style={{width:'120px',height:'150px'}} alt="" />
                            <div className="mt-4" style={{display:"flex",flexDirection:"column"}}>
                            <span className="ms-3 mb-3 p-0  d-inline-block ">{cartt.productId.name}</span>
                            <p className="ms-3 text-secondary p-0" >Size:  {cartt.productId.Size.toUpperCase()}</p>
                            <p className="ms-3 p-0 text-secondary ">Color: {cartt.productId.Color}</p>
                            
                            </div>
                            </div>
                            </td>
                        <td className=" "><p className="" >${cartt.productId.finalPrice.toFixed(2)}</p> </td>
                        <td className="me-5"> 
                          <div className="d-flex justify-content-around me-2">
                          <span style={{cursor:'pointer'}}  onClick={()=>{IncreaseQuantityFun(cartt.productId._id)}}><i className="fa-solid fa-plus me-3 text-primary"></i> </span>
                          
                            <p className="border border-secondary w-50 rounded text-center" >{cartt.quantity} </p>

                          <span style={{cursor:'pointer'}} onClick={()=>{decreaseQuantityFun(cartt.productId._id)}}><i className="fa-solid fa-minus ms-2 text-primary"></i></span>
                        </div>  
                        
                        </td> 
                        <td>
                            <p className="ms-4" >${(cartt.productId.finalPrice * cartt.quantity).toFixed(2)}</p>
                        </td>
                        <td>
                            <button onClick={()=>removeItemFun(cartt.productId._id)} type="button" className=" btn border border-0 close ms-5 ps-5 me-5" aria-label="Close">
                                <i className="fa-regular fa-trash-can text-danger"></i>
                        </button>
                        </td>
                        
                    </tr>
                
                  }) :'cart is empty'}
              
          </tbody>
          {/* {cart.length>1? ***subtotal price ****
          <tbody >
            <tr >
              <td colSpan={3}>
                <p className="mt-4 ms-4">SubTotal</p>
              </td>

              <td colSpan={5}>
                <p className="ms-4">${total.toFixed(2)}</p>
              </td>
            </tr>
          </tbody>
        :''} */}
            </table>
            </div>

          {!cart.length==0?
           <div className="col-lg-3 mt-5   " >
           <Order total={total}/>
           
         </div>
          
          :''}
           

            
            </div>

       
          
        </div>
    );
}
