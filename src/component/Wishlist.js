import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as wishlistAction from '../actions/wishlist';
import * as cartAction from '../actions/cart';
import * as compareAction from '../actions/compare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faRandom, faRupeeSign } from '@fortawesome/free-solid-svg-icons'
class Wishlist extends Component {

  constructor(props) {
    super(props);

  }

  deleteWishlist(e, index) {
    e.preventDefault();
    this.props.deleteWishlist(index);
  }

  render() {
    const { wishlist } = this.props

    return (
      <div className="container">
        {wishlist?.length > 0 ? (<>
          <span>YOUR PRODUCTS WISHLIST</span>
          <div className='row py-2'>
            {wishlist?.map((item, index) => {
              return (
                <div key={index} className='col-lg-3 col-sm-6 col-6' >
                  <a href="#" className="remove-item" onClick={() => {
                    this.props.deleteWishlist(item.id)
                  }}>Remove</a>
                  <div className="product-wrapper">
                    <div className="prodcut-img" onClick={() => this.handlePostDetail(item.id)}>
                      <a href="#">
                        <img src={item.images[0]?.image_url} className="img-fluid"
                          alt={item.images[0]?.caption}
                          onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
                        /></a>
                    </div>
                    <div className="prdocut-dis-lable"><span>{item.discount}%</span></div>
                    <div className="shop-wrapper">
                      <div className="shopBtn">
                        <div className="shop-btn"><span>
                          <FontAwesomeIcon icon={faCartPlus} onClick={() => { this.props.addToCart(item) }} /></span></div>
                        <div className="shop-btn"><span>
                          <FontAwesomeIcon icon={faRandom} onClick={() => { this.props.addToCompare(item) }} />
                        </span></div>
                      </div>
                    </div>
                    <h5 className="product-title">{item.content?.title}</h5>
                    <span className="product-price">
                      <FontAwesomeIcon icon={faRupeeSign} />
                      {item.price[0]?.price}</span>
                  </div>
                </div>
              )
            })}
          </div></>
        ) : <span>Wishlist is empty.

        You don't have any products in the wishlist yet.
You will find a lot of interesting products on our "Shop" page.</span>
        }
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    wishlist: state.wishlist
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: cart => dispatch(cartAction.addToCart(cart)),
    addToCompare: compare => dispatch(compareAction.addToCompare(compare)),
    deleteWishlist: index => dispatch(wishlistAction.deleteWishlist(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
