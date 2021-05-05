import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faRandom, faHeart, faRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import ReactPaginate from 'react-paginate';

export default class ProductGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pathname: this.props.historyProps.location.pathname,
      offset: 0,
      productsData: [],
      perPage: 5,
      currentPage: 0,
      layout: 'col-lg-3 col-sm-6 col-6', //default 4X4
      productListData: [
        {
          img: require('../public/bag2.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 1
        },
        {
          img: require('../public/bag1.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 1
        }, {
          img: require('../public/bag3.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 1
        }, {
          img: require('../public/bag1.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 1
        }, {
          img: require('../public/bag2.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 1
        }, {
          img: require('../public/bag3.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 1
        }, {
          img: require('../public/bag1.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 1
        }, {
          img: require('../public/bag3.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 1
        }

      ]
    }
  }
  componentWillMount() {
    this.receivedData()
  }
  receivedData = () => {
    const { productListData, offset, perPage } = this.state;
    this.setState({
      pageCount: Math.ceil(productListData.length / perPage),
      productsData: productListData.slice(offset, offset + perPage)
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
    // this.receivedData();
  }
  onItemPerPage = (value) => {
  }

  render() {

    const { productsData, wishlistStatus, hoveredItem, pageCount, layout, pathname } = this.state
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
                <span className='active-view' onClick={() => this.onItemPerPage('12')}>12</span>
                <span>/</span>
                <span onClick={() => this.onItemPerPage('24')}>24</span>
                <span>/</span>
                <span onClick={() => this.onItemPerPage('36')}>36</span>
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
        <div className='row'>
          {productsData ? productsData.map((item, index) => {
            return (
              <div key={index} className={layout} onClick={() => this.handlePostDetail(item._id)}>
                <div className="product-wrapper">
                  <div className="prodcut-img">
                    <a href="#"><img src={item.img} className="img-fluid" alt="saree" /></a>
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
                  <h5 className="product-title">{item.title}</h5>
                  <span className="product-price">
                    <FontAwesomeIcon icon={faRupeeSign} />
                    {item.cost}</span>
                </div>
              </div>
            )
          }) : ''}
        </div>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
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