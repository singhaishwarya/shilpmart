import React from "react";
import { Link, } from "react-router-dom";
import Navbar from '../Navbar/Navbar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
export default class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            text: '',
            optionData: ['Art Silk banarasi saree', 'saree Art Silk heavy  saree',
                'TANGAIL SAREE', 'saree TANGAIL SAREE HALF ACHAL', 'saree CHAMARAJ PURE SILK SAREES -WEDDING SILK SAREES', 'saree Raw Silk X Eri Spun Silk Saree Saree', 'saree Tussar Ghiccha Silk Saree with Madhubani Hand Painting', 'saree Tussar Ghiccha Silk Saree with Madhubani Hand Painting', 'saree KATA BUTI STAR CHOSMA TANT SAREE', 'saree Chamka Saree (Artsilk) saree']
        }
    }

    onTextChange = (e) => {
        const value = e.target.value.toLowerCase();
        let suggestions = [];
        if (value.length > 0) {
            suggestions = this.state.optionData.sort().filter(v => v.toLowerCase().includes(value))
        }

        this.setState(() => ({
            suggestions,
            text: value
        }))
    }

    selectedText(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (


            suggestions.reduce(
                function (accumulator, currentValue, currentIndex, array) {
                    if (currentIndex % 2 === 0)
                        accumulator.push(array.slice(currentIndex, currentIndex + 2));
                    return accumulator;
                }, []).map((item, index) => (
                    <div className="row">
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

    imageClick = () => {
        console.log('Click');
    }
    render() {
        const { text, suggestions } = this.state;
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
                        <img className="image-middle" src={require('../../public/logo-eshilp.svg')} onClick={() => this.imageClick()} alt="logoeship" />
                    </a>
                    {/* <div >
                        <input id="query" type="text" onChange={this.onTextChange} value={text} />
                        <div className="mbsc-form-group ">
                            <div className="mbsc-grid">
                                {this.renderSuggestions()}

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
                        {this.renderSuggestions()}
                    </div>
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item"><Link className="nav-link" to={'/login'}>Login/Register</Link></li>
                        {/* <li className="nav-item"><a href="#loginModal" className="nav-link" data-toggle="modal">
                            <Link to={'/login'}>Login/Register</Link></a></li> */}
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
