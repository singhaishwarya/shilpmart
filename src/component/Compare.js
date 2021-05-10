import React from 'react';
export default class Compare extends React.Component {

  constructor() {
    super();
    this.state = {
      productsToCompare: [{
        imageSrc: require("../public/bag1.jpeg"),
        title: 'Bag 1',
        description: 'Canvas material, water proof lining.',
        cost: '600',
        sku: 3,
        category: "Saree",
        tags: "Handlooms",
        availability: "yes"
      }, {
        imageSrc: require("../public/bag2.jpeg"),
        title: 'bag 2',
        description: 'Canvas material, water proof lining.',
        cost: '600',
        sku: 3,
        category: "Saree",
        tags: "Handlooms",
        availability: "yes"
      }]
    };
  }

  componentDidMount() {


  }

  render() {
    const { productsToCompare } = this.state
    return (
      <section id="main-content">
        <div className="container-fluid">
      <div className="row py-5">
        <div className="col">


          <div className="compare-wrapper-row">
            <div className="compare-col">
              <div className="compare-col-row">&nbsp;</div>
              <div className="compare-col-row compare-title">Description</div>
              <div className="compare-col-row compare-title">Availability</div>
            </div>
            {productsToCompare.map((item, index) => {
              return (
                <div className="compare-col" key={index}>
                  <div className="compare-col-row">
                    <a href="#" className="remove-item">Remove</a>
                    <a href="#" className="item-img mb-2">
                      <img src={item.imageSrc} alt="product img" className="img-fluid" />
                    </a>
                    <a href="#" className="product-name mb-2">{item.title}</a>
                    <div className="proPrice mb-2">{item.cost}</div>
                    <span><a href="#" className="add-cart">Add to Cart</a> </span>
                  </div>
                  <div className="compare-col-row"><p>{item.description}</p></div>
                  <div className="compare-col-row"><p className="in-stock">{item.availability === 'yes' ? 'In Stock' : 'Out Of Stock'}</p></div>
                </div>
              )
            })}




          </div>



        </div>
      </div>
      </div>
      </section>
    );
  }
}