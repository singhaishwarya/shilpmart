import React from "react";
// import "./Dashboard.css";
import "../../index.css";
import "../../public/bootstrap.min.css";
import "../../public/jbility.css";
import "../../public/swiper-bundle.min.css";

import Login from "../Login/Login";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link, Route, Switch, Redirect } from "react-router-dom";
export default class Dashboard extends React.Component {

    render() {
        return (
            <>
                <Header />
                <Navbar />
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
