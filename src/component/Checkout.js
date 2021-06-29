import React from 'react';
import AddressService from '../services/AddressService';
import OrderService from '../services/OrderService';
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import ToastService from '../services/ToastService';
import Login from "./Login";
import { CheckoutProvider, Checkout } from 'paytm-blink-checkout-react';
import Loader from "react-loader";
import * as cartAction from '../actions/cart';
import { loaderOptions, customLoginStyles, paymentConfig } from "../lib/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCheck, faStar, faTimes, faTruck } from '@fortawesome/free-solid-svg-icons';
class CheckoutComp extends React.Component {
  constructor(props) {
    super(props);
    if (typeof props?.location?.state !== 'undefined') {
      localStorage.setItem('checkOutData', JSON.stringify(props?.location?.state?.checkout));
      localStorage.setItem('totalCartCost', props?.location?.state?.totalCartCost)
    }

    this.state = {
      addressList: [],
      selectedShippingAddress: {},
      selectedBillingAddress: {},
      showModal: false,
      checkOutData: JSON.parse(localStorage.getItem('checkOutData')) || [],
      totalCartCost: localStorage.getItem('totalCartCost') || 0,
      paymentType: '', paytmConfig: {},
      txnResponse: {},
      isCheckoutClick: false,
      checksumResponse: {},
      isLoaded: false,
      isBillingAddressSame: true,
      addressType: ''
    };

  }

  componentDidMount() {
    if (this.props.userData?.token) {
      this.setState({ isLoaded: false });
      this.getAddress();
    } else {
      this.setState({ isLoaded: true });
      this.dismissModal('login')
    }

  }

  getAddress = () => {
    AddressService.list().then((result) => {
      if (!result) return
      this.setState({ selectedShippingAddress: result.data.find(({ is_default }) => is_default === 1) || result.data[0], addressList: result.data, isLoaded: true });

    }).catch((err) => {
      this.setState({ isLoaded: true });
      console.log(err);
    });
  }

  orderValidate = (txnResponse, online_type) => {
    var txnObj = {
      txn_response: txnResponse,
      online_type: online_type,
    }
    OrderService.orderValidate(txnObj).then(async (result) => {
      this.setState({ isLoaded: true })
      if (!result) return
      this.props.history.push({
        pathname: '/thankyou/for-payment/',
        state: { paymentType: this.state.paymentType, result: result.data }
      });
      localStorage.removeItem("checkOutData");
      localStorage.removeItem("totalCartCost");
      this.props.emptyCart();
    })
  }

  dismissModal = (type, addressType) => {
    if (type === 'address') {
      this.setState({
        addressType: addressType
      });
      if (addressType === "billing") {

        this.setState({
          showModal: !this.state.showModal, overlayType: type
        });
      }
    } else {
      this.setState({
        showModal: !this.state.showModal, overlayType: type
      });
    }

  };

  changeAddress = (type) => {
    this.setState({
      showModal: !this.state.showModal, overlayType: 'address', addressType: type
    });
  }

