import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoading } from "../hooks/use-contexts.js";

export const EcommerceContext = createContext(null);

export function EcommerceContextProvider({ children }) {
    let [user, setUser] = useState(null);
    const token = localStorage.getItem("userToken");
    const{changeLoading}=useLoading()

    function saveUserData() {
        const decode = jwtDecode(token)
        setUser(decode)
    }

    useEffect(() => {
        if (token) {
            saveUserData();
        }
    }, []);

    async function getCategories() {
    changeLoading('category',true)
        try {
            const {data} = await axios.get("https://ecommerce-backend-olpp.onrender.com/categories/active");
            return data;
        }
         catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
        finally{
            changeLoading('category',false)

        }
    }

    async function getSpecificCategory(id) {
        try {
            const { data } = await axios.get(`https://ecommerce-backend-olpp.onrender.com/categories/${id}`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

    async function getSubCategory(id) {
        try {
            const { data } = await axios.get(`https://ecommerce-backend-olpp.onrender.com/categories/${id}/subcategory`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

    async function getProduct(page, limit) {
        try {
            const { data } = await axios.get(`https://ecommerce-backend-olpp.onrender.com/products?page=${page}&limit=${limit}`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }
    async function getallProduct() {
        try {
            const { data } = await axios.get(`https://ecommerce-backend-olpp.onrender.com/products`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }
    async function getSpesificSubCategory(id) {
        try {
            const { data } = await axios.get(`https://ecommerce-backend-olpp.onrender.com/subcategory/${id}`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

    async function ratingProduct(id) {
        try {
            const { data } = await axios.patch(`https://ecommerce-backend-olpp.onrender.com/products/${id}/rating`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

    async function decreaseRating(id) {
        try {
            const { data } = await axios.patch(`https://ecommerce-backend-olpp.onrender.com/products/${id}/decrease`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

    async function getProductDetails(id) {
        changeLoading('details',true)
        try {
            const { data } = await axios.get(`https://ecommerce-backend-olpp.onrender.com/products/${id}`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
        finally{
            changeLoading('details',false) 
        }
    }

    async function updateColor(productId,Color){
        try {
            let objData={
             Color
            }
            const { data } = await axios.patch(`https://ecommerce-backend-olpp.onrender.com/products/${productId}/color`,objData);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }
    async function updateSize(productId,Size){
        try {
            let objData={
             Size
            }
            const { data } = await axios.patch(`https://ecommerce-backend-olpp.onrender.com/products/${productId}/color`,objData);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

   async function order(){
    try {
       
        const { data } = await axios.get(`https://ecommerce-backend-olpp.onrender.com/order`,
         {headers:{Authorization:`Aseel__${token}`}}   
        );
        return data;
    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong");
    }
   }

   async function review(id){
    try {
       
       
        const { data } = await axios.get(`https://ecommerce-backend-olpp.onrender.com/review/${id}`
           
        );
        return data;
    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong");
    }
   }


    return (
        <EcommerceContext.Provider
            value={{
                user,
                setUser,
                saveUserData,
                getCategories,
                getSpecificCategory,
                getSubCategory,
                getProduct,
                getallProduct,
                getSpesificSubCategory,
                ratingProduct,
                decreaseRating,
                getProductDetails,
                updateColor,
                updateSize,
                order,
                review
            }}
        >
            {children}
        </EcommerceContext.Provider>
    );
}
