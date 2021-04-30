import React from "react";
export default class Login extends React.Component {

  render() {

    return (

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7 mb-5">
            <h4 className="text-center">How It Works</h4>
            <div className="container">
              <div className="main-timeline">

                {/* <!-- start timeline section--> */}
                <div className="timeline"> <span id="topdot"></span>
                  <div className="numbers"><span className="numbers_tp">1</span></div>
                  <div className="icon"></div>
                  <div className="date-content">
                    <div className="timeline-img"><img src={require('../../public/register-1.svg')} className="img-fluid" alt="registration" /></div>
                  </div>
                  <div className="timeline-content">
                    <h5 className="title">Quick Registration</h5>
                    <p className="description"> Fill the form on your right, to register. </p>
                  </div>
                  <div className="numbers pt-0"><span className="numbers_bt">2</span></div>
                </div>
                <div className="timeline">
                  <div className="icon"></div>
                  <div className="date-content">
                    <div className="timeline-img"><img src={require('../../public/store.svg')} className="img-fluid" alt="registration" /></div>
                  </div>
                  <div className="timeline-content">
                    <h5 className="title">Store Setup &amp; Product Cataloging</h5>
                    <p className="description"> Setup your shop and create product catalog in easy steps. </p>
                  </div>
                  <div className="numbers pt-0"><span className="numbers_tp">3</span></div>
                </div>
                <div className="timeline">
                  <div className="icon"></div>
                  <div className="date-content">
                    <div className="timeline-img"><img src={require('../../public/shipping.svg')} className="img-fluid" alt="registration" /></div>
                  </div>
                  <div className="timeline-content">
                    <h5 className="title">Hassle Free Shipping</h5>
                    <p className="description"> Product pickup from your store and fast delivery to customer </p>
                  </div>
                  <div className="numbers pt-0"><span className="numbers_tp">4</span></div>
                </div>
                <div className="timeline">
                  <div className="icon"></div>
                  <div className="date-content">
                    <div className="timeline-img"><img src={require('../../public/secured_payments.svg')} className="img-fluid" alt="registration" /></div>
                  </div>
                  <div className="timeline-content">
                    <h5 className="title">Secure Payments</h5>
                    <p className="description"> Payments deposited into your bank account. Detailed sales report on your dashboard. </p>
                  </div>
                  <span id="bottomdot"></span> </div>
                {/* <!-- end timeline section--> */}

              </div>
            </div>
          </div>
          <div className="col-md-5 mb-5">
            <h4>Registration</h4>
          </div>
        </div>
      </div>

    )
  };
}