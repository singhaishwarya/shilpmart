
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
import Address from './component/my-account/Address';
import AccountDetails from './component/my-account/AccountDetails';
import Support from './component/my-account/Support';
import Inquiry from './component/my-account/Inquiry';
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
  constructor(props) {
    super(props);
  }
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
          <MyAccount>
            <Route component={({ match }) =>
              <>
                <PrivateRoute isAuthenticated={userData} path='/order' component={Orders} />
                <PrivateRoute isAuthenticated={userData} path='/settings' component={Settings} />
                <PrivateRoute isAuthenticated={userData} path='/address' component={Address} />
                <PrivateRoute isAuthenticated={userData} path='/details' component={AccountDetails} />
                <PrivateRoute isAuthenticated={userData} path='/support-tickets' component={Support} />
                <PrivateRoute isAuthenticated={userData} path='/inquiry' component={Inquiry} />
                <PrivateRoute isAuthenticated={userData} path='/wishlist' component={Wishlist} />
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

