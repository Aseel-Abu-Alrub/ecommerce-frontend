import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { ApiContext } from "./ApiContext";

export const CartContext = createContext("");
export function CartContextProvider({ children }) {
    const token = localStorage.getItem("userToken");
    let[count,setCount]=useState('')
    const {changeLoading} = useContext(ApiContext)

    async function addToCart(productId,quantity) {
        changeLoading('addToCart', true)
        try {
            let objData = {
                productId, 
                quantity
            };
            const { data } = await axios.post(`https://ecommerce-backend-olpp.onrender.com/cart/add`, objData, {
                headers: { Authorization: `Aseel__${token}` }});
            if (data.message == "success") {
                toast.success("Product added to cart successfully");
                return data
            }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        } finally {
            changeLoading('addToCart', false)
           
            
        }
    }

    async function increaseQuantity(productId,quantity) {
        try {
            let objData = {
                quantity
            };
            const { data } = await axios.patch(`https://ecommerce-backend-olpp.onrender.com/cart/${productId}/quantity`, objData, {
                headers: { Authorization: `Aseel__${token}` }});
            
                return data
            
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        } 
    }

    async function decreaseQuantity(productId,quantity){
        try {
            let objData = {
                quantity
            };
            const { data } = await axios.patch(`https://ecommerce-backend-olpp.onrender.com/cart/${productId}/decrease`, objData, {
                headers: { Authorization: `Aseel__${token}` }});
            
                return data
            
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        } 
    }


    async function getcart() {
        
        
        try {
            const { data } = await axios.get("https://ecommerce-backend-olpp.onrender.com/cart", {
                headers: { Authorization: `Aseel__${token}` },
            });
            setCount(data.cart?.products.length)
            if(data){
                return data;

            }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        } 
    }
    async function removeItem(productId){
        try{
          let objData={
           productId
          }  
           const{data}=await axios.patch(' https://ecommerce-backend-olpp.onrender.com/cart/removeItem ',objData,
            {headers:{Authorization:`Aseel__${token}`}}
           );
           return data

        }
    catch(err){
      toast.error(err.response.data.message || "Something went wrong");
   }
    }

    return <CartContext.Provider value={{ addToCart, getcart,count,setCount,increaseQuantity,decreaseQuantity,removeItem}}>{children}</CartContext.Provider>;
}
