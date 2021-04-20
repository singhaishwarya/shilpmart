import React from "react";
import { Link, } from "react-router-dom";
export default class ShopByCategory extends React.Component {

    render() {

        const imageClick = () => {
            console.log('Click');
        }

        return (
            <div className="row py-5">
                <div className="col">
                    <div className="section-title">
                        <span><a href="#">Shop by Categories</a></span>
                        <p>Choose from authentic handmade product categories</p>
                    </div>

                    {/* <!-- Swiper --> */}
                    <div className="swiper-container shop-categories">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">

                                <div className="shop-category-wrapper">
                                    <div className="categorie-img"><a href="#" className="cate-img"><img
                                        src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp"
                                        className="img-fluid" alt="cate img" /></a></div>
                                    <div className="categorie-img-title">
                                        <h3>Women's Wear</h3>
                                        <div className="more-products"><a href="#">More Products</a></div>
                                    </div>
                                </div>

                            </div>
                            <div className="swiper-slide">
                                <div className="shop-category-wrapper">
                                    <div className="categorie-img"><a href="#" className="cate-img"><img
                                        src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp"
                                        className="img-fluid" alt="cate img" /></a></div>
                                    <div className="categorie-img-title">
                                        <h3>Women's Wear</h3>
                                        <div className="more-products"><a href="#">More Products</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="shop-category-wrapper">
                                    <div className="categorie-img"><a href="#" className="cate-img"><img
                                        src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp"
                                        className="img-fluid" alt="cate img" /></a></div>
                                    <div className="categorie-img-title">
                                        <h3>Women's Wear</h3>
                                        <div className="more-products"><a href="#">More Products</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="shop-category-wrapper">
                                    <div className="categorie-img"><a href="#" className="cate-img"><img
                                        src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/mens_wear-300x300.webp"
                                        className="img-fluid" alt="cate img" /></a></div>
                                    <div className="categorie-img-title">
                                        <h3>Women's Wear</h3>
                                        <div className="more-products"><a href="#">More Products</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="shop-category-wrapper">
                                    <div className="categorie-img"><a href="#" className="cate-img"><img
                                        src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp"
                                        className="img-fluid" alt="cate img" /></a></div>
                                    <div className="categorie-img-title">
                                        <h3>Women's Wear</h3>
                                        <div className="more-products"><a href="#">More Products</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="shop-category-wrapper">
                                    <div className="categorie-img"><a href="#" className="cate-img"><img
                                        src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp"
                                        className="img-fluid" alt="cate img" /></a></div>
                                    <div className="categorie-img-title">
                                        <h3>Women's Wear</h3>
                                        <div className="more-products"><a href="#">More Products</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Add Pagination --> */}
                        <div className="swiper-pagination"></div>
                    </div>

                </div>
            </div>

        )
    };
}