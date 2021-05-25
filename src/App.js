
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "./component/Login";
import Registration from "./component/Registration";
import Header from "./component/Header";
import ProductCategory from "./component/ProductCategory";
import Footer from "./component/Footer";
import Dashboard from './component/Dashboard';
import ProductDetail from './component/ProductDetail';
import SellerProfile from './component/SellerProfile';
import Wishlist from './component/Wishlist';
import Compare from './component/Compare';
import Cart from './component/Cart';
import MyAccount from './component/my-account/MyAccount';
import Orders from './component/my-account/Orders';
import Settings from './component/my-account/Settings';
import Address from './component/my-account/Address/Address';
import AddAddress from './component/my-account/Address/AddAddress';
import EditAddress from './component/my-account/Address/AddAddress';
import AccountDetails from './component/my-account/AccountDetails';
import Support from './component/my-account/Support';
import Inquiry from './component/my-account/Inquiry';
import MyDashboard from './component/my-account/Dashboard';
import ForgotPassword from './component/ForgotPassword';
import "./public/bootstrap.min.css";
import "./public/jbility.css";
import "./index.css";
import "./public/swiper-bundle.min.css"
import 'react-alice-carousel/lib/alice-carousel.css';
import 'rc-slider/assets/index.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';

class App extends Component {

  render() {

    const { userData } = this.props;
    return (
      <BrowserRouter>
        <header><Header /></header>
        <Switch>
          <Route isAuthenticated={userData} path='/' component={Dashboard} exact />
          <Route isAuthenticated={userData} path='/login' component={Login} exact />
          <Route isAuthenticated={userData} path='/buyer-registration' component={Registration} exact />
          <Route isAuthenticated={userData} path='/product-list' component={ProductCategory} />
          <Route isAuthenticated={userData} path='/product-detail' component={ProductDetail} />
          <Route isAuthenticated={userData} path='/seller-profile' component={SellerProfile} exact />
          <Route isAuthenticated={userData} path='/wishlist' component={Wishlist} exact />
          <Route isAuthenticated={userData} path='/compare' component={Compare} exact />
          <Route isAuthenticated={userData} path='/cart' component={Cart} exact />
          <Route isAuthenticated={userData} path='/forgot-password' component={ForgotPassword} exact />
          <MyAccount>
            <Route component={({ match }) =>
              <>
                <PrivateRoute isAuthenticated={userData} path='/my-account/dashboard' component={MyDashboard} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/order' component={Orders} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/settings' component={Settings} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/address' component={Address} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/add-address' component={AddAddress} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/edit-address' component={EditAddress} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/details' component={AccountDetails} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/support-tickets' component={Support} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/inquiry' component={Inquiry} />
                <PrivateRoute isAuthenticated={userData} path='/my-account/wishlist' component={Wishlist} />
              </>
            } />
          </MyAccount>
        </Switch>
        <Footer />
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

