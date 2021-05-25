import React from "react";
import AuthService from '../services/AuthService';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import validator from 'validator';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const mobile = (value) => {
  // var pattern = new RegExp(/(\+*)((0[ -]+)*|(91 )*)(\d{12}+|\d{10}+))|\d{5}([- ]*)\d{6}/);
  if (value.length !== 10) {
    // if (!validator.isMobilePhone(value, 'en-IN')) {
    return <div className="alert alert-danger" role="alert">
      Length of mobile number should be numeric and contain 10 digit.
      </div>
    // );
  }
};

const email = (value) => {
  if (!validator.isEmail(value)) {
    return <div className="alert alert-danger" role="alert">
      Enter a valid email sould be contain maximum length 50 (example@domainname)
         </div>
  }
};

const lt50 = (value) => {
  if (value.length >= 50) {
    return <div className="alert alert-danger" role="alert"> It must be string & contain maximum length 50 char.</div>
  }
};

const isValidpassword = (value) => {
  var pattern = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/);
  if (!pattern.test(value)) {
    return <div className="alert alert-danger" role="alert">  Password must contain at leaset eight alpha numaric and one special char and contain one special char</div>

  }
}

export default class Registration extends React.Component {

  constructor(props) {
    super(props);

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      fields: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        c_password: '',
        mobile: ''
      }
    }
  }

  handleSignUp(e) {
    e.preventDefault();
    AuthService.register(this.state.fields)
      .then((result) => {

        if (!result) return

        if (result.success) {
          this.props.history.push({
            pathname: '/'
          });
        }
        else {
          alert(Object.values(result.data)[0])
        }
      })
      .catch(() => {
      });
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    const { fields } = this.state
    return (

      <div className="container-fluid">
        <div className="row py-5">
          <div className="col-md-6 col-12 mb-5">
            <h4 className="text-center">How It Works</h4>
            <div className="container">
              <div className="main-timeline">

                {/* <!-- start timeline section--> */}
                <div className="timeline">
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
            <h4 className="mb-4">Registration</h4>
            {/* <form action="#" className="login-card shadow p-4 border rounded" onSubmit={(e) => this.handleSignUp(e)}>
              <div className="row"> */}

            <Form
              onSubmit={this.handleSignUp}
              ref={(c) => { this.form = c; }}
            > <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="fname">First Name<span>*</span></label>
                    <Input
                      type="text"
                      className="form-control"
                      name="first_name"
                      value={fields.first_name}
                      onChange={this.handleChange.bind(this, "first_name")}
                      validations={[required, lt50]}
                    />
                    {/* <input type="text" className="form-control" value={fields.first_name || ''} onChange={this.handleChange.bind(this, "first_name")} /> */}
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="lname">Last Name<span>*</span></label>
                    <Input
                      type="text"
                      className="form-control"
                      name="last_name"
                      value={fields.last_name}
                      onChange={this.handleChange.bind(this, "last_name")}
                      validations={[required, lt50]}
                    />
                    {/* <input type="text" onChange={this.handleChange.bind(this, "last_name")} value={fields.last_name || ''} className="form-control" /> */}

                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="email">Email<span>*</span></label>
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={fields.email}
                      onChange={this.handleChange.bind(this, "email")}
                      validations={[required, email, lt50]}
                    />
                    {/* <input type="email" onChange={this.handleChange.bind(this, "email")} value={fields.email || ''} className="form-control" /> */}

                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="mNo">Mobile No.<span>*</span></label>
                    <Input
                      type="number"
                      className="form-control"
                      name="mobile"
                      value={fields.mobile}
                      onChange={this.handleChange.bind(this, "mobile")}
                      validations={[required, mobile]}
                    />
                    {/* <input type="number" onChange={this.handleChange.bind(this, "mobile")} value={fields.mobile || ''} className="form-control" /> */}

                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="pass">Password<span>*</span></label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={fields.password}
                      onChange={this.handleChange.bind(this, "password")}
                      validations={[required, isValidpassword]}
                    />
                    {/* <input type="password" onChange={this.handleChange.bind(this, "password")} value={fields.password || ''} className="form-control" /> */}

                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="cpass">Confirm Password<span>*</span></label>
                    <Input
                      type="password"
                      className="form-control"
                      name="c_password"
                      value={fields.c_password}
                      onChange={this.handleChange.bind(this, "c_password")}
                      validations={[required, isValidpassword]}
                    />
                    {/* <input type="password" onChange={this.handleChange.bind(this, "c_password")} value={fields.c_password || ''} className="form-control" /> */}

                  </div>
                </div>
              </div>
              <fieldset>
                <button className="btn login-btn" value="Submit"  >Register</button>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>

    )
  };
}