import React from "react";
export default class PressArticles extends React.Component {
  constructor() {
    super();
    this.state = {
      pressLayoutData: [], pressLayoutItems: [],
    };
  }

  componentDidMount() {
    this.setState({
      // pressLayoutData: [{ '05-09-2020', }]//api data to be binded here
      pressLayoutItems: [
        <div key='0' className="col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="pressBlock">
            <div className="pressBlock-container">
              <figure className="news-img">
                <img
                  src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/weaver1-768x403.webp"
                  className="img-fluid" alt="news" />
                <div className="overlay-news"></div>
              </figure>

              <div className="news-date"><span id="date">05</span><span id="month">Sep</span></div>

              <div className="news-info-box">
                <div className="news-details">
                  <div className="news-categories"><span>the new indian express</span></div>
                  <h3 className="news-title">News Title</h3>
                  <div className="news-meta d-flex justify-content-center">
                    <div className="meta">Admin meta</div>
                    <div className="meta share"></div>
                  </div>
                  <p>Every job created in the powerloom sector, which floods the market with cheap
                  imitations of handloom weaves, displaces 14 traditional weavers. Advanced
                                        powerlooms cause even greater displacement. </p>
                </div>

              </div>

            </div>
          </div>
        </div>,
        <div key='1' className="col-lg-6 col-md-6 col-sm-12 col-12" style={{ width: 310 }}>
          <div className="pressBlock">
            <div className="pressBlock-container">
              <figure className="news-img">
                <img
                  src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/weaver1-768x403.webp"
                  className="img-fluid" alt="news" />
                <div className="overlay-news"></div>
              </figure>

              <div className="news-date"><span id="date">05</span><span id="month">Sep</span></div>

              <div className="news-info-box">
                <div className="news-details">
                  <div className="news-categories"><span>the new indian express</span></div>
                  <h3 className="news-title">News Title</h3>
                  <div className="news-meta d-flex justify-content-center">
                    <div className="meta">Admin meta</div>
                    <div className="meta share"></div>
                  </div>
                  <p>Every job created in the powerloom sector, which floods the market with cheap
                  imitations of handloom weaves, displaces 14 traditional weavers. Advanced
                                        powerlooms cause even greater displacement. </p>
                </div>

              </div>

            </div>
          </div> </div>]
    });

  }

  responsive = {
    0: { items: 1 },
    1000: { items: 2 },
  }
  render() {

    return (

      <div className="row py-5">

        <div className="section-title w-100">
          <span>In the Press</span>
          <p>Media coverage on eShilpMart</p>
        </div>
        {this.state.pressLayoutItems}

      </div>
    )
  };
}