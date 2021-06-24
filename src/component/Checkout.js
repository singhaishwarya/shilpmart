import React from 'react';
import AddressService from '../services/AddressService';
import CheckoutService from '../services/CheckoutService';
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import ToastService from '../services/ToastService';
import Login from "./Login";
import { CheckoutProvider, Checkout } from 'paytm-blink-checkout-react';
import Loader from "react-loader";
import * as cartAction from '../actions/cart';
import { loaderOptions, customLoginStyles, paymentConfig } from "../lib/utils";

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
    CheckoutService.orderValidate(txnObj).then(async (result) => {
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

  dismissModal = (type, addressType, isBillingAddressSame) => {

    if (type === 'address') {
      this.setState({ addressType: addressType, isBillingAddressSame: isBillingAddressSame });
      if (addressType === "billing") {
        if (!this.state.isBillingAddressSame) return;
        else {
          this.setState({
            showModal: !this.state.showModal, overlayType: type
          });
        }
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
          online_type: paymentType, callback: 'https://main.digitalindiacorporation.in/thankyou/for-payment',
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

      CheckoutService.orderPlace(checkoutObj).then(async (result) => {
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
          localStorage.removeItem("checkOutData");
          localStorage.removeItem("totalCartCost");
          this.props.emptyCart();
          this.props.history.push({
            pathname: '/thankyou/for-payment/',
            state: { paymentType: paymentType }
          })
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
    // console.log("demo====", showModal || !isBillingAddressSame, '===', showModal, !isBillingAddressSame)
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
            onRequestClose={() => this.setState({ showModal: false })}
            shouldCloseOnOverlayClick={true}
            contentLabel="Select Address"
            ariaHideApp={false}
          > {overlayType === 'login' ? <Login
            dismissModal={() => this.dismissModal(overlayType)} {...this.state} /> :
            <>{addressList?.map((item, index) => (
              <address key={index}>{item.name}
                <br />{item.address1} <br />{item.address2} <br /> {item.sub_district}
                <br /> {item.district},  {item.state} - {item.pincode}<br />
                <strong>Mobile No.</strong>: {item.mobile}<br />
                <strong>Email</strong> : {item?.email} <br /><br />
                <p className="d-flex justify-content-between">
                  <span onClick={() => {
                    addressType === 'shipping' ? this.setState({ selectedShippingAddress: item, showModal: false }) :
                      this.setState({ selectedBillingAddress: item, showModal: false })
                  }} className="btn btn-dark btn-theme">Select</span>
                </p>
              </address>
            ))}  <Link to='/my-account/add-address' className="btn btn-dark btn-theme" > Add New Address</Link></>}
          </Modal>
        </div>

        <Loader loaded={isLoaded} message='Loading...' options={loaderOptions} className="spinner" >
          <div className="container-fluid">
            <div className="row py-5">
              <div className="col-md-4 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted text-center">Your order</span>
                  {/* <span className="badge badge-secondary badge-pill">3</span> */}
                </h4>
                <ul className="list-group mb-3 shadow(">
                  {checkOutData.map((item, index) => (
                    finItem = item.product_details || item,
                    <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 className="my-0">{finItem?.content?.title}</h6>
                        <span>Store: <small className="text-muted">{finItem?.store_name}</small></span>
                      </div>
                      <span className="text-muted"><span>₹</span> {((finItem?.price?.length > 0 && finItem?.price[0]?.price) || 0)}</span>
                    </li>
                  ))}
                  {/* <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span className="text-success"><span>₹</span> -0.0</span>
                </li> */}
                  <li className="list-group-item d-flex justify-content-between">
                    <h5><span>Total Payable</span></h5>
                    <strong><span>₹</span> {totalCartCost}</strong>
                  </li>
                </ul>
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
              <div className="col-md-8 order-md-1">
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
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" defaultChecked={this.state.isBillingAddressSame} onChange={() => { this.dismissModal('address', "billing", !isBillingAddressSame) }} />
                      <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                    </div>

                    {!isBillingAddressSame ?
                      <>
                        <h4 className="mb-3">Billing address</h4>
                        < address  > {selectedBillingAddress?.name}
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
                        <div className="custom-control custom-radio">
                          <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" value='cod'
                            checked={paymentType === 'cod'} disabled={totalCartCost > 5000}
                            onChange={() => this.setState({ paymentType: 'cod', isCheckoutClick: false })} />
                          <label className="custom-control-label" htmlFor="credit">Cash On Delivery</label>
                        </div>
                        {totalCartCost > 5000 && <span>Cash On Delivery is unavailable for current order</span>}
                        <div className="custom-control custom-radio">
                          <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" value='paytm'
                            checked={paymentType === 'paytm'}
                            onChange={() => this.setState({ paymentType: 'paytm', isCheckoutClick: false })} />
                          <label className="custom-control-label" htmlFor="debit">Paytm  <img src="https://app.digitalindiacorporation.in/v1/digi/wp-content/plugins/paytm-payments/images/paytm.png" alt="Paytm"></img></label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" value='airpay'
                            checked={paymentType === 'airpay'}
                            onChange={() => this.setState({ paymentType: 'airpay', isCheckoutClick: false })} />
                          <label className="custom-control-label" htmlFor="paypal">Online Payments <img src="https://app.digitalindiacorporation.in/v1/digi/wp-content/plugins/woocommerce-gateway-airpay/assets/img/logo_airpay.png" alt="Online Payments"></img></label>
                        </div>
                      </div>

                      <hr className="mb-4" />
                      <button className="btn login-btn btn-lg btn-block" type="button" disabled={isCheckoutClick} onClick={(e) => this.handleCheckout(e)}> Continue to checkout
                      </button>
                    </form>
                  </div>
                </div>
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

