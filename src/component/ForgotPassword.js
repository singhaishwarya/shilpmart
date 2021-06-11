import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import AuthService from '../services/AuthService';

const required = (value) => {
  if (!value) {
    return (
      <div className="isaerror" role="alert">
        Please enter registered mobile/email.
      </div>
    );
  }
};

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);

    this.state = {
      username: "",
      errorMsg: ''
    };
  }


  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  handleForgotPassword = (e) => {
    e.preventDefault();

    this.form.validateAll();

    const { username } = this.state;
    AuthService.forgotPassword({ username: username })
      .then((result) => {

        result && alert('A temporary password(OTP) is sent to Email/Mobile')
        this.props.history.push({
          pathname: '/'
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { errorMsg } = this.state
    return (
      <section id="maincontent">
        <div className="container-fluid">
          <div className="col">
            <div className="forget-pass my-5 login-card">
              <p>Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
              <Form onSubmit={this.handleForgotPassword} ref={(c) => { this.form = c; }}>
                <div className="form-group">
                  <label htmlFor="username">Email/Mobile</label>
                  <Input type="text" className="form-control" name="username" value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required]}
                  />
                </div>
                <div>{errorMsg}</div>
                <div className="form-group">
                  <Button
                    className="btn login-btn btn-block"
                  // disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Reset Password</span>
                  </Button>
                </div>


              </Form>
            </div>
          </div>
        </div>
      </section>

    )
  }
}

