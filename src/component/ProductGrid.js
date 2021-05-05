import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faRandom, faHeart, faRupeeSign, faThLarge } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import logo from '../public/bag2.jpeg';


export default class ProductGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      productsData: [],
      perPage: 5,
      currentPage: 0,
      layout: this.props.layout,  //default 4X4
      productListData: [
        {
          img: '../public/bag2.jpeg',
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

  onItemPerPage = (value) => {
    console.log('demo==', value);
  }
  render() {

    const { productsData, wishlistStatus, hoveredItem, pageCount } = this.state
    const { layoutProps } = this.props
    return (
      <>
        { productsData ? productsData.map((item, index) => {
          return (
            <div key={index} className={layoutProps} onClick={() => this.handlePostDetail(item._id)}>
              <div className="product-wrapper">
                {/* <div className="pressBlock-container">
                  <figure>
                    <img src={logo} className="img-fluid" alt="saree" />
                  </figure>
                </div> */}
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
        
      </>
      
    );
  }
}