import React from 'react';
import OrderService from '../services/OrderService';
export default class CheckoutCallback extends React.Component {

  constructor(props) {
    super(props);
    var request = new XMLHttpRequest();
    console.log("demo====", request.getAllResponseHeaders());
    this.props.location?.state?.paymentType === 'airpay' && this.orderValidate(localStorage.getItem('paymentType'))
  }

  orderValidate = (online_type) => {

    OrderService.orderValidate({
      online_type: online_type,
    }).then(async (result) => {
      this.setState({ isLoaded: true })
      if (!result) return

      localStorage.removeItem("checkOutData");
      localStorage.removeItem("totalCartCost");
      localStorage.removeItem("paymentType");
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