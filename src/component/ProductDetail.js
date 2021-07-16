import React from "react";
import Modal from "react-modal";
import ReactStars from 'react-stars'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShopByType from "./ShopByType";
import { faFacebook, faTwitter, faPinterest, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faRandom, faCheck, faQuestion, faHeart, faEnvelope, faPhoneAlt, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart, } from '@fortawesome/free-regular-svg-icons'
import ImageGallery from 'react-image-gallery';
import {
  FacebookShareButton, TwitterShareButton, PinterestShareButton, TelegramShareButton, LinkedinShareButton
} from "react-share";
import ProductService from '../services/ProductService';
import ToastService from '../services/ToastService';
import CartService from '../services/CartService';
import * as cartAction from '../actions/cart';
import * as wishlistAction from '../actions/wishlist';
import * as compareAction from '../actions/compare';
import { connect } from 'react-redux';
import WishlistService from '../services/WishlistService'
class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      combination: [], finCombination: [], currentVariationIndex: 0,
      isActiveTab: 0, productCatId: 0,
      filterParams: { product_ids: [props.match.params.productId] },
      wishlistStatus: false,
      shareUrl: 'https://app.digitalindiacorporation.in/v1/digi/',
      title: 'eShilpmart',
      productDetailData: [],
      productQuantity: 1, currentvalue2: '', currentvalue1: '',
      visible: true,
      showModal: false, productDetailDataImages: [], productDetailData: null,
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

  componentDidUpdate(prevprops) {
    if (prevprops.history.location.search !== prevprops.location.search) {
      this.getProductDetails(this.getQueryParams());
    }
  }

  deleteWishlist = (item) => {
    (Object.keys(this.props.userData).length > 0) ? this.deleteWishlistApi(item) : this.props.deleteWishlist({ product: item.id, variation_index: this.state.currentVariationIndex });
    this.errorAlert(item, 'wishlist');
  }

  deleteWishlistApi(item) {
    this.props.deleteWishlist({ product: item?.id, variation_index: this.state.currentVariationIndex })
    WishlistService.addDelete({ wishlist_id: item.wishlist?.id, product_id: [item.id], variation_index: [this.state.currentVariationIndex] }).then((result) => {
      if (result?.success) {
        // this.getWishlist();
      }
    })
  }

  errorAlert = (product, type) => {
    // return ToastService.error(product?.content?.title + " is already in cart")
    return ToastService.error(product?.content?.title + " is removed from wishlist");

  }

  addToWishlist = (product) => {

    if (Object.keys(this.props.userData).length > 0) { this.addToWishlistApi(product) } else {
      this.props.addToWishlist({ product: product?.id, variation_index: this.state.currentVariationIndex });
      this.successAlert(product, 'wishlist');
    }

  }

  addToWishlistApi = (product) => {
    this.props.addToWishlist({ product: product?.id, variation_index: this.state.currentVariationIndex })
    WishlistService.addDelete({ product_id: [product.id], variation_index: [this.state.currentVariationIndex] }).then((result) => {
      if (result?.success) {
        this.successAlert(product, 'wishlist');
        // this.getWishlist();
      }
    });
  }
  successAlert = (product, type) => {
    return ToastService.success(product?.content?.title + " is successfully added to " + type)
  }

  getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let entries = urlParams.entries(), queryParams = {};
    for (const entry of entries) {
      queryParams.product_ids = entry[0] === 'pid' ? [entry[1]] : '';
    }
    return queryParams;
  }

  countInc = () => {
    this.setState({ productQuantity: this.state.productQuantity + 1 });
  }
  countDec = () => {
    this.setState({ productQuantity: this.state.productQuantity - 1 });
  }
  getProductDetails = (queryParams) => {
    try {
      let variation = [];
      ProductService.fetchAllProducts(queryParams).then((result) => {
        if (result.data.length === 0) this.props.history.push({ pathname: '/product-list' })
        this.setState({
          productDetailData: result?.data[0], productDetailDataPrice: result?.data[0]?.price,
          productCatId: result?.data[0].category.category_id,
          productDetailDataImages: result?.data[0]?.images?.map((item, index) => (
            {
              'original': item.image_url,
              'thumbnail': item.image_url
            }))
        });
        result?.data[0]?.variation_available && result.data[0].properties.map((item) => (
          item.veriation_value.indexOf(",") !== - 1 && variation.push({ key: item.variation_key, value: item.veriation_value.split(',') })
        ));
        this.setState({ variations: variation })
        window.scrollTo(0, 0);
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

  handleSellerProfile = (brand) => {
    (brand !== null) &&
      this.props.history.push({
        pathname: '/entrepreneur/' + brand
      })

  }
  productQuantityManual = (event) => {

    this.setState({ productQuantity: event.target.value });
  }

  addToCart = (product) => {
    if (this.props.cart.find(({ product, variation_index }) => (product === product.id && variation_index === this.state.currentVariationIndex)) !== undefined) {
      this.errorAlert(product, 'cart');
    }
    else {
      Object.keys(this.props.userData).length > 0 ? this.addToCartApi(product) : this.props.addToCart({ product: product?.id, variation_index: this.state.currentVariationIndex, quantity: this.state.productQuantity })

    }
  }

  errorAlert = (product, type) => {
    // return ToastService.error(product?.content?.title + " is already in cart")
    return ToastService.error(product?.content?.title + " is " +
      (type === "cart" ? "already in cart" : "removed from wishlist"));

  }

  addToCartApi = (product) => {

    let cartToSync = [{
      "product_id": product.id,
      "quantity": this.state.productQuantity,
      "variation_index": this.state.currentVariationIndex
    }], cartProductids = [];
    try {
      CartService.add({ products: cartToSync }).then((result) => {

        if (result?.success) {
          if (typeof result.data !== 'string') {
            result.data.length && result.data.map((item) => (
              cartProductids?.push(item.product_id)
            ));
            ProductService.fetchAllProducts({ product_ids: cartProductids }).then((result1) => {
              result1.data.map((item) => this.props.addToCart({ product: item?.id, variation_index: this.state.currentVariationIndex }));
            })
          }
          else {
            this.errorAlert(product, 'cart');
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
    product.quantity = this.state.productQuantity;
    product.variation_index = this.state.currentVariationIndex;
    this.props.history.push({
      pathname: '/checkout',
      state: { checkout: [product], totalCartCost: product?.price * this.state.productQuantity }
    })

  }
  makeCombo = (key, value) => {
    if (this.state.combination.length > 0) {
      this.state.combination.map((item, index) => {
        if (item.variation_id === key && item.variation_value !== value) {
          item.variation_value = value;
        }
        else {

          this.setState({
            combination: this.state.combination.concat(
              { variation_id: key, variation_value: value }
            )
          });

        }
      });

      const filteredArr = this.state.combination?.reduce((acc, current) => {
        const x = acc.find(item => item.variation_value === current.variation_value);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      this.setState({ finCombination: filteredArr });
      this.getVariationIndex(filteredArr);
    } else {

      this.setState({
        combination: this.state.combination.concat(
          { variation_id: key, variation_value: value }
        )
      });
    }

  }
  getVariationIndex = (combi) => {
    this.state.productDetailData.variations.map((item, index) => {
      if (JSON.stringify(item.variation_index) === JSON.stringify(combi)) {
        this.setState({
          currentVariationIndex: index,
          productDetailDataPrice: this.state.productDetailData?.prices[index].price
        });

      }
    })
  }

  limitAlert = () => {
    return ToastService.error("Compare Cart is full(limit :5)")
  }
  render() {
    const { productDetailData, productQuantity, showModal, notFountImage, shareUrl, title, productDetailDataImages, variations, productDetailDataPrice, currentVariationIndex, currentvalue2, currentvalue1, productCatId } = this.state;
    const { wishlist, userData } = this.props;
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
                    startIndex={currentVariationIndex}
                    onErrorImageURL={require('../public/No_Image_Available.jpeg')}
                  />
                  <div className="addtowish"><FontAwesomeIcon icon={((wishlist.find(({ product, variation_index }) => (product === productDetailData?.id && variation_index === currentVariationIndex)) !== undefined) || (Object.keys(userData).length > 0 && productDetailData?.wishlist?.id)) ? faHeart : farHeart}
                    onClick={() => {
                      ((Object.keys(userData).length > 0 && productDetailData?.wishlist?.id) || (wishlist.find(({ product, variation_index }) => (product === productDetailData?.id && variation_index === currentVariationIndex)) !== undefined)) ? this.deleteWishlist(productDetailData) : this.addToWishlist(productDetailData)
                    }} /></div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="product-summary-wrapper">
                  <div className="breadcrumb-section d-flex justify-content-between">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb bg-transparent">
                        <li className="breadcrumb-item"><span>Home</span></li>
                        <li className="breadcrumb-item"><span>Shop</span></li>
                        <li className="breadcrumb-item"><span>{productDetailData?.category?.parent_category[0].title}</span></li>
                        <li className="breadcrumb-item"><span>{productDetailData?.category?.cate_title}</span></li>
                      </ol>
                    </nav>
                  </div>
                  <h1>{productDetailData?.content?.title}</h1>
                  <p className="product-price">
                    <span>₹</span> {productDetailDataPrice || 0}</p>
                  <p className="available">Availability: &nbsp;<span className="text-success">In Stock</span>
                    {/* <span className="text-danger">Out of Stock</span> */}
                  </p>
                  <div className="short-decription"><p>{productDetailData?.content?.product_description}</p></div>
                  <div className="addtocart d-flex justify-content-start">
                    <div className="product-qty">
                      <div className="input-group">
                        <input type="button" value="-" className="quantity-left-minus" disabled={productQuantity < 1} onClick={() => this.countDec()} />
                        <input type="number" value={productQuantity} onChange={this.productQuantityManual} />
                        <input type="button" value="+" onClick={() => this.countInc()} className="quantity-right-plus" />
                      </div>
                    </div>

                    <button type="submit" className="cart-btn buy-btn" onClick={() => this.addToCheckout(productDetailData)}>Buy Now</button>
                    <button type="submit" className="cart-btn" onClick={() => this.addToCart(productDetailData)} >Add to cart</button>
                  </div>
                  {variations?.map((itemKey, index) => (
                    <div className="productVariation" key={index} >
                      <span>{itemKey.key} :</span>
                      <div className="productVariationList sizes">
                        {itemKey.value.map((itemValue, index) => (itemKey.key === "Color" ?
                          <div className={`colors ${currentvalue1 === itemValue ? 'color-active' : ''}`} key={index} style={{ backgroundColor: itemValue }}
                            onClick={() => { this.makeCombo(itemKey.key, itemValue); this.setState({ currentvalue1: itemValue }) }}
                          /> :
                          <button key={index} className={currentvalue2 === itemValue ? "sizeSelected" : ''}
                            onClick={() => { this.makeCombo(itemKey.key, itemValue); this.setState({ currentvalue2: itemValue }) }}
                          >{itemValue}</button>))}
                      </div>
                    </div>
                  ))}

                  <div className="action-links">
                    <span onClick={() => (this.props.compare.length < 5 ? (this.props.addToCompare({ product: productDetailData?.id, variation_index: currentVariationIndex }), this.successAlert(productDetailData, 'compare')) : this.limitAlert())}>
                      <FontAwesomeIcon icon={faRandom} /> Compare</span>
                    <span onClick={() => {
                      ((Object.keys(userData).length > 0 && productDetailData?.wishlist?.id) || (wishlist.find(({ product, variation_index }) => (product === productDetailData?.id && variation_index === currentVariationIndex)) !== undefined)) ? this.deleteWishlist(productDetailData) : this.addToWishlist(productDetailData)
                    }}>
                      <FontAwesomeIcon icon={((wishlist.find(({ product, variation_index }) => (product === productDetailData?.id && variation_index === currentVariationIndex)) !== undefined) || (Object.keys(userData).length > 0 && productDetailData?.wishlist?.id)) ? faCheck : farHeart}
                      /> {((wishlist.find(({ product, variation_index }) => (product === productDetailData?.id && variation_index === currentVariationIndex)) !== undefined) || (Object.keys(userData).length > 0 && productDetailData?.wishlist?.id)) ? "Added to Wishlist" : "Add to Wishlist"}
                    </span>
                  </div>

                  <div className="add-question my-3 py-2">
                    <span onClick={this.toggleModal}><FontAwesomeIcon icon={faQuestion} /> Ask a Question</span>
                  </div>
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
                  <Modal className='custom-modal-width'
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
                        <label htmlFor="name" className="col-sm-3 col-12 col-form-label">Name<span>*</span></label>
                        <div className="col-sm-9 col-12">
                          <input type="text" readonly className="form-control" id="name" value="" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="Email" className="col-sm-3 col-12 col-form-label">Email<span>*</span></label>
                        <div className="col-sm-9 col-12">
                          <input type="text" readonly className="form-control" id="Email" value="" />
                          <small>Your email address will not be published.</small>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inquiry" className="col-sm-3 col-12 col-form-label">Your inquiry<span>*</span></label>
                        <div className="col-sm-9 col-12">
                          <textarea className="form-control" placeholder="Type your Question..." />
                        </div>
                      </div>

                      <input className="btn btn-theme float-right" type="submit" value="Submit" />
                    </form>
                  </Modal>
                </div>

                <div className="product-meta py-2">

                  <div className="seller-details-box my-3" onClick={() => this.handleSellerProfile(productDetailData?.vendor.brand)}>
                    {/* <div className="title-meta">Know your weaver</div> */}
                    <div className="seller-head"><strong>Sold by :</strong> </div>
                    <div className="seller-contact">
                      <div className="seller-logo" >

                        {productDetailData?.vendor ? (
                          <img src={productDetailData?.vendor.logo || "false"} className="img-fluid" onError={e => { e.currentTarget.src = require('../public/eShilpmart_logo_220.svg') }} />) : ''}
                      </div>
                      <div className="s-title"><span> {productDetailData ? (productDetailData?.vendor ? productDetailData?.vendor.brand : '') : ''}</span>
                        {/* <span><ReactStars count={5} edit={false} size={15} color2={'#e87f13'} /></span> */}
                      </div>
                      <div className="s-ratings"><span>
                        <ReactStars count={5} edit={false} size={15} color2={'#ffd700'} /></span>
                        <div className="contactinfo">
                          <small><FontAwesomeIcon icon={faPhoneAlt} /> &nbsp; {productDetailData ? (productDetailData?.vendor ? productDetailData?.vendor.mobile : '') : ''}</small>
                          <small><FontAwesomeIcon icon={faEnvelope} /> &nbsp; {productDetailData ? (productDetailData?.vendor ? productDetailData?.vendor.email : '') : ''}</small>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="clearfix"></div>
                  {/* <span className="sku">SKU: <span>-</span></span> */}
                  <span className="sku">Categories: <span>{productDetailData?.category?.cate_title}</span></span>
                  {/* <span className="sku">Tags: <span>{productDetailData?.content?.product_tags}</span></span> */}
                </div>
                <div className="product-description-wrapper pb-5">
                  <div className="product-description">
                    <header>Description</header>
                    <p>{productDetailData?.content?.product_description}</p>
                  </div>

                  <div className="product-description">
                    <header>Product Specifications</header>
                    <ul className="specification">{productDetailData?.properties?.map((item, index) => (
                      <li key={index}><span>{item.variation_key} :</span> {item.veriation_value}</li>
                    ))}</ul>
                  </div>



                  <div className="product-description">
                    <header>Review</header>
                    {/* <Bars data={this.state.testData} makeUppercase={true} /> */}
                    <div className="row">
                      <div className="col-sm-3">
                        <div className="avgratings">
                          <div className="avgrate">4.7<span>★</span></div>
                          <div className="avgstate">324 Ratings & 66 Reviews</div>
                        </div>
                      </div>
                      <div className="col-sm-9">
                        <div className="barWrapper">
                          <ul className="rate">
                            <li className="rateNumbers"><span>5</span><span>★</span></li>
                            <li className="rateNumbers"><span>4</span><span>★</span></li>
                            <li className="rateNumbers"><span>3</span><span>★</span></li>
                            <li className="rateNumbers"><span>2</span><span>★</span></li>
                            <li className="rateNumbers"><span>1</span><span>★</span></li>
                          </ul>
                          <ul className="bars">
                            <li><div className="bar"><span className="bargreen"></span></div></li>
                            <li><div className="bar"><span className="bargreen pro4"></span></div></li>
                            <li><div className="bar"><span className="bargreen pro3"></span></div></li>
                            <li><div className="bar"><span className="barorange"></span></div></li>
                            <li><div className="bar"><span className="barred"></span></div></li>
                          </ul>
                          <ul className="result">
                            <li><span>225</span></li>
                            <li><span>125</span></li>
                            <li><span>15</span></li>
                            <li><span>05</span></li>
                            <li><span>10</span></li>
                          </ul>
                        </div>
                      </div>

                      <div className="col my-2">
                        <p>Images uploaded by Customer</p>
                        <div className="imgCustomer">
                          <span><img src={require('../public/saree-2-300x300.jpeg')} className="img-fluid" alt="Saree" /></span>
                          <span><img src={require('../public/saree-2-300x300.jpeg')} className="img-fluid" alt="Saree" /></span>
                        </div>

                        <div className="product-review pb-4 my-4 border-bottom">
                          <div className="d-flex mb-3">
                            <div className="d-flex align-items-center mr-4 pr-2"><img className="rounded-circle" src={require('../public/saree-2-300x300.jpeg')} width={50} alt="Sunil Aggrawal" />
                              <div className="pl-3">
                                <h6 className="fs-sm mb-0">Sunil Aggrawal</h6>
                                <small className="fs-ms text-muted">July 14, 2021</small>
                              </div>
                            </div>
                            <div>
                              <div className="star-rating">
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStarHalfAlt} />
                              </div>
                              <small className="fs-ms text-muted">83% of users found this review helpful</small>
                            </div>
                          </div>
                          <p className="fs-md mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</p>

                          <div className="text-nowrap">
                            <button className="btn-like" type="button">15</button>
                            <button className="btn-dislike" type="button">3</button>
                          </div>
                        </div>

                        <div className="product-review my-4">
                          <div className="d-flex mb-3">
                            <div className="d-flex align-items-center mr-4 pr-2"><img className="rounded-circle" src={require('../public/saree-2-300x300.jpeg')} width={50} alt="Sunil Aggrawal" />
                              <div className="pl-3">
                                <h6 className="fs-sm mb-0">Sunil Aggrawal</h6>
                                <small className="fs-ms text-muted">July 12, 2021</small>
                              </div>
                            </div>
                            <div>
                              <div className="star-rating">
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStarHalfAlt} />

                              </div>
                              <small className="fs-ms text-muted">83% of users found this review helpful</small>
                            </div>
                          </div>
                          <p className="fs-md mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</p>

                          <div className="text-nowrap">
                            <button className="btn-like" type="button">15</button>
                            <button className="btn-dislike" type="button">3</button>
                          </div>
                        </div>



                      </div>

                    </div>

                  </div>

                  <div className="product-description">
                    <header>Inquiries</header>
                    <div className="question_ans_wrapper mb-3">
                      <div className="d-flex mb-2">
                        <div className="question_ans_title">Question :</div>
                        <div className="question_ans_text">When will blue saree will be restocked?</div>

                      </div>

                      <div className="d-flex">
                        <div className="question_ans_title">Answer :</div>
                        <div className="question_ans_text">It has been restocked. Please refresh the product page. By vardha SELLER  on 24 October, 2020</div>

                      </div>
                    </div>


                    <div className="question_ans_wrapper mb-3">
                      <div className="d-flex mb-2">
                        <div className="question_ans_title">Question :</div>
                        <div className="question_ans_text">When will blue saree will be restocked?</div>

                      </div>

                      <div className="d-flex">
                        <div className="question_ans_title">Answer :</div>
                        <div className="question_ans_text">It has been restocked. Please refresh the product page. By vardha SELLER  on 24 October, 2020</div>

                      </div>
                    </div>

                    {/* <p>{productDetailData?.content?.product_description}</p> */}
                  </div>

                </div>
              </div>
            </div>
            <div className="row py-5">
              <div className="col shopby-product">
                <div className="related-title">
                  <h3>Related Products</h3>
                </div>
                {productCatId && <ShopByType type='product'  {...this.props} catId={productCatId} />}
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
    userData: state.userData,
    wishlist: state.wishlist,
    compare: state.compare
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: cart => dispatch(cartAction.addToCart(cart)),
    addToWishlist: wishlist => dispatch(wishlistAction.addToWishlist(wishlist)),
    deleteWishlist: index => dispatch(wishlistAction.deleteWishlist(index)),
    addToCompare: compare => dispatch(compareAction.addToCompare(compare)),

  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

