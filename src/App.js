
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Registration from "./component/Registration";
import Header from "./component/Header";
import ProductList from "./component/ProductList";
import Footer from "./component/Footer";
import Dashboard from './component/Dashboard';
import ProductDetail from './component/ProductDetail';
import SellerProfile from './component/SellerProfile';
import Wishlist from './component/Wishlist';
import MyWishlist from './component/Wishlist';
import Compare from './component/Compare';
import Cart from './component/Cart';
import MyAccount from './component/my-account/MyAccount';
import Orders from './component/my-account/Order/Orders';
import OrderDetail from './component/my-account/Order/OrderDetail';
import Settings from './component/my-account/Settings';
import Address from './component/my-account/Address/Address';
import AddAddress from './component/my-account/Address/AddAddress';
import EditAddress from './component/my-account/Address/AddAddress';
import AccountDetails from './component/my-account/AccountDetails';
import Feedback from './component/my-account/Feedback';
import Inquiry from './component/my-account/Inquiry';
import MyDashboard from './component/my-account/Dashboard';
import Checkout from './component/Checkout';
import ForgotPassword from './component/ForgotPassword';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';

class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    let _this = this;
    // window.onscroll = function () {
    //   if (window.pageYOffset !== 0) {
    //     _this.setState({ onScroll: true })
    //   }
    // };
  }

  render() {
    const { onScroll } = this.state;
    const { userData } = this.props;
    return (
      <BrowserRouter>
        <header><Header /></header>
        <Switch>
          <Route isAuthenticated={userData} path='/' component={Dashboard} exact />
          <Route isAuthenticated={userData} path='/registration' component={Registration} exact />
          <Route isAuthenticated={userData} path='/product-list' component={ProductList} />
          <Route isAuthenticated={userData} path='/product-detail' component={ProductDetail} />
          <Route isAuthenticated={userData} path='/seller-profile' component={SellerProfile} exact />
          <Route isAuthenticated={userData} path='/wishlist' component={Wishlist} exact />
          <Route isAuthenticated={userData} path='/compare' component={Compare} exact />
          <Route isAuthenticated={userData} path='/cart' component={Cart} exact />
          <Route isAuthenticated={userData} path='/forgot-password' component={ForgotPassword} exact />
          <Route isAuthenticated={userData} path='/checkout' component={Checkout} exact />

          <MyAccount>
            <Route component={({ match }) =>
              <>
                <PrivateRoute isAuthenticated={userData} path='/my-account/dashboard' component={MyDashboard} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/order' component={Orders} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/order-detail' component={OrderDetail} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/settings' component={Settings} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/address' component={Address} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/add-address' component={AddAddress} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/edit-address' component={EditAddress} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/details' component={AccountDetails} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/feedback' component={Feedback} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/inquiry' component={Inquiry} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/wishlist' component={MyWishlist} />
              </>
            } />
          </MyAccount>
        </Switch>
        
        <Footer />
        {/* <div className="headersticky">
          <div className="appLogo"> 
          <Link to='/'><img className="image-middle" src={require('../public/logo-eshilp.svg')} alt="logoeship" /></Link></div>
          <div className="appMenu"> <ul className="navbar-nav mr-auto ml-2">
                {navbarTabs?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={`/${item.route}`} className={`nav-item nav-link ${((isActiveTab === index) ? 'active' : '')}`} onClick={() => this.setState({ isActiveTab: index })}>
                        {item.title === 'HOME' && <FontAwesomeIcon icon={faHome} />} {item.title} </Link>
                    </li>
                  )
                })}
              </ul></div>
          <div className="appaccout"> <ul className="navbar-nav flex-row">
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
              <Link to='/wishlist' className="nav-link">
                <FontAwesomeIcon icon={faHeart} /><span>{this.props?.wishlist?.length}</span></Link>
            </li>

            <li className="nav-item">
              <Link to='/compare' className="nav-link">
                <FontAwesomeIcon icon={faRandom} /><span>{this.props?.compare?.length}</span>
              </Link>
            </li>


            <li className="nav-item" onClick={() => this.dismissModal('cart')}>
              <span className="nav-link">
                <FontAwesomeIcon icon={faShoppingBasket} /> <span>{this.props?.cart?.length}</span>
              </span>

            </li>
          </ul></div>
        </div> */}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  }
};

export default connect(mapStateToProps, null)(App);

