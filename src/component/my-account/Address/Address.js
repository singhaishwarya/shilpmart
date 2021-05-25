import React from 'react';
import { Link } from "react-router-dom";
import AddressService from '../../../services/AddressService';
export default class Address extends React.Component {

  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    this.getAddress();
  }
  getAddress = () => {
    AddressService.list().then((result) => {

      if (!result) return

      // if (result.success) {
      //   this.props.history.push({
      //     pathname: '/'
      //   });
      // }
      // else {
      //   alert(Object.values(result.data)[0])
      // }
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {

    return (
      <>
        <p> The following addresses will be used on the checkout page by default.</p>
        <div className="flexi">
          <div className="coloumn-2">
            <div className="ad-address-wrapper">
              <Link to={'/my-account/add-address'} > Add Address</Link>
            </div>
          </div>
          <div className="coloumn-2">
            <h2> Shipping Address</h2>
            <address>B 17, Nandkishore Indl.estate, <br/>Mahakali Caves Road, Chakala, <br/> Andheri(e)
            <br/> Mumbai,  Maharashtra - 400093<br/>
            <strong>Mobile No.</strong>: 9811148709<br/>
            <strong>Email</strong> : ref@gmail.com <br/><br/>
            <p className="d-flex justify-content-between">
            <span>Edit</span><span>|</span><span>Remove</span>
            </p>
            
            </address>

          </div>
          {/* <div className="coloumn-2">
        <h2>Shipping Address <small><a href="#"> Edit</a></small></h2>
        <address>Shipping Address comes here...</address>
        </div> */}
        </div>


      </>
    );
  }
}