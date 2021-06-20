import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import CategoryService from '../services/CategoryService';
import ProductService from '../services/ProductService';
import { connect } from 'react-redux';
import * as wishlistAction from '../actions/wishlist';
import * as compareAction from '../actions/compare';
import * as cartAction from '../actions/cart';
import ProductTile from './ProductTile';
import { ToastContainer } from 'react-toastify';
import ToastService from '../services/ToastService';
class ShopByType extends Component {
  constructor(props) {
    super(props);

    this.currentUrlParams = new URLSearchParams(window.location.search);
    this.state = {
      type: this.props.type,
      tabType: this.props.tabType,
      responsive: {
        0: { items: 2 },
        568: { items: 3 },
        1024: { items: 5 },
      },
      shopByCategoryItems: [],
      shopByProductItems: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.tabType !== prevProps.tabType) {
      this.getProductsList(this.getSetQueryParams())
    }
  }

  componentDidMount() {
    this.state.type === 'product' ? this.getProductsList(this.getSetQueryParams()) : this.getCateroryList();
  }
  getSetQueryParams() {
    let queryParams = {};
    if (this.currentUrlParams.get('cid')) {
      queryParams = { cat_ids: [this.currentUrlParams.get('cid')] }
    }
    if (this.props.tabType) {
      queryParams = this.props.tabType === 2 ? { 'order_by': 'desc', 'sort_by': 'created_at' } : {}
    }
    return queryParams;
  }

  getCateroryList = () => {
    let catImages = [
      "https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/mens_wear-300x300.webp",
      "https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp",
      "https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/home_texttiles-300x300.webp",
      "https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/decor-300x300.webp",
      require('../public/floorcovering.jpeg'),
      require('../public/clothing accessories.jpeg'),
      require('../public/office supplies.jpeg'),
    ];
    CategoryService.fetchAllCategory({ parent_id: 0 }).then((result) => {
      this.setState({
        shopByCategoryItems: result?.map((item, index) =>
        (<div key={index} >
          <div className="categorie-img" onClick={() => this.productList(item.id)}>
            <span className="cate-img">
              <img src={catImages[index] || require('../public/No_Image_Available.jpeg')} className="img-fluid"
                alt={item.title}
                onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
              />
            </span>
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

  getProductsList = (filterparams) => {
    ProductService.fetchAllProducts(filterparams).then((result) => {
      this.setState({
        shopByProductItems: result?.data?.map((item) =>
          (<ProductTile data={item} {...this.props} errorAlert={this.errorAlert} successAlert={this.successAlert} />))
      })
    })
  }

  productList = (value) => {

    this.props.history.push({
      pathname: '/product-list',
      search: "?cat_ids=" + value
    });
  }

  errorAlert = (product, type) => {
    console.log("product", product)
    return ToastService.error(product?.content?.title + " is " +
      (type === "cart" ? "already in cart" : "removed from wishlist"));
  }
  successAlert = (product, type) => {
    return ToastService.success(product?.content?.title + " is successfully added to " + type)
  }

  render() {
    const { type, shopByCategoryItems, shopByProductItems, responsive } = this.state;
    return (
      <>
        <ToastContainer closeOnClick />
        <AliceCarousel
          autoPlayInterval={3000}
          autoPlay={true}
          autoPlayStrategy="all"
          disableDotsControls
          items={type === 'product' ? shopByProductItems : shopByCategoryItems}
          responsive={responsive}
          mouseTracking
          infinite
          disableButtonsControls
          touchTracking
        />
      </>

    )
  }
}

const mapStateToProps = state => {
  return {
    wishlist: state.wishlist,
    userData: state.userData,
    cart: state.cart
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

