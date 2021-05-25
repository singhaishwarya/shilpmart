import React from "react";
// import AuthService from '../services/AuthService';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import validator from 'validator';
import MasterService from '../../../services/MasterService';
import AddressService from '../../../services/AddressService';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const mobile = (value) => {
  // var pattern = new RegExp(/(\+*)((0[ -]+)*|(91 )*)(\d{12}+|\d{10}+))|\d{5}([- ]*)\d{6}/);
  if (value.length !== 10) {
    return <div className="alert alert-danger" role="alert">
      Length of mobile number should be numeric and contain 10 digit.
      </div>
  }
}

const pincode = (value) => {

  if (!validator.isInt(value, 6, 6)) { }
}

export default class AddAddress extends React.Component {

  constructor(props) {
    super(props);

    this.handleAddAddress = this.handleAddAddress.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      fields: {
        name: '',
        mobile: '',
        city: '',
        landmark: '',
        pincode: '',
        address1: '',
        address2: '',
        district: '',
        country: 1,
        state: '',
        sub_district: '',
        type: ''
      },
      statesOptions: [],
      statesOptions: [],
      districtOptions: [],
      subDistrictOptions: []
    }
  }
  componentDidMount() {
    this.getStates();
  }

  getStates = () => {

    MasterService.getStates().then((result) => {
      this.setState({ statesOptions: result.data })
    })
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
    if (field === 'state') {
      this.getDistrict(e.target.value)
      this.setState({ sub_district: '', district: '' });
    }
    if (field === 'district') {
      this.getSubDistrict(this.state.fields.state, e.target.value)
      this.setState({ sub_district: '' });
    }
  }

  getDistrict = (stateCode) => {
    MasterService.getDistrict({ state_id: stateCode }).then((result) => {
      this.setState({ districtOptions: result.data })
    })
  }
  getSubDistrict = (stateCode, districtCode) => {
    MasterService.getSubDistrict({ state_id: stateCode, district_id: districtCode }).then((result) => {
      this.setState({ subDistrictOptions: result.data })
    })
  }
  handleAddAddress(e) {
    e.preventDefault();
    AddressService.add(this.state.fields)
      .then((result) => {

        if (!result) return

        if (result.success) {
          this.props.history.push({
            pathname: '/my-account/address'
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { fields, statesOptions, districtOptions, subDistrictOptions } = this.state
    return (

      <div className="container-fluid">
        <div className="row py-5">

          <div className="col-md-6 ">
            <h4 className="mb-4">Add New Address</h4>
            <Form
              onSubmit={this.handleAddAddress}
              ref={(c) => { this.form = c; }}
            >
              <div className="row">
                <div className="form-group">
                  <label htmlFor="fname">First Name<span>*</span></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={fields.name}
                    onChange={this.handleChange.bind(this, "name")}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fname">Mobile<span>*</span></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="mobile"
                    value={fields.mobile}
                    onChange={this.handleChange.bind(this, "mobile")}
                    validations={[required, mobile]}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group"><label htmlFor="fname">Pin Code<span>*</span></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="pincode"
                    value={fields.pincode}
                    onChange={this.handleChange.bind(this, "pincode")}
                    validations={[required, pincode]}
                  />
                </div>
                <div className="form-group"><label htmlFor="fname">Flat, House no., Building, Company, Apartment<span>*</span></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address1"
                    value={fields.address1}
                    onChange={this.handleChange.bind(this, "address1")}
                    validations={[required]}
                  /></div>
              </div>
              <div className="row">
                <div className="form-group"><label htmlFor="fname">Area, Colony, Street, Sector, Village<span>*</span></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address2"
                    value={fields.address2}
                    onChange={this.handleChange.bind(this, "address2")}
                    validations={[required]}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="fname">Landmark</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="landmark"
                      value={fields.landmark}
                      onChange={this.handleChange.bind(this, "landmark")}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="fname">Town/City<span>*</span></label>
                    <Input
                      type="text"
                      className="form-control"
                      name="city"
                      value={fields.city}
                      onChange={this.handleChange.bind(this, "city")}
                      validations={[required]}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="fname">State<span>*</span></label>
                    <Select name='state' value={fields.state}
                      onChange={this.handleChange.bind(this, "state")}
                      validations={[required]}
                      option={statesOptions}
                    >{statesOptions.length > 0
                      && statesOptions.map((item, i) => {
                        return (
                          <option key={i} value={item.state_id}>{item.state_name}</option>
                        )
                      })}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="fname">District<span>*</span></label>
                    <Select name='district' value={fields.district}
                      onChange={this.handleChange.bind(this, "district")}
                      validations={[required]}
                    >{districtOptions.length > 0
                      && districtOptions.map((item, i) => {
                        return (
                          <option key={i} value={item.district_id}>{item.district_name}</option>
                        )
                      })}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="fname">Sub-District<span>*</span></label>
                    <Select name='sub_district' value={fields.sub_district}
                      onChange={this.handleChange.bind(this, "sub_district")}
                      validations={[required]}
                    >{subDistrictOptions.length > 0
                      && subDistrictOptions.map((item, i) => {
                        return (
                          <option key={i} value={item.sub_district_id}>{item.sub_district_name}</option>
                        )
                      })}
                    </Select>
                  </div>
                </div>
              </div><div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="fname">Type<span>*</span></label>
                    <Select name='type' value={fields.type}
                      onChange={this.handleChange.bind(this, "type")}
                      validations={[required]}>
                      <option value='' defaultValue='selected'>Select Type</option>
                      <option value='1'>Home</option>
                      <option value='2'>Office</option>
                    </Select>
                  </div>
                </div>
              </div>

              <fieldset>
                <button className="btn login-btn" value="Submit"  >Add Address</button>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>

    )
  };
}