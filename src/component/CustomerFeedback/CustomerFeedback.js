import React from "react";
export default class LiveStats extends React.Component {

    render() {


        return (
            <>
                {/* //    < !--From Our Customers-- > */}
                <div className="row py-5 section-background">
                    <div className="col">
                        <div className="section-title">
                            <span>From Our Customers</span>
                            <p>Customer reviews are important to us</p>
                        </div>

                        {/* <!-- Swiper --> */}
                        <div className="swiper-container testimonials">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">

                                    <div className="testimonials-block">
                                        <div className="testimonial-avatar"><img src={require('../../public/anu.png')} className="img-fluid"
                                            alt="user Dp" /></div>
                                        <div className="testimonial-ratings">
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                        </div>
                                        <div className="testimonial-text">
                                            <p>I am a big fan of Handloom and Handicraft items. Thanks to the Ministry of
                                            Textile for giving us a platform to shop our favourite handloom and
                                            handicraft product from a single stop shop.​​</p>
                                            <h5>Anuradha Mitra</h5>

                                        </div>
                                    </div>

                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonials-block">
                                        <div className="testimonial-avatar"><img src={require('../../public/anu.png')} className="img-fluid"
                                            alt="user Dp" /></div>
                                        <div className="testimonial-ratings">
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                        </div>
                                        <div className="testimonial-text">
                                            <p>I am a big fan of Handloom and Handicraft items. Thanks to the Ministry of
                                            Textile for giving us a platform to shop our favourite handloom and
                                            handicraft product from a single stop shop.​​</p>
                                            <h5>Anuradha Mitra</h5>

                                        </div>
                                    </div>

                                </div>

                                <div className="swiper-slide">
                                    <div className="testimonials-block">
                                        <div className="testimonial-avatar"><img src={require('../../public/anu.png')} className="img-fluid"
                                            alt="user Dp" /></div>
                                        <div className="testimonial-ratings">
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                        </div>
                                        <div className="testimonial-text">
                                            <p>I am a big fan of Handloom and Handicraft items. Thanks to the Ministry of
                                            Textile for giving us a platform to shop our favourite handloom and
                                            handicraft product from a single stop shop.​​</p>
                                            <h5>Anuradha Mitra</h5>

                                        </div>
                                    </div>

                                </div>

                                <div className="swiper-slide">
                                    <div className="testimonials-block">
                                        <div className="testimonial-avatar"><img src={require('../../public/anu.png')} className="img-fluid"
                                            alt="user Dp" /></div>
                                        <div className="testimonial-ratings">
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                            <span><i className="fa fa-star" aria-hidden="true"></i></span>
                                        </div>
                                        <div className="testimonial-text">
                                            <p>I am a big fan of Handloom and Handicraft items. Thanks to the Ministry of
                                            Textile for giving us a platform to shop our favourite handloom and
                                            handicraft product from a single stop shop.​​</p>
                                            <h5>Anuradha Mitra</h5>

                                        </div>
                                    </div>

                                </div>




                            </div>
                            {/* <!-- Add Pagination --> */}
                            <div className="swiper-pagination"></div>
                        </div>



                    </div>
                </div>
            </>
        )
    };
}