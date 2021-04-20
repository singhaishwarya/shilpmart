import React from "react";
export default class PressArticles extends React.Component {

    render() {


        return (

            //   < !--In the press-- >
            <div className="row py-5">

                <div className="section-title w-100">
                    <span>In the Press</span>
                    <p>Media coverage on eShilpMart</p>
                </div>


                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="pressBlock">
                        <div className="pressBlock-container">
                            <figure className="news-img"><a href="#"><img
                                src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/weaver1-768x403.webp"
                                className="img-fluid" alt="news" /></a></figure>

                            <div className="news-date"><span id="date">05</span><span id="month">Sep</span></div>

                            <div className="news-info-box">
                                <div className="news-details">
                                    <div className="news-categories"><a href="#">the new indian express</a></div>
                                    <h3 className="news-title"><a href="#">News Title</a></h3>
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

                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="pressBlock">
                        <div className="pressBlock-container">
                            <figure className="news-img"><a href="#"><img
                                src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/weaver1-768x403.webp"
                                className="img-fluid" alt="news" /></a></figure>

                            <div className="news-date"><span id="date">05</span><span id="month">Sep</span></div>

                            <div className="news-info-box">
                                <div className="news-details">
                                    <div className="news-categories"><a href="#">the new indian express</a></div>
                                    <h3 className="news-title"><a href="#">News Title</a></h3>
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
                </div>
            </div>
        )
    };
}