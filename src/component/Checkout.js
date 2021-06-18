import React from 'react';
import AddressService from '../services/AddressService';
import CheckoutService from '../services/CheckoutService';
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ToastService from '../services/ToastService';
import Login from "./Login";
import { CheckoutProvider, Checkout } from 'paytm-blink-checkout-react';
const https = require('https');

const customAddressStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
class CheckoutComp extends React.Component {
  constructor(props) {
    super(props);
    if (typeof props?.location?.state !== 'undefined') {
      localStorage.setItem('checkOutData', JSON.stringify(props?.location?.state?.checkout));
      localStorage.setItem('totalCartCost', props?.location?.state?.totalCartCost)
    }

    this.state = {
      addressList: [],
      selectedAddress: {},
      showModal: false,
      checkOutData: JSON.parse(localStorage.getItem('checkOutData')) || [],
      totalCartCost: localStorage.getItem('totalCartCost') || 0,
      payment_type: '', config: {}
    };
  }

  componentDidMount() {

    this.getAddress();

  }
  getAddress = () => {
    AddressService.list().then((result) => {
      if (!result) return
      this.setState({ selectedAddress: result.data.find(({ is_default }) => is_default === 1) || result.data[0], addressList: result.data })
    }).catch((err) => {
      console.log(err);
    });
  }
  dismissModal = (type) => {
    this.setState({
      showModal: !this.state.showModal, overlayType: type
    });
  };


