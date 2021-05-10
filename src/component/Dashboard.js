import React from "react";
import Swiper from "./Swiper";
import LiveStats from "./LiveStats";
import PressArticles from "./PressArticles";
import CustomerFeedback from "./CustomerFeedback";
import ShopByType from "./ShopByType";
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveTab: 0
    }
  }

  render() {
    const { isActiveTab } = this.state
    return (
      <>
        <section id="maincontent">
          <div className="container-fluid">
            <Swiper />
            <div className="row py-5">
              <div className="col">
                <div className="section-title">
                  <span><a href="#">Shop by Categories</a></span>
                  <p>Choose from authentic handmade product categories</p>
                </div>
                <div className="shop-categories">
                  <ShopByType type='category' {...this.props} />
                </div>
              </div>
            </div>
            <div className="row py-5 section-bg">
              <div className="col shopby-product">
                <div className="section-title">
                  <span><a href="#">Shop by Product</a></span>
                  <p>Choose from authentic handmade product categories</p>
                </div>
                <ul className="nav nav-tabs d-flex justify-content-center border-0 mb-4" role="tablist">
                  <li className="nav-item"
                  //  
                  >
                    <a className={`nav-link ${((isActiveTab === 0) ? 'active' : '')}`} id="home-tab" data-toggle="tab" href="#home" role="tab"
                      aria-controls="home" aria-selected="true" onClick={() => this.setState({ isActiveTab: 0 })}>Featured Products</a>
                  </li>
                  <li className="nav-item">
                    <a className={`nav-link ${((isActiveTab === 1) ? 'active' : '')}`} id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                      aria-controls="profile" aria-selected="false" onClick={() => this.setState({ isActiveTab: 1 })}>Latest Products</a>
                  </li>

                </ul>
                <ShopByType type='product' {...this.props} />
              </div>
            </div>
            <LiveStats />
            <CustomerFeedback />
            <PressArticles />
          </div>
        </section>
      </>
    );
  }
}
