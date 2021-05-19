import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as compareAction from '../actions/compare';
class Compare extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { compare } = this.props
    return (
      <section id="main-content">
        <div className="container-fluid">
          <div className="row py-5">
            <div className="col">
              <div className="compare-wrapper-row">
                {compare.length > 0 ? <div className="compare-col">
                  <div className="compare-col-row">&nbsp;</div>
                  <div className="compare-col-row compare-title">Description</div>
                  <div className="compare-col-row compare-title">Variation Available</div>
                </div> : <span>Compare list is empty.</span>}
                {compare?.map((item, index) => {
                  return (
                    <div className="compare-col" key={index}>
                      <div className="compare-col-row">
                        <a href="#" className="remove-item" onClick={() => {
                          this.props.deleteCompare(item.id)
                        }}>Remove</a>
                        <a href="#" className="item-img mb-2">
                          <img src={item?.images[0]?.image_url || require('../public/No_Image_Available.jpeg')} alt="product img" className="img-fluid"
                            onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
                          />
                        </a>
                        <a href="#" className="product-name mb-2">{item?.content?.title}</a>
                        <div className="proPrice mb-2">{item?.price[0]?.price || 0}</div>
                        <span><a href="#" className="add-cart">Add to Cart</a> </span>
                      </div>
                      <div className="compare-col-row"><p>{item.content?.product_description}</p></div>
                      <div className="compare-col-row"><p>{item.variation_available ? 'Yes' : 'No'}</p></div>
                      {/* <div className="compare-col-row"><p className="in-stock">{item.availability === 'yes' ? 'In Stock' : 'Out Of Stock'}</p></div> */}
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

const mapStateToProps = state => { return { compare: state.compare } };

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCompare: compare => dispatch(compareAction.deleteCompare(compare))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