  handleCheckout = async (e) => {

    e.preventDefault();
    let checkoutObj = {}, prodObj = [];


    if (this.props.userData?.token) {
      if (!this.state.selectedAddress?.id) return ToastService.error("Please select shipping address");
      if (!this.state.payment_type) return ToastService.error("Please select payment type");

      checkoutObj = {
        "is_checkout": true,
        "coupan_code": "",
        "is_billing_address_same": true,
        "billing_address": {
          "address_id": this.state.selectedAddress.id
        },
        "shipping_address": {
          "address_id": this.state.selectedAddress.id
        },
        "is_payment_online": this.state.payment_type === 'cod' ? false : true,
        "payment_detail": {
          "online_type": this.state.payment_type,
          'callback': 'https://main.digitalindiacorporation.in/thankyou/for-payment',
          'website': "WEBSTAGING",
          'channel_id': "WEB",
          "country": this.state.selectedAddress.country,
          "pincode": this.state.selectedAddress.pincode,
          "state": this.state.selectedAddress.state,
          "city": this.state.selectedAddress.city
        }
      };
      this.state.checkOutData.map((item) => {
        prodObj.push({
          "product_id": item.product_details?.id || item.id,
          "quantity": item.quantity,
          "variation_index": item.variation_index
        })
      });
      checkoutObj.products = prodObj;

      CheckoutService.orderPlace(checkoutObj).then(async (result) => {
        if (!result) return

        if (this.state.payment_type === 'paytm') {

          var post_data = JSON.stringify(result.data.checksum);

          var options = {
            hostname: 'securegw-stage.paytm.in',
            port: 443,
            path: '/theia/api/v1/initiateTransaction?mid=Digita62153518081968&orderId=' + result.data.order_details.id,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': post_data.length
            }
          };

          var response = "";
          let _this = this;
          var post_req = https.request(options, function (post_res) {

            post_res.on('data', function (chunk) {
              response += chunk;
            });

            post_res.on('end', function () {
              var txnResponse = JSON.parse(response)
              _this.setState({
                config: {
                  root: "",
                  flow: "DEFAULT",
                  data: {
                    orderId: result.data.order_details.id,
                    token: txnResponse.body.txnToken,
                    tokenType: "TXN_TOKEN",
                    amount: result.data.order_details.order_total
                  },
                  handler: {
                    notifyMerchant: function (eventName, data) {
                      console.log("notifyMerchant handler function called");
                      console.log("eventName => ", eventName);
                      console.log("data => ", data);
                    }
                  },
                  merchant: {
                    mid: "Digita62153518081968",
                    callbackUrl: "https://main.digitalindiacorporation.in/thankyou/for-payment",
                    name: "E-Shilpmart",
                    logo: "https://main.digitalindiacorporation.in/static/media/logo-eshilp.dffc449c.svg",
                    redirect: true
                  },
                  mapClientMessage: {},
                  labels: {},
                  payMode: {
                    labels: {},
                    filter: { exclude: [] },
                    order: [
                      "NB",
                      "CARD",
                      "LOGIN"
                    ]
                  }
                }
              });
            });
          });

          post_req.write(post_data);
          post_req.end();
        }
        if (this.state.payment_type === 'airpay') {
          var configAirpay = {
            "buyerEmail": "buyer@example.com",
            "buyerPhone": 9898989989898,
            "buyerFirstName": "Sam",
            "buyerLastName": "Johan",
            "orderid": "d3t54978",
            "amount": result.data.order_details.order_total,
            "privatekey": result.data.checksum.privatekey,
            "mercid": result.data.checksum.mercid,
            "checksum": result.data.checksum.checksum,
            "currency": 356,
            "isocurrency": "INR",
            "token": "",
            "sb_nextrundate": "03/23/2016",
            "sb_period": "Month",
            "sb_frequency": 2,
            "sb_amount": 20.00,
            "sb_isrecurring": 1,
            "sb_recurringcount": 1,
            "sb_retryattempts": 1,
            "sb_trial_amount": 2.00,
            "sb_trial_period": 1,
            "sb_trial_frequency": 1
          }
          var information = {
            action: "https://payments.airpay.co.in/pay/index.php",
            params: configAirpay
          };

          console.log("Demo===", information)
          this.post(information)
        }

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
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)

    Object.keys(params).forEach(key => {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', key)
      input.setAttribute('value', JSON.stringify(params[key]))
      form.appendChild(input)
    })

    return form
  }

  render() {
    const { checkOutData, totalCartCost, selectedAddress, showModal, addressList, payment_type, overlayType, config } = this.state;
    let finItem;
    return (
      <section>
        <ToastContainer />
        {config && <CheckoutProvider config={config} env='STAGE'>
          <Checkout />
        </CheckoutProvider>}
        <div>
          <Modal
            isOpen={showModal}
            onRequestClose={() => this.setState({ showModal: false })}
            style={customAddressStyles}
            shouldCloseOnOverlayClick={true}
            contentLabel="Select Address"
            ariaHideApp={false}
          > {overlayType === 'login' ? <Login dismissModal={() => this.dismissModal(overlayType)} {...this.state} /> :
            <>{addressList?.map((item, index) => (
              <address key={index}>{item.name}
                <br />{item.address1} <br />{item.address2} <br /> {item.sub_district}
                <br /> {item.district},  {item.state} - {item.pincode}<br />
                <strong>Mobile No.</strong>: {item.mobile}<br />
                <strong>Email</strong> : {item?.email} <br /><br />
                <p className="d-flex justify-content-between">
                  <span onClick={() => {
                    this.setState({ selectedAddress: item, showModal: false })
                  }} className="btn btn-dark btn-theme">Select</span>
                </p>
              </address>
            ))}  <Link to='/my-account/add-address' className="btn btn-dark btn-theme" > Add New Address</Link></>}
          </Modal>
        </div>
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
                  <strong><span>₹</span> {totalCartCost}.00</strong>
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
                  {selectedAddress?.name ? <>< address  > {selectedAddress?.name}
                    <br />{selectedAddress?.address1} <br />{selectedAddress?.address2} <br /> {selectedAddress?.sub_district}
                    <br /> {selectedAddress?.district},  {selectedAddress?.state} - {selectedAddress?.pincode}<br />
                    <strong>Mobile No.</strong>: {selectedAddress?.mobile}<br />
                    <strong>Email</strong> : {selectedAddress?.email} <br /><br />
                  </address>
                    <p className="">
                      <span className="btn btn-dark btn-theme" onClick={() => this.dismissModal('address')}>
                        Change Address</span>
                    </p></> : <p className="">
                    <span onClick={() => this.props.userData.token ? this.props.history.push({
                      pathname: '/my-account/add-address'
                    }) : this.dismissModal('login')} className="btn btn-dark btn-theme" > Add New Address</span>
                  </p>}
                  <form className="needs-validation login-card"  >
                    <hr className="mb-4" />
                    <div className="d-block my-3">
                      <div className="custom-control custom-radio">
                        <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" value='cod'
                          checked={payment_type === 'cod'}
                          onChange={() => this.setState({ payment_type: 'cod' })} />
                        <label className="custom-control-label" htmlFor="credit">Cash On Delivery</label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" value='paytm'
                          checked={payment_type === 'paytm'}
                          onChange={() => this.setState({ payment_type: 'paytm' })} />
                        <label className="custom-control-label" htmlFor="debit">Paytm  <img src="https://app.digitalindiacorporation.in/v1/digi/wp-content/plugins/paytm-payments/images/paytm.png" alt="Paytm"></img></label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" value='airpay'
                          checked={payment_type === 'airpay'}
                          onChange={() => this.setState({ payment_type: 'airpay' })} />
                        <label className="custom-control-label" htmlFor="paypal">Online Payments <img src="https://app.digitalindiacorporation.in/v1/digi/wp-content/plugins/woocommerce-gateway-airpay/assets/img/logo_airpay.png" alt="Online Payments"></img></label>
                      </div>
                    </div>

                    <hr className="mb-4" />
                    <button className="btn login-btn btn-lg btn-block" type="button" onClick={(e) => this.handleCheckout(e)}> Continue to checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div >

      </section >
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.userData
  }
};

export default connect(mapStateToProps, null)(CheckoutComp);

