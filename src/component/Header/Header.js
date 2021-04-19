import React from "react";
import "./Header.css";
import "../../public/bootstrap.min.css";
import "../../public/jbility.css";
import "../../public/swiper-bundle.min.css";

export default class Header extends React.Component {
    state = {

    };

    render() {
        return (
            <>
                <div className="header-top py-1">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 col-6">
                                <div className="s-icons"> <a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a>
                                    <a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a>
                                    <a href="#"><i className="fa fa-pinterest" aria-hidden="true" /></a>
                                    <a href="#"><i className="fa fa-linkedin" aria-hidden="true" /></a>
                                    <a href="#"><i className="fa fa-telegram" aria-hidden="true" /></a>
                                </div>
                            </div>
                            <div className="col-md-6 col-6">
                                <div className="acess-container float-right">
                                    <div id="acess-icons" className="access_icons">
                                        <div className="acess-icon balloon" title="large font size">
                                            <img src={require('../../public/increase-font-size.svg')} />
                                        </div>
                                        <div className="acess-icon balloon" title="small font size">
                                            <img src={require('../../public/decrease-font-size.svg')} alt="decrease font" />
                                        </div>
                                        <div className="acess-icon balloon">
                                            <i id="contrast" className="fa fa-adjust" aria-hidden="true" title="contrast" />
                                        </div>
                                        <div className="acess-icon balloon">
                                            <i className="fa fa-undo" aria-hidden="true" title="reset" />
                                        </div>
                                    </div>
                                    <a className="skipcontent" href="#maincontent">Skip to Content</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* //   <!--header - middle-- > */}

                <div className="header-middle d-flex justify-content-between align-items-center px-3">
                    <a className="navbar-brand" href="#">
                        <img className="image-middle" src={require('../../public/logo-eshilp.svg')} alt="logoeship" />
                    </a>
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item"><a href="#loginModal" className="nav-link" data-toggle="modal">Login/Register</a></li>
                        <li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-heart-o" aria-hidden="true"></i><span>0</span></a></li>
                        <li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-random" aria-hidden="true"></i><span>0</span></a></li>
                        <li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-shopping-basket" aria-hidden="true"></i><span>0</span></a></li>
                    </ul>
                </div>
            </>
        );
    }
}
