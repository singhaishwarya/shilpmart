import React from "react";
import ProductGrid from './ProductGrid'

export default class Wishlist extends React.Component {

  render() {

    return (
      <section id="maincontent">
      <div className="container-fluid"> 
        
          <ProductGrid historyProps={this.props} />
       
      </div>
      </section>
    );
  }
}