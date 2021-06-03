import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cartAction from '../actions/cart';
import CartService from '../services/CartService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import ProductService from '../services/ProductService';
class Cart extends Component {

  constructor() {
    super();
    this.state = {
      productCount: 1,
      cartProduct: [],
      totalCost: 0
    };
  }

  componentDidMount() {
    this.props.userData?.token ? this.getCartApi() : this.getCart()

  }
  getCartApi = () => {
    let totalCost1 = 0;
    CartService.list().then((result) => {
      this.setState({ cartProduct: result });
      result.map((item) => (
        totalCost1 += (item?.product_details?.price[0]?.price * 1 || 0) * (item.quantity * 1)
      ))
      this.setState({
        totalCost: totalCost1
      })
    })
  }

  getCart = () => {

    this.props.cart.length > 0 && ProductService.fetchAllProducts({ product_ids: this.props.cart }).then((result1) => {
      this.setState({ cartProduct: result1.data })
      result1.data.map((item) => (
        this.props.addToCart(item.id)
      ))
    })

  }
  deleteCart = (productid) => {
    this.props.userData?.token ? this.deleteCartApi(productid) : this.props.deleteCart(productid);

  }
  deleteCartApi = (productid) => {
    CartService.delete({ product_id: productid }).then((result) => {
      if (result?.success) {
        this.props.userData?.token ? this.getCartApi() : this.getCart()
      }
    })
  }

  productCountManual = (event, product) => {

    this.setState({ productCount: event.target.value });
    this.changeQuantity(product, event.target.value)

  }

  changeQuantity = (product, quantity) => {
    this.setState({ productCount: quantity });
    CartService.changeQuantity({ quantity: quantity, product_id: product.id }).then((result) => {
      if (result?.success) { this.props.userData?.token ? this.getCartApi() : this.getCart() }
    })
  }

  productDetail = (value) => {
    this.props.history.push({
      pathname: '/product-detail',
      search: "?pid=" + value
    });
  }

  render() {
    const { cartProduct, totalCost } = this.state;
    let finItem;
    return (
      <div className="container-fluid">

        {this.props?.cart?.length > 0 ? <div className="row py-5">
          <form className="col-lg-8 col-sm-6 col-12">

            <div className="cart-table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">PRODUCT</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">QUANTITY</th>
                    <th scope="col">SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProduct.map((item, index) => (
                    finItem = item.product_details || item,
                    <tr key={index}>
                      <td className="product-remove"><span onClick={() => this.deleteCart(finItem?.id)}><FontAwesomeIcon icon={faTrashAlt} /></span></td>
                      <td className="product-thumbnail">
                        <img src={(finItem?.images?.length > 0 && finItem?.images[0]?.image_url) || "false"}
                          className="img-fluid"
                          onClick={() => this.productDetail(item.product_details.id)}
                          alt={(finItem?.images?.length > 0 && finItem?.images[0]?.caption) || "false"}
                          onError={e => { e.currentTarget.src = require('../public/bag1.jpeg') }}
                        />
                      </td>
                      <td className="product-name">{finItem?.content?.title}
                        <p>Store : <span><span>{finItem?.store_name}</span></span></p></td>
                      <td className="product-subtotal"><span> <span>₹</span> {(finItem?.price?.length > 0 && finItem?.price[0]?.price) || 0}
                      </span></td>
                      <td className="product-quantity" data-title="Quantity"><div className="product-qty">
                        <div className="input-group">
                          <input type="button" value="-" className="quantity-left-minus" onClick={() => this.changeQuantity(item.product_details, item.quantity - 1)} disabled={this.props.userData.token ? false : true} />
                          <input type="number" value={item.quantity || 1} onChange={(e) => this.changeQuantity(item.product_details, e.target.value)} disabled={this.props.userData.token ? false : true} />
                          <input type="button" value="+" onClick={() => this.changeQuantity(item.product_details, item.quantity + 1)
                          } className="quantity-right-plus" disabled={this.props.userData.token ? false : true} />
                        </div>
                      </div>
                      </td>
                      <td className="product-price"><span><span>₹</span> {(finItem?.price?.length > 0 && finItem?.price[0]?.price * item.quantity) || 0}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <div className="row">
                <div className="col">
                  <div className="cart-coupon-wrapper mb-3">
                    <label className="d-none">Coupon</label>
                    <input type="text" name="" value="" placeholder="Coupon Code..." />
                    <button>Apply Coupon</button>
                  </div>
                </div>
              </div> */}
            </div>
          </form>
          <div className="col-lg-4 col-sm-6 col-12">
            <div className="cart-shop-footer position-relative border p-4">
              <h4>CART TOTALS</h4>
              <div className="cart-footer-head py-3">
                <h6>Subtotal :</h6>
                <p><span>₹{totalCost} </span></p>
              </div>
              <div className="cart-footer-head border-top py-3">
                <h6>Shipping :</h6>
                <p><span>₹00.00</span></p>
              </div>
              <div className="cart-footer-head border-top py-3">
                <h5>Total</h5>
                <p><span>₹{totalCost}</span></p>
              </div>
              <div className="cart-action cart-action2"> <Link to={
                {
                  pathname: '/checkout',
                  state: { checkout: cartProduct, totalCartCost: totalCost }
                }
              }> Proceed to checkout</Link> </div>
            </div>
          </div>

        </div> : <div className="cart-shop-body">
          <span>Your cart is currently empty.</span>
          <span>Return to shop</span>
        </div>}
      </div>

    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
