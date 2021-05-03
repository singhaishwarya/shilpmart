import React from "react";
import { Link } from "react-router-dom";
export default class Login extends React.Component {

  constructor(props) {
    super(props);

    console.log("Props in  :", props);
  }

  handleChange = (event) => {
    this.props.onClick();
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

        <Link to={'/buyer-registration'} onClick={this.handleChange} >CREATE AN ACCOUNT</Link>
      </>
    )
  };
}