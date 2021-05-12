import React from "react";
import { Link } from "react-router-dom";
// import ReactMegaMenu from "react-mega-menu"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { fetchAllCategory } from '../actions';

const baseUrl = 'https://admin.digitalindiacorporation.in/api';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTier: 0,
      isMenuShown: false,
      isSubMenuShown: false,
      subMenuOptions: [],
      subMenu: [], mainMenu: [],
      isLoading: true,
      navbarTabs: [
        { title: 'HOME', route: '' },
        { title: 'ABOUT US', route: 'about-us' },
        { title: 'SHOP', route: 'product-category/all' },
        { title: 'CUSTOMER SERVICE', route: 'customer-service' }],
      isActiveTab: 0
    };
  }
  componentDidMount() {
    var _this = this;
    this.getSubmenuOptions(0).then((result) => {
      _this.setState({ mainMenu: result ? result : [] });
    })
  }

  getSubmenuOptions = async (id) => {
    try {
      let response = await axios.get(baseUrl + `/categories`, {
        params: { parent_id: id }
      }).then(response => {
        return response.data.data.length ? response.data.data : [];
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
  showSubMenuOption = (status, key, id) => {
    this.setState({ isSubMenuShown: status, submenuShowKey: key })
    var _this = this;
    _this.getSubmenuOptions(id).then((result) => {
      let submenuLoc = result.length && result.map((item, index) => {
        return (
          <div key={index} className="col-sm-3 mb-3">
            <h6>{item.title}</h6>
            {/* {
              _this.getSubmenuOptions(item.id).then((result) => {

                result.length && result.map((item1, index) => {
                  return <ul key={index} className="sub-items">
                    <li>{item.title}=={item1.title}</li>
                  </ul>
                })
              })
            } */}
          </div>

        )
      });
      _this.setState({ subMenu: submenuLoc })
    })
  }

  render() {

    const { isMenuShown, navbarTabs, isActiveTab, isSubMenuShown, submenuShowKey, subMenu, mainMenu } = this.state;

    return (
      <div className="main-menu" >
        <nav className="navbar navbar-expand-lg navbar-light border-top border-bottom">
          <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
          </button>
          <div className="collapse navbar-collapse" >
            <div onMouseEnter={() => this.setIsMenuShown(true)}
              onMouseLeave={() => this.setIsMenuShown(false)} className="categories-nav dropdown">
              <span className="brows-menu" >
                <span className="brows-menu-icon"></span>
                <span >Browse Categories</span>
                <FontAwesomeIcon icon={isMenuShown ? faCaretDown : faCaretRight} />
              </span>
              {isMenuShown && (
                <div className="dropdown-menu nicemenu verticle" data-pos="list.right" data-classes="active">
                  {mainMenu.length && mainMenu.map((item, index) => {
                    return (< div key={index} ><div className="nicemenu-item" >
                      <p onMouseOver={() => this.showSubMenuOption(true, index, item.id)}>{item.title}</p></div> {
                        (isSubMenuShown && submenuShowKey == index) &&
                        < div className="container">
                          <div className="row">
                            {subMenu}
                          </div>
                        </div>}</div>)
                  })}
                </div>
              )}
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
        </nav >
      </div >
    );
  }
}

const mapStateToProps = state => {
  return { category: state.category };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllCategory: (id) => {
      dispatch(fetchAllCategory(id));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
