import React from "react";
import Swiper from "../Swiper/Swiper";
import LiveStats from "../LiveStats/LiveStats";
import PressArticles from "../PressArticles/PressArticles";
import CustomerFeedback from "../CustomerFeedback/CustomerFeedback";
import ShopByType from "../ShopByType/ShopByType";
export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
        <Swiper />
        <div className="col">
          <div className="section-title">
            <span><a href="#">Shop by Categories</a></span>
            <p>Choose from authentic handmade product categories</p>
          </div>
          <div className="swiper-container shop-categories">
            <div className="swiper-wrapper">
              <ShopByType type='category' {...this.props} />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="section-title">
            <span><a href="#">Shop by Product</a></span>
            <p>Choose from authentic handmade product categories</p>
          </div>
          <ul className="nav nav-tabs d-flex justify-content-center border-0 mb-4" id="myTab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                aria-controls="home" aria-selected="true">Featured Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                aria-controls="profile" aria-selected="false">Latest Products</a>
            </li>

          </ul>
          <ShopByType type='product' {...this.props} />
        </div>
        <LiveStats />
        <CustomerFeedback />
        <PressArticles />
      </>
    );
  }
}
