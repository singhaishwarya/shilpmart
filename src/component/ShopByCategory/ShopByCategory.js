import React from "react";
import AliceCarousel from 'react-alice-carousel';
export default class ShopByCategory extends React.Component {
    constructor() {
        super();
        this.state = {
            shopByCategoryData: [], shopByCategoryItems: [],
        };
    }

    componentDidMount() {
        this.setState({
            // shopByCategoryData: [{ '05-09-2020', }]//api data to be binded here
            shopByCategoryItems: [
                <div className="swiper-slide" style={{ width: 310 }}>

                    <div className="shop-category-wrapper">
                        <div className="categorie-img"><a href="#" className="cate-img"><img
                            src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp"
                            className="img-fluid" alt="cate img" /></a></div>
                        <div className="categorie-img-title">
                            <h3>Women's Wear</h3>
                            <div className="more-products"><a href="#">More Products</a></div>
                        </div>
                    </div>

                </div>,
                <div className="swiper-slide" style={{ width: 310 }}>

                    <div className="shop-category-wrapper">
                        <div className="categorie-img"><a href="#" className="cate-img"><img
                            src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp"
                            className="img-fluid" alt="cate img" /></a></div>
                        <div className="categorie-img-title">
                            <h3>Women's Wear</h3>
                            <div className="more-products"><a href="#">More Products</a></div>
                        </div>
                    </div>

                </div>,
                <div className="swiper-slide" style={{ width: 310 }}>

                    <div className="shop-category-wrapper">
                        <div className="categorie-img"><a href="#" className="cate-img"><img
                            src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp"
                            className="img-fluid" alt="cate img" /></a></div>
                        <div className="categorie-img-title">
                            <h3>Women's Wear</h3>
                            <div className="more-products"><a href="#">More Products</a></div>
                        </div>
                    </div>

                </div>,
                <div className="swiper-slide" style={{ width: 310 }}>

                    <div className="shop-category-wrapper">
                        <div className="categorie-img"><a href="#" className="cate-img"><img
                            src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp"
                            className="img-fluid" alt="cate img" /></a></div>
                        <div className="categorie-img-title">
                            <h3>Women's Wear</h3>
                            <div className="more-products"><a href="#">More Products</a></div>
                        </div>
                    </div>

                </div >,
                <div className="swiper-slide" style={{ width: 310 }}>

                    <div className="shop-category-wrapper">
                        <div className="categorie-img"><a href="#" className="cate-img"><img
                            src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp"
                            className="img-fluid" alt="cate img" /></a></div>
                        <div className="categorie-img-title">
                            <h3>Women's Wear</h3>
                            <div className="more-products"><a href="#">More Products</a></div>
                        </div>
                    </div>

                </div>,
                <div className="swiper-slide" style={{ width: 310 }}>

                    <div className="shop-category-wrapper">
                        <div className="categorie-img"><a href="#" className="cate-img"><img
                            src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp"
                            className="img-fluid" alt="cate img" /></a></div>
                        <div className="categorie-img-title">
                            <h3>Women's Wear</h3>
                            <div className="more-products"><a href="#">More Products</a></div>
                        </div>
                    </div>

                </div>]
        });
    }
    render() {

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
                            <AliceCarousel
                                animationType='slide'
                                autoPlayInterval={3000}
                                autoPlay={true}
                                autoPlayStrategy="all"
                                controlsStrategy="responsive"
                                disableDotsControls
                                disableAutoPlayOnAction={true}
                                items={this.state.shopByCategoryItems}
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
            </div>

        )
    };
}