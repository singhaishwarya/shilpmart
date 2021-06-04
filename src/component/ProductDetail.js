import React from "react";
import Modal from "react-modal";
import ReactStars from 'react-stars'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShopByType from "./ShopByType";
import { faFacebook, faTwitter, faPinterest, faLinkedin, faTelegram, faIntercom } from '@fortawesome/free-brands-svg-icons'
import { faRandom, faCheck, faPhone, faQuestion, faEnvelope, faRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart, } from '@fortawesome/free-regular-svg-icons'
import ImageGallery from 'react-image-gallery';
import {
  FacebookShareButton, TwitterShareButton, PinterestShareButton, TelegramShareButton, LinkedinShareButton
} from "react-share";
import ProductService from '../services/ProductService';
import ToastService from '../services/ToastService';
import CartService from '../services/CartService';
import * as cartAction from '../actions/cart';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Bars from 'react-bars';
class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveTab: 0,
      filterParams: { product_ids: [props.match.params.productId] },
      wishlistStatus: false,
      shareUrl: 'https://app.digitalindiacorporation.in/v1/digi/',
      title: 'eShilpmart',
      productDetailData: {},
      productCount: 1,
      visible: true,
      showModal: false,
      notFountImage: [{
        original: require('../public/No_Image_Available.jpeg'),
        thumbnail: require('../public/No_Image_Available.jpeg'),
      }],
      testData: [

        { label: '5', value: 82, showValue: true, suffix: '%' },
        { label: '4', value: 82, showValue: true, suffix: '%' },
        { label: '3', value: 80, showValue: true, suffix: '%' },
        { label: '2', value: 75, showValue: true, suffix: '%' },
        { label: '1', value: 25, showValue: true, suffix: '%' }
      ]
    }
    this.currentUrlParams = new URLSearchParams(window.location.search);

  }

  componentDidMount() {
    this.getProductDetails(this.getQueryParams());
  }

  getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let entries = urlParams.entries(), queryParams = {};
    for (const entry of entries) {
      switch (entry[0]) {
        case 'pid':
          queryParams.product_ids = [entry[1]];
          break
        default:
          return;
      }
    }
    return queryParams;
  }
  countInc = () => {
    this.setState({ productCount: this.state.productCount + 1 });
  }
  countDec = () => {
    this.setState({ productCount: this.state.productCount - 1 });
  }
  getProductDetails = (queryParams) => {
    try {
      ProductService.fetchAllProducts(queryParams).then((result) => {
        this.setState({
          productDetailData: result?.data[0],
          productDetailDataImages: result?.data[0]?.images?.map((item, index) => (
            {
              'original': item.image_url,
              'thumbnail': item.image_url
            }))
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };
  handleSubmit = (event) => {
    console.log('A name was submitted: ' + event);
    event.preventDefault();
    this.toggleModal();
  }
  wishlistToggle = () => {
    this.setState({ wishlistStatus: !this.state.wishlistStatus });
  }

  handleSellerProfile = () => {
    this.props.history.push({
      pathname: '/seller-profile'
    })

  }
  productCountManual = (event) => {

    this.setState({ productCount: event.target.value });
  }

  addToCart = (product) => {
    if (this.props.cart?.includes(product.id)) {
      this.errorAlert(product);
    }
    else {
      Object.keys(this.props.userData).length > 0 ? this.addToCartApi(product) : this.props.addToCart(product.id)

    }
  }

  errorAlert = (product) => {
    return ToastService.error(product?.content?.title + " is already in cart")
  }

  addToCartApi = (product) => {

    let cartToSync = [{
      "product_id": product.id,
      "quantity": 1,
      "variation_index": 0
    }], cartProductids = [];
    try {
      CartService.add({ products: cartToSync }).then((result) => {

        if (result?.success) {
          if (typeof result.data !== 'string') {
            result.data.length && result.data.map((item) => (
              cartProductids?.push(item.product_id)
            ));
            ProductService.fetchAllProducts({ product_ids: cartProductids }).then((result1) => {
              result1.data.map((item) => this.props.addToCart(item.id));
            })
          }
          else {
            this.errorAlert(product);
          }
        }
        else { return }
      });
    } catch (err) {
      console.log(err);
    }
  }
  renderRightNav = (onClick, disabled) => {
    return (
      <button className='image-gallery-custom-right-nav' disabled={disabled} onClick={onClick} />
    )
  }
  renderLeftNav = (onClick, disabled) => {
    return (
      <button className='image-gallery-custom-left-nav' disabled={disabled} onClick={onClick} />
    )
  }



  addToCheckout = (product) => {
    this.props.history.push({
      pathname: '/checkout',
      state: { checkout: [product] }
    })
  }

  render() {
    const { productDetailData, productCount, wishlistStatus, isActiveTab, showModal, notFountImage, shareUrl, title, productDetailDataImages } = this.state;
    return (
      <>
        <section id="maincontent">
          <div className="container-fluid">
            <div className="row py-lg-5 py-2 ">
              <div className="col-lg-6 col-md-6 col-12 mb-2">
                <div className="product-img-wrapper">
                  <ImageGallery
                    items={productDetailData?.images?.length > 0 ? productDetailDataImages : notFountImage}
                    thumbnailPosition='left'
                    showThumbnails={productDetailData?.images?.length > 0 ? true : false}
                    onErrorImageURL={require('../public/No_Image_Available.jpeg')}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="product-summary-wrapper">
                  <div className="breadcrumb-section d-flex justify-content-between">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb bg-transparent">
                        <li className="breadcrumb-item"><span>Home</span></li>
                        <li className="breadcrumb-item"><span>Shop</span></li>
                        <li className="breadcrumb-item"><span>Product category</span></li>
                        {/* <li className="breadcrumb-item active" aria-current="page">{productDetailData?.content?.title}</li> */}
                      </ol>
                    </nav>
                  </div>
                  <h1>{productDetailData?.content?.title}</h1>
                  <p className="product-price">
                    <span>₹</span> {productDetailData?.price ? productDetailData?.price[0]?.price : 0}</p>
                  <div className="short-decription"><p>{productDetailData?.content?.product_description}</p></div>
                  <div className="addtocart d-flex justify-content-start">
                    <div className="product-qty">
                      <div className="input-group">
                        <input type="button" value="-" className="quantity-left-minus" disabled={productCount < 1} onClick={() => this.countDec()} />
                        <input type="number" value={productCount} onChange={this.productCountManual} />
                        <input type="button" value="+" onClick={() => this.countInc()} className="quantity-right-plus" />
                      </div>
                    </div>
                    <button type="submit" className="cart-btn buy-btn" onClick={() => this.addToCheckout(productDetailData)}>Buy Now</button>
                    <button type="submit" className="cart-btn" onClick={() => this.addToCart(productDetailData)} >Add to cart</button>
                    <ToastContainer />
                  </div>
                  <div className="action-links">
                    <span>
                      <FontAwesomeIcon icon={faRandom} /> Compare</span>
                    <span>
                      <FontAwesomeIcon icon={wishlistStatus ? faCheck : farHeart}
                        onClick={() => this.wishlistToggle(wishlistStatus)} /> {wishlistStatus ? "Browse Wishlist" : "Add to Wishlist"}
                    </span>
                  </div>

                  <div className="add-question my-3 py-2">
                    <span onClick={this.toggleModal}><FontAwesomeIcon icon={faQuestion} /> Ask a Question</span>
                  </div>
                  <Modal className='custom-modal-width login-card'
                    isOpen={showModal}
                    onRequestClose={this.toggleModal}
                    contentLabel="Ask a Question"
                    //style={askForm}
                    shouldCloseOnOverlayClick={true}
                    ariaHideApp={false}
                  >
                    {/* <Modal show={this.state.showModal} closeModal={this.toggleModal}> */}
                    <form onSubmit={this.handleSubmit}>
                      <h4 className="mb-4">Ask a Question</h4>
                      <div className="form-group row">
                        <label for="name" className="col-sm-3 col-12 col-form-label">Name<span>*</span></label>
                        <div className="col-sm-9 col-12">
                          <input type="text" readonly className="form-control" id="name" value="" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="Email" className="col-sm-3 col-12 col-form-label">Email<span>*</span></label>
                        <div className="col-sm-9 col-12">
                          <input type="text" readonly className="form-control" id="Email" value="" />
                          <small>Your email address will not be published.</small>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="inquiry" className="col-sm-3 col-12 col-form-label">Your inquiry<span>*</span></label>
                        <div className="col-sm-9 col-12">
                          <textarea className="form-control" placeholder="Type your Question..." />
                        </div>
                      </div>

                      <input className="btn login-btn float-right" type="submit" value="Submit" />
                    </form>
                  </Modal>
                </div>

                <div className="product-meta py-2">
                  <div className="seller-details-box my-3" onClick={() => this.handleSellerProfile()}>
                    <div className="title-meta"><em>Know your weaver</em></div>
                    <div className="seller-logo"><img src={require("../public/eShilpmart_logo_220.svg")} className="img-fluid" alt="eshilpmart logo" /></div>
                    <div className="seller-contact">
                      <p className="s-title">saenterpris36</p>
                      <small><FontAwesomeIcon icon={faPhone} /> &nbsp; 9304637113</small><br />
                      <small><FontAwesomeIcon icon={faEnvelope} /> &nbsp; info@eshilpmart.com</small><br />
                      <ReactStars
                        count={5}
                        edit={false}
                        size={15}
                        color2={'#ffd700'} />
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <span className="sku">SKU: <span>-</span></span>
                  <span className="sku">Categories: <span>-</span></span>
                  <span className="sku">Tags: <span>{productDetailData?.content?.product_tags}</span></span>

                  <div className="social-share">
                    <span>Share:</span>
                    <span>
                      <FacebookShareButton url={shareUrl} quote={title}>
                        <FontAwesomeIcon icon={faFacebook} />
                      </FacebookShareButton>
                    </span>
                    <span>
                      <TwitterShareButton url={shareUrl} quote={title}>
                        <FontAwesomeIcon icon={faTwitter} />
                      </TwitterShareButton></span>
                    <span><PinterestShareButton url={shareUrl} quote={title}>
                      <FontAwesomeIcon icon={faPinterest} />
                    </PinterestShareButton></span>
                    <span><LinkedinShareButton url={shareUrl} quote={title}>
                      <FontAwesomeIcon icon={faLinkedin} />
                    </LinkedinShareButton></span>
                    <span>
                      <TelegramShareButton url={shareUrl} quote={title}>
                        <FontAwesomeIcon icon={faTelegram} />
                      </TelegramShareButton></span>
                  </div>
                </div>


                <div className="product-description-wrapper pb-5">
                  <div className="product-description">
                    <header>Description</header>
                    <p>{productDetailData?.content?.product_description}</p>
                  </div>

                  <div className="product-description">
                    <header>Review</header>
                    <Bars data={this.state.testData} makeUppercase={true} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-5">
              <div className="col shopby-product">
                <div className="related-title">
                  <h3>Related Products</h3>
                </div>
                <ShopByType type='product'  {...this.props} />
              </div>
            </div>
          </div>
        </section>

      </>
    )
  }
}


const mapStateToProps = state => {
  return {
    cart: state.cart,
    userData: state.userData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: cart => dispatch(cartAction.addToCart(cart))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

