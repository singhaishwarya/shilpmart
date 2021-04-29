import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faRandom, faHeart, faRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import ReactStars from 'react-stars'
import { Range } from 'rc-slider';
import logo from '../../public/bag2.jpeg';
import { MultilevelMenu } from 'react-multilevel-menu';
import MultiSelect from "react-multi-select-component";
import ReactPaginate from 'react-paginate';
export default class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product_category: this.props.category,
            offset: 0,
            data: [],
            productsData: [],
            perPage: 5,
            currentPage: 0,
            productListData: [
                {
                    img: '../../public/bag2.jpeg',
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11'
                },
                {
                    img: require('../../public/bag1.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11'
                }, {
                    img: require('../../public/bag3.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11'
                }, {
                    img: require('../../public/bag1.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11'
                }, {
                    img: require('../../public/bag2.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11'
                }, {
                    img: require('../../public/bag3.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11'
                }, {
                    img: require('../../public/bag1.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11'
                }, {
                    img: require('../../public/bag3.jpeg'),
                    title: 'beag full streep size',
                    cost: '999',
                    average_rating: 4,
                    discount: '11'
                }

            ],
            productListItems: [],
            hoverIcon: false,
            hoveredItem: '',
            wishlistStatus: false,
            offers: [
                { label: "Buy More, Save More", value: "grapes" },
                { label: "Exchange Offer", value: "mango" },
                { label: "No Cost EMI", value: "strawberry", disabled: true },
                { label: "Special Price", value: "pear" }
            ],
            selectedOffer: [],
            config: {
                paddingAtStart: true,
                // classname: 'my-custom-class',
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
                            label: 'Bag',
                            onSelected: function () { }
                        },
                        {
                            label: 'Luggage',
                            onSelected: function () { }
                        }, {
                            label: 'Cover',
                            onSelected: function () { }
                        },
                        {
                            label: 'Mask',
                            onSelected: function () { }
                        }
                    ]
                }
            ],
            layout: "col-lg-3 col-sm-6 col-6", //default 4X4
            priceRange: [20, 50]
        };
    }
    componentDidMount() {
        this.receivedData()
    }
    receivedData = () => {
        const { productListData, offset, perPage } = this.state;
        this.setState({
            pageCount: Math.ceil(productListData.length / this.state.perPage),
            productsData: productListData.slice(offset, offset + perPage)
        });
    }
    onLayoutChange = (value) => {
        this.setState({
            layout: (value === '2X2') ? "col-lg-6 col-sm-6 col-6" : (value === '3X3')
                ? "col-lg-4 col-sm-6 col-6" : "col-lg-3 col-sm-6 col-6"
        });
        // this.receivedData();
    }
    toggleHover = (val, index) => {
        this.setState({ hoverIcon: val, hoveredItem: index });
    }
    wishlistToggle = (val, index) => {
        this.setState({ wishlistStatus: !this.state.wishlistStatus, hoveredItem: index });
    }
    onSliderChange = (value) => {
        console.log(value);
        this.setState({ priceRange: value })
    }
    ratingChanged = (value) => {
        console.log(value);
    }
    setSelected = (value) => {
        // console.log(value);
        this.setState({ selectedOffer: value });
    }
    selectedItem = (event) => {
        console.log(event);
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
    handlePostDetail = (index) => {
        this.props.history.push({ pathname: "/product-detail", state: { _id: index } }
        );
    }
    onItemPerPage = (value) => {
        console.log("demo==", value);
    }

    render() {
        const {
            offers,
            selectedOffer,
            categories,
            config,
            productsData,
            hoveredItem,
            layout,
            hoverIcon,
            wishlistStatus, priceRange } = this.state;

        console.log(productsData);

        return (
            <>
                <div className="container-fluid">
                    <div className="row py-5">
                        <div className="col-lg-3">
                            <div className="shop-sidebar">
                                <article className="filter-group">
                                    <header className="card-header">
                                        <h6 className="title">Filter by price </h6>

                                    </header>
                                    <div className="filter-content">
                                        <div className="price-range-wrapper">
                                            <div id="slider-range" className="price-filter-range" name="rangeInput">

                                                <Range
                                                    defaultValue={priceRange}
                                                    min={0}
                                                    max={100}
                                                    className='filter-slider'
                                                    allowCross={false}
                                                    onAfterChange={this.onSliderChange}
                                                />

                                            </div>
                                            <div className="price-range d-flex justify-content-between">

                                                <span>
                                                    Price:
                                            <input type="number" min="0" max="9900" defaultValue={priceRange[0]}
                                                        id="min_price" className="price-range-field" />
                                                    <input type="number" min="0" max="10000"
                                                        defaultValue={priceRange[1]} id="max_price"
                                                        className="price-range-field" /></span>
                                                <span><button className="price-range-search"
                                                    id="price-range-submit">Filter</button></span>
                                            </div>
                                            <div id="searchResults" className="search-results-block"></div>
                                        </div>
                                    </div>
                                </article>
                                <article className="filter-group">
                                    <header className="card-header">
                                        <h6 className="title">Rating </h6>
                                    </header>
                                    <div className="filter-content">
                                        <div className="filter-rateings">
                                            <div className="testimonial-ratings justify-content-start">
                                                <ReactStars
                                                    count={5}
                                                    onChange={this.ratingChanged}
                                                    size={24}
                                                    color2={'#ffd700'} />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                                <article className="filter-group">
                                    <header className="card-header">
                                        <h6 className="title">Categories </h6>
                                    </header>
                                    <div className="filter-content">
                                        <div className="categories-list">
                                            <MultilevelMenu
                                                list={categories}
                                                configuration={config}
                                                selectedListItem={this.selectedItem}
                                                selectedLabel={this.selectedItem}
                                            />
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <section className="topsection d-flex justify-content-between">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Shop</li>
                                    </ol>
                                </nav>
                                <div className="shop-tools d-flex align-items-center">
                                    <div className="per-pge-view">
                                        <span>Show :</span>
                                        <span className="active-view" onClick={() => this.onItemPerPage('12')}>12</span>
                                        <span>/</span>
                                        <span onClick={() => this.onItemPerPage('24')}>24</span>
                                        <span>/</span>
                                        <span onClick={() => this.onItemPerPage('36')}>36</span>
                                    </div>

                                    <div className="grid-view">
                                        {/* <span className="breadcrumb-item active">Show:</span> */}
                                        <button onClick={() => this.onLayoutChange('2X2')} ><i class="fas fa-th-large"></i></button>
                                        <button onClick={() => this.onLayoutChange('3X3')} ><i class="fas fa-th"></i></button>
                                        <button onClick={() => this.onLayoutChange('4X4')} >4X4</button>
                                    </div>

                                    <form method="get" className="shorting-wrapper">
                                        <select name="orderby" className="form-control" aria-label="Shop order">
                                            <option value="menu_order" selected="selected">Default sorting</option>
                                            <option value="popularity">Sort by popularity</option>
                                            <option value="rating">Sort by average rating</option>
                                            <option value="date">Sort by latest</option>
                                            <option value="price">Sort by price: low to high</option>
                                            <option value="price-desc">Sort by price: high to low</option>
                                        </select>
                                    </form>

                                </div>



                            </section>

                            <div className="row">

                                {productsData ? productsData.map((item, index) => {
                                    return (<div className={layout} key={index} >
                                        <div className="product-wrapper">
                                            <div className="prodcut-img"><img src={logo} className="img-fluid" alt="saree" /></div>
                                            <div className="prdocut-dis-lable"><span>{item.discount}%</span></div>
                                            <div className="shop-wrapper">
                                                <div className="shopBtn">
                                                    <div className="shop-btn"><span>
                                                        <FontAwesomeIcon icon={faCartPlus} /></span></div>
                                                    <div className="shop-btn"><span>
                                                        <FontAwesomeIcon icon={faRandom} />
                                                    </span></div>
                                                    <div className="shop-btn"><span>
                                                        <FontAwesomeIcon icon={(wishlistStatus && hoveredItem === index) ? faHeart : farHeart}
                                                            onClick={() => this.wishlistToggle(wishlistStatus, index)} />
                                                    </span></div>
                                                </div>
                                            </div>
                                            <h5 className="product-title">{item.title}</h5>
                                            <span className="product-price"><FontAwesomeIcon icon={faRupeeSign} /> {item.cost}</span>
                                        </div>
                                    </div>
                                    )
                                }) : ''}
                            </div>
                        </div>

                    </div></div>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />

            </>
        );
    }
}