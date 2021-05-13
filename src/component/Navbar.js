import React from "react";
import { Link } from "react-router-dom";
import ReactMegaMenu from "react-mega-menu"

import axios from 'axios';

const baseUrl = 'https://admin.digitalindiacorporation.in/api';
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuShown: false,
      menuOptions: [],
      navbarTabs: [{ title: 'HOME', route: '' },
      { title: 'ABOUT US', route: '' },
      { title: 'SHOP', route: 'product-category/all' },
      { title: 'CUSTOMER SERVICE', route: '' }],
      isActiveTab: 0
    };
  }
  componentDidMount() {
    var _this = this;
    this.getSubmenuOptions(0).then((result) => {
      _this.setState({ menuOptions: result ? result : [] });
    })
  }
  getSubmenuOptions = async (id) => {
    try {
      let response = await axios.get(baseUrl + `/categories`, {
        params: { parent_id: id }
      }).then(response => {
        let MegaMenu = response.data.data.map((item, index) => {
          return {
            label: <Link to={`/product-category/${item.id}`}>
              <span key={index}>{item.title}</span>
            </Link>,
            key: item.id,
            items: item.child.map((subitem1, index) => {
              return (
                <div className="sub-categories" key={index}>
                  <Link to={`/product-category/${subitem1.id}`}>
                    {subitem1.title}
                  </Link>
                  {subitem1.child.map((subitem2, index) => {
                    return (
                      <div className="super-sub-categories" key={index}>
                        <Link to={`/product-category/${subitem2.id}`}>
                          <span>
                            {subitem2.title}
                          </span>
                        </Link>
                      </div>
                    )
                  })}
                </div>)
            })
          }
        })
        return response.data.data.length ? MegaMenu : [];
      }).catch(error => {
        throw (error);
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  setIsMenuShown = (status) => {
    this.setState({ isMenuShown: status })
  }

  render() {

    const { isMenuShown, menuOptions, navbarTabs, isActiveTab } = this.state;
    return (
      <>
        {/* // <!--main - navigation-- > */}
        < div className="main-menu" >
          <nav className="navbar navbar-expand-lg navbar-light border-top border-bottom">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation"> <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" >
              {/* <!--brows-categories-menu--> */}
              <div onMouseEnter={() => this.setIsMenuShown(true)}
                onMouseLeave={() => this.setIsMenuShown(false)} className="categories-nav dropdown">
                <span className="brows-menu dropdown-toggle" data-toggle="dropdown">
                  <span className="brows-menu-icon"></span>
                  <span >Browse Categories</span>
                </span>
                {isMenuShown && (
                  <div>
                    <ReactMegaMenu
                      tolerance={50}
                      direction={"RIGHT"}
                      data={menuOptions}
                    />
                  </div>)}
              </div>
              <ul className="navbar-nav mr-auto">
                {navbarTabs.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={`/${item.route}`} className={`nav-item nav-link ${((isActiveTab === index) ? 'active' : '')}`} onClick={() => this.setState({ isActiveTab: index })}>{item.title}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>
        </div >
      </>
    );
  }
}