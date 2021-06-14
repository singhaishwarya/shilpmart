import React from "react";
import AuthService from '../services/AuthService';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import validator from 'validator';
import { ToastContainer } from 'react-toastify';
import ToastService from '../services/ToastService';
const required = (value, name) => {
  if (!value) {
    return (
      <div className="isaerror" role="alert">
        Please enter your {name.name?.replace(/_/g, ' ') === 'c password' ? 'confirm password' : name.name?.replace(/_/g, ' ')}
      </div>
    );
  }
};

const pattern = (value, props) => {
  let propsPattern = new RegExp(props.pattern);
  if (!propsPattern.test(value) || value.length < props.maxLength) {
    return <div className="isaerror" role="alert">
      Please enter a valid {props.name}.
    </div>
  }
}


const email = (value) => {
  if (!validator.isEmail(value)) {
    return <div className="isaerror" role="alert">
      Please enter a valid email(example@domainname)
    </div>
  }
};

const isValidpassword = (value, props) => {
  let propsPattern = new RegExp(props.pattern);
  if (!propsPattern.test(value) || (value.length < 8)
  ) {
    return <div className="isaerror" role="alert">Password must contain atleast eight alpha numeric(abcd1234)</div>

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
          ToastService.success("Successfully Registered")
          this.props.history.push({
            pathname: '/'
          });
        }
        else {
          return ToastService.error(Object.values(result.data)[0][0].replace("c password", "confirm password"))

        }
      })
      .catch((err) => {
        console.log(err);
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
        <ToastContainer />
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
                    <div className="timeline-img"><img src={require('../public/shipping.svg')} className="img-fluid" alt="registration" /></div>
                  </div>
                  <div className="timeline-content">
                    <h5 className="title">Hassle Free Shipping</h5>
                    <p className="description"> Product pickup from your store and fast delivery to customer </p>
                  </div>
                  <div className="numbers pt-0"><span className="numbers_tp">3</span></div>
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
            <Form className="login-card"  >
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">First Name<span>*</span></label>
                <div className="col-sm-9">
                  <Input type="text" className="form-control" name="first_name" value={fields.first_name} onChange={this.handleChange.bind(this, "first_name")} maxLength="50" validations={[required]} />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Last Name<span>*</span></label>
                <div className="col-sm-9">
                  <Input type="text"
                    className="form-control"
                    name="last_name"
                    maxLength="50"
                    value={fields.last_name}
                    onChange={this.handleChange.bind(this, "last_name")}
                    validations={[required]}
                  />
                </div>
              </div>


              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email<span>*</span></label>
                <div className="col-sm-9">
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    maxLength="50"
                    value={fields.email}
                    onChange={this.handleChange.bind(this, "email")}
                    validations={[required, email]}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Mobile No.<span>*</span></label>
                <div className="col-sm-9">
                  <Input type="text" maxLength="10" pattern="^(0|[1-9][0-9]*)$" className="form-control" name="mobile" value={fields.mobile}
                    onChange={this.handleChange.bind(this, "mobile")}
                    validations={[required, pattern]}
                  />
                </div>
              </div>


              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Password<span>*</span></label>
                <div className="col-sm-9">
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    minLength="8"
                    value={fields.password}
                    pattern="/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/"
                    onChange={this.handleChange.bind(this, "password")}
                    validations={[required, isValidpassword]}
                  />
                </div>
              </div>


              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Confirm Password<span>*</span></label>
                <div className="col-sm-9">
                  <Input
                    type="password"
                    className="form-control"
                    name="c_password"
                    minLength="8"
                    value={fields.c_password}
                    pattern="/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/"
                    onChange={this.handleChange.bind(this, "c_password")}
                    validations={[required, isValidpassword]}
                  />
                </div>
              </div><button className="btn login-btn" value="Submit" disabled={false} onClick={this.handleSignUp} >Register</button>

            </Form>

          </div>
        </div>
      </div>

    )
  }
}