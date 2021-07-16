import React from 'react';
import OrderService from '../services/OrderService';
export default class CheckoutCallback extends React.Component {

  constructor(props) {
    super(props);
    this.props.location?.state?.paymentType === 'airpay' &&
      this.orderValidate(localStorage.getItem('paymentType'), localStorage.getItem('orderId'))
  }

  orderValidate = (paymentType, orderId) => {

    OrderService.orderValidate({
      online_type: paymentType, order_id: orderId
    }).then(async (result) => {
      this.setState({ isLoaded: true })
      if (!result) return
      console.log("demo===", result)
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