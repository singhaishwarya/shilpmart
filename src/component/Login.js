import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from '../services/AuthService';
import * as authAction from '../actions/auth';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      errorMsg: ''
    };
  }


  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  }


  handleLogin = (e) => {
    e.preventDefault();

    this.form.validateAll();

    const { username, password } = this.state;
    AuthService.login({ username: username, password: password })
      .then((result) => {
        if (!result) {
          this.setState({ errorMsg: "The password you entered for the username " + username + " is incorrect" });
          return;
        }
        result && this.props.userDetail(result.data);

        this.props.showModal ? this.props.dismissModal('login') : window.location.href = '/';

        window.location.href = '/';

      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { errorMsg } = this.state
    return (
      <div className="login-card">
        <h4 className="modal-title">Sign in</h4>
        <Form
          onSubmit={this.handleLogin}
          ref={(c) => {
            this.form = c;
          }}
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={this.state.username}
              onChange={this.onChangeUsername}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
              validations={[required]}
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
              <span>Login</span>
            </button>
          </div>

        </Form>
        <Link to='/forgot-password' onClick={() => this.props?.dismissModal('login')}>Forgot password?</Link>
        <p className="login-card-footer-text">Don't have an account? <Link to={'/buyer-registration'} onClick={() => this.props?.dismissModal('login')} >Register here</Link></p>
      </div >
    )
  };
}


const mapDispatchToProps = (dispatch) => {
  return {
    userDetail: user => dispatch(authAction.userDetail(user))
  }
};

export default connect(null, mapDispatchToProps)(Login);
