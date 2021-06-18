import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutService from '../../../services/CheckoutService';
import Loader from "react-loader";
import { getOrderStatus } from "../../../lib/utils";
import { format } from 'date-fns'

export default class Orders extends React.Component {

  constructor() {
    super();
    this.state = {
      orderList: [], isLoaded: false
    };
  }
  componentDidMount() {
    this.getOrders();
  }
  getOrders = () => {

    CheckoutService.list().then((result) => {
      if (!result) return
      this.setState({ orderList: result.data, isLoaded: true });
    }).catch((err) => {
      console.log(err);
      this.setState({ isLoaded: true })
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

  render() {
    var options = {
      lines: 13,
      length: 20,
      width: 10,
      radius: 30,
      scale: 1.00,
      corners: 1,
      color: '#000',
      opacity: 0.25,
      rotate: 0,
      direction: 1,
      speed: 1,
      trail: 60,
      fps: 20,
      zIndex: 2e9,
      top: '50%',
      left: '50%',
      shadow: false,
      hwaccel: false,
      position: 'absolute'
    };
    const { orderList, isLoaded } = this.state
    return (
      <div className="row">
        <div className='col-lg-3 col-12'>
          <div className='myaccout-sidebar'>
            <div className="card shadow">
              <div className="card-body">
                <article className='filter-group'>
                  <h6 className='title'>ORDER STATUS </h6>
                  <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="ondaway" value="black" />
                    <label className="form-check-label " htmlFor="ondaway">On the way</label>
                  </div>
                  <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="deliver" value="black" />
                    <label className="form-check-label " htmlFor="deliver">Delivered</label>
                  </div>

                  <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="cancel" value="black" />
                    <label className="form-check-label " htmlFor="cancel">Cancelled</label>
                  </div>

                  <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="returne" value="black" />
                    <label className="form-check-label " htmlFor="returne">Returned</label>
                  </div>

                  <h6 className='title'>ORDER TIME </h6>

                  <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="lastday" value="black" />
                    <label className="form-check-label " htmlFor="lastday">Last 30 days</label>
                  </div>
                  <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="lastyear" value="black" />
                    <label className="form-check-label " htmlFor="lastyear">2020</label>
                  </div>

                  <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="llyear" value="black" />
                    <label className="form-check-label " htmlFor="llyear">2019</label>
                  </div>

                  <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="older" value="black" />
                    <label className="form-check-label " htmlFor="older">Older</label>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        <div className='col-lg-9 col-12'>
          <div className="input-group mb-4 shadow">
            <input type="text" className="form-control" placeholder="Search your order here..." />
            <div className="input-group-append">
              <button className="btn btn-theme" type="button">
                <i className="fa fa-search"></i> Search Order
              </button>
            </div>
          </div>
          <Loader loaded={isLoaded} message='Loading...' options={options} className="spinner" >
            {orderList.length > 0 && isLoaded ?
              orderList.map((item, index) => (
                <div className="card mb-3 shadow" key={index}>
                  <div className="card-body myorderList">
                    <Link to={{
                      pathname: '/my-account/order-detail',
                      state: { orderDetail: item }
                    }}  >
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="row">
                            <div className="col-sm-3">
                              <div className="orderProductImg">
                                <div className="orderimg">
                                  <img src={require("../../../public/saree.jpg")} className="img-fluid" alt="CSC" />
                                </div>
                                {item.product_details.length > 1 && <span>+{item.product_details.length - 1} More {item.product_details.length === 2 ? "Item" : "Items"}</span>}
                              </div>
                            </div>
                            <div className="col-sm-9">
                              <div className="orderproductInfo">
                                <span className="title">Cotton Saree For Product Title</span>
                                <span> <span>Seller: xyz</span></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-2"><span>{format(new Date(item.created_at), 'dd-MM-yyyy')}</span></div>
                        <div className="col-sm-2"><span>₹ {item.order_total}</span></div>
                        <div className="col-sm-2">
                          <div className="orderstatus">
                            <div className="statusColor returne"> <span>{getOrderStatus(item.status)}</span></div>
                            {/* <div className="statusReq"><p>As per your request, your item has been cancelled</p></div> */}
                          </div>
                        </div>
                      </div></Link>
                  </div>
                </div>))
              : <div className="card shadow">
                <div className="card-body">
                  <div className="orderlist">
                    <div className="noOrder">
                      <h2>You have No Order Yet!</h2>
                      <Link to="/product-list">Start Shopping</Link>
                    </div>
                  </div>
                </div>
              </div>}
          </Loader>
        </div>
        <div>
        </div>
      </div>

      // <div className="table-responsive">
      //   <table className="table table-hover">
      //     <thead>
      //       <tr>
      //         <th scope="col">Order ID</th>
      //         <th scope="col">Date</th>
      //         <th scope="col">Order Status</th>
      //         <th scope="col">Total</th>

      //         <th className="text-right">Actions</th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {this.state.orderList.map((item, index) => <tr key={index}>
      //         <td>#{item.id}</td>
      //         <td>{format(new Date(item.created_at), 'dd-MM-yyyy')}{ }</td>
      //         <td className="text-success">{this.getOrderStatus(item.status)}</td>
      //         <td><span>₹</span>{item.order_total}</td>
      //         <td className="text-right act-btn">
      //           <Link to='/my-account/order-detail'><button type="button" className="btn btn-success btn-sm">View</button></Link>
      //           <button type="button" className="btn btn-danger btn-sm" onClick={() => this.cancelOrder(item)}>Cancel</button>
      //           <button type="button" className="btn btn-warning btn-sm">Support</button>
      //         </td>
      //       </tr>)}
      //     </tbody>
      //   </table>
      // </div>
    );
  }
}