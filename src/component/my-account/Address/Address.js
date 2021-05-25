import React from 'react';
import { Link } from "react-router-dom";
import AddressService from '../../../services/AddressService';
export default class Address extends React.Component {

  constructor() {
    super();
    this.state = {
      addressList: []
    };
  }

  componentDidMount() {
    this.getAddress();
  }
  getAddress = () => {
    AddressService.list().then((result) => {
      if (!result) return
      this.setState({ addressList: result.data })
    }).catch((err) => {
      console.log(err);
    });
  }
  setDefaultOrDeleteAddress = (id, type) => {

    AddressService.delete({ address_id: id, action: type }).then((result) => {

      if (!result) return
      this.getAddress();
    }).catch((err) => {
      console.log(err);
    });

  }
  render() {
    const { addressList } = this.state;

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
            {addressList?.map((item) => (
              <address>{item.name}
                <strong >{item.is_default === 1 ? ' Default' : ''}</strong>
                <br />{item.address1} <br />{item.address2} <br /> {item.sub_district}
                <br /> {item.district},  {item.state} - {item.pincode}<br />
                <strong>Mobile No.</strong>: {item.mobile}<br />
                <strong>Email</strong> : {item?.email} <br /><br />
                <p className="d-flex justify-content-between">
                  {item.is_default !== 1 && <><span onClick={() => {
                    this.setDefaultOrDeleteAddress(item.id, 'def')
                  }}>Set As Default</span><span>|</span></>}
                  <span>Edit</span>
                  <span>|</span><span onClick={() => {
                    this.setDefaultOrDeleteAddress(item.id, 'del')
                  }}>Remove</span>
                </p>
              </address>
            ))}
          </div>
        </div>


      </>
    );
  }
}