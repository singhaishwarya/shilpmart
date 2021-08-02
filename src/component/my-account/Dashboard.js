import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
class Dashboard extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
        <div className="col-sm-3">one</div>
        <div className="col-sm-9">
        <p> Hello {this.props.userData.name} (not {this.props.userData.name}? Log out)</p>

<p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
<div className="my-account-links">
  <div className="orders"><Link to="/my-account/order">Orders</Link></div>
  <div className="address"><Link to="/my-account/address">Address</Link></div>
  <div className="account-details"><Link to="/my-account/details">My Profile</Link></div>
  {/* <div className="followings"><Link to="/my-account/order">followings</Link></div> */}
  <div className="feedback"><Link to="/my-account/feedback">Feedback</Link></div>
  <div className="inquiry"><Link to="/my-account/inquiry">Inquiries</Link></div>
  <div className="account-details"><Link to="/my-account/order">Raise Ticket</Link></div>
  <div className="wishlist"><Link to="/my-account/wishlist">Wishlist</Link></div>
  {/* <div className="logout"><Link to="/my-account/order">Loout</Link></div> */}
</div>
        </div>

        
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  }
};

export default connect(mapStateToProps, null)(Dashboard);
