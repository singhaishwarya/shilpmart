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

    this.props.wishlist.length > 0 && ProductService.fetchAllProducts({ product_ids: this.props.wishlist }).then((result1) => {
      this.setState({ wishlist: result1.data })
      result1.data.map((item) => (
        this.props.addToWishlist(item.id)
      ))
    })

  }

  deleteWishlist = (product) => {
    if (this.props.userData?.token) { (this.deleteWishlistApi(product)) }
    else {
      this.props.deleteWishlist(product.id);
      let wishlist = this.state.wishlist.filter(item => item.id !== product.id);
      this.setState({ wishlist: wishlist });
    }
  }

  deleteWishlistApi = (item) => {

    WishlistService.addDelete({ wishlist_id: item.product_details.wishlist.id, product_id: [item.product_id] }).then((result) => {
      if (result.success) { this.props.deleteWishlist(item.id); this.getWishlistApi() }
    });
  }

  getWishlistApi = () => {

    WishlistService.list().then((result) => {
      result && result.map((item) => this.props.addToWishlist(item.product_id)
      )

      this.setState({ wishlist: result });
    })
  }
  errorAlert = (product) => {
    return ToastService.error(product?.content?.title + " is already in cart")
  }
  successAlert = (product, type) => {
    return ToastService.error(product?.content?.title + " is already in " + type)
  }
  render() {
    const { wishlist, layoutValue } = this.state;
    let finItem;

    return (
      <section id="maincontent">
        <div className="container-fluid">
          {(wishlist?.length > 0) ? (<>
            <div className='row py-5'>
              <div className="col-12"><h4>Your Products Wishlist </h4><hr /></div>

              {wishlist?.length > 0 && wishlist?.map((item, index) => {
                finItem = item.product_details || item;
                return (
                  finItem && <div key={index} className='col-lg-3 col-sm-6 col-6' >
                    <span className="remove-item" onClick={() => {
                      this.deleteWishlist(item)
                    }}>Remove</span>
                    <ProductTile data={finItem} {...this.props} successAlert={this.successAlert} errorAlert={this.errorAlert} gridLayout={layoutValue} />
                  </div>
                )
              })}
            </div>
          </>

          ) : <div className="empty-wishlist">
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
