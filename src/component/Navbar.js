import React from "react";
import { Link } from "react-router-dom";
import ReactMegaMenu from "react-mega-menu"
import CategoryService from '../services/CategoryService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import TopBarMenu from './TopBarMenu';
import { isMobile } from 'react-device-detect';
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuShown: false,
      menuOptions: []
    };
  }

  componentDidMount() {
    this.getSubmenuOptions();
  }

  getSubmenuOptions = () => {
    try {
      CategoryService.fetchAllCategory({ parent_id: 0 }).then((result) => {
        let MegaMenu = result?.map((item, index1) => {

          return {
            label: <Link to={{
              pathname: `/product-list/${item.title.replace(/\s+/g, '-').toLowerCase()}`,
              search: "?cat_ids=" + item.id,
              state: {
                category_id: item.id,
                category_breadcrumbs: [{ id: item.id, title: item.title }]
              }
            }} onClick={() => this.setIsMenuShown(false)}>
              <span key={index1}>{item.title}</span>
              <FontAwesomeIcon icon={faAngleRight} />
            </Link >,
            key: item.id,
            items: item.child?.map((subitem1, index2) => {

              return (
                <div className="sub-categories" key={index2}>
                  <Link to={{
                    pathname: `/product-list/${item.title.replace(/\s+/g, '-').toLowerCase()}/${subitem1.title.replace(/\s+/g, '-').toLowerCase()}`,
                    search: "?cat_ids=" + subitem1.id,
                    state: {
                      category_id: subitem1.id,
                      category_breadcrumbs: [{ id: item.id, title: item.title },
                      { id: subitem1.id, title: subitem1.title }]
                    }
                  }} onClick={() => this.setIsMenuShown(false)}>
                    {subitem1.title}
                  </Link>
                  {subitem1.child?.map((subitem2, index3) => {
                    return (
                      <div className="super-sub-categories" key={index3}>
                        <Link to={{
                          pathname: `/product-list/${item.title.replace(/\s+/g, '-').toLowerCase()}/${subitem1.title.replace(/\s+/g, '-').toLowerCase()}/${subitem2.title.replace(/\s+/g, '-').toLowerCase()}`,
                          search: "?cat_ids=" + subitem2.id,
                          state: {
                            category_id: subitem2.id,
                            category_breadcrumbs: [{ id: item.id, title: item.title },
                            { id: subitem1.id, title: subitem1.title },
                            { id: subitem2.id, title: subitem2.title }]
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
    console.log("demo===", isMobile)
    this.setState({ isMenuShown: status })
  }

  render() {

    const { isMenuShown, menuOptions } = this.state;
    return (
      <>
        <div className="main-menu">
          <nav className="navbar navbar-expand-lg navbar-light border-top border-bottom">
            <button className="navbar-toggler" type="button" data-toggle="collapse" onMouseEnter={() => this.setIsMenuShown(true)}
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation"> <span className="navbar-toggler-icon" />
            </button>
            {isMobile ? isMenuShown ? <div class="mobile-nav">
              <h2>Navigation</h2>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Portfolio</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div> : '' : <div className="collapse navbar-collapse" >
              <div onMouseEnter={() => this.setIsMenuShown(true)}
                onMouseLeave={() => this.setIsMenuShown(false)} className="categories-nav dropdown">
                <span className="brows-menu dropdown-toggle" data-toggle="dropdown">
                  <span className="brows-menu-icon"></span>
                  <span>Browse Categories</span>
                  <FontAwesomeIcon icon={isMenuShown ? faAngleUp : faAngleDown} />
                </span>
                {isMenuShown ?
                  <ReactMegaMenu
                    tolerance={50}
                    direction={"RIGHT"}
                    data={menuOptions}
                    styleConfig={"mega-menu"}
                  />
                  : ''}
              </div>
              <ul className="navbar-nav mr-auto ml-2">
                <TopBarMenu />
              </ul>
            </div>}
          </nav>
        </div >
      </>
    );
  }
}