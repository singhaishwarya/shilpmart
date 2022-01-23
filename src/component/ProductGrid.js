import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import { Link } from "react-router-dom";
import ProductTile from './ProductTile';
import ToastService from '../services/ToastService';
import Loader from "react-loader";
import { loaderOptions } from "../lib/utils";
class ProductGrid extends Component {
  constructor(props) {
    super(props);
    this.currentUrlParams = new URLSearchParams(window.location.search);

    this.state = {
      isLoaded: false,
      pathname: props?.location?.pathname,
      productsData: [],
      currentPage: 1,
      per_page: 10,
      layout: 'col-lg-3 col-sm-6 col-6', //default 4X4
      productListData: [],
      filterParams: {},
      categoryBreadcrumbs: props.categoryBreadcrumbs,
      sortBy: "",
      layoutValue: '4X4', brand_name: window.location.href.indexOf("entrepreneur") != -1 ? this.props.sellerProducts.vendor.brand : ''
    };

  }
  componentDidMount() {

    this.props.sellerProducts?.data?.length > 0 ?
      this.getVendorProducts(this.getSetQueryParams())
      : this.getProductList(this.getSetQueryParams());
    this.handleScrollPosition();
  }
  componentDidUpdate(prevprops) {
    if (prevprops.history.location.search !== prevprops.location.search) {
      this.props.sellerProducts?.data?.length > 0 ? this.getVendorProducts(this.getSetQueryParams()) : this.getProductList(this.getSetQueryParams())
    }
  }
  getVendorProducts = (queryParams) => {
    ProductService.fetchVendor(queryParams).then((result) => {

      this.setState({ productListData: result, isLoaded: true })

    });

  }
  fetchMoreData = () => {
    this.setState({ currentPage: this.state.currentPage + 1, isLoaded: false });
    this.currentUrlParams.set('page', this.state.currentPage + 1)
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: "&" + this.currentUrlParams.toString()
    });
  };

  errorAlert = (product, type) => {

    return ToastService.error(product?.content?.title + " is " +
      (type === "cart" ? "already in cart" : "removed from wishlist"));

  }

  getSetQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let entries = urlParams.entries(),
      queryParams = {};
    for (const entry of entries) {
      // console.log("===", entry)
      switch (entry[0]) {
        // case 'cat_ids':
        //   queryParams.cat_ids = [urlParams.get('cat_ids')];
        //   break
        // case 'order_by':
        //   queryParams.order_by = urlParams.get('order_by');
        //   break
        case 'sort_by':
          queryParams.sort_by = ['price-asc', 'price-desc'].includes(urlParams.get('sort_by')) ? 'price' : urlParams.get('sort_by')
          this.setState({ sortBy: urlParams.get('sort_by') })
          break
        case 'per_page':
          queryParams.per_page = urlParams.get('per_page');
          this.setState({ per_page: queryParams.per_page * 1 })
          break
        // case 'min_price':
        // queryParams.min_price = urlParams.get('min_price');
        // break
        // case 'max_price':
        // queryParams.max_price = urlParams.get('max_price');
        // break
        // case 'q':
        //   queryParams.q = urlParams.get('q');
        //   break
        // case 'color':
        //   queryParams.color = urlParams.get('color');
        //   break
        case 'page':
          queryParams.per_page = urlParams.get('page') * (queryParams.per_page ? queryParams.per_page : 12);
          break
        default:
          queryParams[entry[0]] = urlParams.get(entry[0])

          break;
      }
    }

    if (this.state.brand_name) {
      queryParams.brand_name = this.state.brand_name;
    }
    return queryParams;
  }

  getProductList = (queryParams) => {
    try {
      ProductService.fetchAllProducts(queryParams).then((result) => {
        this.setState({
          productListData: result, isLoaded: true
        });
        this.props.setPriceRangeProps([(result?.filter?.min_price || 0) * 1, (result?.filter?.customer_max_price || result?.filter?.max_price) * 1])
        this.props.setFilters(result?.filters)
      });
    } catch (err) {
      console.log(err);
    }

  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition") - 400;
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      sessionStorage.removeItem("scrollPosition");
    }
  };

  onLayoutChange = (value) => {
    this.setState({
      layoutValue: value
    });

    if (value === '2X2') {
      this.setState({ layout: 'col-lg-6 col-sm-6 col-6' });
    }
    else {
      this.setState({
        layout: (value === '3X3' ? 'col-lg-4 col-sm-6 col-6' : 'col-lg-3 col-sm-6 col-6')
      })
    }
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
  successAlert = (product, type) => {
    return ToastService.success(product?.content?.title + " is successfully added to " + type)
  }
  limitAlert = () => {
    return ToastService.error("Compare Cart is full(limit :5)")
  }
  render() {
    const { productListData, layout, pathname, per_page, isLoaded, layoutValue } = this.state
    let categoryBreadcrumbs = this.props?.history?.location?.state?.category_breadcrumbs;

    return (
      <>
        <Loader loaded={isLoaded} message='Loading...' options={loaderOptions} className="spinner" >
          {(pathname !== "/wishlist" && productListData?.data?.length > 0) &&
            <section className='topsection d-flex justify-content-between'>
              {(pathname !== "/entrepreneur") && <nav aria-label='breadcrumb'>
                <ol className='breadcrumb bg-transparent'>
                  <li className='breadcrumb-item'> <Link to='/'>Home</Link></li>
                  <li className='breadcrumb-item'
                    aria-current={true}>Shop</li>
                  {categoryBreadcrumbs?.map((item, index) => {
                    return (<li key={index}
                      className={`breadcrumb-item ${(index === categoryBreadcrumbs?.length - 1 ? 'active' : '')}`} aria-current={true}>
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
                  <button onClick={() => this.onLayoutChange('2X2')} className={layoutValue === '2X2' ? "grid-active" : ''}></button>
                  <button onClick={() => this.onLayoutChange('3X3')} className={layoutValue === '3X3' ? "grid-active" : ''} ></button>
                  <button onClick={() => this.onLayoutChange('4X4')} className={layoutValue === '4X4' ? "grid-active" : ''} ></button>
                </div>
                <form method='get' className='shorting-wrapper'>
                  <select name='orderby' className='form-control' aria-label='Shop order' value={this.state.sortBy}
                    onChange={(e) => this.handleOnSort(e)}>
                    <option value='menu_order' defaultValue='selected'>Select sorting</option>
                    {/* <option value='popularity'>Sort by popularity</option>
                  <option value='rating'>Sort by average rating</option> */}
                    <option value='created_at'>Sort by latest</option>
                    <option value='price-asc'>Sort by price: low to high</option>
                    <option value='price-desc'>Sort by price: high to low</option>
                  </select>
                </form>
              </div>
            </section>}

          <div className="row">

            {(productListData?.data?.length > 0 && isLoaded) ?
              (<>{productListData?.data?.map((item, index) => {
                return (
                  <div key={index} className={layout} >

                    <ProductTile data={item} {...this.props} errorAlert={this.errorAlert} limitAlert={this.limitAlert} successAlert={this.successAlert} gridLayout={layoutValue} />

                  </div>
                )

              })} {productListData.next_page_url && <span className="loadMore" onClick={() => this.fetchMoreData()}><span>Load More</span></span>}</>)
              : <div className="empty-wishlist empty-product"><h2>No Product found for this category.</h2>
                <Link to="/product-list">Return to shop</Link></div>}

          </div>

        </Loader>
      </>

    );
  }
}



export default (ProductGrid);
