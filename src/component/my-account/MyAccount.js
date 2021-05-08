import React from "react";
import Dashboard from "../Dashboard";
import { Link } from "react-router-dom";
export default class MyAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accountSidebar: [{ title: 'Dashboard', route: '/my-account/order' },
      { title: 'Orders', route: '/my-account/order' },
      { title: 'Address', route: '/my-account/address' },
      { title: 'Account Details', route: '/my-account/details' },
      { title: 'Support Tickets', route: '/my-account/support-tickets' },
      { title: 'Inquiries', route: '/my-account/inquiry' },
      { title: 'Wishlist', route: '/my-account/wishlist' },
      { title: 'Logout', route: '/my-account/logout' }]
    }
  }

  render() {
    const { accountSidebar } = this.state;
    return (
      <><div className='container-fluid'>
        <div className='row py-5'>
          <div className='col-lg-3'>
            <div className='shop-sidebar'>
              {accountSidebar.map((item, index) => (
                <article className='filter-group' key={index}>
                  <Link to={item.route}> <h4 className="modal-title">{item.title}</h4></Link>
                </article>
              ))}
            </div>
          </div>
          <div className='col-lg-9'>
            {this.props.children}
          </div>
        </div>
      </div></>
    )
  };
}