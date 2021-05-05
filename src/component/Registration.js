import React from "react";
export default class Registration extends React.Component {

  render() {

    return (

      <div className="container-fluid">
        <div className="row py-5">
          <div className="col-md-6 col-12 mb-5">
            <h4 className="text-center">How It Works</h4>
            <div className="container">
              <div className="main-timeline">

                {/* <!-- start timeline section--> */}
                <div className="timeline"> <span id="topdot"></span>
                  <div className="numbers"><span className="numbers_tp">1</span></div>
                  <div className="icon"></div>
                  <div className="date-content">
                    <div className="timeline-img"><img src={require('../public/register-1.svg')} className="img-fluid" alt="registration" /></div>
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
                    <div className="timeline-img"><img src={require('../public/store.svg')} className="img-fluid" alt="registration" /></div>
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
                    <div className="timeline-img"><img src={require('../public/shipping.svg')} className="img-fluid" alt="registration" /></div>
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
                    <div className="timeline-img"><img src={require('../public/secured_payments.svg')} className="img-fluid" alt="registration" /></div>
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
          
          <div className="col-md-6 col-12 mb-5">
            <h4>Registration</h4>
        <form action="#" className="login-card">
        <div class="row">
        <div class="col-lg-6 col-12">
        <div class="form-group"><label for="fname">First Name*</label>
        <input type="text" class="form-control" id="fname"  />
        
        </div>
        </div>
        <div class="col-lg-6 col-12">
        <div class="form-group"><label for="lname">Last Name*</label>
        <input type="text" class="form-control" id="lname"  />
        
        </div>
        </div>
        </div>

        <div class="row">
        <div class="col-lg-6 col-12">
        <div class="form-group"><label for="email">Email*</label>
        <input type="email" class="form-control" id="email"  />
        
        </div>
        </div>
        <div class="col-lg-6 col-12">
        <div class="form-group"><label for="mNo">Mobile No.*</label>
        <input type="tel" class="form-control" id="mNo" />
        
        </div>
        </div>
        </div>

        <div class="row">
        <div class="col-lg-6 col-12">
        <div class="form-group"><label for="pass">Password*</label>
        <input type="password" class="form-control" id="pass" />
        
        </div>
        </div>
        <div class="col-lg-6 col-12">
        <div class="form-group"><label for="cpass">Confirm Password*</label>
        <input type="password" class="form-control" id="cpass" />
        
        </div>
        </div>
        </div>
        <input type="button" className="btn login-btn" value="Register"/>
        
        </form> 
        </div>




        </div>
      </div>

    )
  };
}