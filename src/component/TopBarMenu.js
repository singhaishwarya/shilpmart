import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export default class TopBarMenu extends React.Component {

  constructor() {
    super();
    this.state = {
      navbarTabs: [{ title: 'HOME', route: '' },
      { title: 'ABOUT US', route: 'about-us' },
      { title: 'SHOP', route: 'product-list' },
      { title: 'CUSTOMER SERVICE', route: 'customer-service' }],
      isActiveTab: 0
    };
  }

  render() {
    const { isActiveTab, navbarTabs } = this.state;
    return (
      <>{navbarTabs?.map((item, index) => {
        return (
          <li key={index}>
            <Link to={`/${item.route}`} className={`nav-item nav-link ${((isActiveTab === index) ? 'active' : '')}`} onClick={() => this.setState({ isActiveTab: index })}>
              {item.title === 'HOME' && <FontAwesomeIcon icon={faHome} />} {item.title} </Link>
          </li>
        )
      })}</>
    );
  }
}