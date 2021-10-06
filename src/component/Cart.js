import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cartAction from '../actions/cart';
import CartService from '../services/CartService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ProductService from '../services/ProductService';
import Login from "./Login";
import Modal from 'react-modal';
import { customLoginStyles } from "../lib/utils";
class Cart extends Component {

  constructor() {
    super();
    this.state = {
      productCount: 1,
      cartProduct: [],
      totalCost: 0,
      showModal: false,
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
        totalCost1 += ((item?.product_details?.prices[item.variation_index]?.price || item?.product_details?.prices[0]?.price) * 1 || 0) * (item.quantity * 1)
      ))
      this.setState({
        totalCost: totalCost1
      })
    })
  }

  getCart = () => {

    let totalCost1 = 0;
    this.props.cart.map((item, index) => {
      ProductService.fetchAllProducts({ product_ids: [item.product] }).then((result1) => {
        totalCost1 += ((result1.data[0]?.prices[item.variation_index]?.price || result1.data[0]?.prices[0]?.price) * 1 || 0) * (item.quantity * 1)

        this.setState(prevState => ({
          cartProduct: [...prevState.cartProduct, { product: result1.data[0], variation_index: item.variation_index, quantity: item.quantity }], totalCost: totalCost1
        }))
      })
    });

  }
  deleteCart = (product, index) => {
    let totalCost1;
    if (this.props.userData?.token) { (this.deleteCartApi(product)) }
    else {
      this.props.deleteCart({ product: product?.product.id, variation_index: product.variation_index });
      this.setState((prevState) => ({
        cartProduct: prevState.cartProduct.filter((_, i) => i !== index)
      }));
      totalCost1 = this.state.totalCost - (product.quantity * product.product.prices[product.variation_index]?.price)

      this.setState({ totalCost: totalCost1 });
    }

  }

  deleteCartApi = (product) => {
    CartService.delete({ product_id: product.product_id || product?.product.id, variation_index: product.variation_index }).then((result) => {
      if (result.success) {
        this.props.deleteCart({ product: (product.product_id || product?.product.id), variation_index: product.variation_index });
        this.props.userData ? this.getCartApi() : this.getCart()
      }
    })
  }

  changeQuantity = (product, quantity, variation) => {
    this.setState({ productCount: quantity });
    CartService.changeQuantity({ quantity: quantity, product_id: product.id, variation_index: variation }).then((result) => {
      if (result?.success) { this.props.userData?.token ? this.getCartApi() : this.getCart() }
    })
  }

  productDetail = (value) => {
    this.props.history.push({
      pathname: '/product-detail',
      search: "?pid=" + value?.content?.product_id
    });
  }

  handleCheckout = (cartProduct, totalCost) => {
    this.props.userData?.token ? this.props.history.push({
      pathname: '/checkout',
      state: { checkout: cartProduct, totalCartCost: totalCost }

    }) : this.setState({
      showModal: !this.state.showModal
    });
  }

  dismissModal = () => {

    this.setState({
      showModal: !this.state.showModal
    });


  };
  render() {
    const { cartProduct, totalCost, showModal } = this.state;
    const { cart } = this.props;
    let finItem, _variationIndex = 0;
    return (
      <div className="container-fluid">
        <Modal
          isOpen={showModal}
          style={customLoginStyles}
          shouldCloseOnOverlayClick={false}
          ariaHideApp={false}
        >  <Login
            dismissModal={() => this.setState({
              showModal: !this.state.showModal
            })} {...this.state} />
        </Modal>
        {cart?.length > 0 ? <div className="row py-5">
          <form className="col-lg-8 col-sm-6 col-12">

            <div className="cart-table-wrapper">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">PRODUCT</th>
                      <th scope="col"></th>
                      <th scope="col">PRICE</th>
                      <th scope="col">QUANTITY</th>
                      <th scope="col">SUBTOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProduct?.map((item, index) => (
                      finItem = item.product_details || item.product,
                      finItem.images.forEach((imageItem, imageIndex) => {
                        if (imageItem.variation_index === item.variation_index) {
                          _variationIndex = imageIndex;
                        }
                      }),
                      <tr key={index}>
                        <td className="product-remove"><span onClick={() => this.deleteCart(item, index)}><FontAwesomeIcon icon={faTrashAlt} /></span></td>
                        <td className="product-thumbnail">
                          <img src={(finItem?.images[_variationIndex || 0]?.image_url) || "false"}
                            className="img-fluid"
                            onClick={() => this.productDetail(finItem)}
                            alt={(finItem?.images[_variationIndex || 0]?.caption) || ""}
                            onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
                          />
                        </td>
                        <td className="product-name">{finItem?.content?.title}
                          {item?.variations?.length > 1 ? <span>( {item?.variations[0]?.variation_id}:{item?.variations[0]?.variation_value} , {item?.variations[1]?.variation_id}:{item?.variations[1]?.variation_value})</span> : ''}
                        </td>
                        <td className="product-subtotal"><span> <span>₹</span> {(finItem?.prices[item.variation_index]?.price || finItem?.prices[0]?.price)}
                        </span></td>
                        <td className="product-quantity" data-title="Quantity"><div className="product-qty">
                          <div className="input-group">
                            <input type="button" value="-" className="quantity-left-minus" onClick={() => this.changeQuantity(item.product_details, item.quantity - 1, item.variation_index)} disabled={this.props.userData.token ? false : true} />
                            <input type="number" value={item.quantity || 1} onChange={(e) => this.changeQuantity(item.product_details, e.target.value, item.variation_index)} disabled={this.props.userData.token ? false : true} />
                            <input type="button" value="+" onClick={() => this.changeQuantity(item.product_details, item.quantity + 1, item.variation_index)
                            } className="quantity-right-plus" disabled={this.props.userData.token ? false : true} />
                          </div>
                        </div>
                        </td>
                        <td className="product-price"><span><span>₹</span> {((finItem?.prices[item.variation_index || 0]?.price || finItem?.prices[0]?.price) * item.quantity)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
          <div className="col-lg-4 col-sm-6 col-12">
            <div className="product-img-wrapper">
              <div className="border p-4">
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
           

              </div>
              <div className="cart-action cart-action2" onClick={() => this.handleCheckout(cartProduct, totalCost)}><button className="btn btn-theme login-btn mt-3" >Proceed to checkout </button> </div>
              
            </div>            
            
          </div>

        </div> : <div className="cart-shop-body">
          <div className="cart-empty p-5"><p>No products in the cart.</p><a href="/product-list">Return to shop</a></div>
        </div>
        }
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
