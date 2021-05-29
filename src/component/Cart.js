import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cartAction from '../actions/cart';
import CartService from '../services/CartService';
import { Link } from "react-router-dom";

class Cart extends Component {

  constructor() {
    super();
    this.state = {
      productCount: 1,
      cartProduct: []
    };
  }

  componentDidMount() {
    this.getCart()
  }
  getCart = () => {
    CartService.list().then((result) => {
      this.setState({ cartProduct: result });
    })
  }

  deleteCart = (productid) => {
    this.props.deleteCart(productid);
    CartService.delete({ product_id: productid }).then((result) => {
      if (result.success) { this.getCart() }
    })
  }

  productCountManual = (event, product) => {

    this.setState({ productCount: event.target.value });
    this.changeQuantity(product, event.target.value)

  }

  changeQuantity = (product, quantity) => {
    this.setState({ productCount: quantity });
    CartService.changeQuantity({ quantity: quantity, product_id: product }).then((result) => {
      if (result.success) { this.getCart() }
    })
  }

  productDetail = (value) => {
    this.props.history.push({
      pathname: '/product-detail',
      search: "?pid=" + value
    });
  }

  render() {
    const { productCount, cartProduct } = this.state;
    return (
      <div className="container-fluid">

        <div className="row py-5">
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
                    <tr key={index}>
                      <td className="product-remove"><span onClick={() => this.deleteCart(item?.id)}>X</span></td>
                      <td className="product-thumbnail"><a href="#">
                        <img src={(item?.product_details.images?.length > 0 && item?.product_details.images[0]?.image_url) || "false"}
                          className="img-fluid"
                          onClick={() => this.productDetail(item.product_details.id)}
                          alt={(item?.product_details.images?.length > 0 && item?.product_details.images[0]?.caption) || "false"}
                          onError={e => { e.currentTarget.src = require('../public/bag1.jpeg') }}
                        />
                      </a></td>
                      <td className="product-name"><a href="#">{item?.product_details.content?.title}</a>
                        <p>Store : <span><a href="#">{item?.product_details.store_name}</a></span></p></td>
                      <td className="product-subtotal"><span> <span>₹</span> {item?.product_details.price?.length > 0 && item?.product_details.price[0]?.price}
                      </span></td>
                      <td className="product-quantity" data-title="Quantity"><div className="product-qty">
                        <div className="input-group">
                          <input type="button" value="-" className="quantity-left-minus" disabled={productCount < 1} onClick={() => this.changeQuantity(item, item.quantity - 1)} />
                          <input type="number" value={productCount} onChange={(e) => this.changeQuantity(item, e.target.value)} />
                          <input type="button" value="+" onClick={() => this.changeQuantity(item, item.quantity + 1)
                          } className="quantity-right-plus" />
                        </div>
                      </div>
                      </td>
                      <td className="product-price"><span><span>₹</span> {item?.product_details.price[0]?.price}</span></td>
                    </tr>))}
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
                <p><span>00.00</span></p>
              </div>
              <div className="cart-footer-head border-top py-3">
                <h6>Shipping :</h6>
                <p><span>00.00</span></p>
              </div>
              <div className="cart-footer-head border-top py-3">
                <h5>Total</h5>
                <p><span>00.00</span></p>
              </div>
              <div className="cart-action cart-action2"> <Link to={'/checkout'} > Proceed to checkout</Link> </div>
            </div>
          </div>

        </div>
      </div>

    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
