import React from "react";
import AuthService from '../services/AuthService';
export default class Registration extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      fields: {},
      errors: {}
    }
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields.first_name) {
      formIsValid = false;
      errors["first_name"] = "Cannot be empty";
    }

    if (typeof fields.first_name !== "undefined") {
      if (!fields["first_name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["first_name"] = "Only letters";
      }
    }

    //Email
    if (!fields.email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields.email !== "undefined") {
      let lastAtPos = fields.email.lastIndexOf('@');
      let lastDotPos = fields.email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.email.indexOf('@@') === -1 && lastDotPos > 2 && (fields.email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }
    //mobile
    if (typeof fields.mobile !== "undefined") {
      var pattern = new RegExp(/^[0-9\b]+$/);

      if (!pattern.test(fields.mobile)) {

        formIsValid = false;

        errors["mobile"] = "Please enter only number.";

      } else if (fields.mobile.length !== 10) {

        formIsValid = false;

        errors["mobile"] = "Please enter valid mobile number.";

      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  signUpSubmit(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      AuthService.register(this.state.fields)
        .then((result) => {

        })
        .catch(() => {
        });

    } else {
      alert("Form has errors.")
    }

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
            <form action="#" className="login-card shadow p-4 border rounded" onSubmit={(e) => this.signUpSubmit(e)}>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="fname">First Name<span>*</span></label>
                    <input type="text" className="form-control" value={fields.first_name || ''} onChange={this.handleChange.bind(this, "first_name")} />

                    {/* <input type="text" onChange={this.handleChange.bind(this, "first_name")} value={} className="form-control" /> */}

                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="lname">Last Name<span>*</span></label>
                    <input type="text" onChange={this.handleChange.bind(this, "last_name")} value={fields.last_name || ''} className="form-control" />

                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="email">Email<span>*</span></label>
                    <input type="email" onChange={this.handleChange.bind(this, "email")} value={fields.email || ''} className="form-control" />

                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="mNo">Mobile No.<span>*</span></label>
                    <input type="tel" onChange={this.handleChange.bind(this, "mobile")} value={fields.mobile || ''} className="form-control" />

                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="pass">Password<span>*</span></label>
                    <input type="password" onChange={this.handleChange.bind(this, "password")} value={fields.password || ''} className="form-control" />

                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="cpass">Confirm Password<span>*</span></label>
                    <input type="password" onChange={this.handleChange.bind(this, "c_password")} value={fields.c_password || ''} className="form-control" />

                  </div>
                </div>
              </div>
              <fieldset>
                <button className="btn login-btn" value="Submit"  >Register</button>
              </fieldset>
            </form>
          </div>




        </div>
      </div>

    )
  };
}