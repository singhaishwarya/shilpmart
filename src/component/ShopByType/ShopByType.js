import React from "react";
import AliceCarousel from 'react-alice-carousel';
export default class ShopByType extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shopByProductData: [], shopByProductItems: [],
            type: this.props.type
        };
    }

    componentDidMount() {
        this.setState({
            // shopByProductData: [{ '05-09-2020', }]//api data to be binded here
            shopByProductItems: [
                <div className="swiper-slide" style={{ width: 310 }} onClick={() => this.productDetail('1')}>
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
                <div className="swiper-slide" style={{ width: 310 }} onClick={() => this.productDetail('1')}>

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
                <div className="swiper-slide" style={{ width: 310 }} onClick={() => this.productDetail('1')}>

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
                <div className="swiper-slide" style={{ width: 310 }} onClick={() => this.productDetail('1')}>

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
                <div className="swiper-slide" style={{ width: 310 }} onClick={() => this.productDetail('1')}>

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
                <div className="swiper-slide" style={{ width: 310 }} onClick={() => this.productDetail('1')}>

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
            ],
            shopByCategoryItems: [
                <div className="swiper-slide" style={{ width: 310 }} onClick={() => this.productList('1')}>

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
                <div className="swiper-slide" style={{ width: 310 }} onClick={() => this.productList('1')}>

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
                <div className="swiper-slide" style={{ width: 310 }} onClick={() => this.productList('1')}>

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
                <div className="swiper-slide" style={{ width: 310 }} onClick={() => this.productList('1')}>

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
                <div className="swiper-slide" style={{ width: 310 }} onClick={() => this.productList('1')}>

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
                <div className="swiper-slide" style={{ width: 310 }} onClick={() => this.productList('1')}>

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
            ]


        });
    }

    productDetail = (value) => {
        // this.props.history.push({ pathname: "/product-detail", state: { _id: value } }
        // );
    }
    productList = (value) => {
        // this.props.history.push({ pathname: "/product-dlist", state: { category: value } }
        // );
    }

    render() {
        const { type, shopByCategoryItems, shopByProductItems } = this.state;
        return (

            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <AliceCarousel
                        animationType='slide'
                        autoPlayInterval={3000}
                        autoPlay={true}
                        autoPlayStrategy="all"
                        controlsStrategy="responsive"
                        disableDotsControls
                        disableAutoPlayOnAction={true}
                        items={type === 'product' ? shopByProductItems : shopByCategoryItems}
                        infinite
                        mouseTrackingEnabled={true}
                        // autoHeight={true}
                        autoWidth
                        disableButtonsControls //can be enabled if arrows are needed
                        touchTracking
                    />
                </div>
            </div>
        )
    };
}