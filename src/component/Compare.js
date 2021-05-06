import React from 'react';
export default class Compare extends React.Component {

  constructor() {
    super();
    this.state = {
      galleryItems: [],
    };
  }

  componentDidMount() {


  }

  render() {
    return (
      <div className="row py-5">
        <div className="col">

          <div className="compare-wrapper-row">
            <div className="compare-col">&nbsp;</div>
            <div className="compare-col">

              <div className="compare-product">
                <a href="#" className="remove-item">Remove</a>
                <a href="#" className="mb-2"><img src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2021/02/IMG_20210225_080525_780-300x375.jpg" alt="product img" className="img-fluid" /></a>
                <a href="#" className="product-name mb-2">Product Title</a>
                <div className="proPrice mb-2">1500</div>
                <a href="#" className="add-cart">Add to Cart</a>
              </div>

            </div>
            <div className="compare-col">&nbsp;</div>
            <div className="compare-col">&nbsp;</div>
            <div className="compare-col">&nbsp;</div>
            <div className="compare-col">&nbsp;</div>
          </div>

          <div className="compare-wrapper-row compare-title">
            <div className="compare-col">Description</div>
            <div className="compare-col"><p>Canvas material, water proof lining.</p></div>
            <div className="compare-col">&nbsp;</div>
            <div className="compare-col">&nbsp;</div>
            <div className="compare-col">&nbsp;</div>
            <div className="compare-col">&nbsp;</div>
          </div>


          <div className="compare-wrapper-row compare-title">
            <div className="compare-col">Availability</div>
            <div className="compare-col"><p className="in-stock">In Stock</p></div>
            <div className="compare-col"><p className="out-stock">Out of Stock</p></div>
            <div className="compare-col">&nbsp;</div>
            <div className="compare-col">&nbsp;</div>
            <div className="compare-col">&nbsp;</div>
          </div>


        </div>
      </div>
    );
  }
}