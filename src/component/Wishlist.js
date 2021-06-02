import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as wishlistAction from '../actions/wishlist';
import * as cartAction from '../actions/cart';
import * as compareAction from '../actions/compare';
import WishlistService from '../services/WishlistService';
import ProductTile from './ProductTile';
import { ToastContainer } from 'react-toastify';
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

  deleteWishlist = (item) => {
    Object.keys(this.props.userData).length > 0 ? this.deleteWishlistApi(item) : this.props.deleteWishlist(item.product_id)
  }

  deleteWishlistApi = (item) => {

    WishlistService.delete({ wishlist_id: item.product_details.wishlist.id, product_id: [item.product_id] }).then((result) => {
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
  render() {
    const { wishlist, layoutValue } = this.state
    return (
      <section id="maincontent">
        <div className="container-fluid">
          <ToastContainer />
          {(wishlist?.length > 0) ? (<>


            <div className='row py-5'>
              <div className="col-12"><h4>Your Products Wishlist </h4><hr /></div>

              {wishlist?.map((item, index) => {
                return (
                  item.product_details && <div key={index} className='col-lg-3 col-sm-6 col-6' >
                    <span className="remove-item" onClick={() => {
                      this.deleteWishlist(item)
                    }}>Remove</span>
                    <ProductTile data={item.product_details} {...this.props} errorAlert={this.errorAlert} gridLayout={layoutValue} />
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
