import React from 'react';
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
          <h1>Billing Address<small><a href="#">Edit</a></small></h1>
        </div>
        <div className="coloumn-2">
        <h1>Shipping Address</h1>
        </div>
      </div>

      
      </>
    );
  }
}