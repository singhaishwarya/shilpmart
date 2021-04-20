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
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation"> <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* <!--brows-categories-menu--> */}
                            <div onMouseEnter={() => setIsShown(true)}
                                onMouseLeave={() => setIsShown(false)} className="categories-nav dropdown">
                                <span className="brows-menu dropdown-toggle" data-toggle="dropdown">
                                    <span className="brows-menu-icon"></span>
                                    <span >Browse Categories</span>
                                    <span className="arrow" />
                                </span>
                                {isShown && (
                                    <div className="dropdown-menu nicemenu verticle" data-pos="list.right" data-classes="active">
                                        <div className="nicemenu-item">
                                            <p>Men’s Wear</p>
                                            <div className="nicemenu-sub">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-sm-3 mb-3">
                                                            <h6><a href="#">shirtings</a></h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6><a href="#">trousers</a></h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6><a href="#">jackets & coats</a></h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6><a href="#">kurtas</a></h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6><a href="#">shawl</a></h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6><a href="#">dhoti</a></h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6><a href="#">muffler & scarves</a></h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6><a href="#">gloves</a></h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6><a href="#">gamcha</a></h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6><a href="#">lungi</a></h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6><a href="#">accessories</a></h6>
                                                            <ul className="sub-items">
                                                                <li><a href="#">belts</a></li>
                                                                <li><a href="#">wallets</a></li>
                                                                <li><a href="#">cuff links</a></li>
                                                                <li><a href="#">hand kerchiefs</a></li>
                                                                <li><a href="#">view all</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6><a href="#">footwear</a></h6>
                                                            <ul className="sub-items">
                                                                <li><a href="#">shoes</a></li>
                                                                <li><a href="#">ethnic footwear</a></li>
                                                                <li><a href="#">sandles and floaters</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="nicemenu-item">
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
                                        </div>
                                    </div>
                                )}
                            </div>
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active"> <a className="nav-link" href="#"> <i className="fa fa-home"
                                    aria-hidden="true"></i> Home <span className="sr-only">(current)</span></a> </li>
                                <li className="nav-item"> <a className="nav-link" href="#">ABOUT US</a> </li>
                                <li className="nav-item"> <a className="nav-link" href="#">SHOP</a> </li>
                                <li className="nav-item"> <a className="nav-link" href="#">CUSTOMER SERVICE</a> </li>
                            </ul>
                        </div>
                    </nav>
                </div >
            </>
        );
    }
}



