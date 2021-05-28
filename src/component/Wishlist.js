import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as wishlistAction from '../actions/wishlist';
import * as cartAction from '../actions/cart';
import * as compareAction from '../actions/compare';
import WishlistService from '../services/WishlistService';
import ProductService from '../services/ProductService';
import ProductTile from './ProductTile';
import { ToastContainer, toast } from 'react-toastify';
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
    Object.keys(this.props.userData).length > 0 ? this.deleteWishlistApi(item) : this.props.deleteWishlist(item.product_id)
  }

  deleteWishlistApi = (item) => {

    WishlistService.delete({ wishlist_id: item.product_details.wishlist.id, product_id: [item.product_id] }).then((result) => {
      if (result.success) { this.props.deleteWishlist(item.id); this.getWishlist() }
    });
  }

  getWishlist = () => {

    WishlistService.list().then((result) => {
      result.map((item) => this.props.addToWishlist(item.product_id)
      )

      this.setState({ wishlist: result });
    })
  }
  errorAlert = (product) => {
    return toast.error(
      product?.content?.title + " is already in cart",
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }
  render() {
    const { wishlist } = this.state
    return (
      <div className="container" >
        { (wishlist?.length > 0) ? (<>
          <span>YOUR PRODUCTS WISHLIST</span>
          <div className='row py-2'>
            <ToastContainer />
            {wishlist?.map((item, index) => {
              return (
                item.product_details && <div key={index} className='col-lg-3 col-sm-6 col-6' >
                  <a href="#" className="remove-item" onClick={() => {
                    this.deleteWishlist(item)
                  }}>Remove</a>
                  <ProductTile data={item.product_details} {...this.props} errorAlert={this.errorAlert} />
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
