import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faRandom, faHeart, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import WishlistService from '../services/WishlistService';
import CartService from '../services/CartService';
import ProductService from '../services/ProductService';
import { connect } from 'react-redux';
import * as wishlistAction from '../actions/wishlist';
import * as compareAction from '../actions/compare';
import * as cartAction from '../actions/cart';
class ProductTile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      wishlistS: props.wishlist,
      currentLocation: props.location.pathname
    }
  }
  getWishlist = () => {

    WishlistService.list().then((result) => {
      result && result.map((item) => (
        this.props.addToWishlist(item.product_id)
      ))
    })

  }

  deleteWishlist = (item) => {
    (Object.keys(this.props.userData).length > 0) ? this.deleteWishlistApi(item) : this.props.deleteWishlist(item.id);
  }

  deleteWishlistApi(item) {
    this.props.deleteWishlist(item.id)
    WishlistService.delete({ wishlist_id: item.wishlist?.id, product_id: [item.id] }).then((result) => {
      if (result?.success) {
        this.getWishlist();
      }
    })
  }

  addToWishlist = (product) => {

    if (Object.keys(this.props.userData).length > 0) { this.addToWishlistApi(product) } else {
      this.props.addToWishlist(product.id);
      this.props.successAlert(product, 'wishlist');
    }

  }

  addToWishlistApi = (product) => {
    this.props.addToWishlist(product.id)
    WishlistService.add({ product_id: [product.id] }).then((result) => {
      if (result?.success) {
        this.props.successAlert(product, 'wishlist');
        this.getWishlist();

      }
    });
  }

  addToCart = (product) => {
    if (Object.keys(this.props.userData).length > 0) {
      this.addToCartApi(product)
    }
    else {
      this.props.addToCart(product.id);
      this.props.successAlert(product, 'cart');
    }
  }

  addToCartApi = (product) => {

    let cartToSync = [{
      "product_id": product.id,
      "quantity": 1,
      "variation_index": 0
    }], cartProductids = [];
    try {
      CartService.add({ products: cartToSync }).then((result) => {

        if (result?.success) {
          if (typeof result.data !== 'string') {
            result.data.length && result.data.map((item) => (
              cartProductids?.push(item.product_id)
            ));
            ProductService.fetchAllProducts({ product_ids: cartProductids }).then((result1) => {
              result1.data.map((item) => this.props.addToCart(item.id));
            })
            this.props.successAlert(product, 'cart');
          }
          else {
            this.props.errorAlert(product);
          }
        }
        else { return }
      });
    } catch (err) {
      console.log(err);
    }
  }

  productDetail = (value) => {
    sessionStorage.setItem("scrollPosition", window.pageYOffset);

    this.props.history.push({
      pathname: '/product-detail',
      search: "?pid=" + value
    });
  }

  render() {

    const { data, userData, wishlist, cart, gridLayout } = this.props
    const { currentLocation } = this.state
    const cellSize = {};
    if (gridLayout === '2X2') { cellSize.height = '325px' }
    else { cellSize.height = (gridLayout === '3X3' ? '297px' : '212px') }

    return (

      <div className="product-wrapper" key={data.id} >

        <div className="prodcut-img" onClick={() => this.productDetail(data.id)} style={cellSize}>
          <img src={(data.images?.length > 0 && data?.images[0]?.image_url) || ""}
            className="img-fluid"
            onClick={() => this.productDetail(data.id)}
            alt={(data.images?.length > 0 && data.images[0]?.caption) || ""}
            onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
          />

        </div>
        <div className="shop-wrapper">
          <div className="shopBtn">
            <div className="shop-btn"><span>
              <FontAwesomeIcon
                icon={cart?.includes(data.id) ? faCheck : faCartPlus}
                onClick={
                  () => cart?.includes(data.id) ? this.props.errorAlert(data) : this.addToCart(data)
                }
              /></span></div>
            <div className="shop-btn"><span>
              <FontAwesomeIcon icon={faRandom} onClick={() => { this.props.addToCompare(data); this.props.successAlert(data, 'compare') }}
              />
            </span></div>
            {currentLocation !== '/wishlist' && <div className="shop-btn"><span>
              <FontAwesomeIcon
                icon={(wishlist?.includes(data.id) || (Object.keys(userData).length > 0 && data?.wishlist?.id)) ? faHeart : farHeart}
                onClick={() => {
                  ((Object.keys(userData).length > 0 && data?.wishlist?.id) || wishlist?.includes(data.id)) ? this.deleteWishlist(data) : this.addToWishlist(data)
                }}
              />
            </span>
            </div>}
          </div>
        </div>
        { data.discount && <div className="prdocut-dis-lable"><span>{data.discount}%</span></div>}
        <h5 className="product-title">
          {data.content ? data.content.title : '__'}
        </h5>
        <span className="product-price">
          <strike><span>₹</span> 1000</strike> <span>₹</span> {data?.price?.length > 0 ? data?.price[0]?.price : 0}
        </span>
      </div >);
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductTile);
