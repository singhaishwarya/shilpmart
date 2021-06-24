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
      <div className="container">
        <p> The following addresses will be used on the checkout page by default.</p>
        <div className="flexi">
          <div className="coloumn-2">
            <div className="ad-address-wrapper">
              <Link to='/my-account/add-address' > Add Address</Link>
            </div>
          </div>
          <div className="coloumn-2">
            <h4> Shipping Address</h4>
            {addressList?.map((item, index) => (
              <address key={index}><strong>{item.name}</strong>
                <strong >{item.is_default === 1 ? ' Default' : ''}</strong>
                <br />{item.address1} <br />{item.address2} <br /> {item.sub_district}
                <br /> {item.district},  {item.state} - {item.pincode}<br />
                <strong>Mobile No.</strong>: {item.mobile}<br />
                <strong>Email</strong> : {item?.email} <br /><br />
                <p className="d-flex addAction">
                  {item.is_default !== 1 && <><span onClick={() => {
                    this.setDefaultOrDeleteAddress(item.id, 'def')
                  }}>Set As Default</span><span>|</span></>}
                  <Link to={
                    {
                      pathname: '/my-account/edit-address',
                      state: { address: item }
                    }
                  } ><span>Edit</span></Link>
                  <span>|</span><span onClick={() => {
                    this.setDefaultOrDeleteAddress(item.id, 'del')
                  }}>Remove</span>
                </p>
              </address>
            ))}
          </div>
        </div>


      </div>
    );
  }
}