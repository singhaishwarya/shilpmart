import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutService from '../../../services/CheckoutService';
import { format } from 'date-fns'
export default class Orders extends React.Component {

  constructor() {
    super();
    this.state = {
      orderList: []
    };
  }
  componentDidMount() {
    this.getOrders();
  }
  getOrders = () => {
    CheckoutService.list().then((result) => {
      if (!result) return
      this.setState({ orderList: result.data });
    }).catch((err) => {
      console.log(err);
    });
  }
  cancelOrder = (order) => {

    let productIds = [];
    order.product_details.map((item) => {
      productIds.push(item.id)
    })
    CheckoutService.orderCancel({ order_id: order.id, product_id: productIds }).then((result) => {
      if (!result) return
      // this.setState({ orderList: result.data });

    }).catch((err) => {
      console.log(err);
    });
  }

  getOrderStatus = (status) => {
    switch (status) {
      case 0:
        return 'Initiated'
      case 1:
        return 'Confirmed'
      case 2:
        return 'Payment Failed'
      case 3:
        return 'Order confirmed by vendor'
      case 4:
        return 'Item given to dop'
      case 5:
        return 'Delivered';

    }
  }

  render() {

    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Date</th>
              <th scope="col">Order Status</th>
              <th scope="col">Total</th>

              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orderList.map((item, index) => <tr key={index}>
              <td>#{item.id}</td>
              <td>{format(new Date(item.created_at), 'dd-MM-yyyy')}{ }</td>
              <td className="text-success">{this.getOrderStatus(item.status)}</td>
              <td><span>₹</span>{item.order_total}</td>
              <td className="text-right act-btn">
                <Link to='/my-account/order-detail'><button type="button" className="btn btn-success btn-sm">View</button></Link>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => this.cancelOrder(item)}>Cancel</button>
                <button type="button" className="btn btn-warning btn-sm">Support</button>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}