import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "./ProductDetails.css";
import Rating from "react-rating";
import { useCart, useEcommerce, useLoading } from "../../hooks/use-contexts.js";

export default function ProductDetails() {
    const { getProductDetails, ratingProduct } = useEcommerce();
    const { addToCart } = useCart();
    const { loading } = useLoading();
    const [product, setProduct] = useState({});
    let { id } = useParams();

    async function getProductDetailsFun() {
        let res = await getProductDetails(id);
        console.log(res.newProduct);
        setProduct(res.newProduct);
    }

    const images = [
        {
            original: `${product.mainImage ? product.mainImage.secure_url : ""}`,
            thumbnail: `${product.subImages ? product.subImages[0].secure_url : ""}`,
        },
        {
            original: `${product.subImages ? product.subImages[1].secure_url : ""}`,
            thumbnail: `${product.subImages ? product.subImages[1].secure_url : ""}`,
        },
        {
            original: `${product.subImages ? product.subImages[2].secure_url : ""}`,
            thumbnail: `${product.subImages ? product.subImages[2].secure_url : ""}`,
        },
        {
            original: `${product.subImages ? product.subImages[3].secure_url : ""}`,
            thumbnail: `${product.subImages ? product.subImages[3].secure_url : ""}`,
        },
    ];

    async function ratingProductFun(Pid) {
        await ratingProduct(Pid);
    }

    useEffect(() => {
        getProductDetailsFun();
    }, []);

    return (
        <div className=" d-flex bg-light " style={{ position: "" }}>
            <div className="row mt-5 ms-4">
                <div className="col-md-6 px-5">
                    <div className="title mt-5 pt-5  ">
                        <ImageGallery
                            items={images}
                            thumbnailPosition="left"
                            infinite="false"
                            disableThumbnailScroll="true"
                        />
                        ;
                    </div>
                </div>
                <div className="col-md-6 mt-5 pt-5 ">
                    <h2 className="">{product.name}</h2>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="text-danger mt-5 fs-5 fw-bold ">
                            ${product.price}{" "}
                            {product.discount ? (
                                <del className="text-dark fs-6 ms-2">
                                    ${product.discount ? product.finalPrice.toFixed(2) : ""}
                                </del>
                            ) : (
                                ""
                            )}{" "}
                            {product.discount ? (
                                <span
                                    className="ms-5 text-white fs-6  px-3"
                                    style={{ backgroundColor: "red" }}
                                >
                                    %{product.discount}
                                </span>
                            ) : (
                                ""
                            )}{" "}
                        </p>
                        <Rating
                            star={5}
                            emptySymbol={
                                <i className="fa-regular fa-star " style={{ color: "#FACF19" }}></i>
                            }
                            fullSymbol={
                                <i className="fa-solid fa-star" style={{ color: "#FACF19" }}></i>
                            }
                            name="simple-controlled"
                            initialRating={product.rating}
                            style={{ marginTop: "40px", marginRight: "100px" }}
                            stop={5}
                            // onChange={()=>{ratingProductFun(productt._id)}}
                            onClick={() => {
                                ratingProductFun(product._id);
                            }}
                        />
                    </div>
                    <p className="mb-3 fs-5 fw-bold">color</p>
                    {product.colors
                        ? product.colors.map((clr, index) => {
                              return (
                                  <span
                                      key={index}
                                      className="ms-3 colors"
                                      style={{
                                          backgroundColor: `${clr.color}`,
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          display: "inline-block",
                                      }}
                                  ></span>
                              );
                          })
                        : ""}

                    <hr className="mt-5" />
                    <p className="mb-3 mt-5 fs-5 fw-bold text-secondary">Select size</p>
                    <nav className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <p className="nav-item d-flex mt-4" role="presentation">
                            {product.size
                                ? product.size.map((siz, index) => {
                                      return (
                                          <span
                                              key={index}
                                              className="nav-link mx-2 px-4 text-dark  border border-secondary  size "
                                              id="pills-home-tab"
                                              data-bs-toggle="pill"
                                              data-bs-target="#pills-home"
                                              type="button"
                                              role="tab"
                                              aria-controls="pills-home"
                                              aria-selected="true"
                                          >
                                              {siz.sizee}
                                          </span>
                                      );
                                  })
                                : ""}
                        </p>
                    </nav>

                    <button
                        className="btn text-light me-5 pe-5"
                        style={{ backgroundColor: "#17696A " }}
                        onClick={() => addToCart(product._id)}
                    >
                        {loading.addToCart ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <i className="fa-solid fa-cart-shopping ms-5 px-3"></i> Add to Cart
                            </>
                        )}
                    </button>

                    <h5 className="mt-5">description</h5>
                    <p className="mt-4 mb-5 w-75">{product.discription}</p>
                </div>
            </div>

            <div className="mt-5"></div>
        </div>
    );
}
