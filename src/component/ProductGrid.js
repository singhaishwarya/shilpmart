import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faRandom, faHeart, faRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import ReactPaginate from 'react-paginate';
import ProductService from '../services/ProductService';
import { Link } from "react-router-dom";
export default class ProductGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pathname: props.location.pathname,
      offset: 0,
      productsData: [],
      currentPage: 0,
      per_page: 12,
      layout: 'col-lg-3 col-sm-6 col-6', //default 4X4
      productListData: [],
      filterParams: {},
      categoryBreadcrumbs: props.categoryBreadcrumbs,
      sortBy: "",
    };
    this.currentUrlParams = new URLSearchParams(window.location.search);

  }
  componentWillReceiveProps() {
    // this.setState(this.state)
    this.getProductList(this.getSetQueryParams())
  }

  componentDidMount() {

    this.getProductList(this.getSetQueryParams());
  }

  getSetQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let entries = urlParams.entries(),
      queryParams = {};
    for (const entry of entries) {
      switch (entry[0]) {
        case 'cat_ids':
          queryParams.cat_ids = [entry[1]];
          break
        case 'order_by':
          queryParams.order_by = urlParams.get('order_by');
          break
        case 'sort_by':
          queryParams.sort_by = ['price-asc', 'price-desc'].includes(urlParams.get('sort_by')) ? 'price' : urlParams.get('sort_by')
          this.setState({ sortBy: urlParams.get('sort_by') })
          break
        case 'per_page':
          queryParams.per_page = urlParams.get('per_page');
          this.setState({ per_page: queryParams.per_page * 1 })
          break
        case 'min_price':
          queryParams.min_price = urlParams.get('min_price');
          break
        case 'max_price':
          queryParams.max_price = urlParams.get('max_price');
          break
        case 'q':
          queryParams.q = urlParams.get('q');
          break
        default:
          return;
      }
    }
    return queryParams;
  }

  getProductList = (queryParams) => {
    try {
      ProductService.fetchAllProducts(queryParams).then((result) => {
        this.setState({ productListData: result })
      });

      const { productListData, offset, perPage } = this.state;
      this.setState({
        //   pageCount: Math.ceil(productListData.length / perPage),
        productsData: productListData//.slice(offset, offset + perPage)
      });
    } catch (err) {
      console.log(err);
    }

  }

  handlePostDetail = (value) => {
    this.props.history.push({
      pathname: '/product-detail',
      search: "?pid=" + value
    });
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
      this.getProductList()
    });
  }
  onLayoutChange = (value) => {
    this.setState({
      layout: (value === '2X2') ? 'col-lg-6 col-sm-6 col-6' : (value === '3X3')
        ? 'col-lg-4 col-sm-6 col-6' : 'col-lg-3 col-sm-6 col-6'
    });
  }
  onItemPerPage = (value) => {
    this.state.filterParams.per_page = value;
    this.setState({ per_page: value })
    this.currentUrlParams.set('per_page', value)
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: "&" + this.currentUrlParams.toString()
    });
  }
  handleOnSort(e) {
    this.setState({ sortBy: e.target.value });
    this.currentUrlParams.set('order_by', e.target.value === 'price-asc' ? 'asc' : 'desc');
    this.currentUrlParams.set('sort_by', e.target.value);

    this.props.history.push({
      pathname: this.props.location.pathname,
      search: "&" + this.currentUrlParams.toString()
    })
  }
  render() {

    const { productListData, wishlistStatus, hoveredItem, pageCount, layout, pathname, per_page, } = this.state
    let categoryBreadcrumbs = this.props?.history?.location?.state?.category_breadcrumbs;

    return (
      <>
        {(pathname !== "/wishlist" && productListData?.length > 0) &&
          <section className='topsection d-flex justify-content-between'>
            {(pathname !== "/seller-profile") && <nav aria-label='breadcrumb'>
              <ol className='breadcrumb bg-transparent'>
                <li className='breadcrumb-item'> <Link to={'/'}>Home</Link></li>
                <li className='breadcrumb-item' aria-current='product-list'> <Link to={'/product-list'}>Shop</Link></li>
                {categoryBreadcrumbs?.map((item, index) => {
                  return (<li key={index}
                    className={`breadcrumb-item ${(index === categoryBreadcrumbs?.length - 1 ? 'active' : '')}`} aria-current='product-list'>
                    {(index === categoryBreadcrumbs?.length - 1) ? item.title :
                      < Link to={{
                        pathname: `/product-list/${item.title.replace(/\s+/g, '-').toLowerCase()}`,
                        search: "?cat_ids=" + item.id,
                        state: {
                          category_id: item.id,
                          category_breadcrumbs: [{ id: item.id, title: item.title }]
                        }
                      }} >{item.title}</Link>}
                  </li>)
                })}
                {/* <li className='breadcrumb-item active' aria-current='page'> {this.state.categogyTitle}</li> */}
              </ol>
            </nav>}
            <div className='shop-tools d-flex align-items-center'>
              <div className='per-pge-view'>
                <span>Show :</span>
                <span className={(per_page === 12 ? 'active-view' : '')} onClick={() => this.onItemPerPage(12)}>12</span>
                <span>/</span>
                <span className={(per_page === 24 ? 'active-view' : '')} onClick={() => this.onItemPerPage(24)}>24</span>
                <span>/</span>
                <span className={(per_page === 36 ? 'active-view' : '')} onClick={() => this.onItemPerPage(36)}>36</span>
              </div>
              <div className='grid-view'>
                <button onClick={() => this.onLayoutChange('2X2')} ></button>
                <button onClick={() => this.onLayoutChange('3X3')} ></button>
                <button onClick={() => this.onLayoutChange('4X4')} ></button>
              </div>
              <form method='get' className='shorting-wrapper'>
                <select name='orderby' className='form-control' aria-label='Shop order' value={this.state.sortBy} onChange={(e) => this.handleOnSort(e)}>
                  <option value='menu_order' defaultValue='selected'>Default sorting</option>
                  <option value='popularity'>Sort by popularity</option>
                  <option value='rating'>Sort by average rating</option>
                  <option value='created_at'>Sort by latest</option>
                  <option value='price-asc'>Sort by price: low to high</option>
                  <option value='price-desc'>Sort by price: high to low</option>
                </select>
              </form>
            </div>
          </section>}
        <div className='row py-2'>
          {productListData?.length > 0 ? productListData.map((item, index) => {
            return (
              <div key={index} className={layout} >
                <div className="product-wrapper">
                  <div className="prodcut-img" onClick={() => this.handlePostDetail(item.id)}>
                    <a href="#">
                      <img src={item.images[0]?.image_url} className="img-fluid"
                        alt={item.images[0]?.caption}
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
                  <h5 className="product-title">{item.content?.title}</h5>
                  <span className="product-price">
                    <FontAwesomeIcon icon={faRupeeSign} />
                    {item.price[0]?.price}</span>
                </div>
              </div>
            )
          }) : <span>No products were found matching your selection.</span>}
        </div>
        {/* <ReactPaginate
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
          activeClassName={'active'} /> */}
      </>

    );
  }
}