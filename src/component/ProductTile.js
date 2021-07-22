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
        this.props.addToWishlist({ product: item.product_id, variation_index: item.variation_index })
      ))
    })

  }

  deleteWishlist = (item) => {
    (Object.keys(this.props.userData).length > 0) ? this.deleteWishlistApi(item) : this.props.deleteWishlist({ product: item.id, variation_index: 0 });
    this.props.errorAlert(item, 'wishlist');
  }

  deleteWishlistApi(item) {
    this.props.deleteWishlist({ product: item.id, variation_index: 0 })
    WishlistService.addDelete({ wishlist_id: item.wishlist?.id, product_id: [item.id], variation_index: [0] }).then((result) => {
      if (result?.success) {
        this.getWishlist();
      }
    })
  }

  addToWishlist = (product) => {

    if (Object.keys(this.props.userData).length > 0) { this.addToWishlistApi(product) } else {
      this.props.addToWishlist({ product: product.id, variation_index: 0 });
      this.props.successAlert(product, 'wishlist');
    }

  }

  addToWishlistApi = (product) => {
    this.props.addToWishlist({ product: product.id, variation_index: 0 })
    WishlistService.addDelete({ product_id: [product.id], variation_index: [0] }).then((result) => {
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
      this.props.addToCart({ product: product.id, variation_index: 0, quantity: 1 });
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
              result1.data.map((item) => this.props.addToCart({ product: item.id, variation_index: 0, quantity: 1 }));
            })
            this.props.successAlert(product, 'cart');
          }
          else {
            this.props.errorAlert(product, 'cart');
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
      search: "?pid=" + value?.content?.product_id
    });
  }
  addToCompare = (data) => {
    this.props.addToCompare({ product: data.id, variation_index: 0 });
    this.props.successAlert(data, 'compare');
  }

  render() {

    const { data, userData, wishlist, cart, gridLayout, variation_index } = this.props
    const { currentLocation } = this.state
    const cellSize = {};
    if (gridLayout === '2X2') { cellSize.height = '200px' }
    else { cellSize.height = (gridLayout === '3X3' ? '297px' : '212px') }
    let _variationIndex = 0;
    data.images.forEach((item, index) => {

      if (item.variation_index === variation_index) {
        console.log("image", variation_index, "====", item.variation_index, '====', item.variation_index == variation_index);
        _variationIndex = index;
      }
    })

    return (

      <div className="product-wrapper" key={data.id} >

        <div className="prodcut-img" onClick={() => this.productDetail(data)} style={cellSize}>
          <img src={data?.images[_variationIndex]?.image_url}
            className="img-fluid"
            onClick={() => this.productDetail(data)}
            onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
          />

        </div>
        <div className="shop-wrapper">
          <div className="shopBtn">
            <div className="shop-btn"><span>
              <FontAwesomeIcon
                icon={(cart.find(({ product, variation_index }) => (product === data.id && variation_index === variation_index)) !== undefined) ? faCheck : faCartPlus}
                onClick={
                  () => (cart.find(({ product, variation_index }) => (product === data.id && variation_index === variation_index)) !== undefined) ? this.props.errorAlert(data, 'cart') : (data.variation_available ? this.productDetail(data) : this.addToCart(data))
                }
              /></span></div>
            <div className="shop-btn"><span>
              <FontAwesomeIcon icon={faRandom} onClick={() => (data.variation_available ?
                this.productDetail(data) : (this.props.compare.length < 5 ? this.addToCompare(data) : this.props.limitAlert()))}
              />
            </span></div>
            {currentLocation !== '/wishlist' && <div className="shop-btn"><span>
              <FontAwesomeIcon
                icon={((wishlist.find(({ product, variation_index }) => (product === data.id && variation_index === 0)) !== undefined) || (Object.keys(userData).length > 0 && data?.wishlist?.id)) ? faHeart : farHeart}
                onClick={() => {
                  ((Object.keys(userData).length > 0 && data?.wishlist?.id) ||
                    wishlist.find(({ product, variation_index }) => (product === data.id && variation_index === 0))
                  ) ? this.deleteWishlist(data) : (data.variation_available ? this.productDetail(data) : this.addToWishlist(data))
                }}
              />
            </span>
            </div>}
          </div>
        </div>
        {data.discount && <div className="prdocut-dis-lable"><span>{data.discount}%</span></div>}
        <h5 className="product-title">
          {data.content ? data.content.title : '__'}
        </h5>
        <span className="product-price">
          {/* <strike><span>₹</span> 1000</strike> */}
          <span>₹</span> {data?.prices[_variationIndex]?.price || data?.price}
        </span>
      </div >);
  }
}


const mapStateToProps = state => {
  return {
    wishlist: state.wishlist,
    userData: state.userData,
    cart: state.cart,
    compare: state.compare
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: wishlist => dispatch(wishlistAction.addToWishlist(wishlist)),
    deleteWishlist: wishlist => dispatch(wishlistAction.deleteWishlist(wishlist)),
    addToCompare: compare => dispatch(compareAction.addToCompare(compare)),
    addToCart: cart => dispatch(cartAction.addToCart(cart))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductTile);
