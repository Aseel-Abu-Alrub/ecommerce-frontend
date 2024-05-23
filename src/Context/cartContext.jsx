import axios from "axios";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";
import { ApiContext } from "./ApiContext";

export const CartContext = createContext("");
export function CartContextProvider({ children }) {
    const token = localStorage.getItem("userToken");
    const {changeLoading} = useContext(ApiContext)

    async function addToCart(productId) {
        changeLoading('addToCart', true)
        try {
            let objData = {
                productId,
            };
            const { data } = await axios.post(`/cart/add`, objData, {
                headers: { Authorization: `Aseel__${token}` },
            });
            if (data.message == "success") {
                toast.success("Product added to cart successfully");
            }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        } finally {
            changeLoading('addToCart', false)
        }
    }

    async function getcart() {
        changeLoading('getCart', true)
        try {
            const { data } = await axios.get("/cart", {
                headers: { Authorization: `Aseel__${token}` },
            });
            return data;
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        } finally {
            changeLoading('getCart', false)
        }
    }

    return <CartContext.Provider value={{ addToCart, getcart }}>{children}</CartContext.Provider>;
}
