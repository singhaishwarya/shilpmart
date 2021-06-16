import React from "react";
import AuthService from '../services/AuthService';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import validator from 'validator';
import { ToastContainer } from 'react-toastify';
import ToastService from '../services/ToastService';


export default class Registration extends React.Component {

  constructor(props) {
    super(props);
    this.error = false;
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.requiredBinded = this.required.bind(this);
    this.emailBinded = this.email.bind(this);
    this.isValidpasswordBinded = this.isValidpassword.bind(this);
    this.patternBinded = this.pattern.bind(this);

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

  required = (value, props) => {

    if (props.isUsed) {
      if (!value) {
        this.error = true;
        return (
          <div className="isaerror" role="alert">
            Please enter your {props.name?.replace(/_/g, ' ') === 'c password' ? 'confirm password' : props.name?.replace(/_/g, ' ')}
          </div>
        );
      } else { this.error = false; }
    }
  }


  pattern = (value, props) => {
    let propsPattern = new RegExp(props.pattern);
    if (props.isUsed) {
      if (!propsPattern.test(value) || value.length < props.maxLength) {

        return <div className="isaerror" role="alert">
          Please enter a valid {props.name}.
        </div>
      }
    } else { this.error = false; }

  }


  email = (value, props) => {
    if (props.isUsed) {
      if (!validator.isEmail(value)) {

        return <div className="isaerror" role="alert">
          Please enter a valid email(example@domainname)
        </div>
      }
    } else { this.error = false; }

  };

  isValidpassword = (value, props) => {
    let pwdPattern = new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/);
    if (props.isUsed) {
      if (!pwdPattern.test(value) || (value.length < 8)
      ) {

        return <div className="isaerror" role="alert">Password must contain atleast eight alpha numeric(abcd1234)</div>

      }
    } else { this.error = false; }

  }
  handleSignUp(e) {
    e.preventDefault();

    if (this.form.getChildContext()._errors.length > 0) {
      if (this.error) {
        return
      }
      else {
        return ToastService.error("Please fill form details")
      }
    } else {
      if (!this.error) {
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
              return ToastService.error(Object.values(result.data)[0][0].replace("c password", "confirm password"));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
            <Form className="login-card" ref={c => { this.form = c }}>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">First Name<span>*</span></label>
                <div className="col-sm-9">
                  <Input type="text" className="form-control" name="first_name" value={fields.first_name} onChange={this.handleChange.bind(this, "first_name")} maxLength="50" validations={[this.requiredBinded]} />
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
                    validations={[this.requiredBinded]}
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
                    validations={[this.requiredBinded, this.emailBinded]}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Mobile No.<span>*</span></label>
                <div className="col-sm-9">
                  <Input type="text" maxLength="10" pattern="^(0|[1-9][0-9]*)$" className="form-control" name="mobile" value={fields.mobile}
                    onChange={this.handleChange.bind(this, "mobile")}
                    validations={[this.requiredBinded, this.patternBinded]}
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
                    onChange={this.handleChange.bind(this, "password")}
                    validations={[this.requiredBinded, this.isValidpasswordBinded]}
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
                    onChange={this.handleChange.bind(this, "c_password")}
                    validations={[this.requiredBinded, this.isValidpasswordBinded]}
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