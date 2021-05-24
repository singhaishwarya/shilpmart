import React from "react";
export default class Cart extends React.Component {

  constructor() {
    super();
    this.state = {
      galleryItems: [],
    };
  }

  componentDidMount() {


  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row py-5">
          <form className="col-lg-8 col-sm-6 col-12">
            <div className="cart-table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">PRODUCT</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">QUANTITY</th>
                    <th scope="col">SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="product-remove"><a href=""></a></td>
                    <td className="product-thumbnail"><a href="#"><img src="images/top-300x300.jpeg" alt="img" className="img-fluid" /></a></td>
                    <td className="product-name"><a href="#">tussar silk printed saree</a>
                      <p>Store : <span><a href="#">Sumit Handloom</a></span></p></td>
                    <td className="product-subtotal"><span>2,899.00</span></td>
                    <td className="product-quantity" data-title="Quantity"><div className="product-qty">
                      <div className="input-group">
                        <input type="button" value="-" className="quantity-left-minus" />
                        <input type="number" id="quantity" value="1" min="1" max="100" />
                        <input type="button" value="+" className="quantity-right-plus" />
                      </div>
                    </div>
                    </td>
                    <td className="product-price"><span><span>₹</span> 2,899.00</span></td>
                  </tr>
                </tbody>
              </table>
              <div className="row">
                <div className="col">
                  <div className="cart-coupon-wrapper mb-3">
                    <label className="d-none">Coupon</label>
                    <input type="text" name="" value="" placeholder="Coupon Code..." />
                    <button>Apply Coupon</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="col-lg-4 col-sm-6 col-12">
            <div className="cart-shop-footer position-relative border">
              <h4>CART TOTALS</h4>
              <div className="cart-footer-head py-3">
                <h6>Subtotal :</h6>
                <p><span>00.00</span></p>
              </div>
              <div className="cart-footer-head border-top py-3">
                <h6>Shipping :</h6>
                <p><span>00.00</span></p>
              </div>
              <div className="cart-footer-head border-top py-3">
                <h5>Total</h5>
                <p><span>00.00</span></p>
              </div>
              <div className="cart-action cart-action2"> <a href="#"> Proceed to checkout</a> </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}