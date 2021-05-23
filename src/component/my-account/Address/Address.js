import React from 'react';
import { Link } from "react-router-dom";

export default class Address extends React.Component {

  constructor() {
    super();
    this.state = {

    };
  }

  render() {

    return (
      <>
        <p> The following addresses will be used on the checkout page by default.</p>
        <div className="flexi">
          <div className="coloumn-2">
            <h2>   <Link to={'/my-account/add-address'} > +</Link> </h2>
          </div>
          <div className="coloumn-2">
            <h2> Address<small><a href="#">Edit</a></small></h2>
            <address>Billing Address comes here...</address>
          </div>
          {/* <div className="coloumn-2">
        <h2>Shipping Address <small><a href="#"> Edit</a></small></h2>
        <address>Shipping Address comes here...</address>
        </div> */}
        </div>


      </>
    );
  }
}