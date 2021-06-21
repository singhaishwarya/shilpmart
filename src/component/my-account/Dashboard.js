import React from 'react';
import { Link } from "react-router-dom";
export default class Dashboard extends React.Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="container"><p> Hello Aishwarya Singh (not Aishwarya Singh? Log out)</p>

        <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
        <div className="my-account-links">
          <div className="orders"><Link to="/my-account/order">Orders</Link></div>
          <div className="address"><Link to="/my-account/address">Address</Link></div>
          <div className="account-details"><Link to="/my-account/details">Account Details</Link></div>
          {/* <div className="followings"><Link to="/my-account/order">followings</Link></div> */}
          <div className="feedback"><Link to="/my-account/feedback">Feedback</Link></div>
          <div className="inquiry"><Link to="/my-account/inquiry">Inquiries</Link></div>
          <div className="wishlist"><Link to="/my-account/wishlist">Wishlist</Link></div>
          {/* <div className="logout"><Link to="/my-account/order">Loout</Link></div> */}
        </div>
      </div>
    );
  }
}