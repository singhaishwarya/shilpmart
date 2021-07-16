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
    const query = new URLSearchParams(props.location.search);
    this.state = {
      isActiveTab: 0,
      config: {
        paddingAtStart: true,
        listBackgroundColor: ``,
        fontColor: `rgb(8, 54, 71)`,
        backgroundColor: ``,
        selectedListFontColor: ``,
        highlightOnSelect: true,
        useDividers: false,
      },
      categories: [
        {
          label: 'Travel Accessories',
          items: [
            {
              label: 'Bag'
            },
            {
              label: 'Luggage'
            }, {
              label: 'Cover'
            },
            {
              label: 'Mask'
            }
          ]
        }
      ],
      brandName: window.location.pathname.split('/')[2], vendorData: {}
    }

  }
  componentDidMount = () => {

    this.getVendorDetails(this.state.brandName)

  }

  getVendorDetails = (brandName) => {
    ProductService.fetchVendor({ brand_name: brandName }).then((result) => {
      this.setState({ vendorData: result })
    });
  }
  render() {
    const { isActiveTab, categories, config, vendorData } = this.state;
    return (
    <>
      <div className="seller-cover-wrapper">
              <div className="cover-area">
                <div className="container d-flex justify-content-between position-relative">
                <div className="seller-info">
                  <div className="seller-brand">
                    <div className="s-logo">
                      <img src={require('../public/eShilpmart_logo_220.svg')} className="img-fluid" alt="logo" /></div>
                  </div>
                  <div className="seller-details">
                    <h1>Digital India Corporation</h1>
                    {/* <p> <FontAwesomeIcon icon={faMapMarker} />  {vendorData?}</p> */}
                    <div className="seller-contact-info">
                      <p>
                        <FontAwesomeIcon icon={faPhone} />  +91 9811148709</p><p>
                        <FontAwesomeIcon icon={faMailBulk} />  ram.chaurasia@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="seller-ratings text-right">
                  <h6>Seller Ratings</h6>
                  <span className="ratings">
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStarHalfAlt}/>
                    
                  </span>
                  <p>Based on 125 reviews</p>

                </div>
                </div>
              </div>
              


              <div className="container page-title-overlap mb-5 bg-light shadow">     

        <div className="row">
          {/* <div className="col-lg-3 col-md-3 col-12">
            <div className="sidebar">
              <h4>Search</h4>
              <div className="mb-3">
                <input type="search" className="search-field" placeholder="Search products…" name="s" />
              </div>
              <h4>Categories</h4>
              <div className="mb-3">
                <div className="filter-content collapse show" id="collapse_aside1" >
                  <div className="categories-list">
                    <MultilevelMenu
                      list={categories}
                      configuration={config}                      
                      selectedListItem={this.selectedItem}
                      selectedLabel={this.selectedItem}
                    />
                  </div>
                </div>
              </div>
              <h4>Store Location</h4>
              <div className="mt-3">
                <MyMapComponent
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </div>
            </div>
          </div> */}
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
                role="tabpanel" aria-labelledby="home-tab"><ProductGrid {...this.props}
                  setPriceRangeProps={() => console.log("demo")} /> </div>
              <div className={`tab-pane fade ${((isActiveTab === 1) ? 'show active' : '')}`} role="tabpanel" aria-labelledby="profile-tab">
                There are about. </div>
              <div className={`tab-pane fade ${((isActiveTab === 2) ? 'show active' : '')}`} role="tabpanel" aria-labelledby="contact-tab">
                There are no reviews yet. </div>
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