import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

export const EcommerceContext = createContext(null);

export function EcommerceContextProvider({ children }) {
    let [user, setUser] = useState(null);
    const token = localStorage.getItem("userToken");

    function saveUserData() {
        const decode = jwtDecode(token);
        setUser(decode);
    }

    useEffect(() => {
        if (token) {
            saveUserData();
        }
    }, []);

    async function getCategories() {
        try {
            const { data } = await axios.get("/categories/active");
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

    async function getSpecificCategory(id) {
        try {
            const { data } = await axios.get(`/categories/${id}`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

    async function getSubCategory(id) {
        try {
            const { data } = await axios.get(`/categories/${id}/subcategory`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

    async function getProduct(page, limit) {
        try {
            const { data } = await axios.get(`/products?page=${page}&limit=${limit}`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }
    async function getSpesificSubCategory(id) {
        try {
            const { data } = await axios.get(`/subcategory/${id}`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

    async function ratingProduct(id) {
        try {
            const { data } = await axios.patch(`/products/${id}/rating`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

    async function decreaseRating(id) {
        try {
            const { data } = await axios.patch(`/products/${id}/decrease`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

    async function getProductDetails(id) {
        try {
            const { data } = await axios.get(`/products/${id}`);
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
                getSpesificSubCategory,
                ratingProduct,
                decreaseRating,
                getProductDetails,
            }}
        >
            {children}
        </EcommerceContext.Provider>
    );
}
