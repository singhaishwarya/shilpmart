import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cartAction from '../actions/cart';
import CartService from '../services/CartService';
import ProductService from '../services/ProductService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faTimes } from '@fortawesome/free-solid-svg-icons'
class Cart extends Component {

  constructor() {
    super();
    this.state = {
      productCount: 1
    };
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
        this.props.addToCart(result1.data);
      })
    })
  }

  deleteCart = (product_id) => {
    let data = { quantity: 1, product_id: product_id, variation_index: 0 }
    CartService.delete(data).then((result) => (
      result.success ? this.getCart() : null
    ))
  }

  countInc = () => {
    this.setState({ productCount: this.state.productCount + 1 });
  }

  countDec = () => {
    this.setState({ productCount: this.state.productCount - 1 });
  }

  productCountManual = (event) => {

    this.setState({ productCount: event.target.value });
  }

  render() {
    const { cart } = this.props;
    const { productCount } = this.state;
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
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td className="product-remove"><span onClick={() => this.deleteCart(item.id)}>X</span></td>
                      <td className="product-thumbnail"><a href="#">
                        {/* <img src="images/top-300x300.jpeg" alt="img" className="img-fluid" /> */}
                        <img src={(item.images?.length > 0 && item?.images[0]?.image_url) || "false"}
                          className="img-fluid"
                          // onClick={() => this.productDetail(item.id)}
                          alt={(item.images?.length > 0 && item.images[0]?.caption) || "false"}
                          onError={e => { e.currentTarget.src = require('../public/bag1.jpeg') }}
                        />
                      </a></td>
                      <td className="product-name"><a href="#">{item.content?.title}</a>
                        <p>Store : <span><a href="#">{item.store_name}</a></span></p></td>
                      <td className="product-subtotal"><span> <FontAwesomeIcon icon={faRupeeSign} />{item.price?.length > 0 && item.price[0]?.price}
                      </span></td>
                      <td className="product-quantity" data-title="Quantity"><div className="product-qty">
                        <div className="input-group">
                          <input type="button" value="-" className="quantity-left-minus" disabled={productCount < 1} onClick={() => this.countDec()} />
                          <input type="number" value={productCount} onChange={this.productCountManual} />
                          <input type="button" value="+" onClick={() => this.countInc()} className="quantity-right-plus" />
                        </div>
                      </div>
                      </td>
                      <td className="product-price"><span><span>₹</span> 2,899.00</span></td>
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
            <div className="cart-shop-footer position-relative border">
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
              <div className="cart-action cart-action2"> <a href="#"> Proceed to checkout</a> </div>
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
