import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/react-slick/dist/react-slick.min";
import "../node_modules/slick-carousel/slick/slick.js";
import "../node_modules/react-image-gallery/styles/css/image-gallery.css";


import "./index.css";
import App from "./App";

// axios.defaults.baseURL="https://ecommerce-backend-olpp.onrender.com"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
