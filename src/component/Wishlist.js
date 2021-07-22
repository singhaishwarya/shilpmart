import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as wishlistAction from '../actions/wishlist';
import * as cartAction from '../actions/cart';
import * as compareAction from '../actions/compare';
import WishlistService from '../services/WishlistService';
import ProductTile from './ProductTile';
import ToastService from '../services/ToastService';
import ProductService from '../services/ProductService';
class Wishlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wishlist: [],
      layoutValue: '4X4'
    }
  }

  componentDidMount() {
    this.props.userData?.token ? this.getWishlistApi() : this.getWishlist();
  }
  getWishlist = () => {
    this.props.wishlist.map((item, index) => {
      ProductService.fetchAllProducts({ product_ids: [item.product] }).then((result1) => {
        this.setState(prevState => ({
          wishlist: [...prevState.wishlist, { product: result1.data[0], variation_index: item.variation_index || 0 }]
        }))
      })
    });
  }

  deleteWishlist = (product, index) => {
    if (this.props.userData?.token) { (this.deleteWishlistApi(product, index)) }
    else {
      this.props.deleteWishlist({ product: (product.product_id || product?.product.id), variation_index: product.variation_index || 0 });
      this.setState((prevState) => ({
        wishlist: prevState.wishlist.filter((_, i) => i !== index)
      }));
    }
  }

  deleteWishlistApi = (item, index) => {
    console.log("dem===", item, this.state.wishlist)
    WishlistService.addDelete({ wishlist_id: item.id, product_id: [item.product_id], variation_index: [item.variation_index || 0] }).then((result) => {
      if (result.success) {
        this.props.deleteWishlist({ product: item.product_id, variation_index: item.variation_index || 0 })
        this.setState((prevState) => ({
          wishlist: prevState.wishlist.filter((_, i) => i !== index)
        }));
      }
    });
  }

  getWishlistApi = () => {

    WishlistService.list().then((result) => {
      result && result.map((item) => this.props.addToWishlist({ product: item.product_id, variation_index: item.variation_index || 0 })
      )

      this.setState({ wishlist: result });
    })
  }
  errorAlert = (product) => {
    return ToastService.error(product?.content?.title + " is already in cart")
  }

  successAlert = (product, type) => {
    return ToastService.success(product?.content?.title + " is successfully added to " + type)
  }
  limitAlert = () => {
    return ToastService.error("Compare Cart is full(limit :5)")
  }
  render() {
    const { wishlist, layoutValue } = this.state;
    let finItem;

    return (
      <section id="maincontent">
        <div className="subpages-heading">
          <div className="container">
            <h1 className="text-center p-5">Wishlist</h1>

          </div>
        </div>
        <div className="container">
          {(wishlist?.length > 0) ? (<>
            <div className='row py-5'>
              {wishlist?.map((item, index) => {
                finItem = item.product_details || item.product;
                return (
                  finItem && <div key={index} className='col-lg-3 col-sm-6 col-6' >
                    <span className="remove-item" onClick={() => {
                      this.deleteWishlist(item, index)
                    }}>Remove</span>
                    <ProductTile data={finItem} variation_index={item.variation_index || 0} {...this.props} successAlert={this.successAlert} errorAlert={this.errorAlert} gridLayout={layoutValue} limitAlert={this.limitAlert} />
                  </div>
                )
              })}
            </div>
          </>

          ) : <div className="empty-wishlist py-5">
            <h2>Wishlist is empty.</h2>
            <span>Wishlist is empty. You don't have any products in the wishlist yet. You will find a lot of interesting products on our "Shop" page.</span>
            <Link to='/product-list'>Return to shop</Link>
          </div>
          }
        </div >
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    wishlist: state.wishlist,
    userData: state.userData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: cart => dispatch(cartAction.addToCart(cart)),
    addToCompare: compare => dispatch(compareAction.addToCompare(compare)),
    deleteWishlist: index => dispatch(wishlistAction.deleteWishlist(index)),
    emptyWishlist: index => dispatch(wishlistAction.emptyWishlist(index)),
    addToWishlist: wishist => dispatch(wishlistAction.addToWishlist(wishist)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
