import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
import Auth from './Auth';

function App() {
  return (
    <BrowserRouter>
      <header><Header /></header>
      <Switch>
        <Route path='/' component={Dashboard} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/buyer-registration' component={Registration} exact />
        <Route path='/product-category/:categoryId' component={ProductCategory} exact />
        <Route path='/product-detail/:productId' component={ProductDetail} exact />
        <Route path='/seller-profile' component={SellerProfile} exact />
        <Route path='/wishlist' component={Wishlist} exact />
        <Route path='/compare' component={Compare} exact />
        <Route path='/cart' component={Cart} exact />
        {/* <PrivateRoute path='/my-account/orders' component={Orders} /> */}
        <MyAccount>
          <Route component={({ match }) =>
            <>
              <PrivateRoute path='/my-account/order' component={Orders} />
              <PrivateRoute path='/my-account/settings' component={Settings} />
              <PrivateRoute path='/my-account/address' component={Address} />
              <PrivateRoute path='/my-account/details' component={AccountDetails} />
              <PrivateRoute path='/my-account/support-tickets' component={Support} />
              <PrivateRoute path='/my-account/inquiry' component={Inquiry} />
              <PrivateRoute path='/my-account/wishlist' component={Wishlist} />
            </>
          } />
        </MyAccount>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.getAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
)

export default App;
