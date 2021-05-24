import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as wishlistAction from '../actions/wishlist';
import * as cartAction from '../actions/cart';
import * as compareAction from '../actions/compare';
import WishlistService from '../services/WishlistService';
import ProductService from '../services/ProductService';
import ProductTile from './ProductTile';
class Wishlist extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { userData, wishlist } = this.props;
    if (Object.keys(userData).length > 0) {
      if (wishlist[0].length > 0) {
        let productids = [];

        wishlist[0].map((item) => {
          productids.push(item.id)
        })
        this.addToWishlist(productids);
      }
      else {
        this.getWishlist()
      }
    }

  }
  addToWishlist = (productids) => {
    WishlistService.add({ product_id: productids }).then((result) => {
      this.getWishlist()
    });
  }

  deleteWishlist(item) {
    Object.keys(this.props.userData).length > 0 ? this.deleteWishlistApi(item) : this.props.deleteWishlist(item.id)
  }

  deleteWishlistApi(item) {
    this.props.deleteWishlist(item.id)
    // WishlistService.deleteWishlist({ wishlist_id: item.wishlist?.id, product_id: [item.id] }).then((result) => {
    this.getWishlist()
    // });
  }

  getWishlist = () => {
    let productids = [];
    WishlistService.list().then((result) => {
      result && result.map((item) => (
        productids?.push(item.product_id)
      ))
      //   ProductService.fetchAllProducts({ product_ids: productids }).then((result1) => {
      //     // this.setState({
      //     //   wishlistData: result1
      //     // })
      //     this.props.addToWishlist(result1);
      //   })
    })
  }

  render() {
    const { wishlist } = this.props
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
        ) : <span>Wishlist is empty.

        You don't have any products in the wishlist yet.
You will find a lot of interesting products on our "Shop" page.</span>
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
    addToWishlist: wishist => dispatch(wishlistAction.addToWishlist(wishist)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
