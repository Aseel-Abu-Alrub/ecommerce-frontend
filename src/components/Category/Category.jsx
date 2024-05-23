import React, { Fragment, useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { EcommerceContext } from "../../Context/ecommerceContext.jsx";
import style from "./Category.module.css";
import Rating from "react-rating";
import Loading from "../Loading/Loading.jsx";

export default function Category() {
    const { getSubCategory, getProduct, getSpesificSubCategory, ratingProduct, decreaseRating } =
        useContext(EcommerceContext);
    let [subCategory, setSubCategory] = useState([]);
    let pages = [1, 2, 3, 4];
    let [Product, setProduct] = useState([]);
    let [isloading, setIsLoading] = useState(true);
    let [All, setAll] = useState([]);

    let { id } = useParams();

    async function getSubCategoryFun() {
        let res = await getSubCategory(id);
        console.log(res.subcategory);
        setSubCategory(res.subcategory);
    }

    async function getProductFun(p, l) {
        let res = await getProduct(p, l);
        setProduct([]);
        setAll(res.product);
    }

    async function getProductDetailsFun() {}

    async function getSpesificSubCategoryFun(id2) {
        let res = await getSpesificSubCategory(id2);
        console.log(res.subCat.product);
        setAll([]);
        setProduct(res.subCat.product);
    }
    async function ratingProductFun(Pid) {
        await ratingProduct(Pid);
    }

    async function decreaseRatingFun(Pid) {
        await decreaseRating(Pid);
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        getSubCategoryFun();
        getProductFun(1, 8);
    }, []);

    if (isloading) {
        return <Loading />;
    } else
        return (
            <div className="subCategory ">
                <div className={style.back}>
                    <div
                        className="title text-center d-flex  "
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "60vh",
                        }}
                    >
                        <p className="p-0 m-0">
                            Extra <span>30%</span> off Online
                        </p>
                        <h1 className=" text-light">Summer Season Sale</h1>
                        <p className="p-0 m-0"> Free Shipping on order over 90$</p>
                    </div>
                </div>

                <nav
                    className="nav nav-pills mb-3 mt-5 d-flex justify-content-center"
                    id="pills-tab"
                    role="tablist"
                >
                    <button
                        className="nav-link  active"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                        onClick={() => {
                            getProductFun(1, 8);
                        }}
                    >
                        All
                    </button>

                    {subCategory.map((subCat, index) => {
                        return (
                            <Fragment key={index}>
                                <li className="nav-item mx-3" role="presentation">
                                    <button
                                        className="nav-link "
                                        id={`pills-tab`}
                                        data-bs-toggle="pill"
                                        data-bs-target={`#pills`}
                                        type="button"
                                        role="tab"
                                        aria-controls={`pills`}
                                        aria-selected="true"
                                        onClick={() => {
                                            getSpesificSubCategoryFun(subCat._id);
                                        }}
                                    >
                                        {subCat.name}
                                    </button>
                                </li>
                            </Fragment>
                        );
                    })}
                </nav>

                <div className=" tab-content mx-5 mt-5 " id="pills-tabContent">
                    <div className="row  mx-5 mt-5">
                        {Product.map((productt) => {
                            return (
                                <div className="col-md-4 mb-5">
                                    <div
                                        className="card d-flex justify-content-center align-items-center p-4"
                                        style={{ boxShadow: "0 0 10px 0px gray" }}
                                    >
                                        <img
                                            src={productt.mainImage.secure_url}
                                            className="w-75 img-fluid"
                                            style={{}}
                                            alt=""
                                        />
                                        <p
                                            className="tab-pane fade show active mt-3 w-75 text-center text-truncate "
                                            id={`pills`}
                                            role="tabpanel"
                                            aria-labelledby={`pills`}
                                            tabIndex={0}
                                        >
                                            {productt.name}
                                        </p>

                                        <div className="d-flex justify-content-between  ">
                                            <p
                                                className={`${
                                                    productt.discount
                                                        ? "text-danger fw-bold  fs-6"
                                                        : "fw-bold fs-6 text-success"
                                                }`}
                                            >
                                                ${productt.price}
                                                {productt.discount ? (
                                                    <span
                                                        className={`${
                                                            productt.discount
                                                                ? " mx-2 border border-danger px-1"
                                                                : "border border-0"
                                                        }`}
                                                        style={{
                                                            fontSize: "11px",
                                                            fontWeight: "lighter",
                                                        }}
                                                    >
                                                        -{productt.discount}%
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </p>
                                            <Rating
                                                star={5}
                                                emptySymbol={
                                                    <i
                                                        className="fa-regular fa-star "
                                                        style={{ color: "#FACF19" }}
                                                    ></i>
                                                }
                                                fullSymbol={
                                                    <i
                                                        className="fa-solid fa-star"
                                                        style={{ color: "#FACF19" }}
                                                    ></i>
                                                }
                                                name="simple-controlled"
                                                initialRating={productt.rating}
                                                style={{ marginLeft: "50px" }}
                                                stop={5}
                                                // onChange={()=>{ratingProductFun(productt._id)}}
                                                onClick={() => {
                                                    ratingProductFun(productt._id);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className=" mx-5 ">
                        <div
                            className="tab-pane fade show active"
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab"
                        >
                            <div className="row ">
                                {All.map((all, index) => {
                                    return (
                                        <div className="col-md-3 mb-5 " key={index}>
                                            <Link to={`/details/${all._id}`}>
                                                <div
                                                    className="card d-flex justify-content-center align-items-center w-100 "
                                                    style={{
                                                        boxShadow: "0 0 10px 0px gray",
                                                        height: "400px",
                                                    }}
                                                >
                                                    <img
                                                        src={all.mainImage.secure_url}
                                                        className="w-75 img-fluid p-1"
                                                        style={{}}
                                                        alt=""
                                                    />
                                                    <p
                                                        className="tab-pane fade show active mt-3 w-75 text-center text-truncate text-secondary "
                                                        id={`pills`}
                                                        role="tabpanel"
                                                        aria-labelledby={`pills`}
                                                        tabIndex={0}
                                                    >
                                                        {all.name}
                                                    </p>

                                                    <div className="d-flex justify-content-between  ">
                                                        <p
                                                            className={`${
                                                                all.discount
                                                                    ? "text-danger fw-bold  fs-6"
                                                                    : "fw-bold fs-6 text-success"
                                                            }`}
                                                        >
                                                            ${all.price}
                                                            {all.discount ? (
                                                                <span
                                                                    className={`${
                                                                        all.discount
                                                                            ? " mx-2 border border-danger px-1"
                                                                            : "border border-0"
                                                                    }`}
                                                                    style={{
                                                                        fontSize: "11px",
                                                                        fontWeight: "lighter",
                                                                    }}
                                                                >
                                                                    -{all.discount}%
                                                                </span>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </p>
                                                        <Rating
                                                            star={5}
                                                            emptySymbol={
                                                                <i
                                                                    className="fa-regular fa-star "
                                                                    style={{ color: "#FACF19" }}
                                                                ></i>
                                                            }
                                                            fullSymbol={
                                                                <i
                                                                    className="fa-solid fa-star"
                                                                    style={{ color: "#FACF19" }}
                                                                ></i>
                                                            }
                                                            name="simple-controlled"
                                                            initialRating={all.rating}
                                                            style={{ marginLeft: "50px" }}
                                                            stop={5}
                                                            // onChange={()=>{ratingProductFun(productt._id)}}
                                                            onClick={() => {
                                                                ratingProductFun(all._id);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="d-flex justify-content-center align-items-center">
                            <nav aria-label="Page navigation example ">
                                <ul className="pagination justify-content-end">
                                    <li className="page-item disabled">
                                        <a className="page-link">Previous</a>
                                    </li>

                                    {pages.map((page, index) => {
                                        return (
                                            <li className="page-item " key={index}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => {
                                                        getProductFun(page, 8);
                                                    }}
                                                >
                                                    {page}
                                                </button>
                                            </li>
                                        );
                                    })}
                                    {/* <li className="page-item" ><button className="page-link">2</button></li>
            <li className="page-item"><button className="page-link" >3</button></li> */}
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            Next
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
}
