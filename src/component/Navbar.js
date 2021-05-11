import React from "react";
import { Link } from "react-router-dom";
import ReactMegaMenu from "react-mega-menu"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { fetchAllCategory } from '../actions';

const baseUrl = 'https://admin.digitalindiacorporation.in/api';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchAllCategory(0);
    this.state = {
      currentTier: 0,
      isMenuShown: false,
      subMenuOptions: [],
      menuOptions: [],
      navbarTabs: [
        { title: 'HOME', route: '' },
        { title: 'ABOUT US', route: 'about-us' },
        { title: 'SHOP', route: 'product-category/all' },
        { title: 'CUSTOMER SERVICE', route: 'customer-service' }],
      isActiveTab: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category[0].parent_id === 0) {
      let locMenu = nextProps.category.map((item, index) => {
        return ({
          label: <>
            <span key={index} onMouseOver={() => this.submenuOptions(item.id)}>{item.title}</span>
            <FontAwesomeIcon icon={faCaretRight} /></>,
          key: item.id,
          items: []
        })
      });
      this.setState({ menuOptions: locMenu });
    }
    else {
      let submenu = nextProps.category.map((item, index) => {
        return (<div className="sub-categories" key={index}>
          <Link to={''}>{item.title}</Link>
        </div>)
      }), objIndex;
      objIndex = this.state.menuOptions.findIndex((obj => obj.key === this.state.currentTier));
      this.state.menuOptions[objIndex].items = submenu;
    }
  }

  submenuOptions = (id) => {
    this.props.fetchAllCategory(id)
    this.setState({ currentTier: id })
  }

  setIsMenuShown = (status) => {
    this.setState({ isMenuShown: status })
  }
  render() {
    const { isMenuShown, menuOptions, navbarTabs, isActiveTab } = this.state;
    return (
      < div className="main-menu" >
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
              {isMenuShown &&
                <div >
                  <ReactMegaMenu
                    tolerance={50}
                    direction={"RIGHT"}
                    onExit={() => this.setState({ subMenuOptions: [] })}
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
