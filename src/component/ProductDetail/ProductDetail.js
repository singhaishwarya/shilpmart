import React, { version } from "react";
import Zoom from 'react-img-zoom'
import { Modal } from "react-modal-overlay";
import "react-modal-overlay/dist/index.css";
import { Card, CardHeader, CardBody, CardFooter } from 'react-simple-card';
import ReactStars from 'react-stars'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShopByType from "../ShopByType/ShopByType";

export default class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product_id: this.props._id,
            productDetailData:
            {
                src: 'https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/12/WhatsApp-Image-2020-12-04-at-1.07.30-PM-1.jpeg',
                title: 'beag full streep size 20×30 100 % jute',
                cost: '600'
            },
            activeIndex: 0,
            visible: true,
            clicks: 0,
            show: true,
            showModal: false

        }
    }
    // init active index when open the modal
    open(activeIndex) {
        this.setState({
            activeIndex: activeIndex || 0,
            visible: true
        });
    }
    incrementItem = () => {
        this.setState({ clicks: this.state.clicks + 1 });
    }
    decreaseItem = () => {
        this.setState({ clicks: this.state.clicks - 1 });
    }
    componentDidMount() {
        // this.setState({});
    }
    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    };
    handleSubmit = (event) => {
        console.log('A name was submitted: ' + event);
        event.preventDefault();
        this.toggleModal();
        // this.setState({ showModal: !this.state.showModal });
    }
    render() {

        const { activeIndex, visible, productDetailData, clicks } = this.state;
        return (
            <>
                <div className="row">
                    <div className="col-6 col-md-6">
                        <Zoom
                            img={productDetailData.src}
                            zoomScale={1.5}
                            width={600}
                            height={600}
                            transitionTime={0.5}
                        />
                    </div>
                    <div className="col-6 col-md-6">
                        <div className="row">
                            <span>{productDetailData.title}</span>
                        </div>
                        <div className="row">
                            <span>Rs. {productDetailData.cost}</span>
                        </div>
                        <div>
                            <button onClick={this.incrementItem}>+</button>
                            <span>{clicks}</span>
                            <button disabled={clicks < 1} onClick={this.decreaseItem}>-</button>
                        </div>
                        <div>
                            <div style={{ textAlign: "center", marginTop: 20 }}>
                                <button className="button" onClick={this.toggleModal}>
                                    Ask a Question
                                </button>
                            </div>
                            <Modal show={this.state.showModal} closeModal={this.toggleModal}>
                                <form onSubmit={this.handleSubmit}>
                                    <h4> Ask a Question </h4>
                                    <div className="row">
                                        <label>Name*</label>
                                        <input type="text" name="name" />
                                    </div>
                                    <div className="row">
                                        <label>Email*</label>
                                        <input type="text" name="email" />
                                    </div>
                                    <div className="row">
                                        <label>Your inquiry *</label>
                                        <textarea type="text" name="inquiry" />
                                    </div>
                                    <input type="submit" value="Submit" />
                                </form>
                            </Modal>
                        </div>
                        <div>
                            <Card>
                                <CardHeader>
                                    <img
                                        src='https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/11/eShilpmart_logo_220.svg' className="img-fluid"
                                        alt="saree" /> SATAYANARAYANRAJPUT619</CardHeader>
                                <CardBody> <FontAwesomeIcon icon={faPhone} />9694388232</CardBody>
                                <CardFooter>   <ReactStars
                                    count={5}
                                    edit={false}
                                    size={15}
                                    color2={'#ffd700'} /></CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="categorie-img-title">
                    <h3>Related Products</h3>

                </div>
                <ShopByType type='product' />
            </>
        )
    }
}


