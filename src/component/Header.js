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
import ProductService from '../services/ProductService';
import ReactMegaMenu from "react-mega-menu"
import CategoryService from '../services/CategoryService';

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
      searchQuery: '',
      showModal: false,
      setIsOpen: false,
      shareUrl: ['https://app.digitalindiacorporation.in/v1/digi/'],
      title: 'eShilpmart',
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      menuOptions: [
        {
          label:
            <span><Link to='/my-account/orders'>Order</Link></span>,
          key: "1"
        }
      ], isMenuShown: false
    }
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside, false)
  }

  getCategoryTitles = () => {
    try {
      CategoryService.fetchAllCategory(this.state.config).then((result) => {

      })
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside, false)
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
    const searchString = e.target.value.toLowerCase();
    if (searchString.length >= 3) {
      ProductService.fetchAllProducts({ q: searchString }).then((result) => {
        this.setState({ seachResults: result });
      });
    }
    this.setState({ searchQuery: searchString })
  };

  handleClickOutside = (e) => {
    if (this.node.contains(e.target)) {
      return
    }
    this.setState({ seachResults: [] });
  }

  renderSearchOptions = () => {
    let { seachResults } = this.state;
    return (
      seachResults?.map((item, index) => (
        <div className="result-product-wrapper" key={index}>
          <Link to={`/product-detail/${item.id}`}>
            <span className="pro-img">
              <img onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
                src={item.images[0]?.image_url} />
            </span>
            <span>
              <span className="top-head">
                <span className="pro-tile">{item.content.title}</span>
                <span className="pro-price"><del>1999</del> &nbsp; <span>{item.price[0] ? item.price[0].price : 0}</span></span>

              </span>
              <span className="footer-head">
                <span className="result-cat"><small>Saree, Women's Wear</small></span>
                <span className="result-addtocart"> Add to Cart</span>
              </span>
            </span>
            <span className="sale-sticker">sale!</span>
          </Link>
        </div>
      )
      ));
  };

  render() {
    const { searchQuery, showModal, shareUrl, title, isLoggedIn, menuOptions, isMenuShown } = this.state;

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
                  <a href="#"><PinterestShareButton url={shareUrl[0]} quote={title}>
                    <FontAwesomeIcon icon={faPinterest} />
                  </PinterestShareButton></a>
                  <a href="#"><LinkedinShareButton url={shareUrl[0]} quote={title}>
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </LinkedinShareButton></a>
                  <a href="#">
                    <TelegramShareButton url={shareUrl[0]} quote={title}>
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
          <div className="search-container mx-5 w-100 position-relative" ref={node => this.node = node}>
            <div className="form-inline my-2 my-lg-0">
              <div className="search-bar w-100 d-flex justify-content-start" >
                <input onChange={this.onTextChange} value={searchQuery} placeholder="Search" />
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
            {isLoggedIn ? <li className="nav-item" onMouseEnter={() => this.setIsMenuShown(true)}
              onMouseLeave={() => this.setIsMenuShown(false)} >My Account
              {isMenuShown && (<ReactMegaMenu
                tolerance={50}
                direction={"DOWN"}
                data={menuOptions}        // array of data to be rendered
              />)} </li> : <li className="nav-item" onClick={this.login}>Login/Register</li>}
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