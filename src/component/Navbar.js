import React from "react";
import { Link } from "react-router-dom";
import ReactMegaMenu from "react-mega-menu"
import CategoryService from '../services/CategoryService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faAngleRight } from '@fortawesome/free-solid-svg-icons'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuShown: false,
      menuOptions: [],
      navbarTabs: [{ title: 'HOME', route: '' },
      { title: 'ABOUT US', route: '' },
      { title: 'SHOP', route: 'product-category' },
      { title: 'CUSTOMER SERVICE', route: '' }],
      isActiveTab: 0, filterParams: { parent_id: 0 }
    };
  }
  componentDidMount() {
    this.getSubmenuOptions();
  }
  getSubmenuOptions = () => {
    try {
      CategoryService.fetchAllCategory(this.state.filterParams).then((result) => {
        let MegaMenu = result.map((item, index) => {
          return {
            label: <Link to={{
              pathname: `/product-category/${item.title.replace(/\s+/g, '-').toLowerCase()}`,
              state: { category_id: item.id, category_title: item.title }
            }}>
              <span key={index}>{item.title}</span>
              <FontAwesomeIcon icon={faAngleRight} />
            </Link>,
            key: item.id,
            items: item.child.map((subitem1, index) => {
              return (
                <div className="sub-categories" key={index}>
                  <Link to={{
                    pathname: `/product-category/${subitem1.title.replace(/\s+/g, '-').toLowerCase()}`,
                    state: { category_id: subitem1.id, category_title: subitem1.title }
                  }}>
                    {subitem1.title}
                  </Link>
                  {subitem1.child.map((subitem2, index) => {
                    return (
                      <div className="super-sub-categories" key={index}>
                        <Link to={{
                          pathname: `/product-category/${subitem2.title.replace(/\s+/g, '-').toLowerCase()}`,
                          state: { category_id: subitem2.id, category_title: subitem2.title }
                        }}>
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
        this.setState({ menuOptions: result.length > 0 ? MegaMenu : [] });
      })
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
                  <FontAwesomeIcon icon={isMenuShown ? faAngleUp : faAngleDown} />
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