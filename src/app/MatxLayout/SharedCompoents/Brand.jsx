import React, { Component } from "react";

class Brand extends Component {
    state = {};
    render() {
        return (
            <div className="flex flex-middle flex-space-between brand-area">
                <div className="flex flex-middle brand">
                    <img src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/12/logo-eshilp.svg"
                        alt="company-logo" className="company-logo" />
                    {/* <span className="brand__text">eShilpMart</span> */}
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default Brand;
