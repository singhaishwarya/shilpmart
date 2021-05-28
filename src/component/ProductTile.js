import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faCartPlus, faRandom, faHeart, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import WishlistService from '../services/WishlistService';
import CartService from '../services/CartService';
import ProductService from '../services/ProductService';
export default class ProductTile extends React.Component {

  getWishlist = () => {

    WishlistService.list().then((result) => {
      result && result.map((item) => (
        this.props.addToWishlist(item.product_id)
      ))
    })
  }

  deleteWishlist(item) {
    (Object.keys(this.props.userData).length > 0) ? this.deleteWishlistApi(item) : this.props.deleteWishlist(item.id);
  }

  deleteWishlistApi(item) {
    this.props.deleteWishlist(item.id)
    WishlistService.delete({ wishlist_id: item.wishlist?.id, product_id: [item.id] }).then((result) => {
      if (result?.success) {
        this.getWishlist();
        this.props.onWishlistChange();
      }
    }
    )
  }

  addToWishlist = (product) => {

    (Object.keys(this.props.userData).length > 0) ? this.addToWishlistApi(product) :
      this.props.addToWishlist(product.id)

  }

  addToWishlistApi = (product) => {
    this.props.addToWishlist(product.id)
    WishlistService.add({ product_id: [product.id] }).then((result) => {
      if (result?.success) {
        this.getWishlist();
        this.props.onWishlistChange();
      }
    });
  }

  addToCart = (product) => {

    if (this.props.cart?.includes(product.id)) {
      alert(product?.content?.title + " is already in cart")
    }
    else {
      Object.keys(this.props.userData).length > 0 ? this.addToCartApi(product) : this.props.addToCart(product.id)

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
          result.data.map((item) => (
            cartProductids?.push(item.product_id)
          ))
          ProductService.fetchAllProducts({ product_ids: cartProductids }).then((result1) => {
            result1.data.map((item) => this.props.addToCart(item.id));
          })
        }
        else { return }
      });
    } catch (err) {
      console.log(err);
    }
  }

  getCart = () => {
    let productids = [];
    CartService.list().then((result) => {
      result && result.map((item) => (
        productids?.push(item.product_id)
      ))
      ProductService.fetchAllProducts({ product_ids: productids }).then((result1) => {
        result1.data.map((item) => {
          this.props.addToCart(item.id);
        })
      })
    })
  }

  productDetail = (value) => {
    this.props.history.push({
      pathname: '/product-detail',
      search: "?pid=" + value
    });
  }

  render() {

    const { data, userData, wishlist, cart } = this.props
    return (
      <div className="product-wrapper" key={data.id} >
        <div className="prodcut-img" onClick={() => this.productDetail(data.id)}>
          <a href="#">
            <img src={(data.images?.length > 0 && data?.images[0]?.image_url) || "false"}
              className="img-fluid"
              onClick={() => this.productDetail(data.id)}
              alt={(data.images?.length > 0 && data.images[0]?.caption) || "false"}
              onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
            />
          </a>
        </div>
        <div className="shop-wrapper">
          <div className="shopBtn">
            <div className="shop-btn"><span>
              <FontAwesomeIcon
                icon={cart?.includes(data.id) ? faCheck : faCartPlus}
                onClick={
                  () => {
                    Object.keys(userData).length > 0 ? (data.cart ? this.deleteCart(data) : this.addToCart(data)) :
                      (cart?.find(element => element.id === data.id) ? this.deleteCart(data) : this.addToCart(data))
                  }
                }
              /></span></div>
            <div className="shop-btn"><span>
              <FontAwesomeIcon icon={faRandom} onClick={() => this.props.addToCompare(data)}
              />
            </span></div>
            <div className="shop-btn"><span>
              <FontAwesomeIcon
                icon={(wishlist?.includes(data.id) || (Object.keys(userData).length > 0 && data?.wishlist?.id)) ? faHeart : farHeart}
                onClick={() => {
                  ((Object.keys(userData).length > 0 && data?.wishlist?.id) || wishlist?.includes(data.id)) ? this.deleteWishlist(data) : this.addToWishlist(data)
                }}
              />
            </span>
            </div>
          </div>
        </div>
        <div className="prdocut-dis-lable"><span>{data.discount}%</span></div>
        <h5 className="product-title"><a href="#">
          {data.content ? data.content.title : '__'}
        </a></h5>
        <span className="product-price">
        <span>₹</span> {data?.price?.length > 0 && data?.price[0]?.price}
        </span>
      </div>


    );
  }
}