import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
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
    this.props.userData?.token ? this.getCartApi() : this.getCart()
  }

  getCartApi = () => {
    let totalCost1 = 0, productids = [];
    CartService.list().then((result) => {
      this.setState({ cartData: result });
      result && result.forEach((item) => {
        productids.push(item.product_id);
        totalCost1 += (item?.product_details?.price[0]?.price * 1 || 0) * (item.quantity * 1);
      });

      this.setState({
        totalCost: totalCost1
      })
    })
  }
  getCart = () => {

    this.props.cart.length > 0 && ProductService.fetchAllProducts({ product_ids: this.props.cart }).then((result1) => {
      this.setState({ cartData: result1.data })
      result1.data.map((item) => (
        this.props.addToCart(item.id)
      ))
    })

  }
  deleteCart = (productid) => {
    this.props.userData?.token ? this.deleteCartApi(productid) : this.props.deleteCart(productid);

  }

  deleteCartApi = (productid) => {

    CartService.delete({ product_id: productid.product_id }).then((result) => {
      if (result.success) {
        this.props.deleteCart(productid.product_id);
        this.props.userData ? this.getCartApi() : this.getCart()
      }
    })
  }

  render() {
    const { cartData, totalCost } = this.state;
    let finItem;
    return (
      <div className="cart-side">
        <div className="cart-side-head">
          <h3>SHOPPING CART</h3>
          <span onClick={(e) => { e.preventDefault(); this.props.dismissModal('cart') }}>Close</span>
        </div>

        {
          this.props?.cart?.length > 0 ?
            <>  <div className="cart-shop-body">
              <div className="cartshop-items">
                <ul>
                  {cartData?.map((item, index) => (
                    finItem = item.product_details || item,

                    <li key={index}>
                      <Link to={{
                        pathname: `/product-detail`,
                        search: "?pid=" + finItem.id
                      }}
                        onClick={(e) => (this.props.dismissModal('cart'))
                        } >
                        <img src={(finItem.images?.length > 0 && finItem.images[0]?.image_url) || "false"}
                          className="img-fluid"
                          // onClick={() => this.productDetail(item.product_details.id)}
                          alt={(finItem.images?.length > 0 && finItem.images[0]?.caption) || ""}
                          onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
                        />
                      </Link>
                      <div className="cart-info">
                        <span className="product-title">{finItem.content?.title}</span>
                        <div className="pro-store"><span>Store: <span>{finItem.store_name}</span></span></div>
                        <span className="qty">{item.quantity} x <span>
                          {finItem.price?.length > 0 && finItem.price[0]?.price}</span></span>
                      </div>
                      <span><FontAwesomeIcon icon={faTimes} onClick={() => this.deleteCart(finItem.id)} /></span>
                    </li>
                  ))}
                </ul>
              </div>


            </div>
              <div className="cart-shop-footer">
                <div className="cart-footer-head">
                  <h3>Subtotal:</h3>
                  <p><span> {totalCost}</span></p>
                </div> <div className="cart-action">
                  <Link to='/cart' onClick={() => this.props.dismissModal()}>
                    View Cart</Link>

                  <Link to={
                    {
                      pathname: '/checkout',
                      state: { checkout: cartData, totalCartCost: totalCost }
                    }
                  }
                    onClick={() => this.props.dismissModal()}
                  >Checkout</Link>
                </div>

              </div>
            </>
            :
            <div className="">
              <span>Your cart is currently empty.</span>
              <span>Return to shop</span>
            </div>
        }

      </div >

    )
  };
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    userData: state.userData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCart: index => dispatch(cartAction.deleteCart(index)),
    addToCart: cart => dispatch(cartAction.addToCart(cart)),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
