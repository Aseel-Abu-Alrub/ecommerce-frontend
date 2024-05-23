import axios from "axios";
import { createContext } from "react";

export const CartContext=createContext('')
export function CartContextProvider({children}){

  async function addToCart(productId){

    try{
        let token=localStorage.getItem("userToken")
        let objData={
              productId
            }
    
    const {data}=await axios.post(`https://ecommerce-g0io.onrender.com/cart/add` ,objData
    ,{headers:{Authorization:`Aseel__${token}`}});
    return data
    }
    catch(error){
        console.log(error)
    }
   
}

async function getcart(){
 try{
  const token=localStorage.getItem('userToken')
 const{data}=await axios.get("https://ecommerce-g0io.onrender.com/cart",{headers:{Authorization:`Aseel__${token}`}})
 return data
 }
 catch(error){
  console.log(error)
 } 
}
 
return <CartContext.Provider value={{addToCart,getcart}}>
    {children}
</CartContext.Provider>    
}