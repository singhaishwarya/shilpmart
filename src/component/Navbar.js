import React from "react";
import { Link } from "react-router-dom";
import ReactMegaMenu from "react-mega-menu"
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuShown: false,
      subMenus: [],      
      menuOptions: [
        {
          label:

            <span>Mens Wear</span>,
          key: "Category1",
          items:
            [{ title: "Shirting" },
            { title: "Shirting" },
            { title: "Shirting" },
            { title: "Shirting" }].map((subitem, index) => {
              return (<div className="sub-categories" key={index}>
                <Link>{subitem.title}</Link>
              </div>)
            })

        },
        {
          label:
            <span>Womens wear</span>,
          key: "Category2",
          items:
            [{ title: "Saree" },
            { title: "Saree" },
            { title: "Saree" }].map((subitem, index) => {
              return (<div className="sub-categories" key={index}>
                <Link>{subitem.title}</Link>
              </div>)
            })

        }, {
          label:
            <span>Home textile</span>,
          key: "Category3",
          items:
            [{ title: "Curtain" },
            { title: "Curtain" },
            { title: "Curtain" }].map((subitem, index) => {
              return (<div className="sub-categories" key={index}>
                <Link>{subitem.title}</Link>
              </div>)
            })

        },
        {
          label:
            <span>Home Decor & Utility</span>,
          key: "Category3",
          items:
            [{ title: "Curtain" },
            { title: "Curtain" },
            { title: "Curtain" }].map((subitem, index) => {
              return (<div className="sub-categories" key={index}>
                <Link>{subitem.title}</Link>
              </div>)
            })

        },
        {
          label:
            <span>Furniture</span>,
          key: "Category3",
          items:
            [{ title: "Curtain" },
            { title: "Curtain" },
            { title: "Curtain" }].map((subitem, index) => {
              return (<div className="sub-categories" key={index}>
                <Link>{subitem.title}</Link>
              </div>)
            })

        },

        {
          label:
            <span>Floor Coverings</span>,
          key: "Category3",
          items:
            [{ title: "Curtain" },
            { title: "Curtain" },
            { title: "Curtain" }].map((subitem, index) => {
              return (<div className="sub-categories" key={index}>
                <Link>{subitem.title}</Link>
              </div>)
            })

        },

        {
          label:
            <span>Travel Accessories</span>,
          key: "Category3",
          items:
            [{ title: "Curtain" },
            { title: "Curtain" },
            { title: "Curtain" }].map((subitem, index) => {
              return (<div className="sub-categories" key={index}>
                <Link>{subitem.title}</Link>
              </div>)
            })

        },
        {
          label:
            <span>Office Supplies</span>,
          key: "Category3",
          items:
            [{ title: "Curtain" },
            { title: "Curtain2" },
            { title: "Curtain3" }].map((subitem, index) => {
              return (<div className="sub-categories" key={index}>
                <Link>{subitem.title}</Link>
              </div>)
            })

        }
      
      
      ],
      navbarTabs: [{ title: 'HOME', route: '' }, { title: 'ABOUT US', route: 'about-us' }, { title: 'SHOP', route: 'product-category/all' }, { title: 'CUSTOMER SERVICE', route: 'customer-service' }],
      isActiveTab: 0
    };
  }

  setIsMenuShown = (status) => {
    this.setState({ isMenuShown: status })
  }

  setIsSubmenuShown = (status, index) => {
    this.setState({
      isSubmenuShown: status,
      subMenus:
      {
        // this.state.menuOptions[index].category.map((subitem, index) => {
        //   return (<div className="col-sm-3 mb-3" key={index}>
        //     <h6>{subitem.title}</h6>
        //   </div>)
        // }),
      }

    })
  }

  render() {

    const { isMenuShown, menuOptions, subMenus, navbarTabs, isActiveTab, styleConfigObj } = this.state;
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
                  <div onMouseLeave={() => this.setState({ subMenus: [] })}>
                    <ReactMegaMenu
                      tolerance={50}      // optional, defaults to 100
                      direction={"RIGHT"}  // optional, defaults to "RIGHT", takes in "RIGHT" || "LEFT"
                      styleConfig={styleConfigObj}   // defaults to an empty object. not recommended to be left blank.
                      // onExit={() => {...}}  // a function to be called when a mouse leaves the container
                      data={menuOptions}        // array of data to be rendered
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



