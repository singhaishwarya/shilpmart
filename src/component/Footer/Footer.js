import React from "react";

export default class Footer extends React.Component {
    state = {

    };

    render() {
        return (
            <>
                <div id="mainFooter">
                    <div className="container-fluid">
                        <div className="row py-5 border-bottom">
                            <div className="col-md-8 col-lg-8 col-12">
                                <div className="row">
                                    <div className="col-lg-3 col-md-3 col-6">
                                        <h5>Information</h5>
                                        <div className="footer-links">
                                            <ul>
                                                <li>Terms of use</li>
                                                <li>Right to Information</li>
                                                <li>Sitemap </li>
                                                <li>Subscribe Newsletter</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-6">
                                        <h5>Resources</h5>
                                        <div className="footer-links">
                                            <ul>
                                                <li>Terms &amp; Conditions</li>
                                                <li>Buyer Policy</li>
                                                <li>Seller Policy </li>
                                                <li>Exchange Policy</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-6">
                                        <h5>Partner with us</h5>
                                        <div className="footer-links">
                                            <ul>
                                                <li> Weaver / Artisan Registration</li>
                                                <li>Weaver / Artisan Login </li>
                                                <li>Corporate Enquiries </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-6">
                                        <h5>Need Help?</h5>
                                        <div className="footer-links">
                                            <ul>
                                                <li>FAQs</li>
                                                <li>Raise a ticket</li>
                                                <li>Contact Us </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4 col-12">
                                <h5>We Accept</h5>
                                <div className="payment_method">
                                    <div className="paycard"><img src={require("../../public/pm.webp")} className="img-fluid" alt="pay" /></div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Swiper --> */}
                        <div className="swiper-container py-5 logos">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide"><img src={require("../../public/data_gov.webp")} className="img-fluid" alt="data gov" />
                                </div>
                                <div className="swiper-slide"><img src={require("../../public/india-gov.webp")} className="img-fluid" alt="India gov" />
                                </div>
                                <div className="swiper-slide"><img src={require("../../public/mot.webp")} className="img-fluid" alt="Ministry Textile" />
                                </div>
                                <div className="swiper-slide"><img src={require("../../public/di.webp")} className="img-fluid" alt="DIC" /></div>
                                <div className="swiper-slide"><img src={require("../../public/india_post.webp")} className="img-fluid"
                                    alt="India Post" /></div>
                                <div className="swiper-slide"><img src={require("../../public/csc.webp")} className="img-fluid" alt="CSC" /></div>
                            </div>
                            {/* <!-- Add Pagination --> */}
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                </div>
                <div className="copyright-footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 col-12"> <span>Ministry of Textile <i className="fa fa-copyright"></i> 2020. <br />
                                Designed &amp; Developed by Digital India Corporation</span>
                            </div>
                            <div className="col-md-6 col-12 text-right"> <img src={require("../../public/gp-300x89.png")}
                                className="img-fluid" alt="google play store" /> &nbsp;&nbsp; <img
                                    src={require("../../public/as-300x89.png")} className="img-fluid" alt="itue" /> </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}
