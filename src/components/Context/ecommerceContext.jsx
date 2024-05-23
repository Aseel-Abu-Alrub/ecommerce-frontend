import { createContext, useEffect,useState } from "react";
import { jwtDecode} from "jwt-decode";
import axios from "axios";


export const EcommerceContext=createContext(null)
export function EcommerceContextProvider({children}){
let[user,setUser]=useState(null)

function saveUserData(){
    const token=localStorage.getItem("userToken")
    const decode=jwtDecode(token)
    setUser(decode)
    // console.log(user)
}

useEffect(()=>{
    
if(localStorage.getItem("userToken"))
 saveUserData()


},[])

async function getCategories(){
    try{
        const{data}=await axios.get("https://ecommerce-g0io.onrender.com/categories/active")  
        return data
    }
    catch(error){
      console.log(error)  
    }
 
}

async function getSpecificCategory(id){
    try{
    const{data}=await axios.get(`https://ecommerce-g0io.onrender.com/categories/${id}`)
     return data
   }
    catch(error){
   console.log(error)
    }
}

async function getSubCategory(id){
    try{
        const{data}=await axios.get(`https://ecommerce-g0io.onrender.com/categories/${id}/subcategory`)
        return data
    }
    catch(err){
        console.log(err)
    }
   
}

async function getProduct(page,limit){
    try{
    const{data}=await axios.get(`https://ecommerce-g0io.onrender.com/products?page=${page}&limit=${limit}`)
    return data
    }
    catch(error){
       console.log(error) 
    }
}
async function getSpesificSubCategory(id){
    try{
        const{data}=await axios.get(`https://ecommerce-g0io.onrender.com/subcategory/${id}`)
        return data
        }
        catch(error){
           console.log(error) 
        }   
}

async function ratingProduct(id){
    try{
        const{data}=await axios.patch(`https://ecommerce-g0io.onrender.com/products/${id}/rating`)
        return data
        }
        catch(error){
           console.log(error) 
        }    
}
async function decreaseRating(id){
    try{
        const{data}=await axios.patch(`https://ecommerce-g0io.onrender.com/products/${id}/decrease`)
        return data
        }
        catch(error){
           console.log(error) 
        }  
}

async function getProductDetails(id){
  try{
 const{data}=await axios.get(`https://ecommerce-g0io.onrender.com/products/${id}`)
 return data
  } 
  catch(error){
 console.log(error)
  } 
}

// async function addToCart(productId){
//   try{
//     const token=localStorage.getItem("userToken")
// //    let localObj={
//   //productId
       
// //    }

//    const{data}=await axios.post(`https://ecommerce-g0io.onrender.com/cart/${productId}/add`,

//    {headers:{authorization:`Aseel__${token}`}}
//    );
//     // console.log(token)
//    return data
   
//   } 
//   catch(error){
//   console.log(error)
//   } 
// }

return <EcommerceContext.Provider value={{user,setUser,saveUserData,getCategories,getSpecificCategory,getSubCategory,getProduct,getSpesificSubCategory,ratingProduct,decreaseRating,getProductDetails}}>
    {children}
</EcommerceContext.Provider>   
}