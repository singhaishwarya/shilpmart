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
    let totalCost1 = 0;
    CartService.list().then((result) => {
      this.setState({ cartData: result });
      result && result.forEach((item) => {
        totalCost1 += (((item?.product_details?.prices[item.variation_index]?.price || item?.product_details?.prices[0]?.price) * 1) || 0) * (item.quantity * 1);
      });

      this.setState({
        totalCost: totalCost1
      })
    })
  }
  getCart = () => {
    let totalCost1 = 0;
    this.props.cart.map((item, index) => {
      ProductService.fetchAllProducts({ product_ids: [item.product] }).then((result1) => {
        totalCost1 += ((result1.data[0]?.prices[item.variation_index]?.price * item.quantity) || 0.00);
        this.setState(prevState => ({
          cartData: [...prevState.cartData, { product: result1.data[0], variation_index: item.variation_index, quantity: item.quantity }],
          totalCost: totalCost1
        }))
      })
    });

  }
  deleteCart = (product) => {
    if (this.props.userData?.token) { this.deleteCartApi(product.product_id, product.variation_index) }
    else {
      this.props.deleteCart({ product: product?.product.id, variation_index: product.variation_index });
      let cartData = this.state.cartData.filter(item => item.product.id !== product.product.id);
      this.setState({ cartData: cartData });
    }
  }

  deleteCartApi = (productid, variation_index) => {
    CartService.delete({ product_id: productid.product_id || productid, variation_index }).then((result) => {
      if (result.success) {
        this.props.deleteCart({ product: productid.product_id || productid, variation_index: variation_index });
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
                    finItem = item?.product_details || item.product,
                    <li key={index}>
                      <span><FontAwesomeIcon icon={faTimes} onClick={() => this.deleteCart(item)} /></span>
                      <div className="cart_wrap">

                        <Link to={{
                          pathname: `/product-detail`,
                          search: "?pid=" + finItem?.content?.product_id
                        }}
                          onClick={(e) => (this.props.dismissModal('cart'))
                          } >
                          <img src={(finItem?.images?.length > 0 && finItem?.images[item.variation_index]?.image_url) || "false"}
                            className="img-fluid"
                            // onClick={() => this.productDetail(item.product_details.id)}
                            alt={(finItem?.images?.length > 0 && finItem?.images[item.variation_index]?.caption) || ""}
                            onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
                          />
                        </Link>
                        <div className="cart-info">
                          <span className="product-title">{finItem?.content?.title}</span>
                          {/* <div className="pro-store"><span>Store: <span>{finItem?.store_name}</span></span></div> */}
                          <span className="qty">{item?.quantity || 1} x
                            <span>₹ {finItem?.prices[item.variation_index]?.price || finItem?.prices[0]?.price}</span>
                          </span>
                        </div>
                      </div>


                    </li>
                  ))}
                </ul>
              </div>


            </div>
              <div className="cart-shop-footer">
                <div className="cart-footer-head">
                  <h3>Subtotal:</h3>
                  <p><span> <span>₹</span> {totalCost}</span></p>
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
            <div className="cart-empty">
              <p>No products in the cart.</p>
              <Link to="/product-list" onClick={() =>
                this.props.dismissModal('cart')
              } >Return to shop</Link>
            </div>
        }

      </div >

    )
  }
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
