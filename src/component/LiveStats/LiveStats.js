import React from "react";
export default class LiveStats extends React.Component {

    render() {


        return (
            //   < !--Why choose eShilpMart-- >
            <div className="row  why-eshipmart-bg py-5">

                <div className="section-title whyeship-title w-100">
                    <span>Why choose eShilpMart</span>
                    <p>Live Statistics</p>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-2 col-12">

                    <div className="statics">
                        <div className="static-img"><a href="#"><img src={require('../../public/weaver.svg')} className="img-fluid"
                            alt="wearver" /></a></div>
                        <div className="static-details">
                            <h3><span>5126</span></h3>
                            <h4>Weavers</h4>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3 col-md-3 col-sm-2 col-12">
                    <div className="statics">
                        <div className="static-img"><a href="#"><img src={require('../../public/artisan.svg')} className="img-fluid"
                            alt="artisan" /></a></div>
                        <div className="static-details">
                            <h3><span>5126</span></h3>
                            <h4>Weavers</h4>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-2 col-12">
                    <div className="statics">
                        <div className="static-img"><a href="#"><img src={require('../../public/product.svg')} className="img-fluid"
                            alt="product" /></a></div>
                        <div className="static-details">
                            <h3><span>5126</span></h3>
                            <h4>Weavers</h4>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-2 col-12">
                    <div className="statics">
                        <div className="static-img"><a href="#"><img src={require('../../public/buyer.svg')} className="img-fluid"
                            alt="buyer" /></a></div>
                        <div className="static-details">
                            <h3><span>5126</span></h3>
                            <h4>Weavers</h4>
                        </div>
                    </div>
                </div>

            </div>

        )
    };
}