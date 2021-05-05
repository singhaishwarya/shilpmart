import React from 'react';
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
import "./public/bootstrap.min.css";
import "./public/jbility.css";
import "./index.css";
import "./public/swiper-bundle.min.css"
import 'react-alice-carousel/lib/alice-carousel.css';
import 'rc-slider/assets/index.css';
import 'react-image-gallery/styles/css/image-gallery.css';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
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

        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
