import React from "react";
import { Link } from "react-router-dom";
export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <>
        <h4> SIGN IN </h4>
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

        <Link to={'/buyer-registration'}>CREATE AN ACCOUNT</Link>
      </>
    )
  };
}