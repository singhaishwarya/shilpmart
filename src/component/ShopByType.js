import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faCartPlus, faRandom, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import CategoryService from '../services/CategoryService';
import ProductService from '../services/ProductService';
import { connect } from 'react-redux';
import * as wishlistAction from '../actions/wishlist';
import * as compareAction from '../actions/compare';
import * as cartAction from '../actions/cart';

class ShopByType extends Component {
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

  componentWillReceiveProps() {
    this.state.type === 'product' ? this.getProductsList() : this.getCateroryList();
  }

  getCateroryList = () => {
    CategoryService.fetchAllCategory({ parent_id: 0 }).then((result) => {
      this.setState({
        shopByCategoryItems: result?.map((item, index) =>
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
        shopByProductItems: result?.map((item, index) =>
        (<div className="product-wrapper" key={index} >
          <div className="prodcut-img" onClick={() => this.productDetail(item.id)}>
            <a href="#">
              <img src={item.images[0]?.image_url}
                className="img-fluid"
                onClick={() => this.productDetail(item.id)}
                alt={item.images[0]?.caption}
                onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
              />
            </a>
          </div>
          <div className="shop-wrapper">
            <div className="shopBtn">
              <div className="shop-btn"><span>
                <FontAwesomeIcon icon={faCartPlus} onClick={() => { this.props.addToCart(item) }} /></span></div>
              <div className="shop-btn"><span>
                <FontAwesomeIcon icon={faRandom} onClick={() => { this.props.addToCompare(item) }} />
              </span></div>
              <div className="shop-btn"><span>
                <FontAwesomeIcon
                  icon={this.props.wishlist.find(element => element.id === item.id) ? faHeart : farHeart}
                  onClick={() => { this.props.wishlist.find(element => element.id === item.id) ? this.removeWishlist(index, item) : this.wishlistToggle(index, item) }}
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
    console.log("demo", this.props)
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

  wishlistToggle = (index, product) => {
    this.setState({ wishlistStatus: !this.state.wishlistStatus, hoveredItem: index });
    this.props.addToWishlist(product);

  }

  removeWishlist = (index, product) => {

    this.setState({ wishlistStatus: !this.state.wishlistStatus, hoveredItem: index });
    this.props.deleteWishlist(product.id);

  }

  render() {
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

const mapStateToProps = state => {
  return {
    wishlist: state.wishlist
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: wishlist => dispatch(wishlistAction.addToWishlist(wishlist)),
    deleteWishlist: index => dispatch(wishlistAction.deleteWishlist(index)),
    addToCompare: compare => dispatch(compareAction.addToCompare(compare)),
    addToCart: cart => dispatch(cartAction.addToCart(cart))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopByType);
