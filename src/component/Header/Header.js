import React from "react";
import { Link, } from "react-router-dom";
import Navbar from '../Navbar/Navbar'
export default class Header extends React.Component {

    render() {

        const imageClick = () => {
            console.log('Click');
        }

        return (
            <>
                <div className="header-top py-1  ">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 col-6">
                                <div className="s-icons"> <i className="fa fa-facebook" aria-hidden="true" />
                                    <i className="fa fa-twitter" aria-hidden="true" />
                                    <i className="fa fa-pinterest" aria-hidden="true" />
                                    <i className="fa fa-linkedin" aria-hidden="true" />
                                    <i className="fa fa-telegram" aria-hidden="true" />
                                </div>
                            </div>
                            <div className="col-md-6 col-6">
                                <div className="acess-container float-right">
                                    <div id="acess-icons" className="access_icons">
                                        <div className="acess-icon balloon" title="large font size">
                                            <img src={require('../../public/increase-font-size.svg')} alt="" />
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
                        <img className="image-middle" src={require('../../public/logo-eshilp.svg')} onClick={() => imageClick()} alt="logoeship" />
                    </a>
                    <div className="search-container mx-5 w-100 position-relative">
                        <form className="form-inline my-2 my-lg-0">
                            <div className="search-bar w-100 d-flex justify-content-center border">
                                <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                                <div className="search-btn">
                                    <button className="btn my-2 my-sm-0" type="submit"><i className="fa fa-search" aria-hidden="true" /></button>
                                </div>

                            </div>
                        </form>
                    </div>
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item"><a href="#loginModal" className="nav-link" data-toggle="modal">
                            <Link to={'/login'}>Login/Register</Link></a></li>
                        <li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-heart-o" aria-hidden="true"></i><span>0</span></a></li>
                        <li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-random" aria-hidden="true"></i><span>0</span></a></li>
                        <li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-shopping-basket" aria-hidden="true"></i><span>0</span></a></li>
                    </ul>
                </div>
                <Navbar />
            </>
        );
    }
}
