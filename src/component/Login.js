import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import AuthService from '../services/AuthService';
import * as authAction from '../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUser } from '@fortawesome/free-solid-svg-icons'

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
        <h4 className="modal-title">Sign in</h4>
        <Form onSubmit={this.handleLogin} ref={(c) => {this.form = c;}}>
          <div className="form-group">
            <label htmlFor="username">Email/Mobile</label>            
            <Input type="text" className="form-control" name="username" value={this.state.username}
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
          {errorMsg && <div className="isaerror">{errorMsg}</div>}
          <div className="form-group">
            
            <Button
              className="btn login-btn mb-0 float-left"
            // disabled={this.state.loading}
            >
              {/* {this.state.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )} */}
              <span>Login</span>
            </Button>
            <span className="float-right py-2">Forget Password?</span>
          </div>

        </Form>
        {/* <Link to='/forgot-password' onClick={() => this.props?.dismissModal('login')}>Forgot password?</Link> */}
        <div className="clearfix"></div>
        <p className="login-card-footer-text text-center pt-4 mb-0">Don't have an account? <Link to='/registration' onClick={() => this.props?.dismissModal('login')} >Register here</Link></p>
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
