import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from '../services/AuthService';
import * as authAction from '../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey, faTimes } from '@fortawesome/free-solid-svg-icons'

const required = (value, name) => {
  if (!name.value) {
    return (
      <div className="isaerror" role="alert">
        Please enter your {name.name === 'username' ? 'email' : name.name}
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
    this.onChangeOtp = this.onChangeOtp.bind(this);

    this.state = {
      username: "",
      password: "", otp: "",
      errorMsg: '', loginType: ''
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
      errorMsg: ''
    });
  }
  onChangeOtp = (e) => {
    this.setState({
      otp: e.target.value
    });
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.form.validateAll();

    const { username, password, otp, loginType } = this.state;
    let loginParams = {};
    if (loginType === 'otp') {
      loginParams = { username: username, otp: otp, password: otp }
    }
    else {
      loginParams = { username: username, password: password }
    }
    AuthService.login(loginParams)
      .then((result) => {
        if (!result) {
          this.setState({ errorMsg: loginType === 'otp' ? "Either User Name or OTP Not Valid" : "The password you entered for the username " + username + " is incorrect" });
          return;
        }

        result?.success && this.props.userDetail(result.data);

        window.location.reload();


      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleLoginWithOtp = (e) => {
    e.preventDefault();
    this.form.validateAll();
    AuthService.loginWithOtp({ username: this.state.username })
      .then((result) => {
        if (result.success) this.setState({ loginType: 'otp' })
        else this.setState({ errorMsg: result?.data?.data?.error })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { errorMsg, loginType, username, otp, password } = this.state
    return (
      <div className="login-card">
        <span><FontAwesomeIcon className="text-right" icon={faTimes} onClick={() => this.props?.dismissModal('login')} /></span>
        <h4 className="modal-title">Sign in or Register</h4>
        <Form ref={(c) => { this.form = c; }}>
          {(loginType === 'otp' && username) ? <div className="form-group">
            <label htmlFor="otp"><FontAwesomeIcon icon={faEnvelope} /> OTP</label>
            <Input type="text" className="form-control" name="username" value={otp}
              onChange={this.onChangeOtp}
              validations={[required]}
            />
            {errorMsg && <div className="isaerror">{errorMsg}</div>}
            <button className="btn login-btn mb-0 float-left" onClick={(e) => this.handleLogin(e)}>
              <span>Login</span>
            </button>
          </div> : <><div className="form-group">
            <label htmlFor="username"><FontAwesomeIcon icon={faEnvelope} /> Email/Mobile</label>
            <Input type="text" className="form-control" name="username" value={username}
              onChange={this.onChangeUsername}
              validations={[required]}
            />
          </div>
            <div className="form-group">
              <label htmlFor="password"><FontAwesomeIcon icon={faKey} /> Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={this.onChangePassword}
                validations={loginType === 'otp' ? [required] : []}
              />
            </div>
            {errorMsg && <div className="isaerror">{errorMsg}</div>}
            <div className="d-flex flex-wrap justify-content-between">
              <div className="form-check">
                {/* <input className="form-check-input" type="checkbox" checked="" id="remember_me" />
                <label className="form-check-label" >Remember me</label> */}
              </div>
            </div>
            <div className="form-group d-flex justify-content-between">

              <button className="btn login-btn mb-0 float-left" onClick={(e) => this.handleLogin(e)}>
                <span>Login</span>
              </button>
              <br />
              <button className="btn login-btn mb-0 float-left" onClick={(e) => this.handleLoginWithOtp(e)}>
                <span>Request OTP</span>
              </button>
              {/* <span className="py-2">Forget Password?</span> */}
            </div>
          </>}
        </Form>
        <Link to='/forgot-password' onClick={() => this.props?.dismissModal('login')}>Forgot password?</Link>
        <div className="clearfix"></div>
        <p className="login-card-footer-text pt-4 mb-0">Don't have an account? <Link to='/registration' onClick={() => this.props?.dismissModal('login')} >Register here</Link></p>
      </div >
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    userDetail: user => dispatch(authAction.userDetail(user))
  }
};

export default connect(null, mapDispatchToProps)(Login);
