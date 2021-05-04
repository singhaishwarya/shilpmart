import React from "react";
import ProductGrid from './ProductGrid'
export default class Wishlist extends React.Component {

  constructor() {
    super();
    this.state = {
      layout: 'col-lg-3 col-sm-6 col-6',
    };
  }

  render() {
    const { layout } = this.state
    return (
      <div className="container-fluid">
        <div className='row py-5'>
          <ProductGrid layoutProps={layout} />
        </div > </div >
    );
  }
}