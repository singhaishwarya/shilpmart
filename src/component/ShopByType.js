import React from "react";
import AliceCarousel from 'react-alice-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faCartPlus, faRandom, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import CategoryService from '../services/CategoryService';
import ProductService from '../services/ProductService';

export default class ShopByType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      responsive: {
        0: { items: 2 },
        568: { items: 3 },
        1024: { items: 5 },
      },
      shopByCategoryItems: [],
      shopByProductItems: []
    };

  }

  componentDidMount() {
    this.state.type === 'product' ? this.getProductsList() : this.getCateroryList();
  }

  getCateroryList = () => {
    CategoryService.fetchAllCategory({ parent_id: 0 }).then((result) => {
      this.setState({
        shopByCategoryItems: result.map((item, index) =>
        (<div key={index} >
          <div className="categorie-img" onClick={() => this.productList(item.id)}>
            <a href="#" className="cate-img">
              <img src={item.image_url ? item.image_url : require('../public/No_Image_Available.jpeg')} className="img-fluid"
                alt={item.title}
                onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
              />
            </a>
          </div>
          <div className="categorie-img-title">
            <h3>{item.title}</h3>
            <div className="more-products"><a href="#">More Products</a></div>
          </div>
        </div>)
        )
      })
    });
  }

  getProductsList = () => {
    const { wishlistStatus, hoveredItem } = this.state;
    ProductService.fetchAllProducts().then((result) => {
      this.setState({
        shopByProductItems: result.map((item, index) =>
        (<div className="product-wrapper" key={index} >
          <div className="prodcut-img" onClick={() => this.productDetail(item.id)}>
            <a href="#">
              <img src={item.images[0]?.image_url} className="img-fluid"
                onClick={() => this.productDetail(item.id)}
                alt={item.images[0]?.caption}
                onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
              />
            </a>
          </div>
          <div className="shop-wrapper">
            <div className="shopBtn">
              <div className="shop-btn"><span>
                <FontAwesomeIcon icon={faCartPlus} /></span></div>
              <div className="shop-btn"><span>
                <FontAwesomeIcon icon={faRandom} />
              </span></div>
              <div className="shop-btn"><span>
                <FontAwesomeIcon
                  icon={(wishlistStatus && hoveredItem === index) ? faHeart : farHeart}
                  onClick={() => this.wishlistToggle(wishlistStatus, index)}
                />
              </span></div>
            </div>
          </div>
          <div className="prdocut-dis-lable"><span>{item.discount}%</span></div>
          <h5 className="product-title"><a href="#">{item.content?.title}</a></h5>
          <span className="product-price">
            <FontAwesomeIcon icon={faRupeeSign} /> {item.price[0]?.price}
          </span>
        </div>))
      })
    })
  }

  productDetail = (value) => {

    this.props.history.push({
      pathname: '/product-detail',
      search: "?pid=" + value
    });
  }
  productList = (value) => {

    this.props.history.push({
      pathname: '/product-list',
      search: "?cat_ids=" + value
    });
  }

  wishlistToggle = (val, index) => {
    this.setState({ wishlistStatus: !this.state.wishlistStatus, hoveredItem: index });
  }
  render() {
    // const demoItems = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => <div style={{
    //   display: "inline-block",
    //   width: "100%",
    //   height: 200,
    //   border: "2px solid #fff",
    //   background: "teal"
    // }} role="button" />);
    const { type, shopByCategoryItems, shopByProductItems, responsive } = this.state;

    return (
      <AliceCarousel
        autoPlayInterval={3000}
        autoPlay={type === 'product' ? true : false}
        autoPlayStrategy="all"
        // controlsStrategy="responsive"
        disableDotsControls
        // disableAutoPlayOnAction={true}
        items={type === 'product' ? shopByProductItems : shopByCategoryItems}
        responsive={responsive}
        mouseTracking
        infinite
        disableButtonsControls //can be enabled if arrows are needed
        touchTracking
      />

    )
  };
}