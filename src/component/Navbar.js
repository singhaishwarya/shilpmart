import React from "react";
import { Link } from "react-router-dom";
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuShown: false,
      subMenus: [],
      menuOptions: [{
        title: "Mens wear",
        _id: 1,
        route: 'mens-wear',
        category: [
          { title: "Shirting" },
          { title: "Shirting" },
          { title: "Shirting" }]
      }, {
        title: "Womens wear",
        _id: 2,
        route: 'womens-wear',
        category: [
          { title: "saree" },
          { title: "saree" },
          { title: "saree" }]

      }, {
        title: "Housing",
        _id: 3,
        route: 'housing',
        category: [
          { title: "curtain" },
          { title: "curtain" },
          { title: "curtain" }]
      }],
      navbarTabs: [{ title: 'Home', route: '' }, { title: 'ABOUT US', route: 'about-us' }, { title: 'SHOP', route: 'shop' }, { title: 'CUSTOMER SERVICE', route: 'customer-service' }],
      isActiveTab: 0
    };
  }

  setIsMenuShown = (status) => {
    this.setState({ isMenuShown: status })
  }

  setIsSubmenuShown = (status, index) => {
    this.setState({
      isSubmenuShown: status,
      subMenus: <div className="" >
        <div className="">
          <div className="">
            {this.state.menuOptions[index].category.map((subitem, index) => {
              return (<div className="col-sm-3 mb-3" key={index}>
                <h6>{subitem.title}</h6>
              </div>)
            })}
          </div>
        </div>
      </div>
    })
  }

  render() {

    const { isMenuShown, menuOptions, subMenus, navbarTabs, isActiveTab } = this.state;
    return (
      <>
        {/* // <!--main - navigation-- > */}
        < div className="main-menu" >
          <nav className="navbar navbar-expand-lg navbar-light border-top border-bottom">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation"> <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {/* <!--brows-categories-menu--> */}
              <div onMouseEnter={() => this.setIsMenuShown(true)}
                onMouseLeave={() => this.setIsMenuShown(false)} className="categories-nav dropdown">
                <span className="brows-menu dropdown-toggle" data-toggle="dropdown">
                  <span className="brows-menu-icon"></span>
                  <span >Browse Categories</span>

                </span>
                {isMenuShown && (
                  <div onMouseLeave={() => this.setState({ subMenus: [] })} className="dropdown-menu nicemenu verticle" data-pos="list.right" data-classes="active">
                    {menuOptions.map((item, index) => {
                      return (
                        // <Link to={`/product-category/${item.route}`}>
                        <Link to={`/product-category/${item.route}`} key={index}>
                          <div className="nicemenu-item" onMouseEnter={() => this.setIsSubmenuShown(true, index)} key={index}>
                            <p>{item.title}</p>
                          </div>
                        </Link>)
                    })}
                    {subMenus}
                    {/* <div className="nicemenu-item">
                      <p>Men’s Wear</p>
                      <div className="nicemenu-sub">
                        <div className="container">
                          <div className="row">
                            <div className="col-sm-3 mb-3">
                              <h6>shirtings</h6>
                            </div>
                            <div className="col-sm-3 mb-3">
                              <h6>trousers</h6>
                            </div>
                            <div className="col-sm-3 mb-3">
                              <h6>jackets & coats</h6>
                            </div>
                            <div className="col-sm-3 mb-3">
                              <h6>kurtas</h6>
                            </div>
                           
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="nicemenu-item">
                      <p>Women’s wear</p>
                      <div className="nicemenu-sub">
                        <h6>Sub Menu 2</h6>
                      </div>
                    </div>
                    <div className="nicemenu-item">
                      <p>Home Textiles</p>
                      <div className="nicemenu-sub">
                        <h6>Sub Menu 3</h6>
                      </div>
                    </div>
                    <div className="nicemenu-item">
                      <p>Home Textiles</p>
                      <div className="nicemenu-sub">
                        <h6>Sub Menu 4</h6>
                      </div>
                    </div>
                    <div className="nicemenu-item">
                      <p>Furnitures</p>
                      <div className="nicemenu-sub">
                        <h6>Sub Menu 5</h6>
                      </div>
                    </div>
                    <div className="nicemenu-item">
                      <p>Floor Coverings</p>
                      <div className="nicemenu-sub">
                        <h6>Sub Menu 6</h6>
                      </div>
                    </div>
                    <div className="nicemenu-item">
                      <p>Travel Accessories</p>
                      <div className="nicemenu-sub">
                        <h6>Sub Menu 7</h6>
                      </div>
                    </div>
                    <div className="nicemenu-item">
                      <p>Office Supplies</p>
                      <div className="nicemenu-sub">
                        <h6>Sub Menu 8</h6>
                      </div>
                    </div> */}
                  </div>
                )}
              </div>
              <ul className="navbar-nav mr-auto">
                {navbarTabs.map((item, index) => {
                  return (
                    <Link to={`/${item.route}`} key={index}>
                      <li className={`nav-item nav-link ${((isActiveTab === index) ? 'active' : '')}`} onClick={() => this.setState({ isActiveTab: index })}> {item.title} </li>
                    </Link>
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



