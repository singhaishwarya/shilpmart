import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faRandom, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { ReactiveBase, RangeInput } from "@appbaseio/reactivesearch";

export default class ProductList extends React.Component {

    constructor() {
        super();
        this.state = {
            productListData: [
                {
                    img: require('../../public/bag2.jpeg'),
                    title: 'beag full streep size',
                    cost: '999'
                },
                {
                    img: require('../../public/bag1.jpeg'),
                    title: 'beag full streep size',
                    cost: '999'
                }, {
                    img: require('../../public/bag3.jpeg'),
                    title: 'beag full streep size',
                    cost: '999'
                }, {
                    img: require('../../public/bag1.jpeg'),
                    title: 'beag full streep size',
                    cost: '999'
                }, {
                    img: require('../../public/bag2.jpeg'),
                    title: 'beag full streep size',
                    cost: '999'
                }, {
                    img: require('../../public/bag3.jpeg'),
                    title: 'beag full streep size',
                    cost: '999'
                }, {
                    img: require('../../public/bag1.jpeg'),
                    title: 'beag full streep size',
                    cost: '999'
                }, {
                    img: require('../../public/bag3.jpeg'),
                    title: 'beag full streep size',
                    cost: '999'
                }

            ],
            productListItems: [],
            hoverIcon: false,
            hoveredItem: '',
            wishlistStatus: false
        };
    }
    componentDidMount() {
        this.setState({
            layout1: "col-6 col-md-6",
            layout2: "col-6 col-md-4",
            layout3: "col-6 col-md-3"
        });
    }

    toggleHover(val, index) {
        this.setState({ hoverIcon: val, hoveredItem: index });
    }
    wishlistToggle(val, index) {
        this.setState({ wishlistStatus: !this.state.wishlistStatus, hoveredItem: index });
    }

    render() {
        const { hoveredItem, layout1, hoverIcon, productListData, wishlistStatus } = this.state;

        return (
            <div >
                <div >
                    <ReactiveBase
                        app="good-books-ds"
                        url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
                        enableAppbase
                    >
                        <div className="row">
                            <div className="col">
                                <RangeInput
                                    componentId="RangeInputComponent"
                                    dataField="books_count"
                                    title="BookSensor"
                                    range={{
                                        start: 3000,
                                        end: 50000
                                    }}
                                />
                            </div>
                        </div>
                    </ReactiveBase>
                </div>

                <div className="row">
                    {productListData.map((item, index) => {
                        return (<div key={index} className={layout1} onMouseEnter={() => this.toggleHover(true, index)}>
                            <div className="prodcut-img">
                                <a href="#"><img
                                    src={item.img} className="img-fluid"
                                    alt="saree" />
                                </a>
                                <span className="more-products" >{item.title}</span>
                                <span className="more-products">{item.cost}</span>
                                {(hoverIcon && (index === hoveredItem)) &&
                                    < div >
                                        <FontAwesomeIcon icon={faCartPlus} />
                                        <FontAwesomeIcon icon={faRandom} />
                                        <FontAwesomeIcon icon={(wishlistStatus && hoveredItem === index) ? faHeart : farHeart}
                                            onClick={() => this.wishlistToggle(wishlistStatus, index)} />
                                        {/* <FontAwesomeIcon icon={farHeart} onClick={() => this.wishlistToggle(true, index)} /> */}
                                    </div>}
                            </div>
                        </div>)
                    })}

                    {/* <div className={this.state.layout1}>.col-6 .col-md-4</div>
                    <div className={this.state.layout1}>.col-6 .col-md-4</div>
                    <div className={this.state.layout1}>.col-6 .col-md-4</div> */}
                </div>
            </div >
        );
    }
}