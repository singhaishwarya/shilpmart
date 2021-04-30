import React from "react";
import { Link, } from "react-router-dom";
import Navbar from '../Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRandom, faHeart, faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faPinterest, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons'

export default class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            seachResults: [],
            text: '',
            optionData: ['Art Silk banarasi saree', 'saree Art Silk heavy  saree',
                'TANGAIL SAREE', 'saree TANGAIL SAREE HALF ACHAL', 'saree CHAMARAJ PURE SILK SAREES -WEDDING SILK SAREES', 'saree Raw Silk X Eri Spun Silk Saree Saree', 'saree Tussar Ghiccha Silk Saree with Madhubani Hand Painting', 'saree Tussar Ghiccha Silk Saree with Madhubani Hand Painting', 'saree KATA BUTI STAR CHOSMA TANT SAREE', 'saree Chamka Saree (Artsilk) saree']
        }
    }

    onTextChange = (e) => {
        const value = e.target.value.toLowerCase();
        let seachResults = [];
        if (value.length > 0) {
            seachResults = this.state.optionData.sort().filter(v => v.toLowerCase().includes(value))
        }

        this.setState(() => ({
            seachResults,
            text: value
        }))
    }

    selectedText(value) {
        this.setState(() => ({
            text: value,
            seachResults: [],
        }))
    }

    renderSearchOptions = () => {
        let { seachResults } = this.state;
        if (seachResults.length === 0) {
            return null;
        }
        return (
            seachResults.reduce(
                function (accumulator, currentValue, currentIndex, array) {
                    if (currentIndex % 2 === 0)
                        accumulator.push(array.slice(currentIndex, currentIndex + 2));
                    return accumulator;
                }, []).map((item, index) => (
                    <div className="row" key={index}>
                        <div className="col-6">
                            <div className="title-meta">
                                <img src='https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/12/011-300x300.jpg' style={{ maxHeight: 50 }} />{item[0]}
                                <button type="submit" className="cart-btn">Add to cart</button>
                            </div>
                        </div>
                        { item[1] && <div className="col-6">
                            <div className="title-meta">
                                <img src='https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/12/011-300x300.jpg' style={{ maxHeight: 50 }} />{item[1]}</div>
                            <button type="submit" className="cart-btn">Add to cart</button>

                        </div>}

                    </div>
                )
                )


        );

    }

    onHomePage = () => {
        // this.props.history.push({ pathname: "/" })
    }
    render() {
        const { text, seachResults } = this.state;
        return (
            <>
                <div className="header-top py-1  ">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 col-6">
                                <div className="s-icons"> <FontAwesomeIcon icon={faFacebook} />
                                    <FontAwesomeIcon icon={faTwitter} />
                                    <FontAwesomeIcon icon={faLinkedin} />
                                    <FontAwesomeIcon icon={faTelegram} />
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
                        <img className="image-middle" src={require('../../public/logo-eshilp.svg')} onClick={() => this.onHomePage()} alt="logoeship" />
                    </a>
                    {/* <div >
                        <input id="query" type="text" onChange={this.onTextChange} value={text} />
                        <div className="mbsc-form-group ">
                            <div className="mbsc-grid">
                                {this.renderSearchOptions()}

                            </div>
                        </div>

                    </div> */}
                    <div className="search-container mx-5 w-100 position-relative">
                        <div className="form-inline my-2 my-lg-0">
                            <div className="search-bar w-100 d-flex justify-content-center border">
                                <input onChange={this.onTextChange} value={text} placeholder="Search" />
                                {/* <div className="search-btn"> */}
                                {/* <button className="btn my-2 my-sm-0" >
                                    <FontAwesomeIcon icon={faSearch} /></button> */}
                                {/* </div> */}
                            </div>
                        </div>
                        {this.renderSearchOptions()}
                    </div>
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item"><Link className="nav-link" to={'/login'}>Login/Register</Link></li>
                        {/* <li className="nav-item"><a href="#loginModal" className="nav-link" data-toggle="modal">
                            <Link to={'/login'}>Login/Register</Link></a></li> */}
                        <li className="nav-item"><a href="#" className="nav-link">
                            <FontAwesomeIcon icon={faHeart} /><span>0</span></a></li>
                        <li className="nav-item"><a href="#" className="nav-link">
                            <FontAwesomeIcon icon={faRandom} /><span>0</span></a></li>
                        <li className="nav-item"><a href="#" className="nav-link">
                            <FontAwesomeIcon icon={faShoppingBasket} /><span>0</span></a></li>
                    </ul>
                </div>
                <Navbar />
            </>
        );
    }
}
