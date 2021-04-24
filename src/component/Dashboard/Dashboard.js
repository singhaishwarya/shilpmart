import React from "react";
import Swiper from "../Swiper/Swiper";
import LiveStats from "../LiveStats/LiveStats";
import PressArticles from "../PressArticles/PressArticles";
import CustomerFeedback from "../CustomerFeedback/CustomerFeedback";
import ShopByCategory from "../ShopByCategory/ShopByCategory";
import ShopByProduct from "../ShopByProduct/ShopByProduct";
export default class Dashboard extends React.Component {

    render() {
        return (
            <>
                <Swiper />
                <ShopByCategory />
                <ShopByProduct />
                <LiveStats />
                <CustomerFeedback />
                <PressArticles />
            </>
        );
    }
}
