import React from "react";
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
                                                        <div className="col-sm-3 mb-3">
                                                            <h6>shawl</h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6>dhoti</h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6>muffler & scarves</h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6>gloves</h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6>gamcha</h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6>lungi</h6>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6>accessories</h6>
                                                            <ul className="sub-items">
                                                                <li>belts</li>
                                                                <li>wallets</li>
                                                                <li>cuff links</li>
                                                                <li>hand kerchiefs</li>
                                                                <li>view all</li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-sm-3 mb-3">
                                                            <h6>footwear</h6>
                                                            <ul className="sub-items">
                                                                <li>shoes</li>
                                                                <li>ethnic footwear</li>
                                                                <li>sandles and floaters</li>
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
                                <li className="nav-item nav-link active">  <i className="fa fa-home"
                                    aria-hidden="true"></i> Home <span className="sr-only">(current)</span> </li>
                                <li className="nav-item nav-link"> ABOUT US </li>
                                <li className="nav-item nav-link"> SHOP </li>
                                <li className="nav-item nav-link"> CUSTOMER SERVICE </li>
                            </ul>
                        </div>
                    </nav>
                </div >
            </>
        );
    }
}



