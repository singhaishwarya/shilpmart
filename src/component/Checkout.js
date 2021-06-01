import React from 'react';
export default class Checkout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkOutData: props?.location?.state?.checkout || [],
      totalCartCost: props?.location?.state?.totalCartCost || 0,
    };
  }


  render() {
    const { checkOutData, totalCartCost } = this.state;
    let finItem;
    return (
      <section>
        <div className="container-fluid">
          <div className="row py-5">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted text-center">Your order</span>
                {/* <span className="badge badge-secondary badge-pill">3</span> */}
              </h4>
              <ul className="list-group mb-3 shadow">
                {checkOutData.map((item, index) => (
                  finItem = item.product_details ? item.product_details : item,
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">{finItem?.content?.title}</h6>
                      <span>Store: <small className="text-muted">{finItem?.store_name}</small></span>
                    </div>
                    <span className="text-muted"><span>₹</span> {((finItem?.price?.length > 0 && finItem?.price[0]?.price) || 0)}</span>
                  </li>))}
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span className="text-success"><span>₹</span> -0.0</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <h5><span>Total Payable</span></h5>
                  <strong><span>₹</span> {totalCartCost}</strong>
                </li>
              </ul>
              <p>Have a coupon? Enter your code here...</p>
              <form className="card p-2">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Coupon code" />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-dark btn-theme">Apply Coupon</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-8 order-md-1">
              <div className="card shadow pr-5">
                <div className="card-body">
                  <h4 className="mb-3">Billing address</h4>
                  <form className="needs-validation login-card" noValidate>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder required />

                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" id="lastName" placeholder required />

                      </div>
                    </div>


                    <div className="mb-3">
                      <label htmlFor="address">Address</label>
                      <input type="text" className="form-control" id="address" placeholder="address here..." required />

                    </div>
                    <div className="mb-3">
                      <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
                      <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="mobileNO">Mobile No.</label>
                        <input type="text" className="form-control" id="mobileNO" placeholder="Enter mobile no" required />

                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="emailId">Email ID</label>
                        <input type="text" className="form-control" id="emailId" placeholder="Enter email id here.." required />

                      </div>
                    </div>


                    <div className="row">
                      <div className="col-md-5 mb-3">
                        <label htmlFor="country">Country</label>
                        <select className="custom-select d-block w-100" id="country" required>
                          <option value>Choose...</option>
                          <option>India</option>
                        </select>

                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="state">State</label>
                        <select className="custom-select d-block w-100" id="state" required>
                          <option value>Choose...</option>
                          <option>New Delhi</option>
                        </select>

                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="zip">Zip</label>
                        <input type="text" className="form-control" id="zip" placeholder required />

                      </div>
                    </div>
                    <hr className="mb-4" />
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="same-address" />
                      <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="save-info" />
                      <label className="custom-control-label" htmlFor="save-info">Save this information for next time</label>
                    </div>
                    <hr className="mb-4" />
                    <h4 className="mb-3">Payment</h4>
                    <div className="d-block my-3">
                      <div className="custom-control custom-radio">
                        <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" defaultChecked required />
                        <label className="custom-control-label" htmlFor="credit">Credit card</label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                        <label className="custom-control-label" htmlFor="debit">Debit card</label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
                        <label className="custom-control-label" htmlFor="paypal">PayPal</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cc-name">Name on card</label>
                        <input type="text" className="form-control" id="cc-name" placeholder required />
                        <small className="text-muted">Full name as displayed on card</small>
                        <div className="invalid-feedback"> Name on card is required </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cc-number">Credit card number</label>
                        <input type="text" className="form-control" id="cc-number" placeholder required />

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="cc-expiration">Expiration</label>
                        <input type="text" className="form-control" id="cc-expiration" placeholder required />

                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="cc-cvv">CVV</label>
                        <input type="text" className="form-control" id="cc-cvv" placeholder required />

                      </div>
                    </div>
                    <hr className="mb-4" />
                    <button className="btn login-btn btn-lg btn-block" type="submit">Continue to checkout</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    );
  }
}