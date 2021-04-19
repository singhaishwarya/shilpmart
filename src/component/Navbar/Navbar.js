import React from "react";
import "./Navbar.css";
import "../../public/bootstrap.min.css";
import "../../public/jbility.css";
import "../../public/swiper-bundle.min.css";

export default class Navbar extends React.Component {
    state = {

    };

    render() {
        return (
            <>

                {/* // <!--main - navigation-- > */}
                <div className="main-menu">
                    <nav className="navbar navbar-expand-lg navbar-light border-top border-bottom">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* <!--brows-categories-menu--> */}
                            <div className="categories-nav">
                                <span className="brows-menu">
                                    <span className="brows-menu-icon" />
                                    <span>Browse Categories</span>
                                    <span className="arrow" />
                                </span>
                            </div>
                            {/* <!-- brows-categories-menu-end --> */}

                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active"> <a className="nav-link" href="#">
                                    <i className="fa fa-home" aria-hidden="true" />Home <span className="sr-only">(current)</span></a> </li>
                                <li className="nav-item"> <a className="nav-link" href="#">ABOUT US</a> </li>
                                <li className="nav-item"> <a className="nav-link" href="#">SHOP</a> </li>
                                <li className="nav-item"> <a className="nav-link" href="#">CUSTOMER SERVICE</a> </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </>
        );
    }
}



