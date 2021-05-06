import React from "react";
export default class Registration extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      fields: [],
      errors: {}
    }
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["firstName"]) {
      formIsValid = false;
      errors["firstName"] = "Cannot be empty";
    }

    if (typeof fields["firstName"] !== "undefined") {
      if (!fields["firstName"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["firstName"] = "Only letters";
      }
    }

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }
    //Contact
    if (typeof fields["contact"] !== "undefined") {
      var pattern = new RegExp(/^[0-9\b]+$/);

      if (!pattern.test(fields["contact"])) {

        formIsValid = false;

        errors["contact"] = "Please enter only number.";

      } else if (fields["contact"].length !== 10) {

        formIsValid = false;

        errors["contact"] = "Please enter valid contact number.";

      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  signUpSubmit(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      alert("Form submitted");
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
            <h4>Registration</h4>
            <form action="#" className="login-card" onSubmit={this.signUpSubmit.bind}>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="fname">First Name*</label>
                    <input type="text" className="form-control" value={fields["firstName"] || ''} onChange={this.handleChange.bind(this, "firstName")} />

                    {/* <input type="text" onChange={this.handleChange.bind(this, "firstName")} value={} className="form-control" /> */}

                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="lname">Last Name*</label>
                    <input type="text" onChange={this.handleChange.bind(this, "lastName")} value={fields["lastName"] || ''} className="form-control" />

                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="email">Email*</label>
                    <input type="email" onChange={this.handleChange.bind(this, "email")} value={fields["email"] || ''} className="form-control" />

                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="mNo">Mobile No.*</label>
                    <input type="tel" onChange={this.handleChange.bind(this, "contact")} value={fields["contact"] || 0} className="form-control" />

                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="pass">Password*</label>
                    <input type="password" onChange={this.handleChange.bind(this, "password")} value={fields["password"] || 0} className="form-control" />

                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="cpass">Confirm Password*</label>
                    <input type="password" onChange={this.handleChange.bind(this, "confirmPassword")} value={fields["confirmPassword"] || 0} className="form-control" />

                  </div>
                </div>
              </div>
              <fieldset>
                <button className="btn btn-lg pro"
                  value="Submit">Register</button>
              </fieldset>
              {/* <input type="button" className="btn login-btn" value="Register" /> */}

            </form>
          </div>




        </div>
      </div>

    )
  };
}