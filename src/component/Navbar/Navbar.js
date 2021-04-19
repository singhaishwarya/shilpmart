import React, { useState } from "react";
import { Link, } from "react-router-dom";
export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false
        };
    }
    render() {

        const setIsShown = (val) => {
            this.setState({ isShown: val })
        }

        const { isShown } = this.state;
        return (
            <>
                {/* // <!--main - navigation-- > */}
                < div className="main-menu" >
                    <nav className="navbar navbar-expand-lg navbar-light border-top border-bottom">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* <!--browse-categories-menu--> */}
                            <div className="categories-nav">
                                <span className="brows-menu">
                                    <span className="brows-menu-icon" />

                                    <span onMouseEnter={() => setIsShown(true)}
                                        onMouseLeave={() => setIsShown(false)}>Browse Categories</span>
                                    <span className="arrow" />
                                </span>
                                {isShown && (
                                    <div>
                                        Product categories will appear when you hover over the button.
                                    </div>
                                )}
                            </div>
                            {/* <!-- browse-categories-menu-end --> */}

                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active"> <a className="nav-link" href="#">
                                    <i className="fa fa-home" aria-hidden="true" />
                                    <Link to={'/'}>Home</Link></a> </li>
                                <li className="nav-item"> <a className="nav-link" href="#">
                                    <Link to={'/about-us'}>ABOUT US</Link></a> </li>
                                <li className="nav-item"> <a className="nav-link" href="#">
                                    <Link to={'/shop'}>SHOP</Link></a> </li>
                                <li className="nav-item"> <a className="nav-link" href="#">
                                    <Link to={'/customer-service'}>CUSTOMER SERVICE</Link></a> </li>
                            </ul>

                        </div>
                    </nav>
                </div >
            </>
        );
    }
}



