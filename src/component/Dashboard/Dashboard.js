import React from "react";
import "./Dashboard.css";
import "../../public/bootstrap.min.css";
import "../../public/jbility.css";
import "../../public/swiper-bundle.min.css";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
export default class App extends React.Component {
    state = {
    };

    render() {
        return (
            <>
                <Header />
                <Navbar />
            </>
        );
    }
}
