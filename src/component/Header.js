import React from "react";
import { Link } from "react-router-dom";
import Navbar from './Navbar'
import Login from "./Login";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRandom, faHeart, faShoppingBasket, faAdjust } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faLinkedin, faTelegram, faPinterestP } from '@fortawesome/free-brands-svg-icons'
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: 'auto',
    // backgroundColor:
    // right: 'auto',
    // bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      seachResults: [],
      text: '',
      optionData: ['Art Silk banarasi saree', 'saree Art Silk heavy  saree',
        'TANGAIL SAREE', 'saree TANGAIL SAREE HALF ACHAL', 'saree CHAMARAJ PURE SILK SAREES -WEDDING SILK SAREES', 'saree Raw Silk X Eri Spun Silk Saree Saree', 'saree Tussar Ghiccha Silk Saree with Madhubani Hand Painting', 'saree Tussar Ghiccha Silk Saree with Madhubani Hand Painting', 'saree KATA BUTI STAR CHOSMA TANT SAREE', 'saree Chamka Saree (Artsilk) saree'],
      showModal: false, setIsOpen: false
    }
  }

  // openModal = () => {
  //   // setIsOpen(true);
  //   this.setState({
  //     subtitle: '',
  //     showModal: true, setIsOpen: true
  //   })
  // };

  closeModal = () => {
    // setIsOpen(false);
    this.setState({ showModal: false, setIsOpen: false })

  };
  toggleModal = () => {
    console.log("Demo===")
    this.setState({
      showModal: !this.state.showModal
    });
  };
  onTextChange = (e) => {
    const value = e.target.value.toLowerCase();
    let seachResults = [];
    if (value.length > 0) {
      seachResults = this.state.optionData.sort().filter(v => v.toLowerCase().includes(value))
    }

    this.setState(() => ({
      seachResults,
      text: value
    }))
  };
  renderSearchOptions = () => {
    let { seachResults } = this.state;
    if (seachResults.length === 0) {
      return null;
    }
    return (
      seachResults.map((item, index) => (

        <div className="col-6 serach-result-col" key={index}>
          <a href="#">
            <div className="result-product-wrapper">
              <span><img src='https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2020/12/011-300x300.jpg' alt="product" /></span>
              <span>
                {item}
                <Link className="nav-link" to={'/product-detail'}>
                  <button type="submit" className="cart-btn">Add to cart</button>
                </Link>
              </span>

            </div>
          </a>
        </div>
      )
      ));
  };

  render() {
    const { text, seachResults, showModal } = this.state;
    return (
      <>

        <Modal
          isOpen={showModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="SIGN IN"
        ><Login onClick={this.toggleModal} /> </Modal>
        <div className="header-top py-1  ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-6">
                <div className="s-icons">
                  <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                  <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                  <a href="#"><FontAwesomeIcon icon={faPinterestP} /></a>
                  <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
                  <a href="#"><FontAwesomeIcon icon={faTelegram} /></a>
                </div>
              </div>
              <div className="col-md-6 col-6">
                <div className="acess-container float-right">
                  <div id="acess-icons" className="access_icons">
                    <div className="acess-icon balloon" title="large font size">
                      <img src={require('../public/increase-font-size.svg')} alt="" />
                    </div>
                    <div className="acess-icon balloon" title="small font size">
                      <img src={require('../public/decrease-font-size.svg')} alt="decrease font" />
                    </div>
                    <div className="acess-icon balloon">
                      <FontAwesomeIcon icon={faAdjust} />
                    </div>
                    <div className="acess-icon balloon">
                      <i className="fa fa-undo" aria-hidden="true" title="reset" />
                    </div>
                  </div>
                  <a className="skipcontent" href="#maincontent">Skip to Content</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <a className="skipcontent" >Skip to Content</a> */}
        < div className="header-middle d-flex justify-content-between align-items-center px-3" >
          <Link to={'/'}>
            <img className="image-middle" src={require('../public/logo-eshilp.svg')} alt="logoeship" />
          </Link>
          <div className="search-container mx-5 w-100 position-relative">
            <div className="form-inline my-2 my-lg-0">
              <div className="search-bar w-100 d-flex justify-content-start">
                <input onChange={this.onTextChange} value={text} placeholder="Search" />
                <div className="search-btn">
                  <button className="btn my-2 my-sm-0" type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </div>
            <div className="search-result-wrapper">
              <div className="row">
                {this.renderSearchOptions()}
              </div>
            </div>
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item" onClick={this.toggleModal} >Login/Register</li>
            {/* <li className="nav-item"><a href="#loginModal" className="nav-link" data-toggle="modal">
                            <Link to={'/login'}>Login/Register</Link></a></li> */}
            <li className="nav-item"><a href="#" className="nav-link">
              <FontAwesomeIcon icon={faHeart} /><span>0</span></a></li>
            <li className="nav-item"><a href="#" className="nav-link">
              <FontAwesomeIcon icon={faRandom} /><span>0</span></a></li>
            <li className="nav-item"><a href="#" className="nav-link">
              <FontAwesomeIcon icon={faShoppingBasket} /><span>0</span></a></li>
          </ul>
        </div >
        <Navbar />
      </>
    );
  }
}