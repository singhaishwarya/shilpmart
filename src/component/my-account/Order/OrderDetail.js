import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faQuestionCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getOrderStatus } from "../../../lib/utils";
import { format } from 'date-fns';
import CheckoutService from '../../../services/CheckoutService';
import Modal from "react-modal";
export default class OrderDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orderDetail: props?.location?.state?.orderDetail, base64Doc: '', showModal: false,
    };
  }

  componentDidMount() {
    if (this.state.orderDetail === undefined) {
      this.props.history.push({
        pathname: '/my-account/order'
      })
    }

    this.getInvoidePdf({ order_id: this.state.orderDetail?.id });
  }
  onDocumentLoad({ numPages }) {
    this.setState({ numPages });
  }

  getInvoidePdf(order_id) {
    CheckoutService.orderInvoice(order_id).then((result) => {
      this.setState({ base64Doc: result?.data })
    });
  }
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };
  render() {

    const { orderDetail, base64Doc, showModal } = this.state;
    var report = "data:application/pdf;base64," + base64Doc

    return (
      <div className="row">
        <div className="col">
          <div className="card mb-4 shadow">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-7 border-right">
                  <div className="deladd">
                    <h5>Delivery Address</h5>
                    <p>{orderDetail?.address[0]?.address1}<br /> {orderDetail?.address[0]?.address2} ,{orderDetail?.address[0]?.city}-{orderDetail?.address[0]?.pincode}
                    </p>
                  </div>
                </div> <div className="col-sm-5">
                  <div className="actionBtn">

                    <button onClick={this.toggleModal}>View Invoice</button>
                    <button>Send Email</button>
                    <Modal
                      isOpen={showModal}
                      onRequestClose={this.toggleModal}
                      shouldCloseOnOverlayClick={true}
                      ariaHideApp={false}>
                      <FontAwesomeIcon className="text-left" icon={faTimes} onClick={() => this.toggleModal} />
                      {base64Doc &&
                        <object aria-labelledby="label1" width="100%" height="100%" type="application/pdf" data={report} />
                      }
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {orderDetail?.product_details?.map((item, index) => (
           <div className="card mb-3 shadow" key={index}>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <div className="row">
                    <div className="col-12">
                      <span className="d-block mb-2"><strong>Order No. : {457812 + index}</strong></span>
                    </div>
                    </div>
                    <div className="row mb-2">
                    <div className="col-sm-3">
                      <div className="orderProductImg">
                        <div className="orderimg">
                          <img src={item.images[0].image_url} className="img-fluid" alt="CSC" />
                        </div>
                        <span>+4 More Item</span>
                        
                      </div>
                    </div>
                    <div className="col-sm-9">
                      <div className="orderproductInfo">
                        <span className="title">{item.title.title}</span>
                        <span>₹ {item.price}</span>
                        {/* <span className="plusItem"><small>+</small>4</span> */}
                      </div>
                    </div>
                  </div>

                 


                </div>

                <div className="col-sm-6">
                  <div className="orderRangewrap">
                    <div className="orderRange">
                      <span className="orderd"><small>Orderd</small><p className="rangeDate"><small>{format(new Date(item.created_at), 'dd-MM-yyyy')}</small></p></span>
                      {/* <span className="packed"><small>Packed</small><p className="rangeDate"><small>Sat, 15 June 21</small></p></span>
                      <span className="shipped"><small>Shipped</small><p className="rangeDate"><small>Sat, 15 June 21</small></p></span>
                      <span className="delivered"><small>Delivered</small><p className="rangeDate"><small>Sat, 15 June 21</small></p></span>
                      <span className="cancelledRange"><small>Cancelled</small><p className="rangeDate"><small>Sat, 15 June 21</small></p></span> */}
                    </div>


                  </div>
                  <p><small>Your Order is {getOrderStatus(orderDetail.status)}</small></p>
                </div>

                <div className="col-sm-3">
                  <div className="orderstatus">
                    <div className="orderstate"> <span>{getOrderStatus(orderDetail.status)}</span></div>
                    <div className="needhlep"><Link to="\"><FontAwesomeIcon icon={faQuestionCircle} /> Need Help</Link></div>
                  </div>
                </div>
              </div>

              <div className="row">
               
               <div className="col-md-6 offset-md-3">
             
               <div className="row mb-2">
                  <div className="col-sm-3">
                    <div className="orderProductImg">
                      <div className="orderimg">
                        <img src={item.images[0].image_url} className="img-fluid" alt="CSC" />
                      </div>                        
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="orderproductInfo">
                      <span className="title">{item.title.title}</span>
                      <span>₹ {item.price}</span>
                      
                    </div>
                  </div>

                  <div className="col-sm-3">
                  <div className="orderstatus">
                    <div className="orderstate"> <span>{getOrderStatus(orderDetail.status)}</span></div>
                    <div className="needhlep"><Link to="\"><FontAwesomeIcon icon={faQuestionCircle} /> Need Help</Link></div>
                  </div>
                </div>

                </div>
                {/* <div className="awbinfo">AWB No. <FontAwesomeIcon icon={faQuestionCircle} />
                <span className="awbfullinfo">AWB Info</span>
                </div> */}
                


                <div className="row mb-2">
                  <div className="col-sm-3">
                    <div className="orderProductImg">
                      <div className="orderimg">
                        <img src={item.images[0].image_url} className="img-fluid" alt="CSC" />
                      </div>                        
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="orderproductInfo">
                      <span className="title">{item.title.title}</span>
                      <span>₹ {item.price}</span>
                      
                    </div>
                  </div>

                  <div className="col-sm-3">
                  <div className="orderstatus">
                    <div className="orderstate"> <span>{getOrderStatus(orderDetail.status)}</span></div>
                    <div className="needhlep"><Link to="\"><FontAwesomeIcon icon={faQuestionCircle} /> Need Help</Link></div>
                  </div>
                </div>

                </div>

                
                <div className="row mb-2">
                  <div className="col-sm-3">
                    <div className="orderProductImg">
                      <div className="orderimg">
                        <img src={item.images[0].image_url} className="img-fluid" alt="CSC" />
                      </div>                        
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="orderproductInfo">
                      <span className="title">{item.title.title}</span>
                      <span>₹ {item.price}</span>
                      
                    </div>
                  </div>

                  <div className="col-sm-3">
                  <div className="orderstatus">
                    <div className="orderstate"> <span>{getOrderStatus(orderDetail.status)}</span></div>
                    <div className="needhlep"><Link to="\"><FontAwesomeIcon icon={faQuestion} /> Need Help</Link></div>
                  </div>
                </div>

                </div>





                <div className="row mb-2">
                  <div className="col-sm-3">
                    <div className="orderProductImg">
                      <div className="orderimg">
                        <img src={item.images[0].image_url} className="img-fluid" alt="CSC" />
                      </div>                        
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="orderproductInfo">
                      <span className="title">{item.title.title}</span>
                      <span>₹ {item.price}</span>
                      
                    </div>
                  </div>

                  <div className="col-sm-3">
                  <div className="orderstatus">
                    <div className="orderstate"> <span>{getOrderStatus(orderDetail.status)}</span></div>
                    <div className="needhlep"><Link to="\"><FontAwesomeIcon icon={faQuestionCircle} /> Need Help</Link></div>
                  </div>
                </div>


                </div>

                 </div>

                

                </div>

                <div className="row">
                  <div className="col">
                    <span className="viewAllItems"><strong>View more detail</strong></span>
                  </div>
                </div>


              {/* <div className="card">
                <div className="card-body">
                  <div className="refundComplete"><span>Refund Completed  <span>(Refund ID: SM454545454)</span></span>
                    <ul>
                      <li>₹ 2500.0 has been refunded to your Account on June 15</li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          </div> 
          
           ))}

        </div>
      </div >
    );
  }
}