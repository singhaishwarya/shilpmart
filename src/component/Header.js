import React from "react";
import { Link } from "react-router-dom";
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRandom, faHeart, faShoppingBasket, faAdjust, faUndo } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faLinkedin, faTelegram, faPinterestP, faFacebookF, faLinkedinIn, faPinterest } from '@fortawesome/free-brands-svg-icons'

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

  renderSearchOptions = () => {
    let { seachResults } = this.state;
    if (seachResults.length === 0) {
      return null;
    }
    return (
      seachResults.map((item, index) => (
        <div className="result-product-wrapper" key={index}>
          <Link to={'/product-detail'}>         
              <span className="pro-img"><img src='https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/12/011-300x300.jpg' alt="product" />
              </span>
              <span>
                <span className="top-head">
                  <span className="pro-tile">{item}</span>
                  <span className="pro-price"><del>1999</del> &nbsp; <span>1500</span></span>
                  
                  </span>
                <span className="footer-head">
                  <span className="result-cat"><small>Saree, Women's Wear</small></span>
                  <span className="result-addtocart"><Link to={'/product-detail'}> Add to Cart </Link></span>
                </span>
              </span>
              <span className="sale-sticker">sale!</span>            
          </Link>
          </div>

        // <div className="col-6 serach-result-col" key={index}>
          
        // </div>
      )
      ));
  }

  render() {
    const { text, seachResults } = this.state;
    return (
      <>
        <div className="header-top py-1  ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-6">
                <div className="s-icons">
                  <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
                  <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                  <a href="#"><FontAwesomeIcon icon={faPinterest} /></a>
                  <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                  <a href="#"><FontAwesomeIcon icon={faTelegram} /></a>
                </div>
              </div>
              <div className="col-md-6 col-6">
                <div className="acess-container float-right">
                  <div id="acess-icons" className="access_icons">
                    <div className="acess-icon balloon" title="large font size">
                      <img src={require('../public/increase-font-size.svg')} alt="" />
                    </div>
                    <div className="acess-icon balloon" title="small font size">
                      <img src={require('../public/decrease-font-size.svg')} alt="decrease font" />
                    </div>
                    <div className="acess-icon balloon">
                      <FontAwesomeIcon icon={faAdjust} />
                    </div>
                    <div className="acess-icon balloon">                      
                      <FontAwesomeIcon icon={faUndo}/>
                    </div>
                    <a className="skipcontent" href="#maincontent">Skip to Content</a>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        
        < div className="header-middle d-flex justify-content-between align-items-center px-3" >
          <a className="navbar-brand" href="#">
            <Link to={'/'}>
              <img className="image-middle" src={require('../public/logo-eshilp.svg')} alt="logoeship" />
            </Link>
          </a>
          <div className="search-container mx-5 w-100 position-relative">
            <div className="form-inline my-2 my-lg-0">
              <div className="search-bar w-100 d-flex justify-content-start">
                <input onChange={this.onTextChange} value={text} placeholder="Search" />
                <div className="search-btn">
                  <button className="btn my-2 my-sm-0" type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </div>
            <div className="search-result-wrapper">
              
                {this.renderSearchOptions()}
              
            </div>
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
        </div >
        <Navbar />
      </>
    );
  }
}
