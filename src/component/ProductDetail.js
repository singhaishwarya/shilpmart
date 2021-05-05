import React from "react";
import Modal from "react-modal";
import ReactStars from 'react-stars'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShopByType from "./ShopByType";
import { faFacebook, faTwitter, faPinterest, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faRandom, faCheck, faPhone, faRupeeSign, faQuestion, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart, } from '@fortawesome/free-regular-svg-icons'
import ImageGallery from 'react-image-gallery';
import {
  FacebookShareButton, TwitterShareButton, PinterestShareButton, TelegramShareButton, LinkedinShareButton
} from "react-share";
export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveTab: 1,
      wishlistStatus: false,
      shareUrl: 'https://app.digitalindiacorporation.in/v1/digi/',
      title: 'eShilpmart',
      productDetailData:
      {
        src: require("../public/product.jpg"),
        title: '100% silk saree',
        cost: '600',
        sku: 3,
        category: "Saree",
        tags: "Handlooms"
      },
      visible: true,
      productCount: 1,
      showModal: false,
      productImages: [
        {
          original: require('../public/bag1.jpeg'),
          thumbnail: require('../public/bag1.jpeg'),
        },
        {
          original: require('../public/bag2.jpeg'),
          thumbnail: require('../public/bag2.jpeg'),
        },
        {
          original: require('../public/bag3.jpeg'),
          thumbnail: require('../public/bag3.jpeg'),
        },
      ]

    }
  }
  // // init active index when open the modal
  // open(activeIndex) {
  //     this.setState({
  //         activeIndex: activeIndex || 0,
  //         visible: true
  //     });
  // }
  countInc = () => {
    this.setState({ productCount: this.state.productCount + 1 });
  }
  countDec = () => {
    this.setState({ productCount: this.state.productCount - 1 });
  }
  componentDidMount() {
    // this.setState({});
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
    const { productDetailData, productCount, wishlistStatus, isActiveTab, showModal, productImages, shareUrl, title } = this.state;
    return (
      <>
        <div className="container-fluid">
          <div className="row py-5">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="product-img-wrapper">
                <ImageGallery items={productImages}
                  //renderLeftNav={this.renderLeftNav}
                  //renderRightNav={this.renderRightNav}
                  thumbnailPosition='left'
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
                      <li className="breadcrumb-item active" aria-current="page">product title</li>
                    </ol>
                  </nav>
                </div>
                <h1>{productDetailData.title}</h1>
                <p className="product-price"><FontAwesomeIcon icon={faRupeeSign} />
                  <span>{productDetailData.cost}</span></p>
                <div className="short-decription"><p>Short Decription</p></div>
                <div className="addtocart d-flex justify-content-start">
                  <div className="product-qty">
                    <div className="input-group">
                      {/* <button className="quantity-left-minus" disabled={productCount < 1} onClick={() => this.countDec()} >-</button> */}
                      <input type="button" value="-" className="quantity-left-minus" disabled={productCount < 1} onClick={() => this.countDec()} />
                      <input type="number" value={productCount} onChange={this.productCountManual} />
                      <input type="button" value="+" onClick={() => this.countInc()} className="quantity-right-plus" />
                      {/* <button onClick={() => this.countInc()} className="quantity-right-plus" >+</button> */}

                    </div>
                  </div>
                  <button type="submit" className="cart-btn">Add to cart</button>
                </div>

                <div className="action-links">
                  <a href="#"  >
                    <FontAwesomeIcon icon={faRandom} />  Compare</a>
                  <a href="#">
                    <FontAwesomeIcon icon={wishlistStatus ? faCheck : farHeart}
                      onClick={() => this.wishlistToggle(wishlistStatus)} /> {wishlistStatus ? "Browse Wishlist" : "Add to Wishlist"}</a>
                </div>

                <div className="add-question my-3 py-2">
                  <a href="#" onClick={this.toggleModal}><FontAwesomeIcon icon={faQuestion} /> Ask a Question</a>
                </div>
                <Modal
                  isOpen={showModal}
                  onRequestClose={this.toggleModal}
                  contentLabel="Ask a Question"
                  shouldCloseOnOverlayClick={true}
                >
                  {/* <Modal show={this.state.showModal} closeModal={this.toggleModal}> */}
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      <label>Name*</label>
                      <input type="text" name="name" />
                    </div>
                    <div className="row">
                      <label>Email*</label>
                      <input type="text" name="email" />
                    </div>
                    <div className="row">
                      <label>Your inquiry *</label>
                      <textarea type="text" name="inquiry" />
                    </div>
                    <input type="submit" value="Submit" />
                  </form>
                </Modal>
              </div>

              <div className="product-meta py-2">
                <div className="seller-details-box my-3" onClick={() => this.handleSellerProfile()}>
                  <div className="title-meta"><em>Know your weaver</em></div>
                  <div className="seller-logo"><img src={require("../public/eShilpmart_logo_220.svg")} className="img-fluid" alt="eshilpmart logo" /></div>
                  <div className="seller-contact">
                    <p className="s-title">saenterpris36</p>
                    <small> <FontAwesomeIcon icon={faPhone} /> &nbsp; 9304637113</small><br />
                    <small><FontAwesomeIcon icon={faEnvelope} /> &nbsp; info@eshilpmart.com</small><br />
                    <ReactStars
                      count={5}
                      edit={false}
                      size={15}
                      color2={'#ffd700'} />
                  </div>
                </div>
                <div className="clearfix"></div>
                <span className="sku">SKU: <span>{productDetailData.sku}</span></span>
                <span className="sku">Categories: <span>{productDetailData.category}</span></span>
                <span className="sku">Tags: <span>{productDetailData.tags}</span></span>

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
                role="tabpanel" aria-labelledby="home-tab">No description available </div>
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

      </>
    )
  }
}


