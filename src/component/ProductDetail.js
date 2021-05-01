import React from "react";
import Zoom from 'react-img-zoom'
import { Modal } from "react-modal-overlay";
import "react-modal-overlay/dist/index.css";
import ReactStars from 'react-stars'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShopByType from "./ShopByType";
import { faFacebook, faTwitter, faPinterest, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faRandom, faCheck, faPhone, faRupeeSign, faQuestion, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart, } from '@fortawesome/free-regular-svg-icons'
export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveTab: 0,
      wishlistStatus: false,
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
      clicks: 0,
      show: true,
      showModal: false

    }
  }
  // // init active index when open the modal
  // open(activeIndex) {
  //     this.setState({
  //         activeIndex: activeIndex || 0,
  //         visible: true
  //     });
  // }
  incrementItem = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  }
  decreaseItem = () => {
    this.setState({ clicks: this.state.clicks - 1 });
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
    this.props.history.push({ pathname: "/seller-profile" })

  }

  render() {
    const { productDetailData, clicks, wishlistStatus, isActiveTab } = this.state;
    return (
      <>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="product-img-wrapper">
              <div className="easyzoom">
                <Zoom
                  img={productDetailData.src}
                  zoomScale={1.5}
                  height={750}
                  width="100%"
                  // height={600}
                  transitionTime={0.5}
                  cla
                />
                {/* <a href="">
                                    <img className="mainimage img-fluid" src={require("../public/product.jpg")} />
                                </a> */}
              </div>
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
              <p className="product-price">
                <FontAwesomeIcon icon={faRupeeSign} />
                <span>{productDetailData.cost}</span></p>
              <div className="short-decription"><p>Short Decription</p></div>
              <form className="addtocart d-flex justify-content-start">
                <div className="product-qty">
                  <div className="input-group">
                    <input type="button" value="-" className="quantity-left-minus" disabled={clicks < 1} onClick={this.decreaseItem} />
                    <input type="number" value={clicks} min="1" max="100" />
                    <input type="button" value="+" onClick={this.incrementItem} className="quantity-right-plus" />

                  </div>
                </div>
                <button type="submit" className="cart-btn">Add to cart</button>
              </form>

              <div className="action-links">
                <a href="#"  >
                  <FontAwesomeIcon icon={faRandom} />  Compare</a>
                <a href="#"><FontAwesomeIcon icon={wishlistStatus ? faCheck : farHeart}
                  onClick={() => this.wishlistToggle(wishlistStatus)} />{wishlistStatus ? "Browse Wishlist" : "Add to Wishlist"}</a>
              </div>

              <div className="add-question my-3 py-2">
                <a href="#" onClick={this.toggleModal}><FontAwesomeIcon icon={faQuestion} /> Ask a Question</a>
              </div>
              <Modal show={this.state.showModal} closeModal={this.toggleModal}>
                <form onSubmit={this.handleSubmit}>
                  <h4> Ask a Question </h4>
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
                  <small> <FontAwesomeIcon icon={faPhone} /> &nbsp; 9304637113</small><br /><br />
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
                <a href="#"> <FontAwesomeIcon icon={faFacebook} /></a>
                <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#"><FontAwesomeIcon icon={faPinterest} /></a>
                <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="#"><FontAwesomeIcon icon={faTelegram} /></a>
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
        </div>

        <div className="categorie-img-title">
          <h3>Related Products</h3>
        </div>
        <ShopByType type='product' />
      </>
    )
  }
}


