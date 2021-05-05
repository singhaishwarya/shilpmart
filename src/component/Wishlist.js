import React from "react";
import ProductGrid from './ProductGrid'

export default class Wishlist extends React.Component {

  render() {

    return (
      <div className="container-fluid">
        <div className='row py-5'>
          <ProductGrid historyProps={this.props} />
        </div >
      </div >
    );
  }
}