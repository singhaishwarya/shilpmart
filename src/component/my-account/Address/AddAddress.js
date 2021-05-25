import React from "react";
// import AuthService from '../services/AuthService';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import validator from 'validator';

const required = (value) => {
  if (!value) {
    return (
      // alert("This field is required!")
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
        full_name: '',
        mobile: '',
        city: '',
        landmark: '',
        pincode: '',
        houseNo: '',
        colony: '',
        country: '',
        district: '',
        state: ''
      }
    }
  }

  handleAddAddress(e) {
    e.preventDefault();
    // AuthService.register(this.state.fields)
    //   .then((result) => {

    //     if (!result) return

    //     if (result.success) {
    //       this.props.history.push({
    //         pathname: '/'
    //       });
    //     }
    //     else {
    //       alert(Object.values(result.data)[0])
    //     }
    //   })
    //   .catch(() => {
    //   });
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    const { fields } = this.state
    return (

      <div className="container-fluid">
        <div className="row py-5">

          <div className="col-md-6 ">
            <h4 className="mb-4">Add New Address</h4>
            <Form
              onSubmit={this.handleAddAddress}
              ref={(c) => { this.form = c; }}
            > <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="form-group"><label htmlFor="fname">Country<span>*</span></label>
                    <Select name='country' value={fields.country}
                      onChange={this.handleChange.bind(this, "country")}
                      validations={[required]}
                    >
                      <option value=''>Choose your city</option>
                      <option value='1'>London</option>
                      <option value='2'>Kyiv</option>
                      <option value='3'>New York</option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label htmlFor="fname">First Name<span>*</span></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="full_name"
                    value={fields.full_name}
                    onChange={this.handleChange.bind(this, "full_name")}
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
                  {/* <input type="text" className="form-control" value={fields.full_name || ''} onChange={this.handleChange.bind(this, "full_name")} /> */}
                </div>
                <div className="form-group"><label htmlFor="fname">Flat, House no., Building, Company, Apartment<span>*</span></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="houseNo"
                    value={fields.houseNo}
                    onChange={this.handleChange.bind(this, "houseNo")}
                    validations={[required]}
                  /></div>
              </div>
              <div className="row">
                <div className="form-group"><label htmlFor="fname">Area, Colony, Street, Sector, Village<span>*</span></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="colony"
                    value={fields.colony}
                    onChange={this.handleChange.bind(this, "colony")}
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
                    >
                      <option value=''>Choose your city</option>
                      <option value='1'>London</option>
                      <option value='2'>Kyiv</option>
                      <option value='3'>New York</option>
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
                    >
                      <option value=''>Choose your city</option>
                      <option value='1'>London</option>
                      <option value='2'>Kyiv</option>
                      <option value='3'>New York</option>
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