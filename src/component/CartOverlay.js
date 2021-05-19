import React from "react";
import { Link } from "react-router-dom";
import Auth from '../Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons'
export default class CartOverlay extends React.Component {


  render() {
    return (
      <><div className="login-card">
        <h4 className="modal-title">Shopping Cart</h4>
        <div  >
          <div className="product-wrapper">
            <div className=""
            // onClick={() => this.handlePostDetail(item.id)}
            >
              <a href="#">
                <img src={require('../public/No_Image_Available.jpeg')} className="img-fluid"
                /></a>
            </div>
            <h5 className="product-title">
              Handcrafted Cotton Carpets</h5>
            <span className="product-price">
              <FontAwesomeIcon icon={faRupeeSign} />
              999</span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="sr-only">Subtotal</label>
        </div>
        <div className="addtocart d-flex justify-content-start" >
          <Link to={'/cart'} ><button className="cart-btn" onClick={() => this.props.dismissModal('login')
          }>View Cart</button></Link>
        </div>
        <div className="addtocart d-flex justify-content-start" >
          <button className="cart-btn" >Checkout</button>
        </div>
      </div>
      </>
    )
  };
}