  handleCheckout = async (e) => {
    this.setState({ isCheckoutClick: true })
    const { paymentType } = this.state;
    e.preventDefault();
    let checkoutObj = {}, prodObj = [];
    if (!this.state.selectedShippingAddress?.id) return ToastService.error("Please select shipping address");
    if (!paymentType) return ToastService.error("Please select payment type");

    if (this.props.userData?.token) {
      this.setState({ isLoaded: false });
      checkoutObj = {
        is_checkout: true,
        coupan_code: "",
        isBillingAddressSame: this.state.isBillingAddressSame,
        billing_address: {
          address_id: this.state.isBillingAddressSame ? this.state.selectedShippingAddress?.id : this.state.selectedBillingAddress?.id
        },
        shipping_address: {
          address_id: this.state.selectedShippingAddress?.id
        },
        is_payment_online: paymentType === 'cod' ? false : true,
        payment_detail: {
          online_type: paymentType,
          callback: '',
          website: "WEBSTAGING",
          channel_id: "WEB"
        }
      };
      this.state.checkOutData.map((item) => {
        prodObj.push({
          "product_id": item.product_details?.id || item.id,
          "quantity": item.quantity || 1,
          "variation_index": item.variation_index || 1
        })
      });
      checkoutObj.products = prodObj;

      OrderService.orderPlace(checkoutObj).then(async (result) => {
        if (!result) return
        if (paymentType === 'paytm') {

          let _this = this;
          _this.setState({
            paytmConfig: {
              root: "",
              flow: "DEFAULT",
              data: {
                orderId: result.data.order_details.id,
                token: result.data.checksum.body.txnToken,
                tokenType: "TXN_TOKEN",
                amount: result.data.order_details.order_total
              },
              handler: {
                notifyMerchant: function (eventName, data) {
                  console.log("notifyMerchant handler function called");
                },
                transactionStatus: function (data) {
                  window.Paytm.CheckoutJS.close();
                  console.log("demo request header", document, window)
                  _this.orderValidate(data, paymentType);
                }
              },
              merchant: {
                mid: paymentConfig.paytmMid,
                callbackUrl: "",
                name: "E-Shilpmart",
                logo: "https://main.digitalindiacorporation.in/static/media/logo-eshilp.dffc449c.svg",
                redirect: false,
              },
              mapClientMessage: {},
              labels: {},
              payMode: {
                labels: {},
                filter: { exclude: [] },
                order: ["NB", "CARD", "LOGIN"]
              }
            }
          });
        }
        if (paymentType === 'airpay') {
          this.setState({ isLoaded: false });
          var information = {
            action: "https://payments.airpay.co.in/pay/index.php",
            params: result.data.checksum
          };
          this.post(information)
          localStorage.setItem('paymentType', 'airpay');
        }
        this.setState({ isLoaded: true });
      }).catch((err) => {
        console.log(err);
      })
    }
    else {
      this.dismissModal('login')
    }
  }

  post(details) {
    const form = this.buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
  }

