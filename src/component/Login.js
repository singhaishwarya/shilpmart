import React from "react";
import { Link } from "react-router-dom";
export default class Login extends React.Component {

  // constructor(props) {
  //   super(props);

  // }

  handleChange = (event) => {
    this.props.onClick();
  }
  render() {
    return (
      <>
        {/* <h4> SIGN IN </h4>
        <div className="row">
          <label>Username or email *</label>
          <input type="text" name="email" />
        </div>
        <div className="row">
          <label>Password*</label>
          <input type="password" name="password" />
        </div>
        <button>Log in</button>
        <span>No account yet?</span>

        <Link to={'/buyer-registration'} onClick={this.handleChange} >CREATE AN ACCOUNT</Link> */}
        <div class="login-card">
          <h4 class="modal-title">Sign in</h4>

          <form action="#!">
            <div class="form-group">
              <label for="email" class="sr-only">Email</label>
              <input type="email" name="email" id="email" class="form-control" placeholder="Email address" />
            </div>
            <div class="form-group mb-4">
              <label for="password" class="sr-only">Password</label>
              <input type="password" name="password" id="password" class="form-control" placeholder="***********" />
            </div>
            <input name="login" id="login" class="btn btn-block login-btn mb-4" type="button" value="Login" />
          </form>
          <Link to={'/buyer-registration'} className="forgot-password-link" onClick={this.handleChange} >Forgot password?</Link>
          <p class="login-card-footer-text">Don't have an account? <Link to={'/buyer-registration'} onClick={this.handleChange} >Register here</Link></p>
        </div>
      </>
    )
  };
}