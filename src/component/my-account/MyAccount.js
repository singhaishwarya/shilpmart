import React from "react";
import { Link } from "react-router-dom";
export default class MyAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accountSidebar: [{ title: 'Dashboard', class: 'dashboard', route: '/my-account/dashboard' },
      { title: 'Orders', class: 'order', route: '/my-account/order' },
      { title: 'Address', class: 'address', route: '/my-account/address' },
      { title: 'Account Details', class: 'account-details', route: '/my-account/details' },
      { title: 'Feedback', class: 'feedback', route: '/my-account/feedback' },
      { title: 'Inquiries', class: 'inquire', route: '/my-account/inquiry' },
      { title: 'Wishlist', class: 'wishlist', route: '/my-account/wishlist' },
      { title: 'Logout', class: 'logout', route: '/my-account/logout' }]
    }
  }

  render() {
    const { accountSidebar } = this.state;
    return (
      <>
        <section id="maincontent">
          <div className='container-fluid'>
            <div className='row py-5'>
              <div className='col-lg-3 col-12 border-right'>
                <div className='myaccout-sidebar'>
                  <ul>
                    {accountSidebar?.map((item, index) => (
                      // <article className='filter-group' key={index}>
                      //   <Link to={item.route}> <h4 className="modal-title">{item.title}</h4></Link>
                      // </article>                
                      <li className={item.class} key={index}><Link to={item.route}>{item.title}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-9 col-12 px-4">
                {this.props.children}
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}