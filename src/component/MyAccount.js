import React from "react";
export default class MyAccount extends React.Component {



  render() {
    return (
      <><div className="login-card">
        <h4 className="modal-title">my account</h4>
        {this.props.children}
      </div>
      </>
    )
  };
}