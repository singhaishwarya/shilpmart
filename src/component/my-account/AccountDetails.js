import React from 'react';
import AuthService from '../../services/AuthService';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import ToastService from '../../services/ToastService';
import Button from "react-validation/build/button";

const required = (value, name) => {
  if (!name.value) {
    return (
      <div className="isaerror" role="alert">
        Please enter your {name.name}
      </div>
    );
  }
};

const isValidpassword = (value) => {
  let pattern = new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/);
  if (!pattern.test(value) || (value.length < 8)
  ) {
    return <div className="isaerror" role="alert">  Password must contain atleast eight alpha numeric  </div>

  }
}
export default class AccountDetails extends React.Component {

  constructor() {
    super();
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      fields: {
        new_password: '',
        confirm_password: ''
      }
    }

  }
  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }
  handleChangePassword(e) {
    e.preventDefault();
    const { new_password, confirm_password } = this.state.fields;

    if (new_password !== confirm_password) {
      return ToastService.error("New Password & Confirm Password did not match")

    } else {

      AuthService.changePassword({ new_password: new_password })
        .then((result) => {

          if (result.success) {
            return ToastService.success(result.message)
          }
          else {
            return ToastService.error(result.message)

          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  render() {

    const { fields } = this.state
    return (


      <div className="container">
        <div className="col-sm-6 offset-sm-3 login-card">

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">First Name</label>
              <input type="text" className="form-control" id="firstName" placeholder="First name here" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="LastName">Last Name</label>
              <input type="text" className="form-control" id="LastName" placeholder="Last Name here.." />

            </div>
          </div>
          <div className="form-group">
            <label htmlFor="displayName">Display Name</label>
            <input type="text" className="form-control" id="displayName" placeholder="display name here..." />
            <small>This will be how your name will be displayed in the account section and in reviews</small>
          </div>
          <div className="form-group">
            <label htmlFor="emailad">Email Address</label>
            <input type="text" className="form-control" id="emailad" placeholder="Email here..." />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNo">Mobile No.</label>
            <input type="text" className="form-control" id="mobileNo" placeholder="Mobile here..." />
          </div>
          <Form
            onSubmit={this.handleChangePassword}
            ref={(c) => { this.form = c; }}
          >
            <fieldset className="mt-4">
              <h4>Change Password</h4>


              <div className="form-group">
                <label htmlFor="newPass">New password </label>
                <Input
                  type="password"
                  className="form-control"
                  name="new_password"
                  value={fields.new_password}
                  onChange={this.handleChange.bind(this, "new_password")}
                  validations={[required, isValidpassword]}
                />
                {/* <input type="password" className="form-control" id="newPass" placeholder="Mobile here..." /> */}
              </div>

              <div className="form-group">
                <label htmlFor="conPass">Confirm new password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="confirm_password"
                  value={fields.confirm_password}
                  onChange={this.handleChange.bind(this, "confirm_password")}
                  validations={[required, isValidpassword]}
                /> </div>

            </fieldset>
            <Button type="submit" className="btn login-btn">Save Changes</Button>
          </Form>
        </div>
      </div>


    );
  }
}