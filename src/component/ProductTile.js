import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faCartPlus, faRandom, faHeart, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import WishlistService from '../services/WishlistService';
import CartService from '../services/CartService';
import ProductService from '../services/ProductService';
export default class ProductTile extends React.Component {

  getWishlist = () => {
    let productids = [];
    WishlistService.list().then((result) => {
      result && result.map((item) => (
        productids?.push(item.product_id)
      ))
      ProductService.fetchAllProducts({ product_ids: productids }).then((result1) => {
        result1.data.map((item, index) => {
          this.props.addToWishlist(item);
        })

      })
    })
  }

  deleteWishlist(item) {
    (Object.keys(this.props.userData).length > 0) ? this.deleteWishlistApi(item) : this.props.deleteWishlist(item.id);
  }

  deleteWishlistApi(item) {
    WishlistService.deleteWishlist({ wishlist_id: item.wishlist?.id, product_id: [item.id] }).then((result) => {
      this.getWishlist()
    });
  }

  addToWishlist = (product) => {

    if (Object.keys(this.props.userData).length > 0) { (this.addToWishlistApi(product)) }
    else {
      this.props.addToWishlist(product)
    }


  }

  addToWishlistApi = (product) => {
    console.log("Demo===3", product)
    this.props.addToWishlist(product)
    WishlistService.add({ product_id: [product.id] }).then((result) => {
      this.getWishlist()
    });
  }

  deleteCart(item) {
    (Object.keys(this.props.userData).length > 0) ? this.deleteCartApi(item) : this.props.deleteCart(item.id);
  }

  deleteCartApi(item) {
    // CartService.deleteCart({ wishlist_id: item.wishlist?.id, product_id: [item.id] }).then((result) => {
    //   this.getCart()
    // });
  }

  addToCart = (product) => {
    Object.keys(this.props.userData).length > 0 ? this.addToCartApi(product) : this.props.addToCart(product)
  }

  addToCartApi = (product) => {
    this.props.addToCart(product)
    CartService.add({ product_id: product.id, quantity: 1, variation_index: 0 }).then((result) => {
      this.getCart()
    });
  }

  getCart = () => {
    let productids = [];
    CartService.list().then((result) => {
      result && result.map((item) => (
        productids?.push(item.product_id)
      ))
      ProductService.fetchAllProducts({ product_ids: productids }).then((result1) => {
        this.props.addToCart(result1.data);
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

    const { data, userData } = this.props
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
                icon={this.props?.cart?.find(element => element.id === data.id) ? faCheck : faCartPlus}
                onClick={
                  () => {
                    Object.keys(userData).length > 0 ? (data.cart ? this.deleteCart(data) : this.addToCart(data)) :
                      (this.props?.cart?.find(element => element.id === data.id) ? this.deleteCart(data) : this.addToCart(data))
                  }
                  // () => { Object.keys(userData).length > 0 ? this.addCartApi(data.id) : this.props.addToCart(data) }
                }
              /></span></div>
            <div className="shop-btn"><span>
              <FontAwesomeIcon icon={faRandom} onClick={() => this.props.addToCompare(data)}
              />
            </span></div>
            <div className="shop-btn"><span>
              <FontAwesomeIcon
                icon={this.props.wishlist.find(element => element.id === data.id) ? faHeart : farHeart}
                onClick={() => {
                  Object.keys(userData).length > 0 ? (data.wishlist ? this.deleteWishlist(data) : this.addToWishlist(data)) :
                    (this.props.wishlist.find(element => element.id === data.id) ? this.deleteWishlist(data) : this.addToWishlist(data))
                }}
              />
            </span>
            </div>
          </div>
        </div>
        <div className="prdocut-dis-lable"><span>{data.discount}%</span></div>
        <h5 className="product-title"><a href="#">{data.content?.title}</a></h5>
        <span className="product-price">
          <FontAwesomeIcon icon={faRupeeSign} /> {data?.price?.length > 0 && data?.price[0]?.price}
        </span>
      </div>


    );
  }
}