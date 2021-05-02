import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "./component/Login";
import Header from "./component/Header";
import ProductCategory from "./component/ProductCategory";
import Footer from "./component/Footer";
import Dashboard from './component/Dashboard';
import ProductDetail from './component/ProductDetail';
import SellerProfile from './component/SellerProfile';
import "./public/bootstrap.min.css";
import "./public/jbility.css";
import "./index.css";
import "./public/swiper-bundle.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/product-category/:categoryId" component={ProductCategory} exact />
          <Route path="/product-detail/:productId" component={ProductDetail} exact />
          <Route path="/seller-profile" component={SellerProfile} exact />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
