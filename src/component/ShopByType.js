import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import CategoryService from '../services/CategoryService';
import ProductService from '../services/ProductService';
import { connect } from 'react-redux';
import * as wishlistAction from '../actions/wishlist';
import * as compareAction from '../actions/compare';
import * as cartAction from '../actions/cart';
import ProductTile from './ProductTile';

class ShopByType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      responsive: {
        0: { items: 2 },
        568: { items: 3 },
        1024: { items: 5 },
      },
      shopByCategoryItems: [],
      shopByProductItems: []
    };

  }

  componentDidMount() {
    this.state.type === 'product' ? this.getProductsList() : this.getCateroryList();
  }


  getCateroryList = () => {
    CategoryService.fetchAllCategory({ parent_id: 0 }).then((result) => {
      this.setState({
        shopByCategoryItems: result?.map((item, index) =>
        (<div key={index} >
          <div className="categorie-img" onClick={() => this.productList(item.id)}>
            <a href="#" className="cate-img">
              <img src={item.image_url ? item.image_url : require('../public/No_Image_Available.jpeg')} className="img-fluid"
                alt={item.title}
                onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
              />
            </a>
          </div>
          <div className="categorie-img-title">
            <h3>{item.title}</h3>
            <div className="more-products"><a href="#">More Products</a></div>
          </div>
        </div>)
        )
      })
    });
  }

  getProductsList = () => {
    ProductService.fetchAllProducts().then((result) => {
      this.setState({
        shopByProductItems: result?.data?.map((item) =>
          (<ProductTile data={item} {...this.props} onWishlistChange={() => this.getProductsList()} />))
      })
    })
  }

  productDetail = (value) => {
    this.props.history.push({
      pathname: '/product-detail',
      search: "?pid=" + value
    });
  }
  productList = (value) => {

    this.props.history.push({
      pathname: '/product-list',
      search: "?cat_ids=" + value
    });
  }



  render() {
    const { type, shopByCategoryItems, shopByProductItems, responsive } = this.state;
    return (
      <AliceCarousel
        autoPlayInterval={3000}
        autoPlay={type === 'product' ? true : false}
        autoPlayStrategy="all"
        // controlsStrategy="responsive"
        disableDotsControls
        // disableAutoPlayOnAction={true}
        items={type === 'product' ? shopByProductItems : shopByCategoryItems}
        responsive={responsive}
        mouseTracking
        infinite
        disableButtonsControls //can be enabled if arrows are needed
        touchTracking
      />

    )
  };
}

const mapStateToProps = state => {
  return {
    wishlist: state.wishlist,
    userData: state.userData,
    cart: state.cart
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: wishlist => dispatch(wishlistAction.addToWishlist(wishlist)),
    deleteWishlist: index => dispatch(wishlistAction.deleteWishlist(index)),
    addToCompare: compare => dispatch(compareAction.addToCompare(compare)),
    addToCart: cart => dispatch(cartAction.addToCart(cart))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopByType);

