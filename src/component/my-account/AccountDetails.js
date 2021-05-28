import React from 'react';
export default class AccountDetails extends React.Component {

  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="row">
        
        <div className="col">
        <form className="login-card">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" id="firstName" placeholder="First name here" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="LastName">Last Name</label>
            <input type="text" className="form-control" id="LastName" placeholder="Last Name here.." />
            
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="displayName">Display Name</label>
          <input type="text" className="form-control" id="displayName" placeholder="display name here..." />
          <small>This will be how your name will be displayed in the account section and in reviews</small>
        </div>
        <div className="form-group">
          <label htmlFor="emailad">Email Address</label>
          <input type="text" className="form-control" id="emailad" placeholder="Email here..." />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile No.</label>
          <input type="text" className="form-control" id="mobileNo" placeholder="Mobile here..." />
        </div>

        <fieldset className="mt-4">
          <h4>Change Password</h4>
          <div className="form-group">
          <label htmlFor="currentPass">Current password (leave blank to leave unchanged)</label>
          <input type="password" className="form-control" id="currentPass" placeholder="Mobile here..." />
        </div>

        <div className="form-group">
          <label htmlFor="newPass">New password (leave blank to leave unchanged)</label>
          <input type="password" className="form-control" id="newPass" placeholder="Mobile here..." />
        </div>

        <div className="form-group">
          <label htmlFor="conPass">Confirm new password</label>
          <input type="password" className="form-control" id="conPass" placeholder="Mobile here..." />
        </div>

        </fieldset>
        
        
        <button type="submit" className="btn login-btn">Save Changes</button>
      </form>
        </div>

      </div>
    );
  }
}