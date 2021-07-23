import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMailBulk, faPhone, faMapMarker, faStar, faStarOfDavid, faStarOfLife, faStarHalf, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { MultilevelMenu } from 'react-multilevel-menu';
import ProductGrid from './ProductGrid';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import ProductService from '../services/ProductService';
import { faFontAwesome } from "@fortawesome/free-brands-svg-icons";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 26.8467, lng: 80.9462 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 26.8467, lng: 80.9462 }} />}
  </GoogleMap>))

export default class SellerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveTab: 0, searchQuery: '',
      config: {
        paddingAtStart: true,
        listBackgroundColor: ``,
        fontColor: `rgb(8, 54, 71)`,
        backgroundColor: ``,
        selectedListFontColor: ``,
        highlightOnSelect: true,
        useDividers: false,
      },
      categories: [],
      brandName: window.location.pathname.split('/')[2], vendorData: {}
    }

  }
  componentDidMount = () => {

    this.getVendorDetails(this.state.brandName)

  }

  getVendorDetails = (brandName) => {
    ProductService.fetchVendor({ brand_name: brandName }).then((result) => {
      this.setState({ vendorData: result })
      let category = [];
      result.categories.map((item, index) => {
        category.push({
          label: item.cate_title,
          key: item.category_id
        })
      });
      this.setState({ categories: category })
    });

  }
  onTextChange = (e) => {
    this.setState({ searchQuery: e.target.value })
    this.currentUrlParams = new URLSearchParams(window.location.search);
    this.currentUrlParams.set('q', e.target.value)
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: "&" + this.currentUrlParams.toString()
    });
  };
  render() {
    const { isActiveTab, categories, config, vendorData, searchQuery } = this.state;
    return (
      <>
        <div className="seller-cover-wrapper">
          <div className="cover-area" style={{backgroundImage:'url( require("../public/officeSupplies.jpeg"))'}}>
            <div className="container d-flex justify-content-between position-relative">
              <div className="seller-info">
                <div className="seller-brand">
                  <div className="s-logo">
                    <img src={vendorData?.vendor?.logo} className="img-fluid" alt="logo" /></div>
                </div>
                <div className="seller-details">
                  <h1>{vendorData?.vendor?.brand}</h1>
                  {/* <p> <FontAwesomeIcon icon={faMapMarker} />  {vendorData?}vendor?.</p> */}
                  <div className="seller-contact-info">
                    <p>
                      <FontAwesomeIcon icon={faPhone} />  {vendorData?.vendor?.mobile}</p><p>
                      <FontAwesomeIcon icon={faMailBulk} />  {vendorData?.vendor?.email}</p>
                  </div>
                </div>
              </div>

              <div className="seller-ratings text-right">
                <h6>Seller Ratings</h6>
                <span className="ratings">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStarHalfAlt} />

                </span>
                <p>Based on 125 reviews</p>

              </div>
            </div>
          </div>



          <div className="container page-title-overlap mb-5 bg-light shadow">

            <div className="row">
             
              <div className="col-lg-3 col-md-3 col-12">
                <div className="sidebar">
                  <h4>Search</h4>
                  <div className="mb-3">
                    <input type="search" className="search-field" onChange={this.onTextChange} value={searchQuery} onClick={this.onTextChange} placeholder="Search products…" name="s" />
                  </div>

                  <div className="mb-3">
                <h4>categories</h4>
                <div className="filter-content collapse show" id="collapse_aside1" >
                  <div className="categories-list">
                    {/* <MultilevelMenu
                      list={categories}
                      configuration={config}
                      selectedListItem={this.selectedItem}
                      selectedLabel={this.selectedItem}
                    /> */}
                    <ul>
                      <li><a href="#">SAREES</a></li>                      
                      <li><a href="#">WATER BOTTLES, FLASKS & SURAHIS</a></li>
                      <li><a href="#">CRAFT ACCESSORIES</a></li>
                      <li><a href="#">DINING SETS</a></li>
                      <li><a href="#">KURTAS</a></li>
                      <li><a href="#">JACKETS & COATS</a></li>
                      <li><a href="#">SHOES</a></li>
                    </ul>
                  </div>
                </div>
              </div>
                </div>
               
              </div>
              <div className="col p-lg-5 p-2">
                <ul className="nav nav-tabs mb-4" role="tablist">
                  <li className="nav-item">
                    <span className={`nav-link  ${((isActiveTab === 0) ? 'active' : '')}`}
                      data-toggle="tab" href="#des" role="tab" aria-controls="home" aria-selected="true"
                      onClick={() => this.setState({ isActiveTab: 0 })} >PRODUCTS</span>
                  </li>
                  <li className="nav-item">
                    <span className={`nav-link ${((isActiveTab === 1) ? 'active' : '')}`} data-toggle="tab" href="#del" role="tab" aria-controls="profile" aria-selected="false" onClick={() => this.setState({ isActiveTab: 1 })} >ABOUT</span>
                  </li>
                  <li className="nav-item">
                    <span className={`nav-link ${((isActiveTab === 2) ? 'active' : '')}`} data-toggle="tab" href="#inq" role="tab" aria-controls="contact" aria-selected="false" onClick={() => this.setState({ isActiveTab: 2 })}>REVIEWS</span>
                  </li>
                  <li className="nav-item">
                    <span className={`nav-link ${((isActiveTab === 3) ? 'active' : '')}`} data-toggle="tab" href="#map" role="tab" aria-controls="map" aria-selected="false" onClick={() => this.setState({ isActiveTab: 3 })}>Store Location</span>
                  </li>
                </ul>

                <div className="tab-content" >
                  <div className={`tab-pane fade ${((isActiveTab === 0) ? 'show active' : '')}`}
                    role="tabpanel" aria-labelledby="home-tab">{vendorData?.data?.length > 0 ?
                      <ProductGrid {...this.props} sellerProducts={vendorData}
                        setPriceRangeProps={() => console.log("demo")} /> : <div className="empty-wishlist empty-product"><h2>No Product found for this seller.</h2> </div>} </div>
                  <div className={`tab-pane fade ${((isActiveTab === 1) ? 'show active' : '')}`} role="tabpanel" aria-labelledby="profile-tab">
                    There are about. </div>
                  <div className={`tab-pane fade ${((isActiveTab === 2) ? 'show active' : '')}`} role="tabpanel" aria-labelledby="contact-tab">
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

                    </div></div>
                  <div className={`tab-pane fade ${((isActiveTab === 3) ? 'show active' : '')}`} role="tabpanel" aria-labelledby="map-tab">
                    <MyMapComponent
                      isMarkerShown
                      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `400px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    /> </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </>


    )
  }
}