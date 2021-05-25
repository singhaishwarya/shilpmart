import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from '../services/AuthService';
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

const email = (value) => {
  if (!validator.isEmail(value)) {
    return <div className="alert alert-danger" role="alert">
      Enter a valid email sould be contain maximum length 50 (example@domainname)
         </div>
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
        if (!result) {
          this.setState({ errorMsg: "The password you entered for the username " + username + " is incorrect" });
          return;
        }
        result && alert('A password reset email has been sent to the email address on file for your account, but may take several minutes to show up in your inbox. Please wait at least 10 minutes before attempting another reset.')
        // this.props.dismissModal('login');
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
        <Form onSubmit={this.handleForgotPassword} ref={(c) => {this.form = c;}}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input type="text" className="form-control" name="username" value={this.state.username}
              onChange={this.onChangeUsername}
              validations={[required, email]}
            />
          </div>
          <div>{errorMsg}</div>
          <div className="form-group">
            <button
              className="btn login-btn btn-block"
              disabled={this.state.loading}
            >
              {this.state.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Reset Password</span>
            </button>
            </div>
          

        </Form>
        </div>
      </div>
        </div>
      </section>
      
    )
  };
}

// export default connect(null, mapDispatchToProps)(ForgotPassword);
