import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Login from "./component/Login/Login";
import Header from "./component/Header/Header";
import ProductList from "./component/ProductList/ProductList";
import Footer from "./component/Footer/Footer";
import Dashboard from './component/Dashboard/Dashboard';
import ProductDetail from './component/ProductDetail/ProductDetail';
import SellerProfile from './component/SellerProfile/SellerProfile';
import "./index.css";
import "./public/bootstrap.min.css";
import "./public/jbility.css";
import "./public/swiper-bundle.min.css";
function App() {
    return (
        <BrowserRouter>
            <div className="grid-container">
                <Header />
                <main>

                    <Route path="/" component={Dashboard} exact />
                    <Route path="/login" component={Login} exact />
                    <Route path="/product-list" component={ProductList} exact />
                    <Route path="/product-detail" component={ProductDetail} exact />
                    <Route path="/seller-profile" component={SellerProfile} exact />

                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
