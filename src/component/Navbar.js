import React from "react";
import { Link } from "react-router-dom";
import ReactMegaMenu from "react-mega-menu"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'

const baseUrl = 'https://admin.digitalindiacorporation.in/api';
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuShown: false,
      subMenus: [],
      menuOptions: [],
      navbarTabs: [
        { title: 'HOME', route: '' },
        { title: 'ABOUT US', route: 'about-us' },
        { title: 'SHOP', route: 'product-category/all' },
        { title: 'CUSTOMER SERVICE', route: 'customer-service' }],
      isActiveTab: 0
    };
  }
  componentDidMount() {
    this.getCategoryData();
  }

  getCategoryData = () => {
    axios.get(baseUrl + `/categories`, {
      params: { parent_id: 0 }
    }).then(response => {
      let locMenu = [];

      this.setState({ menuResponse: response.data.data });
      locMenu = response.data.data.map((item, index) => {
        return ({
          label: <>
            <span key={index} onMouseOver={() => this.setSubmenus(item.id)}>{item.title}</span>
            <FontAwesomeIcon icon={faCaretRight} /></>,
          key: item.id,
          items: []
        })
      });
      this.setState({ menuOptions: locMenu })
    }).catch(error => {
      throw (error);
    });
  }

  setSubmenus = (id) => {
    axios.get(baseUrl + `/categories`, {
      params: { parent_id: id }
    }).then(response => {
      let submenu = response.data.data.map((item, index) => {
        return (<div className="sub-categories" key={index}>
          <Link to={''}>{item.title}</Link>
        </div>)
      }), objIndex;
      objIndex = this.state.menuOptions.findIndex((obj => obj.key == id));
      this.state.menuOptions[objIndex].items = submenu;
    }).catch(error => {
      throw (error);
    });
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
              aria-label="Toggle navigation">
              {/* <span className="navbar-toggler-icon" /> */}
            </button>
            <div className="collapse navbar-collapse" >
              {/* <!--brows-categories-menu--> */}
              <div onMouseEnter={() => this.setIsMenuShown(true)}
                onMouseLeave={() => this.setIsMenuShown(false)} className="categories-nav dropdown">
                <span className="brows-menu" >
                  <span className="brows-menu-icon"></span>
                  <span >Browse Categories</span>
                  <FontAwesomeIcon icon={isMenuShown ? faCaretDown : faCaretRight} />
                </span>
                {isMenuShown &&
                  <div >
                    <ReactMegaMenu
                      tolerance={50}
                      direction={"RIGHT"}
                      onExit={() => this.setState({ subMenus: [] })}
                      data={menuOptions}
                    />
                  </div>}
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



