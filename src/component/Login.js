import React from "react";
import { Link } from "react-router-dom";
import Auth from '../Auth';
export default class Login extends React.Component {

  login = (event) => {
    Auth.authenticate();
    localStorage.setItem('isLoggedIn', Auth.getAuth());
    console.log(event, '====', Auth.getAuth());
    this.props.loginClick();
  }

  register = (event) => {
    // Auth.authenticate();
    console.log("register");
    // this.props.onClick();
  }

  render() {
    return (
      <><div className="login-card">
        <h4 className="modal-title">Sign in</h4>

        <form action="#!">
          <div className="form-group">
            <label htmlFor="email" className="sr-only">Email</label>
            <input type="email" name="email" className="form-control" autoComplete="on" placeholder="Email address" />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="sr-only">Password</label>
            <input type="password" name="password" className="form-control" autoComplete="on" placeholder="***********" />
          </div> <Link to={'/my-account/orders'} className="forgot-password-link" onClick={this.login} >
            <input name="login" className="btn btn-block login-btn mb-4" type="button" value="Login" /></Link>
        </form>
       Forgot password?
        <p className="login-card-footer-text">Don't have an account? <Link to={'/buyer-registration'} onClick={this.handleChange} >Register here</Link></p>
      </div>
      </>
    )
  };
}