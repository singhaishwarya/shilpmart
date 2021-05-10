import React from "react";
import { Link } from "react-router-dom";
import Navbar from './Navbar'
import Login from "./Login";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRandom, faHeart, faUndo, faShoppingBasket, faAdjust } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faLinkedinIn, faTelegram, faPinterest } from '@fortawesome/free-brands-svg-icons'
import Modal from 'react-modal';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  TelegramShareButton,
  LinkedinShareButton
} from "react-share";
import Auth from '../Auth';
import ReactMegaMenu from "react-mega-menu"

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      seachResults: [],
      text: '',
      optionData: ['Art Silk banarasi saree', 'saree Art Silk heavy  saree',
        'TANGAIL SAREE', 'saree TANGAIL SAREE HALF ACHAL', 'saree CHAMARAJ PURE SILK SAREES -WEDDING SILK SAREES', 'saree Raw Silk X Eri Spun Silk Saree Saree', 'saree Tussar Ghiccha Silk Saree with Madhubani Hand Painting', 'saree Tussar Ghiccha Silk Saree with Madhubani Hand Painting', 'saree KATA BUTI STAR CHOSMA TANT SAREE', 'saree Chamka Saree (Artsilk) saree'],
      showModal: false, setIsOpen: false, shareUrl: ['https://app.digitalindiacorporation.in/v1/digi/', 'https://app.digitalindiacorporation.in/v1/digi/', 'https://app.digitalindiacorporation.in/v1/digi/', 'https://app.digitalindiacorporation.in/v1/digi/', 'https://app.digitalindiacorporation.in/v1/digi/'],
      title: 'eShilpmart',
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      menuOptions: [
        {
          label:
            <span><Link to='/my-account/orders'>Order</Link></span>,
          key: "1"
        },
        // {
        //   label:
        //     <span>Settings</span>,
        //   key: "Settings"
        // }
      ], isMenuShown: false
    }
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount = () => {

    document.removeEventListener('mousedown', this.handleClick, false)
  }

  setIsMenuShown = (status) => {
    this.setState({ isMenuShown: status })
  }
  // openModal = () => {
  //   // setIsOpen(true);
  //   this.setState({
  //     subtitle: '',
  //     showModal: true, setIsOpen: true
  //   })
  // };

  closeModal = () => {
    // setIsOpen(false);
    this.setState({ showModal: false, setIsOpen: false })

  };
  login = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };
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
  };
  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return
    }
    this.handleClickOutside();
  }

  handleClickOutside = () => {
    this.setState({ text: '', seachResults: [] });
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
      )
      ));
  };

  render() {
    const { text, showModal, shareUrl, title, isLoggedIn, menuOptions, isMenuShown } = this.state;

    return (
      <>
        <Modal
          isOpen={showModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          shouldCloseOnOverlayClick={true}
          contentLabel="SIGN IN"
          ariaHideApp={false}
        >
          <Login loginClick={this.login} /> </Modal>
        <div className="header-top py-1  ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-6">
                <div className="s-icons">
                  <a href="#">
                    <FacebookShareButton url={shareUrl} quote={title}>
                      <FontAwesomeIcon icon={faFacebookF} />
                    </FacebookShareButton>
                  </a>
                  <a href="#">
                    <TwitterShareButton url={shareUrl[0]} quote={title}>
                      <FontAwesomeIcon icon={faTwitter} />
                    </TwitterShareButton></a>
                  <a href="#"><PinterestShareButton url={shareUrl[1]} quote={title}>
                    <FontAwesomeIcon icon={faPinterest} />
                  </PinterestShareButton></a>
                  <a href="#"><LinkedinShareButton url={shareUrl[2]} quote={title}>
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </LinkedinShareButton></a>
                  <a href="#">
                    <TelegramShareButton url={shareUrl[3]} quote={title}>
                      <FontAwesomeIcon icon={faTelegram} />
                    </TelegramShareButton></a>
                </div>
              </div>
              <div className="col-md-6 col-6">
                <div className="acess-container float-right">
                  <div className="access_icons">
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
                      <FontAwesomeIcon icon={faUndo} />
                    </div>
                    <a className="skipcontent" href="#maincontent">Skip to Content</a>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        < div className="header-middle d-flex justify-content-between align-items-center px-3" >
          <Link to={'/'}>
            <img className="image-middle" src={require('../public/logo-eshilp.svg')} alt="logoeship" />
          </Link>
          <div className="search-container mx-5 w-100 position-relative" >
            <div className="form-inline my-2 my-lg-0">
              <div className="search-bar w-100 d-flex justify-content-start" ref={node => this.node = node}>
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
            {isLoggedIn ? <div onMouseEnter={() => this.setIsMenuShown(true)}
              onMouseLeave={() => this.setIsMenuShown(false)} ><li className="nav-item" >Account</li>
              {isMenuShown && (<ReactMegaMenu
                tolerance={50}      // optional, defaults to 100
                direction={"DOWN"}  // optional, defaults to "RIGHT", takes in "RIGHT" || "LEFT"
                data={menuOptions}        // array of data to be rendered
              />)} </div> : <li className="nav-item" onClick={this.login}>Login/Register</li>}
            <li className="nav-item"><Link to={'/wishlist'}><div className="nav-link">
              <FontAwesomeIcon icon={faHeart} /><span>0</span></div></Link></li>
            <li className="nav-item"><Link to={'/compare'}>
              <div className="nav-link">
                <FontAwesomeIcon icon={faRandom} /><span>0</span></div></Link></li>
            <li className="nav-item"> <Link to={'/cart'}><div className="nav-link">
              <FontAwesomeIcon icon={faShoppingBasket} /><span>0</span>
            </div></Link></li>
          </ul>
        </div >
        <Navbar />
      </>
    );
  }
}
