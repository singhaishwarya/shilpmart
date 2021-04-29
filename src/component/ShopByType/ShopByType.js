import React from "react";
import AliceCarousel from 'react-alice-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons'
export default class ShopByType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            shopByCategoryData: [{
                img: 'https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp',
                type: 'Womens wear',
                cost: '999',
                average_rating: 4,
                discount: '11',
                _id: 1
            }, {
                img: 'https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp',
                type: 'Womens wear',
                cost: '999',
                average_rating: 4,
                discount: '11',
                _id: 1
            }, {
                img: 'https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp',
                type: 'Womens wear',
                cost: '999',
                average_rating: 4,
                discount: '11',
                _id: 1
            }, {
                img: 'https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp',
                type: 'Womens wear',
                cost: '999',
                average_rating: 4,
                discount: '11',
                _id: 1
            }, {
                img: 'https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp',
                type: 'Womens wear',
                cost: '999',
                average_rating: 4,
                discount: '11',
                _id: 1
            }, {
                img: 'https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp',
                type: 'Womens wear',
                cost: '999',
                average_rating: 4,
                discount: '11',
                _id: 1
            }],
            shopByProductData: [
                {
                    img: require('../../public/bag2.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11',
                    _id: 1
                },
                {
                    img: require('../../public/bag1.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11',
                    _id: 2
                }, {
                    img: require('../../public/bag3.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11',
                    _id: 3
                }, {
                    img: require('../../public/bag1.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11',
                    _id: 4
                }, {
                    img: require('../../public/bag2.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11',
                    _id: 5
                }, {
                    img: require('../../public/bag3.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11',
                    _id: 6
                }, {
                    img: require('../../public/bag1.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11',
                    _id: 7
                }, {
                    img: require('../../public/bag3.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11',
                    _id: 8
                }
            ],
            shopByCategoryItems: [],
            shopByProductItems: []
        };

    }

    componentDidMount() {
        this.setState({
            shopByProductItems: this.state.shopByProductData.map((item, index) => {
                return (<div style={{ width: 310 }} key={index} onClick={() => this.productDetail('1')}>
                    <div className="product-wrapper">
                        <div className="prodcut-img">
                            <a href="#"><img
                                src={item.img} className="img-fluid"
                                alt="saree" /></a>
                        </div>
                        <div className="prdocut-dis-lable"><span>{item.discount}%</span></div>
                        <h5 className="product-title"><a href="#">{item.title}</a></h5>
                        <span className="product-price">
                            <FontAwesomeIcon icon={faRupeeSign} /> {item.cost}
                        </span>
                    </div>
                </div>)
            }),
            shopByCategoryItems: this.state.shopByCategoryData.map((item, index) => {
                return (<div className="swiper-slide" style={{ width: 310 }} onClick={() => this.productList('category')}>

                    <div className="shop-category-wrapper">
                        <div className="categorie-img"><a href="#" className="cate-img"><img
                            src={item.img}
                            className="img-fluid" alt="cate img" /></a></div>
                        <div className="categorie-img-title">
                            <h3>{item.type}</h3>
                            <div className="more-products"><a href="#">More Products</a></div>
                        </div>
                    </div>

                </div>)
            })
        });

    }

    productDetail = (value) => {
        this.props.history.push({ pathname: "/product-detail" });
    }
    productList = (value) => {
        this.props.history.push({ pathname: "/product-list" });
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