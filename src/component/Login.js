import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
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
      errorMsg: ''
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

        this.props.showModal ? this.props.dismissModal('login') : window.location.reload();
        window.location.reload();

      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { errorMsg } = this.state
    return (
      <div className="login-card">
        <span><FontAwesomeIcon className="text-right" icon={faTimes} onClick={() => this.props?.dismissModal('login')} /></span>
        <h4 className="modal-title">Sign in or Register</h4>
        <Form onSubmit={this.handleLogin} ref={(c) => { this.form = c; }}>
          <div className="form-group">
            <label htmlFor="username"><FontAwesomeIcon icon={faEnvelope}/> Email/Mobile</label>
            <Input type="text" className="form-control" name="username" value={this.state.username}
              onChange={this.onChangeUsername}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"><FontAwesomeIcon icon={faKey}/> Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
              validations={[required]}
            />
          </div>
          {errorMsg && <div className="isaerror">{errorMsg}</div>}
          <div className="d-flex flex-wrap justify-content-between">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" checked="" id="remember_me"/>
                      <label className="form-check-label" for="remember_me">Remember me</label>
                    </div><Link className="nav-link-inline fs-sm" href="#">Forgot password?</Link>
                  </div>
          <div className="form-group d-flex justify-content-between">

            <Button className="btn login-btn mb-0 float-left">
              <span>Login</span>
            </Button>
            {/* <span className="py-2">Forget Password?</span> */}
          </div>

        </Form>
        {/* <Link to='/forgot-password' onClick={() => this.props?.dismissModal('login')}>Forgot password?</Link> */}
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
