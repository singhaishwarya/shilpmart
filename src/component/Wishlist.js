import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as wishlistAction from '../actions/wishlist';
import * as cartAction from '../actions/cart';
import * as compareAction from '../actions/compare';
import WishlistService from '../services/WishlistService';
import ProductService from '../services/ProductService';
import ProductTile from './ProductTile';

class Wishlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wishlist: []
    }
  }

  componentDidMount() {
    this.getWishlist()
  }


  deleteWishlist = (item) => {

    Object.keys(this.props.userData).length > 0 ? this.deleteWishlistApi(item) : this.props.deleteWishlist(item.id)
  }

  deleteWishlistApi = (item) => {
    this.props.deleteWishlist(item.id)
    WishlistService.delete({ wishlist_id: item.wishlist?.id, product_id: [item.id] }).then((result) => {
      result.success && this.getWishlist();
    });
  }

  getWishlist = () => {
    let productids = [];
    WishlistService.list().then((result) => {
      result && result.map((item) => (
        productids?.push(item.product_id)
      ))
      ProductService.fetchAllProducts({ product_ids: productids }).then((result1) => {
        this.setState({ wishlist: result1.data });
        result1.data.map((item) => this.props.addToWishlist(item.id))
      })
    })
  }

  render() {
    const { wishlist } = this.state
    return (
      <div className="container" >
        { (wishlist?.length > 0) ? (<>
          <span>YOUR PRODUCTS WISHLIST</span>
          <div className='row py-2'>
            {wishlist?.map((item, index) => {
              return (
                <div key={index} className='col-lg-3 col-sm-6 col-6' >
                  <a href="#" className="remove-item" onClick={() => {
                    this.deleteWishlist(item)
                  }}>Remove</a>
                  <ProductTile data={item} {...this.props} />
                </div>
              )
            })}
          </div></>
        ) : <div className="empty-wishlist">
          <h2>Wishlist is empty.</h2>
          <span>Wishlist is empty. You don't have any products in the wishlist yet. You will find a lot of interesting products on our "Shop" page.</span>
          <Link to='/product-list'>Return to shop</Link>
        </div>
        }
      </div >
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
