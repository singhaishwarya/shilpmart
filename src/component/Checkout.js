import React from 'react';
import AddressService from '../services/AddressService';
import CheckoutService from '../services/CheckoutService';
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ToastService from '../services/ToastService';
import Login from "./Login";
import axios from "axios";

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
      payment_type: ''
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


  handleCheckout = (e) => {

    e.preventDefault();
    let checkoutObj = {}, prodObj = [];


    if (this.props.userData?.token) {
      if (!this.state.selectedAddress.id) return ToastService.error("Please select shipping address");
      if (!this.state.payment_type) return ToastService.error("Please select payment type");

      checkoutObj = {
        "is_checkout": true,
        "coupan_code": "",
        "is_billing_address_same": 'true',
        "billing_address": {
          "address_id": this.state.selectedAddress.id
        },
        "shipping_address": {
          "address_id": this.state.selectedAddress.id
        },
        "is_payment_online": this.state.payment_type === 'cod' ? false : true,
        "payment_detail": {
          "online_type": this.state.payment_type,
          'callback': 'http://localhost:3000/checkout',
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

      CheckoutService.orderPlace(checkoutObj).then((result) => {
        if (!result) return


        var information = {
          action: "https://payments.airpay.co.in/pay/index.php",
          params: result.data.checksum
        };
        this.post(information)


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
  //   var amount = "100.00";
  //   var phone_number = "9026892671";
  //   var email = "aishsinghniit@gmail.com";
  //   var orderId = "ORDER_ID" + (new Date().getTime());
  //   let params = {
  //     amount: amount,
  //     phone_number: phone_number,
  //     email: email,
  //     orderId: orderId,
  //     txnAmount: 100,
  //     userInfo: { custId: 12345 }
  //   }

  //   var url = "http://localhost:3003/paynow";
  //   var request = {
  //     url: url,
  //     data: params,
  //     method: 'get',
  //     headers: {
  //       "Access-Control-Allow-Origin": "true", 'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     crossdomain: true, proxy: {
  //       host: 'localhost',
  //       port: 3003
  //     }

  //   }
  //   const response = await axios(request);
  //   const processParams = await response.json;
  //   console.log("demo==", processParams)
  // } catch {
  //   console.log("demo error")
  // }
  // }

  render() {
    const { checkOutData, totalCartCost, selectedAddress, showModal, addressList, payment_type, overlayType } = this.state;
    let finItem;
    return (
      <section>
        <ToastContainer />
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

