import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import GetInTouch from '../services/GetInTouch';
import ToastService from '../services/ToastService';


export default class CustomerService extends React.Component {

  constructor(props) {
    super(props);
    this.error = false;
    this.handleChange = this.handleChange.bind(this);
    this.requiredBinded = this.required.bind(this);

    this.state = {
      currentPath: this.props.location.pathname, contactUsSubmitted: '',
      fields: {
        first_name: '', last_name: '', email: '', msg: '',
        type: this.props.location.pathname === "/customer-service" ? 1 : 0
      }
    }
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.history.location.pathname !== prevProps.location.pathname) {
      this.setState({
        currentPath: this.props.location.pathname,
        contactUsSubmitted: '',
        fields: {
          first_name: '', last_name: '', email: '', msg: '',
          type: this.props.location.pathname === "/customer-service" ? 1 : 0
        }
      });
    }
  }

  required = (value, props) => {

    if (props.isUsed) {
      if (!value) {
        this.error = true;
        return (
          <div className="isaerror" role="alert">
            Please enter your {props.name}
          </div>
        );
      } else { this.error = false; }
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  handleGetInTouch(e) {
    e.preventDefault();
    if (this.form.getChildContext()._errors.length === 0) {
      if (!this.error) {
        GetInTouch.getinTouch(this.state.fields)
          .then((result) => {
            if (!result) return ToastService.error("Please fill form details")
            if (result.success) {
              console.log("Demo===", result)
              this.setState({ contactUsSubmitted: result.message })
              // window.history.back()
            }
          }).catch((err) => {
            console.log(err);
          });
      }
    }
  }

  render() {
    const { fields, currentPath, contactUsSubmitted } = this.state;
    return (
      <section id="maincontent">
        <div className="subpages-heading">
          <div className="container">
            <h1 className="text-center p-5">{currentPath === "/customer-service" ? 'Customer Services' : 'Contact Us'}</h1>

          </div>
        
        </div>
        <div className="container">
        <div className="row">
          
          <div className="col-sm-4">
            <div className="contact-items">
              <span className="contact-icon"><FontAwesomeIcon icon={faPhoneAlt}/></span>
              <span className="contact-info">
                <h2>Call Us</h2>
                <p>011-24303500</p>
                </span>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="contact-items">
              <span className="contact-icon"><FontAwesomeIcon icon={faEnvelope}/></span>
              <span className="contact-info"><h2>Email Us</h2><p>Support@eshilpmart.gov.in</p></span>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="contact-items">
              <span className="contact-icon"><FontAwesomeIcon icon={faBullhorn}/></span>
              <span className="contact-info">
                <h2>Opening Hours</h2>
              <p className="text-center">Monday to Sunday 9:00 am - 6:00 pm</p></span>
            </div>
          </div>
        </div>        
        </div>
        

<section className="contactBg">
        <div className="container">
          <div className="row">
          <div className="col-sm-7 p-5">
            <h1 className="h1 pt-5 px-5 pb-2 text-light">Get in touch is easy!</h1>
            <p className="px-5 text-light h5 " style={{lineHeight:"1.7"}}>Electronics Niketan Annexe,<br/>
6 CGO Complex Lodhi Road,<br/> New Delhi-110003<br/>
Contact No. : +91-11-24360199 / 24301756
</p>
          </div>
          <div className="col-sm-5">
            <div className="card shadow">
              <div className="card-body">
              <Form className="p-3" ref={(c) => { this.form = c; }} onSubmit={(e) => this.handleGetInTouch(e)} >

<div className="form-row">
  <div className="form-group col-md-6">
    <label htmlFor="fname">First Name <span>*</span></label>
    <Input type="text" className="form-control" id="fname" placeholder="" name="first name" value={fields.first_name} validations={[this.required]} onChange={this.handleChange.bind(this, "first_name")} />
  </div>
  <div className="form-group col-md-6">
    <label htmlFor="lName">Last Name <span>*</span></label>
    <Input type="text" className="form-control" id="lName" placeholder="" name="last name" value={fields.last_name} validations={[this.required]} onChange={this.handleChange.bind(this, "last_name")} />
  </div>
</div>


<div className="form-group">
  <label htmlFor="email">Email <span>*</span></label>
  <input type="email" className="form-control" id="email" placeholder="" value={fields.email} validations={[this.required]} onChange={this.handleChange.bind(this, "email")} />
</div>
<div className="form-group">
  <label htmlFor="inputAddress2">Comment or Message </label>
  <Textarea className="form-control" name="" rows="4" cols="50" name="Comment" value={fields.msg} validations={[this.required]} onChange={this.handleChange.bind(this, "msg")} />
</div>



<button value="Submit" className="btn btn-theme">Submit Query</button>
</Form>
              </div>
            </div>

          </div>
          </div>
        </div>
        </section>
      </section>
    );
  }
}