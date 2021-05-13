import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faRandom, faHeart, faRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { ProductService } from '../services/ProductService';
import axios from 'axios';
const baseUrl = 'https://admin.digitalindiacorporation.in/api/';

export default class ProductGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pathname: this.props.historyProps.location.pathname,
      offset: 0,
      productsData: [],
      perPage: 5,
      currentPage: 0,
      perPage: 12,
      layout: 'col-lg-3 col-sm-6 col-6', //default 4X4
      productListData: [],
      categoryId: [this.props.historyProps.match.params.categoryId],
      config: { category_ids: this.props.historyProps.match.params.categoryId }
    }
  }
  componentDidMount() {
    this.receivedData()
  }

  receivedData = () => {

    axios.get(baseUrl + `products`, {
      params: this.state.config
    }).then(response => {
      this.setState({ productListData: response.data.data.data })
    }).catch(error => {
      throw (error);
    });

    const { productListData, offset, perPage } = this.state;
    this.setState({
      //   pageCount: Math.ceil(productListData.length / perPage),
      productsData: productListData//.slice(offset, offset + perPage)
    });

  }
  handlePostDetail = (value) => {
    this.props.historyProps.history.push(`/product-detail/${value}`);
  }

  toggleHover = (val, index) => {
    this.setState({ hoverIcon: val, hoveredItem: index });
  }
  wishlistToggle = (val, index) => {
    this.setState({ wishlistStatus: !this.state.wishlistStatus, hoveredItem: index });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.receivedData()
    });
  }
  onLayoutChange = (value) => {
    this.setState({
      layout: (value === '2X2') ? 'col-lg-6 col-sm-6 col-6' : (value === '3X3')
        ? 'col-lg-4 col-sm-6 col-6' : 'col-lg-3 col-sm-6 col-6'
    });
  }
  onItemPerPage = (value) => {
    this.state.config.perPage = value;
    this.setState({ perPage: value })
    this.receivedData();
  }

  render() {

    const { productListData, wishlistStatus, hoveredItem, pageCount, layout, pathname, perPage } = this.state

    return (
      <>
        {(pathname !== "/wishlist") &&
          <section className='topsection d-flex justify-content-between'>
            {(pathname !== "/seller-profile") && <nav aria-label='breadcrumb'>
              <ol className='breadcrumb bg-transparent'>
                <li className='breadcrumb-item'><a href='#'>Home</a></li>
                <li className='breadcrumb-item active' aria-current='page'>Shop</li>
              </ol>
            </nav>}
            <div className='shop-tools d-flex align-items-center'>
              <div className='per-pge-view'>
                <span>Show :</span>
                <span className={(perPage === 12 ? 'active-view' : '')} onClick={() => this.onItemPerPage(12)}>12</span>
                <span>/</span>
                <span className={(perPage === 24 ? 'active-view' : '')} onClick={() => this.onItemPerPage(24)}>24</span>
                <span>/</span>
                <span className={(perPage === 36 ? 'active-view' : '')} onClick={() => this.onItemPerPage(36)}>36</span>
              </div>
              <div className='grid-view'>
                <button onClick={() => this.onLayoutChange('2X2')} ></button>
                <button onClick={() => this.onLayoutChange('3X3')} ></button>
                <button onClick={() => this.onLayoutChange('4X4')} ></button>
              </div>
              <form method='get' className='shorting-wrapper'>
                <select name='orderby' className='form-control' aria-label='Shop order'>
                  <option value='menu_order' defaultValue='selected'>Default sorting</option>
                  <option value='popularity'>Sort by popularity</option>
                  <option value='rating'>Sort by average rating</option>
                  <option value='date'>Sort by latest</option>
                  <option value='price'>Sort by price: low to high</option>
                  <option value='price-desc'>Sort by price: high to low</option>
                </select>
              </form>
            </div>
          </section>}
        <div className='row py-2'>
          {productListData ? productListData.map((item, index) => {
            return (
              <div key={index} className={layout} >
                <div className="product-wrapper">
                  <div className="prodcut-img" onClick={() => this.handlePostDetail(item._id)}>
                    <a href="#">
                      <img src={item.images.length && item.images[0].image_url} className="img-fluid"
                        alt={item.images.length && item.images[0].caption}
                        onError={e => { e.currentTarget.src = require('../public/No_Image_Available.jpeg') }}
                      /></a>
                  </div>
                  <div className="prdocut-dis-lable"><span>{item.discount}%</span></div>
                  <div className="shop-wrapper">
                    <div className="shopBtn">
                      <div className="shop-btn"><span>
                        <FontAwesomeIcon icon={faCartPlus} /></span></div>
                      <div className="shop-btn"><span>
                        <FontAwesomeIcon icon={faRandom} />
                      </span></div>
                      <div className="shop-btn"><span>
                        <FontAwesomeIcon
                          icon={(wishlistStatus && hoveredItem === index) ? faHeart : farHeart}
                          onClick={() => this.wishlistToggle(wishlistStatus, index)}
                        />
                      </span></div>
                    </div>
                  </div>
                  <h5 className="product-title">{item.content && item.content.title}</h5>
                  <h5 className="product-title">{item.content && item.content.product_description}</h5>
                  <span className="product-price">
                    <FontAwesomeIcon icon={faRupeeSign} />
                    {item.price.length && item.price[0].price}</span>
                </div>
              </div>
            )
          }) : ''}
        </div>
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages paginationItem'}
          activeClassName={'active'} />
      </>

    );
  }
}