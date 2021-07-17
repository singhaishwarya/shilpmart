import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Navbar from './Navbar'
import Login from "./Login";
import CartOverlay from "./CartOverlay";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRandom, faHeart, faUndo, faShoppingBasket, faAdjust, faTimes, faTachometerAlt, faSignOutAlt, faTicketAlt, faUser, faList } from '@fortawesome/free-solid-svg-icons'
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
//import CategoryService from '../services/CategoryService';
import { connect } from 'react-redux';
import CartService from '../services/CartService';
import AuthService from '../services/AuthService';
import * as authAction from '../actions/auth';
import * as wishlistAction from '../actions/wishlist';
import * as compareAction from '../actions/compare';
import * as cartAction from '../actions/cart';
import WishlistService from '../services/WishlistService';
// import { isMobile } from 'react-device-detect';
import { ToastContainer } from 'react-toastify';
import ToastService from '../services/ToastService';
import TopBarMenu from './TopBarMenu';
import { customLoginStyles, customCartStyles } from "../lib/utils";

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
      isMenuShown: false, scrolled: false
    }
  }

  componentDidMount = () => {
    this.prev = window.scrollY;
    document.addEventListener('mousedown', this.handleClickOutside, false)
    document.addEventListener('scroll', this.handleScroll)

    if (this.state.isLoggedIn) {
      this.syncWishlist();
      this.syncCart();
    }
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    if (this.prev > window.scrollY) {
      if (window.scrollY === 0) { this.setState({ scrolled: false }) }
    } else if (this.prev < window.scrollY) {
      if (window.scrollY > 190) { this.setState({ scrolled: true }) }
    }
    this.prev = window.scrollY;
  }

  syncCart = () => {
    const { cart } = this.props;
    if (cart?.length > 0) {
      this.addToCart(cart);
    }
    else {
      CartService.list().then((result) => {
        result && result.map((item) => (
          this.props.addToCart({ product: item?.product_id, variation_index: item.variation_index, quantity: item.quantity })
        ))
      })
    }

  }

  syncWishlist = () => {
    const { wishlist } = this.props;
    if (wishlist?.length > 0) {
      let prods = [], variation = [];
      wishlist.map((item) => {
        return prods.push(item.product) && variation.push(item.variation_index)
      })
      this.addToWishlist({ product_id: prods, variation_index: variation });
    }
    else {
      WishlistService.list().then((result) => {
        result && result.map((item) => (
          this.props.addToWishlist({ product: item.product_id, variation_index: item.variation_index })
        ))
      })
    }

  }

  addToWishlist = (wishlistToSync) => {
    let wishlistProductids = [];
    try {
      WishlistService.addDelete(wishlistToSync).then((result) => {
        if (result?.success) {
          result.data.map((item) => (
            wishlistProductids?.push(item.product_id)
          ))
          ProductService.fetchAllProducts({ product_ids: wishlistProductids }).then((result1) => (
            result1?.data.map((item) => this.props.addToWishlist({ product: item.id, variation_index: 0 }))
          ))
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
      ProductService.fetchAllProducts({ q: searchString }).then((result) => {
        this.setState({ seachResults: result.data });
      });
    }
    else {
      this.setState({ seachResults: [] });

    }
  };

  addToCart = (product) => {
    if (this.props.cart.find(({ product, variation_index }) => (product === product.id && variation_index === 0)) !== undefined) {
      this.errorAlert(product, 'cart');
    }
    else {
      Object.keys(this.props.userData).length > 0 ? this.addToCartApi(product) :
        this.props.addToCart({ product: product?.id, variation_index: 0, quantity: 1 })
    }
  }
  errorAlert = (product, type) => {
    return ToastService.error(product?.content?.title + " is " +
      (type === "cart" ? "already in cart" : "removed from wishlist"));

  }
  addToCartApi = (product) => {
    let cartToSync = [], cartProductids = [];
    product.map((item) => {
      return cartToSync.push({
        "product_id": item.product,
        "quantity": item.quantity,
        "variation_index": item.variation_index
      })
    });
    try {
      CartService.add({ products: cartToSync }).then((result) => {

        if (result?.success) {
          if (typeof result.data !== 'string') {
            result.data.length && result.data.map((item) => (
              cartProductids?.push(item.product_id)
            ));
            ProductService.fetchAllProducts({ product_ids: cartProductids }).then((result1) => {
              result1.data.map((item) => this.props.addToCart({ product: item.id, variation_index: 0, quantity: 1 }));
            })
          }
          else {
            // this.props.errorAlert(product);
          }
        }
        else { return }
      });
    } catch (err) {
      console.log(err);
    }
  }
  handleClickOutside = (e) => {
    if (e?.target && this.node?.contains(e?.target)) {
      return
    } else {
      this.setState({ seachResults: [] });
    }

  }

  renderSearchOptions = () => {
    let { seachResults } = this.state;
    const { cart } = this.props;
    return (
      seachResults?.map((item, index) => (
        <div className="result-product-wrapper" key={index}>
          <Link to={{
            pathname: `/product-detail`,
            search: "?pid=" + item.content.product_id

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
          </Link>
          <span>
            <span className="top-head">
              <span className="pro-tile">{item?.content?.title}</span>
              <span className="pro-price"><del>1999</del> &nbsp; <span>{item?.price} </span></span>
            </span>
            <span className="footer-head">
              <span className="result-cat"><small>{item.category?.parent_category[0].title}, {item.category?.cate_title}</small></span>
              <span className="result-addtocart" onClick={
                () => (
                  this.props.cart.find(({ product, variation_index }) => (product === item.id && variation_index === 0)) !== undefined ? '' : (item.variation_available ? this.productDetail(item) : this.addToCart(item))
                )
              }> Add to Cart</span>
            </span>
          </span>
          <span className="sale-sticker">sale!</span>

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
    const { searchQuery, showModal, shareUrl, title, isMenuShown, overlayType, scrolled } = this.state;

    return (
      <> <div>
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
        <ToastContainer />
        {scrolled ?
          <div className="headersticky fixed-header">
            <div className="appLogo">
              <Link to='/'><img className="image-middle" src={require('../public/logo-eshilp.svg')} alt="logoeship" /></Link></div>
            <div className="appMenu"> <ul>
              <TopBarMenu />
            </ul></div>
            <div className="appaccout"> <ul>
              {this.props.userData.token ?
                <li className="nav-item" onMouseEnter={() => this.setIsMenuShown(true)}
                  onMouseLeave={() => this.setIsMenuShown(false)} > <Link to='/my-account/dashboard' className="nav-link">My Account</Link>
                  {isMenuShown &&
                    <div className="myAccout-dropdown">
                      <Link to='/my-account/dashboard'><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</Link>
                      <Link to='/my-account/order'><FontAwesomeIcon icon={faShoppingBasket} /> Orders</Link>
                      <Link to='/my-account/address'><FontAwesomeIcon icon={faList} /> Addresses</Link>
                      <Link to='/my-account/details'><FontAwesomeIcon icon={faUser} /> Account details</Link>
                      <Link to='/my-account/feedback'><FontAwesomeIcon icon={faUndo} /> Feedback</Link>
                      <Link to='/my-account/order'><FontAwesomeIcon icon={faTicketAlt} /> Raise Ticket</Link>
                      <Link to='/my-account/wishlist'><FontAwesomeIcon icon={faHeart} /> Wishlist</Link>
                      <Link to="" onClick={() => this.logout()}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
                    </div>
                  }
                </li>
                : <li className="nav-item" onClick={() => this.dismissModal('login')}><span className="nav-link">Login/Register</span></li>}

              <li className="nav-item">
                <Link to='/wishlist' className="nav-link">
                  <FontAwesomeIcon icon={faHeart} />
                  {this.props?.wishlist?.length > 0 ? <span>{this.props?.wishlist?.length}</span> : ''}</Link>
              </li>

              <li className="nav-item">
                <Link to='/compare' className="nav-link">
                  <FontAwesomeIcon icon={faRandom} />
                  {this.props?.compare?.length > 0 && <span>{this.props?.compare?.length}</span>}
                </Link>
              </li>


              <li className="nav-item" onClick={() => this.dismissModal('cart')}>
                <span className="nav-link">
                  <FontAwesomeIcon icon={faShoppingBasket} /> {this.props?.cart?.length > 0 && <span>{this.props?.cart?.length}</span>}
                </span>

              </li>
            </ul></div>
          </div> :
          <> <div className="header-top py-1">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 col-6">
                  <div className="s-icons">
                    <FacebookShareButton url={shareUrl} quote={title}>
                      <FontAwesomeIcon icon={faFacebookF} />
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl[0]} quote={title}>
                      <FontAwesomeIcon icon={faTwitter} />
                    </TwitterShareButton>
                    <PinterestShareButton url={shareUrl[0]} quote={title}>
                      <FontAwesomeIcon icon={faPinterest} />
                    </PinterestShareButton>
                    <LinkedinShareButton url={shareUrl[0]} quote={title}>
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </LinkedinShareButton>

                    <TelegramShareButton url={shareUrl[0]} quote={title}>
                      <FontAwesomeIcon icon={faTelegram} />
                    </TelegramShareButton>
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
            <div className="header-middle d-flex justify-content-between align-items-center px-3" >
              <Link to='/'>
                <img className="image-middle" src={require('../public/logo-eshilp.svg')} alt="logoeship" />
              </Link>
              <div className="search-container mx-5 w-100 position-relative"
                ref={node => this.node = node}
              >
                <div className="form-inline my-2 my-lg-0">
                  <div className="search-bar w-100 d-flex justify-content-start" >
                    <form className="w-100 position-relative"><input onChange={this.onTextChange} value={searchQuery} onClick={this.onTextChange} placeholder="Search" />
                      {searchQuery &&
                        <button onClick={() => this.setState({ searchQuery: '', seachResults: [] })} type="button" className="closeBtn" ><FontAwesomeIcon icon={faTimes} /></button>
                      }

                      <div className="search-btn">
                        <Link to={{
                          pathname: `/product-list`,
                          search: "?q=" + searchQuery,
                        }} >
                          <button type="button" className="btn my-2 my-sm-0" >
                            <FontAwesomeIcon icon={faSearch} />
                          </button>
                        </Link>
                      </div></form>
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
                      <Link to='/my-account/dashboard'><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</Link>
                      <Link to='/my-account/order'><FontAwesomeIcon icon={faShoppingBasket} /> Orders</Link>
                      <Link to='/my-account/address'><FontAwesomeIcon icon={faList} /> Addresses</Link>
                      <Link to='/my-account/details'><FontAwesomeIcon icon={faUser} /> Account details</Link>
                      <Link to='/my-account/feedback'><FontAwesomeIcon icon={faUndo} /> Feedback</Link>
                      <Link to='/my-account/order'><FontAwesomeIcon icon={faTicketAlt} /> Raise Ticket</Link>
                      <Link to='/my-account/wishlist'><FontAwesomeIcon icon={faHeart} /> Wishlist</Link>
                      <Link to="" onClick={() => this.logout()}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
                    </div>
                  } </li> : <li className="nav-item" onClick={() => this.dismissModal('login')}>Login/Register</li>}

                <li className="nav-item">
                  <Link to='/wishlist' className="nav-link"><FontAwesomeIcon icon={faHeart} />
                    {this.props?.wishlist?.length > 0 ? <span>{this.props?.wishlist?.length}</span> : ''}</Link>
                </li>

                <li className="nav-item">
                  <Link to='/compare' className="nav-link">
                    <FontAwesomeIcon icon={faRandom} />{this.props?.compare?.length > 0 ? <span>{this.props?.compare?.length}</span> : ''}
                  </Link>
                </li>


                <li className="nav-item" onClick={() => this.dismissModal('cart')}>
                  <span className="nav-link">
                    <FontAwesomeIcon icon={faShoppingBasket} /> {this.props?.cart?.length > 0 ? <span>{this.props?.cart?.length}</span> : ''}
                  </span>

                </li>
              </ul>
            </div >
            <Navbar /> </>}</>
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
