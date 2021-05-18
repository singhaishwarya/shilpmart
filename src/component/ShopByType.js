import React from "react";
import AliceCarousel from 'react-alice-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faCartPlus, faRandom, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import CategoryService from '../services/CategoryService';
import ProductService from '../services/ProductService';

export default class ShopByType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      responsive: {
        0: { items: 2 },
        568: { items: 3 },
        1024: { items: 5 },
      },
      shopByCategoryData: [{
        img: 'https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/womens_wear-300x300.webp',
        type: 'Womens wear',
        cost: '999',
        average_rating: 4,
        discount: '11',
        _id: 1,
        route: 'womens-wear'
      }, {
        img: 'https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/mens_wear-300x300.webp',
        type: 'Mens wear',
        cost: '999',
        average_rating: 4,
        discount: '11',
        _id: 2,
        route: 'mens-wear'
      }, {
        img: 'https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/travel-300x300.webp',
        type: 'Travel',
        cost: '999',
        average_rating: 4,
        discount: '11',
        _id: 3,
        route: 'travel'
      }, {
        img: 'https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/home_texttiles-300x300.webp',
        type: 'Home Textile',
        cost: '999',
        average_rating: 4,
        discount: '11',
        _id: 4,
        route: 'housing'
      }, {
        img: 'https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/decor-300x300.webp',
        type: 'Home Decore Utility',
        cost: '999',
        average_rating: 4,
        discount: '11',
        _id: 5,
        route: 'furniture'
      }],
      shopByProductData: [
        {
          img: require('../public/bag2.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 1,
          wishlistStatus: 1
        },
        {
          img: require('../public/bag1.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 2,
          wishlistStatus: 0
        }, {
          img: require('../public/bag3.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 3,
          wishlistStatus: 0
        }, {
          img: require('../public/bag1.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 4,
          wishlistStatus: 1
        }, {
          img: require('../public/small-img.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 5,
          wishlistStatus: 0
        }, {
          img: require('../public/bag3.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 6,
          wishlistStatus: 1
        }, {
          img: require('../public/bag1.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 7,
          wishlistStatus: 0
        }, {
          img: require('../public/bag3.jpeg'),
          title: 'beag full streep size',
          cost: '999',
          average_rating: 4,
          discount: '11',
          _id: 8,
          wishlistStatus: 1
        }
      ],
      shopByCategoryItems: [],
      shopByProductItems: []
    };

  }

  componentDidMount() {
    const { wishlistStatus, hoveredItem } = this.state;
    // this.state.type === 'product' ? this.getProductsList() : this.getCateroryList();
    this.setState({
      shopByProductItems: this.state.shopByProductData.map((item, index) => {
        return (<div className="product-wrapper" key={index} >
          <div className="prodcut-img">
            <a href="#"><img src={item.img} className="img-fluid"
              onClick={() => this.productDetail(item._id)}
              alt="saree" /></a>
          </div>
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
          <div className="prdocut-dis-lable"><span>{item.discount}%</span></div>
          <h5 className="product-title"><a href="#">{item.title}</a></h5>
          <span className="product-price">
            <FontAwesomeIcon icon={faRupeeSign} /> {item.cost}
          </span>
        </div>)
      }),
      shopByCategoryItems: this.state.shopByCategoryData.map((item, index) => {
        return (<div key={index} >
          <div className="categorie-img">
            <a href="#" className="cate-img">
              <img src={item.img} className="img-fluid"
                onClick={() => this.productList(item.route)}
                alt="cate img" />
            </a>
          </div>
          <div className="categorie-img-title">
            <h3>{item.type}</h3>
            <div className="more-products"><a href="#">More Products</a></div>
          </div>
        </div>)
      })
    });

  }
  getCateroryList = () => {
    CategoryService.fetchAllCategory({ parent_id: 0 }).then((result) => {

      console.log("demo categories", result)
    });
  }

  getProductsList = () => {
    ProductService.fetchAllProducts().then((result) => {
      console.log("demo products", result)
    })
  }

  productDetail = (value) => {
    this.props.history.push(`/product-detail/${value}`);
  }
  productList = (value) => {

    this.props.history.push(`/product-list/${value}`);
  }
  wishlistToggle = (val, index) => {
    this.setState({ wishlistStatus: !this.state.wishlistStatus, hoveredItem: index });
  }
  render() {
    // const demoItems = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => <div style={{
    //   display: "inline-block",
    //   width: "100%",
    //   height: 200,
    //   border: "2px solid #fff",
    //   background: "teal"
    // }} role="button" />);
    const { type, shopByCategoryItems, shopByProductItems, responsive } = this.state;

    return (
      <AliceCarousel
        autoPlayInterval={3000}
        autoPlay={type === 'product' ? true : false}
        autoPlayStrategy="all"
        // controlsStrategy="responsive"
        disableDotsControls
        // disableAutoPlayOnAction={true}
        items={type === 'product' ? shopByProductItems : shopByCategoryItems}
        responsive={responsive}
        mouseTracking
        infinite
        disableButtonsControls //can be enabled if arrows are needed
        touchTracking
      />

    )
  };
}