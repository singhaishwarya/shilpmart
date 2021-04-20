import React from "react";
import { Link, } from "react-router-dom";
export default class ShopByProduct extends React.Component {

    render() {

        const imageClick = () => {
            console.log('Click');
        }

        return (
            <div className="row py-5" className="section-background" >
                <div className="col">
                    <div className="section-title">
                        <span><a href="#">Shop by Product</a></span>
                        <p>Choose from authentic handmade product categories</p>
                    </div>

                    <ul className="nav nav-tabs d-flex justify-content-center border-0 mb-4" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                                aria-controls="home" aria-selected="true">Featured Products</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                                aria-controls="profile" aria-selected="false">Latest Products</a>
                        </li>

                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            {/* <!-- Swiper --> */}
                            <div className="swiper-container shop-product">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">

                                        <div className="product-wrapper">
                                            <div className="prodcut-img"><a href="#"><img
                                                src={require('../../public/Kasavu-Saree-300x300.jpeg')} className="img-fluid"
                                                alt="saree" /></a>
                                            </div>
                                            <div className="prdocut-dis-lable"><span>11%</span></div>
                                            <h5 className="product-title"><a href="#">100 % Pure Cotton handloom Kasavu
                                                    Saree</a></h5>
                                            <span className="product-price">
                                                <i className="fa fa-inr" aria-hidden="true" />4800
                                            </span>
                                        </div>

                                    </div>
                                    <div className="swiper-slide">

                                        <div className="product-wrapper">
                                            <div className="prodcut-img"><a href="#"><img
                                                src={require('../../public/Kasavu-Saree-300x300.jpeg')} className="img-fluid"
                                                alt="saree" /></a>
                                            </div>
                                            <div className="prdocut-dis-lable"><span>11%</span></div>
                                            <h5 className="product-title"><a href="#">100 % Pure Cotton handloom Kasavu
                                                    Saree</a></h5>
                                            <span className="product-price">
                                                <i className="fa fa-inr" aria-hidden="true" />4800
                                            </span>
                                        </div>

                                    </div>
                                    {/* <div className="swiper-slide">
                                        <div className="product-wrapper">
                                            <div className="prodcut-img"><a href="#"><img
                                                src={require('../../public/Kasavu-Saree-300x300.jpeg')} className="img-fluid"
                                                alt="saree" /></a></div>
                                            <div className="prdocut-dis-lable"><span>11%</span></div>
                                            <h5 className="product-title"><a href="#">100 % Pure Cotton handloom Kasavu
                                                    Saree</a></h5>
                                            <span className="product-price"><i className="fa fa-inr" aria-hidden="true"></i>
                                                4800</span>

                                        </div>

                                    </div>
                                    <div className="swiper-slide">
                                        <div className="product-wrapper">
                                            <div className="prodcut-img"><a href="#"><img
                                                src={require('../../public/Kasavu-Saree-300x300.jpeg')} className="img-fluid"
                                                alt="saree" /></a></div>
                                            <div className="prdocut-dis-lable"><span>11%</span></div>
                                            <h5 className="product-title"><a href="#">100 % Pure Cotton handloom Kasavu
                                                    Saree</a></h5>
                                            <span className="product-price"><i className="fa fa-inr" aria-hidden="true"></i>
                                                4800</span>

                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="product-wrapper">
                                            <div className="prodcut-img"><a href="#"><img
                                                src={require('../../public/Kasavu-Saree-300x300.jpeg')} className="img-fluid"
                                                alt="saree" /></a></div>
                                            <div className="prdocut-dis-lable"><span>11%</span></div>
                                            <h5 className="product-title"><a href="#">100 % Pure Cotton handloom Kasavu
                                                    Saree</a></h5>
                                            <span className="product-price"><i className="fa fa-inr" aria-hidden="true"></i>
                                                4800</span>

                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="product-wrapper">
                                            <div className="prodcut-img">
                                                <a href="#">
                                                    <img
                                                        src={require('../../public/Kasavu-Saree-300x300.jpeg')} className="img-fluid"
                                                        alt="saree" />
                                                </a>
                                            </div>
                                            <div className="prdocut-dis-lable"><span>11%</span></div>
                                            <h5 className="product-title">
                                                <a href="#">100 % Pure Cotton handloom KasavuSaree
                                                </a>
                                            </h5>
                                            <span className="product-price">
                                                <i className="fa fa-inr" aria-hidden="true" />
                                                4800
                                            </span>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="product-wrapper">
                                            <div className="prodcut-img"><a href="#"><img
                                                src={require('../../public/Kasavu-Saree-300x300.jpeg')} className="img-fluid"
                                                alt="saree" /></a></div>
                                            <div className="prdocut-dis-lable"><span>11%</span></div>
                                            <h5 className="product-title"><a href="#">100 % Pure Cotton handloom Kasavu
                                                    Saree</a></h5>
                                            <span className="product-price">
                                                <i className="fa fa-inr" aria-hidden="true"></i>
                                                4800</span>
                                        </div>
                                    </div>
                                */}
                                </div>
                                {/* <!-- Add Pagination --> */}
                                <div className="swiper-pagination"></div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                    </div>
                </div>
            </div>
        )
    };
}