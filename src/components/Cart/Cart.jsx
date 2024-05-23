import React, { useContext, useEffect } from "react";
import { CartContext } from "../../Context/cartContext.jsx";
import { ApiContext } from "../../Context/ApiContext.jsx";
import { useCart, useLoading } from "../../hooks/use-contexts.js";

export default function Cart() {
    const { getcart } = useCart();
    const { loading } = useLoading();

    async function getCartFun() {
        let res = await getcart();
        console.log(res);
    }

    useEffect(() => {
        getCartFun();
    }, []);

    if (loading.getCart) {
        return (
            <div className=" bg-light" style={{ paddingTop: "80px" }}>
                <h1>Loading Cart...</h1>;
            </div>
        );
    }

    return (
        <div className="pt-5 bg-light">
            <p>Cart</p>
            <p>Cart</p>
            <p>Cart</p>
            <p>Cart</p>
            <p>Cart</p>
            <p>Cart</p>
            <p>Cart</p>
            <p>Cart</p>
            <p>Cart</p>
            <p>Cart</p>
            <p>Cart</p>
        </div>
    );
}
