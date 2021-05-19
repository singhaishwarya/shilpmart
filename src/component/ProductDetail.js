import React from "react";
import Modal from "react-modal";
import ReactStars from 'react-stars'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShopByType from "./ShopByType";
import { faFacebook, faTwitter, faPinterest, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faRandom, faCheck, faPhone, faQuestion, faEnvelope, faRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart, } from '@fortawesome/free-regular-svg-icons'
import ImageGallery from 'react-image-gallery';
import {
  FacebookShareButton, TwitterShareButton, PinterestShareButton, TelegramShareButton, LinkedinShareButton
} from "react-share";
import ProductService from '../services/ProductService';

// const askForm = {
//   content : {
//     top         : '50%',
//     left        : '50%',
//     right       : 'auto',
//     bottom      : 'auto',   
//     marginRight : '-50%',   
//     transform   : 'translate(-50%, -50%)'
//   }
// };
export default class ProductDetail extends React.Component {
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
    }
    this.currentUrlParams = new URLSearchParams(window.location.search);

  }
  componentWillReceiveProps() {
    this.getProductDetails(this.getQueryParams());
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
          productDetailData: result[0],
          productDetailDataImages: result[0]?.images.map((item, index) => (
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
    // this.setState({ showModal: !this.state.showModal });
  }
  wishlistToggle = () => {
    this.setState({ wishlistStatus: !this.state.wishlistStatus });
  }

  handleSellerProfile = () => {
    this.props.history.push({
      pathname: '/seller-profile'
    })

    // this.props.historyProps.history.push({ pathname: "/seller-profile", state: {  } } );


  }
  productCountManual = (event) => {

    this.setState({ productCount: event.target.value });
  }

  renderRightNav = (onClick, disabled) => {
    return (
      <button
        className='image-gallery-custom-right-nav'
        disabled={disabled}
        onClick={onClick} />
    )
  }
  renderLeftNav = (onClick, disabled) => {
    return (
      <button
        className='image-gallery-custom-left-nav'
        disabled={disabled}
        onClick={onClick} />
    )
  }
  render() {
    const { productDetailData, productCount, wishlistStatus, isActiveTab, showModal, notFountImage, shareUrl, title, productDetailDataImages } = this.state;
    return (
      <>
        <section id="maincontent">
          <div className="container-fluid">
            <div className="row py-5">
              <div className="col-lg-6 col-md-6 col-12 mb-4">
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
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Shop</a></li>
                        <li className="breadcrumb-item"><a href="#">Product category</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{productDetailData?.content?.title}</li>
                      </ol>
                    </nav>
                  </div>
                  <h1>{productDetailData?.content?.title}</h1>
                  <p className="product-price"><span> {productDetailData?.price ? productDetailData?.price[0]?.price : '0'}</span></p>
                  <div className="short-decription"><p>{productDetailData?.content?.product_description}</p></div>
                  <div className="addtocart d-flex justify-content-start">
                    <div className="product-qty">
                      <div className="input-group">
                        <input type="button" value="-" className="quantity-left-minus" disabled={productCount < 1} onClick={() => this.countDec()} />
                        <input type="number" value={productCount} onChange={this.productCountManual} />
                        <input type="button" value="+" onClick={() => this.countInc()} className="quantity-right-plus" />
                      </div>
                    </div>
                    <button type="submit" className="cart-btn">Add to cart</button>
                  </div>
                  <div className="action-links">
                    <a href="#"  >
                      <FontAwesomeIcon icon={faRandom} /> Compare</a>
                    <a href="#">
                      <FontAwesomeIcon icon={wishlistStatus ? faCheck : farHeart}
                        onClick={() => this.wishlistToggle(wishlistStatus)} /> {wishlistStatus ? "Browse Wishlist" : "Add to Wishlist"}
                    </a>
                  </div>

                  <div className="add-question my-3 py-2">
                    <a href="#" onClick={this.toggleModal}><FontAwesomeIcon icon={faQuestion} /> Ask a Question</a>
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
                    <a href="#">
                      <FacebookShareButton url={shareUrl} quote={title}>
                        <FontAwesomeIcon icon={faFacebook} />
                      </FacebookShareButton>
                    </a>
                    <a href="#">
                      <TwitterShareButton url={shareUrl} quote={title}>
                        <FontAwesomeIcon icon={faTwitter} />
                      </TwitterShareButton></a>
                    <a href="#"><PinterestShareButton url={shareUrl} quote={title}>
                      <FontAwesomeIcon icon={faPinterest} />
                    </PinterestShareButton></a>
                    <a href="#"><LinkedinShareButton url={shareUrl} quote={title}>
                      <FontAwesomeIcon icon={faLinkedin} />
                    </LinkedinShareButton></a>
                    <a href="#">
                      <TelegramShareButton url={shareUrl} quote={title}>
                        <FontAwesomeIcon icon={faTelegram} />
                      </TelegramShareButton></a>
                  </div>
                </div>

              </div>

            </div>

            <div className="row product-description pb-5">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a className={`nav-link  ${((isActiveTab === 0) ? 'active' : '')}`}
                    data-toggle="tab" href="#des" role="tab" aria-controls="home" aria-selected="true"
                    onClick={() => this.setState({ isActiveTab: 0 })} >DESCRIPTION</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${((isActiveTab === 1) ? 'active' : '')}`} data-toggle="tab" href="#del" role="tab" aria-controls="profile" aria-selected="false" onClick={() => this.setState({ isActiveTab: 1 })} >REVIEWS</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${((isActiveTab === 2) ? 'active' : '')}`} data-toggle="tab" href="#store" role="tab" aria-controls="contact" aria-selected="false" onClick={() => this.setState({ isActiveTab: 2 })} >STORE POLICIES</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${((isActiveTab === 3) ? 'active' : '')}`} data-toggle="tab" href="#inq" role="tab" aria-controls="contact" aria-selected="false" onClick={() => this.setState({ isActiveTab: 3 })}>INQUIRIES</a>
                </li>
              </ul>
              <div className="clearfix"></div>
              <div className="tab-content" >
                <div className={`tab-pane fade ${((isActiveTab === 0) ? 'show active' : '')}`}
                  role="tabpanel" aria-labelledby="home-tab">{productDetailData?.content?.product_description} </div>
                <div className={`tab-pane fade ${((isActiveTab === 1) ? 'show active' : '')}`} role="tabpanel" aria-labelledby="profile-tab">
                  There are no reviews yet. </div>
                <div className={`tab-pane fade ${((isActiveTab === 2) ? 'show active' : '')}`} role="tabpanel" aria-labelledby="contact-tab">Lorem Ipsum  printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </div>
                <div className={`tab-pane fade ${((isActiveTab === 3) ? 'show active' : '')}`} role="tabpanel" aria-labelledby="contact-tab"> GENERAL INQUIRIES
                            There are no inquiries yet. </div>
              </div>
            </div>

            <div className="row py-5">
              <div className="col shopby-product">
                <div className="related-title">
                  <h3>Related Products</h3>
                </div>
                <ShopByType type='product' />
              </div>
            </div>
          </div>
        </section>

      </>
    )
  }
}


