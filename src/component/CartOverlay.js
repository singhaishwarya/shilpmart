import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faTimes } from '@fortawesome/free-solid-svg-icons'
import * as cartAction from '../actions/cart';
import CartService from '../services/CartService';
import ProductService from '../services/ProductService';
class CartOverlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: []
    }
  }

  componentDidMount() {
    this.getCart()
  }

  getCart = () => {
    let productids = [];
    CartService.list().then((result) => {
      result && result.map((item) => (
        productids?.push(item.product_id)
      ));

      ProductService.fetchAllProducts({ product_ids: productids }).then((result1) => {
        this.setState({ cartData: result1.data })
        result1.data.map((item) => (
          this.props.addToCart(item.id)
        ))
      })
    });
  }
  deleteCart = (productid) => {
    CartService.delete({ product_id: productid }).then((result) => {
      if (result.success) {
        this.props.deleteCart(productid);
        this.getCart();
      }
    })
  }

  render() {
    const { cartData } = this.state;

    return (
      <div className="cart-side">
        <div className="cart-side-head">
          <h3>SHOPPING CART</h3>
          <a href="" >
            <span onClick={(e) => (e.preventDefault(), this.props.dismissModal('cart'))}>Close</span>
          </a>
        </div>

        {
          this.props?.cart?.length > 0 ?
            <div className="cart-shop-body">
              <div className="cartshop-items">
                <ul>
                  {cartData?.map((item, index) => (
                    <li key={index}>
                      <Link to={{
                        pathname: `/product-detail`,
                        search: "?pid=" + item?.id
                      }}
                        onClick={(e) => (this.props.dismissModal('cart'))
                        } >
                        <img src={(item?.images?.length > 0 && item?.images[0]?.image_url) || "false"}
                          className="img-fluid"
                          // onClick={() => this.productDetail(item.id)}
                          alt={(item?.images?.length > 0 && item?.images[0]?.caption) || "false"}
                          onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
                        />
                      </Link>
                      <div className="cart-info">
                        <span className="product-title">{item?.content?.title}</span>
                        <div className="pro-store"><span>Store: <span>{item?.store_name}</span></span></div>
                        <span className="qty">1 x <span>
                          {item?.price?.length > 0 && item?.price[0]?.price}</span></span>
                      </div>
                      <a href="#"><FontAwesomeIcon icon={faTimes} onClick={() => this.deleteCart(item)} /></a>
                    </li>
                  ))}
                </ul>
              </div>


            </div>
            :
            <div className="">
              <span>No products in the cart.</span>
              <a href="#">Return to shop</a>
            </div>
        }
        <div className="cart-shop-footer">
          <div className="cart-footer-head">
            <h3>Subtotal:</h3>
            <p><span> 00.00</span></p>
          </div>

          <div className="cart-action">
            <Link to={'/cart'} onClick={() => this.dismissCart()}>
              View Cart</Link>
            <Link to={'/checkout'} onClick={() => this.dismissCart()}>Checkout</Link>
          </div>

        </div>
      </div >
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
    deleteCart: index => dispatch(cartAction.deleteCart(index)),
    addToCart: cart => dispatch(cartAction.addToCart(cart)),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
