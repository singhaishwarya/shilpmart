import React from 'react';
import CheckoutService from '../services/CheckoutService';
export default class CheckoutCallback extends React.Component {

  constructor(props) {
    super(props);

    console.log("demo constructor", props.location.state);
    console.log("demo request header", document.sessionStorage)
    this.props.location?.state?.paymentType === 'airpay' && this.orderValidate(props.location?.state?.paymentType)
  }

  orderValidate = (online_type) => {
    var txnObj = {
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

  render() {
    return (
      <div className="empty-wishlist">
        <h2>Thank you for shopping with us.</h2>
      </div>
    );
  }
}