  buildForm({ action, params }) {
    var form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)
    for (const [key, value] of Object.entries(params)) {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', key)
      input.setAttribute('value', value)
      form.appendChild(input)
    }
    return form
  }

  render() {
    const { checkOutData, totalCartCost, selectedShippingAddress, selectedBillingAddress, showModal, addressList, paymentType, overlayType, paytmConfig, isCheckoutClick, isLoaded, isBillingAddressSame, addressType } = this.state;


    let finItem;
    return (
      <section>
        <CheckoutProvider config={paytmConfig} env='STAGE'>
          <Checkout />
        </CheckoutProvider>
        <div>
          <Modal
            isOpen={showModal}
            style={overlayType === 'login' ? customLoginStyles : {}}
            shouldCloseOnOverlayClick={false}
            ariaHideApp={false}
          > {overlayType === 'login' ? <Login
            dismissModal={() => this.dismissModal(overlayType)} {...this.state} /> :
            <div className="changeadd">
              <span><FontAwesomeIcon className="text-left" icon={faTimes} onClick={() => this.setState({
                showModal: false, selectedBillingAddress: selectedBillingAddress ? selectedBillingAddress : {}
              })} /></span>
              <h1 className="border-bottom mb-3"> Select Address</h1>
              
              <div className="row">
              {addressList?.map((item, index) => (
                <div className="col-sm-3 col-12">
                <div className="card shadow mb-3">
                  <div className="card-body">
                  <address className="selectAdd" key={index}><strong>{item.name}</strong>
                  <br />{item.address1} <br />{item.address2} <br /> {item.sub_district}
                  <br /> {item.district},  {item.state} - {item.pincode}<br />
                  <strong>Mobile No.</strong>: {item.mobile}<br />
                  <strong>Email</strong> : {item?.email} 
                  {/* <p className="d-flex justify-content-between">
                    <span onClick={() => {
                      addressType === 'shipping' ? this.setState({ selectedShippingAddress: item, showModal: false }) :
                        this.setState({ selectedBillingAddress: item, showModal: false, isBillingAddressSame: false })
                    }} className="btn btn-dark btn-theme">Select</span>
                  </p> */}
                </address>
                <div className="form-check radioPos">
        <input className="form-check-input" type="radio" name="selectAdd" id="selectAdd" defaultValue="option1" defaultChecked />
        
      </div>
                    </div>
                </div>
                </div>
                
                
              ))} </div> <Link to='/my-account/add-address' className="btn btn-dark btn-theme" > Add New Address</Link></div>}
          </Modal>
        </div>

        <Loader loaded={isLoaded} message='Loading...' options={loaderOptions} className="spinner" >
          <div className="container-fluid">
            <div className="row py-5">

              <div className="col-md-8 order-md-1">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="checkoutSteps">
                      <div className="checkoutSrno">1</div>
                      <div className="checkoutinfo">
                        <span>Login <FontAwesomeIcon icon={faCheck} /></span>
                        <span className="bottominfo">+919811148709</span>
                      </div>
                      <button>Change</button>
                    </div>
                  </div>
                </div>


                <div className="card mb-3">
                  <div className="changeHead">
                    <h3>
                      <span className="srno">1</span>
                      <span>Login</span>
                    </h3>
                  </div>
                  <div className="changewrapper">
                    <div className="row">
                      <div className="col">
                        <div className="logedinfo p-4">
                          <p className="text-muted">Phone: <span className="text-dark"> +919811148709</span></p>
                          <p><span className="text-bold text-active">Logout & Sign in to another account</span></p>
                          <div className="nextbutton"><button>Continue checkout</button></div>
                        </div>

                      </div>
                      <div className="col">
                        <div className="p-4">
                          <p>Advantages of our secure login</p>
                          <ul className="advantagelogin">
                            <li><FontAwesomeIcon icon={faTruck} /> Easily Track Orders, Hassle free Returns</li>
                            <li><FontAwesomeIcon icon={faBell} /> Get Relevant Alerts and Recommendation</li>
                            <li><FontAwesomeIcon icon={faStar} /> Wishlist, Reviews, Ratings and more.</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-muted pt-3 px-5">Please note that upon clicking "Logout" you will lose all items in cart and will be redirected to eShilpmart home page.</p>

                    </div>
                  </div>

                </div>






                <div className="card mb-3">
                  <div className="card-body">
                    <div className="checkoutSteps">
                      <div className="checkoutSrno">2</div>
                      <div className="checkoutinfo">
                        <span>Delivery Address <FontAwesomeIcon icon={faCheck} /></span>
                        <span className="bottominfo">Aishwarya Singh, burhanputr, Sarojni nagar thana</span>
                      </div>
                      <button>Change</button>
                    </div>
                  </div>
                </div>

                <div className="card mb-3">
                  <div className="changeHead">
                    <h3>
                      <span className="srno">2</span>
                      <span>Delivery Address</span>
                    </h3>
                  </div>
                  <div className="changewrapper">
                    <div className="row">
                      <div className="col">
                        <div className="addresswraper">
                          <p className="d-flex addressTop">
                            <span><strong><FontAwesomeIcon icon={faCheck} /> Ram Chandra</strong></span>
                            <span className="type">Home</span>
                            <span><strong>+919811148709</strong></span>
                          </p>
                          <p>G-164, badarpur, New Delhi, Delhi</p>
                          <div className="nextbutton"><button>Deliver Here</button></div>
                        </div>

                      </div>
                      <div className="col">
                        <span className="checkEdit">Edit</span>
                      </div>


                    </div>
                  </div>

                </div>



                <div className="card mb-3">
                  <div className="card-body">
                    <div className="checkoutSteps">
                      <div className="checkoutSrno">3</div>
                      <div className="checkoutinfo">
                        <span>Order Summary <FontAwesomeIcon icon={faCheck} /></span>
                        <span className="bottominfo">Items</span>
                      </div>
                      <button>Change</button>
                    </div>
                  </div>
                </div>


                <div className="card mb-3">
                  <div className="changeHead">
                    <h3>
                      <span className="srno">3</span>
                      <span>Order Summary</span>
                    </h3>
                  </div>
                  <div className="changewrapper">
                    <div className="row">
                      <div className="col">
                        <div className="orderSummaryWrapper">
                          <div className="orderSummary">
                            <div className="orderImg"><img src="https://seller.digitalindiacorporation.in/images/2/shirt31623065435.jpeg" class="img-fluid" /></div>
                            <div className="orderInfo">
                              <p className="producthead">Product Title</p>
                              <p className="seller">Seller: <span>Seller Name</span></p>
                              <span className="productprice"><span>₹</span> 399</span>
                              <span className="mainprice"><strike><span>₹</span> 500</strike></span>

                            </div>
                            <div className="whendeliver">Delivery by <span>30, June</span> | 45</div>


                          </div>

                          <div className="orderaction">
                            <div class="product-qty">
                              <div class="input-group">
                                <input type="button" class="quantity-left-minus" value="-" />
                                <input type="number" value="5" />
                                <input type="button" class="quantity-right-plus" value="+" />
                              </div>
                            </div>
                            <span>Remove</span>
                          </div>
                        </div>





                      </div>

                    </div>
                  </div>

                </div>





                <div className="card mb-3">
                  <div className="card-body">
                    <div className="checkoutSteps">
                      <div className="checkoutSrno">4</div>
                      <div className="checkoutinfo">
                        <span>Payment Options <FontAwesomeIcon icon={faCheck} /></span>
                      </div>
                      <button>Change</button>
                    </div>
                  </div>
                </div>

                <div className="card mb-3">
                  <div className="changeHead">
                    <h3>
                      <span className="srno">4</span>
                      <span>Payment Options</span>
                    </h3>
                  </div>
                  <div className="changewrapper">
                    <div className="row">
                      <div className="paymentOption">
                        <div className="form-check">
                          <input id="credit" name="paymentMethod" type="radio" className="form-check-input" value='cod'
                            checked={paymentType === 'cod'} disabled={totalCartCost > 5000}
                            onChange={() => this.setState({ paymentType: 'cod', isCheckoutClick: false })} />

                          <label className="form-check-label" htmlFor="credit">
                            Cash On Delivery
                          </label>
                        </div>
                        {totalCartCost > 5000 && <span>Cash On Delivery is unavailable for current order</span>}
                        <div className="form-check">
                          <input id="debit" name="paymentMethod" type="radio" className="form-check-input" value='paytm'
                            checked={paymentType === 'paytm'}
                            onChange={() => this.setState({ paymentType: 'paytm', isCheckoutClick: false })} />
                          <label className="form-check-label" htmlFor="debit">
                            Paytm  <img src="https://app.digitalindiacorporation.in/v1/digi/wp-content/plugins/paytm-payments/images/paytm.png" width="55px" alt="Paytm"></img>
                          </label>
                        </div>
                        <div className="form-check">

                          <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" value='airpay'
                            checked={paymentType === 'airpay'}
                            onChange={() => this.setState({ paymentType: 'airpay', isCheckoutClick: false })} />
                          <label className="form-check-label" htmlFor="paypal">
                            Online Payments <img src="https://app.digitalindiacorporation.in/v1/digi/wp-content/plugins/woocommerce-gateway-airpay/assets/img/logo_airpay.png" alt="Online Payments"></img>
                          </label>
                        </div>
                      </div>





                    </div>
                  </div>

                </div>








                <div className="card shadow pr-5">
                  <div className="card-body">


                    <h4 className="mb-3">Shipping address</h4>
                    {selectedShippingAddress?.name ? <>< address  > {selectedShippingAddress?.name}
                      <br />{selectedShippingAddress?.address1} <br />{selectedShippingAddress?.address2} <br /> {selectedShippingAddress?.sub_district}
                      <br /> {selectedShippingAddress?.district},  {selectedShippingAddress?.state} - {selectedShippingAddress?.pincode}<br />
                      <strong>Mobile No.</strong>: {selectedShippingAddress?.mobile}<br />
                      <strong>Email</strong> : {selectedShippingAddress?.email} <br /><br />
                    </address>
                      <p className="">
                        <span className="btn btn-dark btn-theme" onClick={() => {
                          this.changeAddress('shipping')
                        }}>
                          Change Address</span>
                      </p></> : <p className="">
                      <span onClick={() => this.props.userData.token ? this.props.history.push({
                        pathname: '/my-account/add-address'
                      }) : this.dismissModal('login')} className="btn btn-dark btn-theme" > Add New Address</span>
                    </p>}
                    <hr className="mb-4" />
                    {/* <div>
                      <input type="checkbox" checked={isBillingAddressSame}
                        onChange={() => { this.dismissModal('address', "billing") }}
                      />
                  <label htmlFor="same-address">Shipping address is the same as my billing address</label>
                    </div> */}

                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" checked={isBillingAddressSame}
                        onChange={() => { this.dismissModal('address', "billing") }} />
                      <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                    </div>

                    {selectedBillingAddress?.name ?
                      <>
                        <h4 className="mb-3">Billing address</h4>
                        <address> {selectedBillingAddress?.name}
                          <br />{selectedBillingAddress?.address1} <br />{selectedBillingAddress?.address2} <br /> {selectedBillingAddress?.sub_district}
                          <br /> {selectedBillingAddress?.district},  {selectedBillingAddress?.state} - {selectedBillingAddress?.pincode}<br />
                          <strong>Mobile No.</strong>: {selectedBillingAddress?.mobile}<br />
                          <strong>Email</strong> : {selectedBillingAddress?.email} <br /><br />
                        </address>
                        <p className="">
                          <span className="btn btn-dark btn-theme" onClick={() => this.changeAddress('billing')}>
                            Change Address</span>
                        </p></> : ''
                      //   <p className="">
                      //   <span onClick={() => this.props.userData.token ? this.props.history.push({
                      //     pathname: '/my-account/add-address'
                      //   }) : this.dismissModal('login')} className="btn btn-dark btn-theme" > Add New Address</span>
                      // </p>
                    }
                    {/* <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="save-info" />
                      <label className="custom-control-label" htmlFor="save-info">Save this information for next time</label>
                    </div> */}
                    < form className="needs-validation login-card" >
                      <hr className="mb-4" />
                      <div className="d-block my-3">
                        <div className="form-check">
                          <input id="credit" name="paymentMethod" type="radio" className="form-check-input" value='cod'
                            checked={paymentType === 'cod'} disabled={totalCartCost > 5000}
                            onChange={() => this.setState({ paymentType: 'cod', isCheckoutClick: false })} />

                          <label className="form-check-label" htmlFor="credit">
                            Cash On Delivery
                          </label>
                        </div>
                        {totalCartCost > 5000 && <span>Cash On Delivery is unavailable for current order</span>}
                        <div className="form-check">
                          <input id="debit" name="paymentMethod" type="radio" className="form-check-input" value='paytm'
                            checked={paymentType === 'paytm'}
                            onChange={() => this.setState({ paymentType: 'paytm', isCheckoutClick: false })} />
                          <label className="form-check-label" htmlFor="debit">
                            Paytm  <img src="https://app.digitalindiacorporation.in/v1/digi/wp-content/plugins/paytm-payments/images/paytm.png" width="55px" alt="Paytm"></img>
                          </label>
                        </div>
                        <div className="form-check">

                          <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" value='airpay'
                            checked={paymentType === 'airpay'}
                            onChange={() => this.setState({ paymentType: 'airpay', isCheckoutClick: false })} />
                          <label className="form-check-label" htmlFor="paypal">
                            Online Payments <img src="https://app.digitalindiacorporation.in/v1/digi/wp-content/plugins/woocommerce-gateway-airpay/assets/img/logo_airpay.png" alt="Online Payments"></img>
                          </label>
                        </div>

                      </div>

                      <hr className="mb-4" />
                      <button className="btn login-btn btn-lg btn-block" type="button" disabled={isCheckoutClick} onClick={(e) => this.handleCheckout(e)}> Continue to checkout
                      </button>
                    </form>
                  </div>
                </div>
              </div>


              <div className="col-md-4 order-md-2 mb-4">
                <div className="card product-img-wrapper">
                  <div className="card-header"><h5 className="text-dark text-uppercase mb-0 font-weight-bold">Price Details</h5></div>
                  <div className="card-body">
                    <ul className="list-group">
                      {checkOutData.map((item, index) => (
                        finItem = item.product_details || item,
                        < li key={index} className="d-flex justify-content-between border-bottom py-2">
                          <div>
                            <h6 className="my-0">{finItem?.content?.title}</h6>
                            <span>Store: <small className="text-muted">{finItem?.store_name}</small></span>
                          </div>
                          <span className="text-muted"><span>₹</span> {finItem?.price} X {item?.quantity ? item?.quantity : 1}</span>

                        </li>
                      ))}
                      {/* <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span className="text-success"><span>₹</span> -0.0</span>
                </li> */}
                      <li className="d-flex justify-content-between pt-3">
                        <h5><span className="text-dark">Total Payable</span></h5>
                        <strong><span>₹</span> {totalCartCost}</strong>
                      </li>
                    </ul>
                  </div>

                </div>
                {/* <p>Have a coupon? Enter your code here...</p> */}
                {/* <form className="card p-2">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Coupon code" />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-dark btn-theme">Apply Coupon</button>
                  </div>
                </div>
              </form> */}

              </div>


            </div>
          </div >
        </Loader>
      </section >
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.userData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    emptyCart: index => dispatch(cartAction.emptyCart(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutComp);

