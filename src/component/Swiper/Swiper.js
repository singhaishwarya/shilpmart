import React from "react";

export default class Footer extends React.Component {
    state = {

    };

    render() {
        return (
            <div className="row">
                <div className="col">
                    {/* <!-- Swiper --> */}
                    <div className="swiper-container slider">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide slide">
                                <figure><img src={require("../../public/bannr1.webp")} className="img-fluid" alt="banner" /></figure>
                            </div>
                            <div className="swiper-slide slide">
                                <figure><img src={require("../../public/bannr2.webp")} className="img-fluid" alt="banner" /></figure>
                            </div>
                            <div className="swiper-slide slide">
                                <figure><img src={require("../../public/bannr3.webp")} className="img-fluid" alt="banner" /></figure>
                            </div>
                            <div className="swiper-slide slide">
                                <figure><img src={require("../../public/bannr4.webp")} className="img-fluid" alt="banner" /></figure>
                            </div>
                            <div className="swiper-slide slide">
                                <figure><img src={require("../../public/bannr5.webp")} className="img-fluid" alt="banner" /></figure>
                            </div>
                        </div>
                        {/* <!-- Add Pagination --> */}
                        {/* <!--<div className="swiper-pagination swiper-pagination-white"></div>--> */}
                        {/* <!-- Add Arrows --> */}
                        <div className="swiper-button-next swiper-button-white"></div>
                        <div className="swiper-button-prev swiper-button-white"></div>
                    </div>
                </div>
            </div>
        );
    }
}