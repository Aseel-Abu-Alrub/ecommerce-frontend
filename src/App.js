import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import { ToastContainer } from "react-toastify";
import { EcommerceContextProvider } from "./Context/ecommerceContext.jsx";
import { CartContextProvider } from "./Context/cartContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Product from "./components/Product/Product.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Category from "./components/Category/Category.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import ApiContextProvider from "./Context/ApiContext.jsx";
import axios from "axios";

export default function App() {

    // axios.defaults.baseURL="https://ecommerce-backend-olpp.onrender.com"
  
    const router = createBrowserRouter([
        {
            path: "",
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                { path: "home", element: <Home /> },
                { path: "register", element: <Register /> },
                { path: "login", element: <Login /> },
                {
                    path: "cart",
                    element: (
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    ),
                },
                { path: "about", element: <About /> },
                { path: "contact", element: <Contact /> },
                { path: "categories/:id", element: <Category /> },
                { path: "details/:id", element: <ProductDetails /> },
                { path: "product", element: <Product /> },
                { path: "*", element: <NotFound /> },
            ],
        },
    ]);
    return (
        <>
            <ApiContextProvider>
                <EcommerceContextProvider>
                    <CartContextProvider>
                        <RouterProvider router={router}></RouterProvider>
                        <ToastContainer />
                    </CartContextProvider>
                </EcommerceContextProvider>
            </ApiContextProvider>
        </>
    );
}
