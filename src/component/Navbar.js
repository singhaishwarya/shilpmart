import React from "react";
import { Link } from "react-router-dom";
import ReactMegaMenu from "react-mega-menu"
import CategoryService from '../services/CategoryService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faAngleRight, faHome } from '@fortawesome/free-solid-svg-icons'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuShown: false,
      menuOptions: [],
      navbarTabs: [{ title: 'HOME', route: '' },
      { title: 'ABOUT US', route: '' },
      { title: 'SHOP', route: 'product-list' },
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
        let MegaMenu = result?.map((item, index) => {
          return {
            label: <Link to={{
              pathname: `/product-list/${item.title.replace(/\s+/g, '-').toLowerCase()}`,
              search: "?cat_ids=" + item.id,
              state: {
                category_id: item.id, category_breadcrumbs: [{ id: item.id, title: item.title }]
              }
            }} onClick={() => this.setIsMenuShown(false)}>
              <span key={index}>{item.title}</span>
              <FontAwesomeIcon icon={faAngleRight} />
            </Link>,
            key: item.id,
            items: item.child?.map((subitem1, index) => {
              return (
                <div className="sub-categories" key={index}>
                  <Link to={{
                    pathname: `/product-list/${item.title.replace(/\s+/g, '-').toLowerCase()}/${subitem1.title.replace(/\s+/g, '-').toLowerCase()}`,
                    search: "?cat_ids=" + subitem1.id,
                    state: { category_id: subitem1.id, category_breadcrumbs: [{ id: item.id, title: item.title }, { id: subitem1.id, title: subitem1.title }] }
                  }} onClick={() => this.setIsMenuShown(false)}>
                    {subitem1.title}
                  </Link>
                  {subitem1.child?.map((subitem2, index) => {
                    return (
                      <div className="super-sub-categories" key={index}>
                        <Link to={{
                          pathname: `/product-list/${item.title.replace(/\s+/g, '-').toLowerCase()}/${subitem1.title.replace(/\s+/g, '-').toLowerCase()}/${subitem2.title.replace(/\s+/g, '-').toLowerCase()}`,
                          search: "?cat_ids=" + subitem2.id,
                          state: {
                            category_id: subitem2.id,
                            category_breadcrumbs: [{ id: item.id, title: item.title }, { id: subitem1.id, title: subitem1.title }, { id: subitem2.id, title: subitem2.title }]
                          }
                        }} onClick={() => this.setIsMenuShown(false)}>
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
        this.setState({ menuOptions: result?.length > 0 ? MegaMenu : [] });
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
                      styleConfig={"mega-menu"}
                    />
                  </div>)}
              </div>
              <ul className="navbar-nav mr-auto">
                {navbarTabs?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={`/${item.route}`} className={`nav-item nav-link ${((isActiveTab === index) ? 'active' : '')}`} onClick={() => this.setState({ isActiveTab: index })}>
                        {item.title === 'HOME' && <FontAwesomeIcon icon={faHome} />}{item.title} </Link>
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