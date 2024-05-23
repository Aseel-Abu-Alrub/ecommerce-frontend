import { useContext } from "react";
import { ApiContext } from "../Context/ApiContext";
import { CartContext } from "../Context/cartContext";
import { EcommerceContext } from "../Context/ecommerceContext";

export const useLoading = () => {
    const loadingContextValues = useContext(ApiContext);
    return loadingContextValues;
};

export const useCart = () => {
    const cartContextValues = useContext(CartContext);
    return cartContextValues;
};

export const useEcommerce = () => {
    const ecommerceContextValues = useContext(EcommerceContext);
    return ecommerceContextValues;
};
