import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faCartPlus, faRandom, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import WishlistService from '../services/WishlistService';
import CartService from '../services/CartService';
import CompareService from '../services/CompareService';

export default class ProductTile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shopByProductItems: [],
    };
  }

  addWishlistApi = (id) => {
    WishlistService.add({ product_id: [id] }).then((result) => {
    })
  }
  deleteWishlistApi = (id) => {

  }
  addCartApi = (id) => {
    CartService.add({ product_id: id, quantity: 1, variation_index: 0 }).then((result) => {
    })
  }
  addCompareApi = (id) => {
    CompareService.add({ product_id: id }).then((result) => {
    })
  }
  wishlistToggle = (index, product) => {
    this.setState({ wishlistStatus: !this.state.wishlistStatus, hoveredItem: index });
    this.props.addToWishlist(product);

  }

  deleteWishlist = (index, product) => {

    this.setState({ wishlistStatus: !this.state.wishlistStatus, hoveredItem: index });
    this.props.deleteWishlist(product.id);

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
            <img src={data.images[0]?.image_url}
              className="img-fluid"
              onClick={() => this.productDetail(data.id)}
              alt={data.images[0]?.caption}
              onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
            />
          </a>
        </div>
        <div className="shop-wrapper">
          <div className="shopBtn">
            <div className="shop-btn"><span>
              <FontAwesomeIcon icon={faCartPlus} onClick={() => { Object.keys(userData).length > 0 ? this.addCartApi(data.id) : this.props.addToCart(data) }} /></span></div>
            <div className="shop-btn"><span>
              <FontAwesomeIcon icon={faRandom} onClick={() => this.props.addToCompare(data)} />
            </span></div>
            <div className="shop-btn"><span>
              <FontAwesomeIcon
                icon={(this.props.wishlist.find(element => element.id === data.id) || data.wishlist) ? faHeart : farHeart}
                onClick={() => {
                  (Object.keys(userData).length > 0 ? (data.wishlist ? this.deleteWishlistApi(data.id, data.wishlist) : this.addWishlistApi(data.id)) :
                    (this.props.wishlist.find(element => element.id === data.id) ? this.deleteWishlist(data.id, data) : this.wishlistToggle(data.id, data)))
                }}
              />
            </span></div>
          </div>
        </div>
        <div className="prdocut-dis-lable"><span>{data.discount}%</span></div>
        <h5 className="product-title"><a href="#">{data.content?.title}</a></h5>
        <span className="product-price">
          <FontAwesomeIcon icon={faRupeeSign} /> {data.price[0]?.price}
        </span>
      </div>


    );
  }
}