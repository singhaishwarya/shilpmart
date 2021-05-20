import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faTimes } from '@fortawesome/free-solid-svg-icons'
import * as cartAction from '../actions/cart';

class CartOverlay extends Component {

  constructor(props) {
    super(props);

  }
  dismissCart = (event) => {
    this.props.dismissModal('cart');
  }
  render() {
    return (
      <>
        <div className="cart-side-head">
          <h3>SHOPPING CART</h3>
          <a href="" >
            <span onClick={this.dismissCart}>Close</span>
          </a>
        </div>

        {this.props?.cart?.length > 0 ?
          <div className="cart-shop-body">
            <div className="cartshop-items">
              <ul>
                {this.props.cart?.map((item, index) => (
                  <li key={index}>
                    <a href="#">
                      <img src={item.images[0]?.image_url} className="img-fluid" alt="saree"
                        onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
                      /></a>
                    <div className="cart-info">
                      <span className="product-title">{item.content?.title}</span>
                      <div className="pro-store"><span>Store: <span>{item.store_name}</span></span></div>
                      <span className="qty">1 x <span>
                        <FontAwesomeIcon icon={faRupeeSign} />{item.price[0]?.price}</span></span>
                    </div>
                    <a href="#"><FontAwesomeIcon icon={faTimes} onClick={() => this.props.deleteCart(item.id)} /></a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="cart-shop-footer">
              <div className="cart-footer-head">
                <h3>Subtotal:</h3>
                <p><span> <FontAwesomeIcon icon={faRupeeSign} />00.00</span></p>
              </div>

              <div className="cart-action">
                <Link to={'/cart'} >
                  <a href="#">View Cart</a></Link>
                <a href="#">Checkout</a>
              </div>

            </div>
          </div>
          :
          <div className="">
            <span>No products in the cart.</span>
            <a href="#">Return to shop</a>
          </div>}
      </>
    )
  };
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCart: index => dispatch(cartAction.deleteCart(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
