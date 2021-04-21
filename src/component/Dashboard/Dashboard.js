import React from "react";
// import "./Dashboard.css";
import "../../index.css";
import "../../public/bootstrap.min.css";
import "../../public/jbility.css";
import "../../public/swiper-bundle.min.css";
import "react-alice-carousel/lib/alice-carousel.css";

import Login from "../Login/Login";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Swiper from "../Swiper/Swiper";
import LiveStats from "../LiveStats/LiveStats";
import PressArticles from "../PressArticles/PressArticles";
import CustomerFeedback from "../CustomerFeedback/CustomerFeedback";
import ShopByCategory from "../ShopByCategory/ShopByCategory";
import ShopByProduct from "../ShopByProduct/ShopByProduct";
import Footer from "../Footer/Footer";
import { Route, Switch, Redirect } from "react-router-dom";
export default class Dashboard extends React.Component {

    render() {
        return (
            <>
                <Header />
                <Navbar />
                <Swiper />
                <ShopByCategory />
                <ShopByProduct />
                <LiveStats />
                <CustomerFeedback />
                <PressArticles />
                <Footer />

                <Switch>
                    {/* <Route exact path="/" component={Home} /> */}
                    <Route path="/login" component={Login} />
                    {/* <Route path="/about" component={About} /> */}
                    <Redirect to="/" />
                </Switch>

            </>
        );
    }
}
