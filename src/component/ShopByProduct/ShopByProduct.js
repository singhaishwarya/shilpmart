import React from "react";
import AliceCarousel from 'react-alice-carousel';
export default class ShopByProduct extends React.Component {
    constructor() {
        super();
        this.state = {
            shopByProductData: [], shopByProductItems: [],
        };
    }

    componentDidMount() {
        this.setState({
            // shopByProductData: [{ '05-09-2020', }]//api data to be binded here
            shopByProductItems: [
                <div className="swiper-slide" style={{ width: 310 }}>

                    <div className="product-wrapper">
                        <div className="prodcut-img">
                            <a href="#"><img
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

                </div>,
                <div className="swiper-slide" style={{ width: 310 }}>

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

                </div>,
                <div className="swiper-slide" style={{ width: 310 }}>

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

                </div>,
                <div className="swiper-slide" style={{ width: 310 }}>

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

                </div>,
                <div className="swiper-slide" style={{ width: 310 }}>

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

                </div>,
                <div className="swiper-slide" style={{ width: 310 }}>

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
            ]
        });
    }

    render() {

        return (
            <div className="row py-5 section-background "  >
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
                                    <AliceCarousel
                                        animationType='slide'
                                        autoPlayInterval={3000}
                                        autoPlay={true}
                                        autoPlayStrategy="all"
                                        controlsStrategy="responsive"
                                        disableDotsControls
                                        disableAutoPlayOnAction={true}
                                        items={this.state.shopByProductItems}
                                        infinite
                                        mouseTrackingEnabled={true}
                                        // autoHeight={true}
                                        autoWidth
                                        disableButtonsControls //can be enabled if arrows are needed
                                        touchTracking
                                    />
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