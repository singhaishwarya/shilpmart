import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as compareAction from '../actions/compare';
import ProductService from '../services/ProductService';
import CartService from '../services/CartService';
import * as cartAction from '../actions/cart';
import ToastService from '../services/ToastService';
class Compare extends Component {
  constructor(props) {
    super(props)

    this.state = {
      compareProducts: []
    }
  }
  componentDidMount() {
    this.fetchCompareProducts(this.props.compare)
  }

  fetchCompareProducts = (productIds) => {
    productIds.map((item, index) => {
      ProductService.fetchAllProducts({ product_ids: [item.product] }).then((result1) => {
        this.setState(prevState => ({
          compareProducts: [...prevState.compareProducts, { product: result1.data[0], variation_index: item.variation_index }]
        }))
      })
    })
  }
  deleteCompare = (product, index) => {
    this.props.deleteCompare({ product: product?.product.id, variation_index: product.variation_index });
    this.setState((prevState) => ({
      compareProducts: prevState.compareProducts.filter((_, i) => i !== index)
    }));
  }
  addToCart = (product, index) => {

    if (Object.keys(this.props.userData).length > 0) this.addToCartApi(product, index)
    else {
      this.props.addToCart({ product: product?.id, variation_index: product.variation_index, quantity: 1 })
      this.deleteCompare(product, index)
    }
  }

  errorAlert = (product, type) => {
    return ToastService.error(product?.content?.title + " is " +
      (type === "cart" ? "already in cart" : "removed from wishlist"));

  }

  addToCartApi = (product, index) => {

    let cartToSync = [{
      "product_id": product.product.id,
      "quantity": 1,
      "variation_index": product.variation_index
    }], cartProductids = [];
    try {
      CartService.add({ products: cartToSync }).then((result) => {

        if (result?.success) {
          if (typeof result.data !== 'string') {
            result.data.length && result.data.map((item) => (
              cartProductids?.push(item.product_id)
            ));
            ProductService.fetchAllProducts({ product_ids: cartProductids }).then((result1) => {
              result1.data.map((item) => this.props.addToCart({ product: item?.id, variation_index: product.variation_index, quantity: 1 }));
            })
            this.deleteCompare(product, index)
          }
          else {
            this.errorAlert(product.product, 'cart');
            this.deleteCompare(product, index)
          }
        }
        else { return }
      });
    } catch (err) {
      console.log(err);
    }
  }



  render() {
    const { compare } = this.props
    const { compareProducts } = this.state;
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
                </div> : <div className="empty-wishlist empty-compare">
                  <h2>Compare list is empty.</h2>
                  <span>No products added in the compare list. You must add some products to compare them.
                    You will find a lot of interesting products on our "Shop" page.</span>
                  <Link to='/product-list'>Return to shop</Link>
                </div>}
                {compareProducts?.map((item, index) => {
                  return (
                    <div className="compare-col" key={index}>
                      <div className="compare-col-row">
                        <span className="remove-item" onClick={() => {
                          this.deleteCompare(item, index)
                        }}>Remove</span>
                        <span className="item-img mb-2">
                          <img src={item?.product.images[item.variation_index]?.image_url || require('../public/No_Image_Available.jpeg')} alt="product img" className="img-fluid"
                            onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
                          />
                        </span>
                        <span className="product-name mb-2">{item?.product.content?.title}</span>
                        <div className="proPrice mb-2">{item?.product?.prices[item.variation_index]?.price || 0}</div>
                        <span className="add-cart" onClick={() => this.addToCart(item, index)}>Add to Cart</span>
                      </div>
                      <div className="compare-col-row"><p>{item.product.content?.product_description}</p></div>
                      <div className="compare-col-row"><p>{item.product.variation_available ? 'Yes' : 'No'}</p></div>
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

const mapStateToProps = state => { return { compare: state.compare, cart: state.cart, userData: state.userData } };

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCompare: compare => dispatch(compareAction.deleteCompare(compare)),
    addToCart: cart => dispatch(cartAction.addToCart(cart)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
