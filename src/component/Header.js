import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Navbar from './Navbar'
import Login from "./Login";
import CartOverlay from "./CartOverlay";
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
import CategoryService from '../services/CategoryService';
import { connect } from 'react-redux';
import CartService from '../services/CartService';
import AuthService from '../services/AuthService';
import * as authAction from '../actions/auth';
import * as wishlistAction from '../actions/wishlist';
import * as compareAction from '../actions/compare';
import * as cartAction from '../actions/cart';
import WishlistService from '../services/WishlistService';

const customLoginStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const customCartStyles = {
  content: {
    width: '30%',
    transition: 'all 0.3s ease-in-out',
    top: '0%',
    left: '100%',
    right: '0%',
    bottom: '0%',
    transform: 'translate(-100%, 0)',
    borderRadius: '0'
  }
};
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seachResults: [],
      searchQuery: '',
      showModal: false,
      shareUrl: ['https://app.digitalindiacorporation.in/v1/digi/'],
      title: 'eShilpmart',
      isLoggedIn: this.props.userData.token,
      isMenuShown: false
    }
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside, false)

    if (this.state.isLoggedIn) {
      this.syncWishlist();
      this.syncCart();
    }
  }
  syncCart = () => {
    const { cart } = this.props;
    if (cart?.length > 0) {

      let cartToSync = [];
      cart.map((item) => (
        cartToSync.push(item)
      ))
      this.addToCart(cartToSync);
    }
    else {
      CartService.list().then((result) => {
        result && result.map((item) => (
          this.props.addToCart(item.product_id)
        ))
      })
    }

  }

  addToCart = (product) => {
    let cartToSync = [], cartProductids = [];
    product.map((item) => (
      cartToSync.push({
        "product_id": item,
        "quantity": 1,
        "variation_index": 0
      })
    ))
    try {
      CartService.add({ products: cartToSync }).then((result) => {

        if (result?.success) {
          if (typeof result.data !== 'string') {
            result.data.map((item) => (
              cartProductids?.push(item.product_id)
            ))
            ProductService.fetchAllProducts({ product_ids: cartProductids }).then((result1) => {
              result1.data.map((item) => this.props.addToCart(item.id));
            })
          }
          else {
            return
          }
        }
        else { return }
      });
    } catch (err) {
      console.log(err);
    }
  }

  syncWishlist = () => {
    const { wishlist } = this.props;
    if (wishlist?.length > 0) {

      let wishlistToSync = [];
      wishlist.map((item) => {
        return wishlistToSync.push(item)
      })
      this.addToWishlist(wishlistToSync);
    }
    else {
      WishlistService.list().then((result) => {
        result && result.map((item) => (
          this.props.addToWishlist(item.product_id)
        ))
      })
    }

  }

  addToWishlist = (wishlistToSync) => {
    let wishlistProductids = [];
    try {
      WishlistService.add({ product_id: wishlistToSync }).then((result) => {
        if (result?.success) {
          result.data.map((item) => (
            wishlistProductids?.push(item.product_id)
          ))
          ProductService.fetchAllProducts({ product_ids: wishlistProductids }).then((result1) => {
            result1.data.map((item) => this.props.addToWishlist(item.id));
          })
        } else { return }
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  getCategoryTitles = (id) => {
    // try {
    //   CategoryService.fetchAllCategory({ parent_id: id }).then((result) => {
    //     return result;
    //   })
    // } catch (err) {
    //   console.log(err);
    // }
  }

  setIsMenuShown = (status) => {
    this.setState({ isMenuShown: status })
  }

  dismissModal = (type) => {
    this.setState({
      showModal: !this.state.showModal, overlayType: type
    });
  };

  onTextChange = (e) => {
    this.setState({ searchQuery: e.target.value })
    const searchString = e.target.value.toLowerCase();
    if (searchString?.length >= 3) {
      // let categoryData = [];
      ProductService.fetchAllProducts({ q: searchString }).then((result) => {

        this.setState({ seachResults: result.data });
        // categoryData = result.map((item) => (
        //   item?.category.map((item) => (
        //     this.getCategoryTitles(item.category_id)
        //   ))

        //   // categoryData.push 
        // ))
        // console.log("democategoryData", categoryData)
      });
    }
    else {
      this.setState({ seachResults: [] });

    }
  };

  handleClickOutside = (e) => {
    if (e?.target && this.node?.contains(e?.target)) {
      return
    } else {
      this.setState({ seachResults: [] });
    }

  }

  renderSearchOptions = () => {
    let { seachResults } = this.state;
    return (
      seachResults?.map((item, index) => (
        <div className="result-product-wrapper" key={index}>
          <Link to={{
            pathname: `/product-detail`,
            search: "?pid=" + item?.id
          }}
            onClick={() => this.setState({ searchQuery: '', seachResults: [] })
            } >
            <span className="pro-img">
              <img onError={e => {
                e.currentTarget.src = require('../public/No_Image_Available.jpeg')
              }}
                src={item?.images[0]?.image_url || "false"}
                alt={item?.content?.title || "false"} />
            </span>
            <span>
              <span className="top-head">
                <span className="pro-tile">{item?.content?.title}</span>
                <span className="pro-price"><del>1999</del> &nbsp; <span>{item?.price[0] ? item?.price[0].price : 0} </span></span>
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

  logout = () => {
    AuthService.logout()
      .then((result) => {

        this.props.logout();
        this.props.emptyCart();
        this.props.emptyWishlist();
        this.props.emptyCompare();
      })
      .catch((err) => {
        console.log("errrr", err)
      });
  }

  render() {
    const { searchQuery, showModal, shareUrl, title, isMenuShown, overlayType } = this.state;

    return (
      <>
        <div>
          <Modal
            isOpen={showModal}
            onRequestClose={() => this.setState({ showModal: false })}
            style={overlayType === 'login' ? customLoginStyles : customCartStyles}
            shouldCloseOnOverlayClick={true}
            contentLabel={overlayType === 'login' ? "SIGN IN" : "Shopping Cart"}
            ariaHideApp={false}
          >
            {overlayType === 'login' ? <Login dismissModal={() => this.dismissModal(overlayType)} {...this.state} /> :
              <CartOverlay dismissModal={() => this.dismissModal(overlayType)} />}
          </Modal>
        </div>
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
          <Link to='/'>
            <img className="image-middle" src={require('../public/logo-eshilp.svg')} alt="logoeship" />
          </Link>
          <div className="search-container mx-5 w-100 position-relative"
            ref={node => this.node = node}
          >
            <div className="form-inline my-2 my-lg-0">
              <div className="search-bar w-100 d-flex justify-content-start" >
                <input onChange={this.onTextChange} value={searchQuery} onClick={this.onTextChange} placeholder="Search" />
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
            {this.props.userData.token ? <li className="nav-item" onMouseEnter={() => this.setIsMenuShown(true)}
              onMouseLeave={() => this.setIsMenuShown(false)} > <Link to='/my-account/dashboard'>My Account</Link>
              {isMenuShown &&
                <div className="myAccout-dropdown">


                  <Link to='/my-account/dashboard'> Dashboard</Link>
                  <Link to='/my-account/order'>Orders</Link>
                  <Link to='/my-account/address'>Addresses</Link>
                  <Link to='/my-account/details'>Account details</Link>
                  <Link to='/my-account/feedback'>Feedback</Link>
                  <Link to='my-account/wishlist'>Wishlist</Link>
                  <Link to="" onClick={() => this.logout()}>Logout</Link>




                </div>
              } </li> : <li className="nav-item" onClick={() => this.dismissModal('login')}>Login/Register</li>}

            <li className="nav-item">
              <Link to='/wishlist'><div className="nav-link">
                <FontAwesomeIcon icon={faHeart} /><span>{this.props?.wishlist?.length}</span></div></Link>
            </li>

            <li className="nav-item">
              <Link to='/compare'>
                <div className="nav-link">
                  <FontAwesomeIcon icon={faRandom} /><span>{this.props?.compare?.length}</span></div></Link>
            </li>


            <li className="nav-item" onClick={() => this.dismissModal('cart')}>
              <a href="#"> <div className="nav-link">
                <FontAwesomeIcon icon={faShoppingBasket} /><span>{this.props?.cart?.length}</span>
              </div></a>
            </li>
          </ul>
        </div >
        <Navbar />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    wishlist: state.wishlist,
    compare: state.compare,
    cart: state.cart,
    userData: state.userData
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: user => dispatch(authAction.logout(user)),
    emptyWishlist: index => dispatch(wishlistAction.emptyWishlist(index)),
    addToWishlist: index => dispatch(wishlistAction.addToWishlist(index)),
    addToCart: index => dispatch(cartAction.addToCart(index)),
    emptyCart: index => dispatch(cartAction.emptyCart(index)),
    emptyCompare: index => dispatch(compareAction.emptyCompare(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
