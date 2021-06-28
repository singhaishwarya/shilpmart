import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare, faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons'
export default class CustomerService extends React.Component {

  constructor() {
    super();
    this.state = {
    };
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <section id="maincontent">
        <div className="subpages-heading">
          <div className="container">
            <h1 className="text-center p-5">Customer Services</h1>

          </div>
        </div>
        <div className="container">
          <div className="row py-5">
            <div className="col-sm-5">
              <h3>Here to Help</h3>
              <p>Have a question? You may find an answer in our FAQs. But you can also contact us:</p>
              <h5> <FontAwesomeIcon icon={faPhoneSquareAlt} />  011-24303500</h5>
              <ul class="list-unstyled">
                <li>Opening Hours:</li>
                <li>Monday to Friday 9:00 am - 6:00 pm</li>
                <li>Saturday 9:00 am - 4:00 pm</li>
                <li>Sunday: 9 pm - 2:00 pm</li>
              </ul>
              <h5><FontAwesomeIcon icon={faEnvelopeSquare} /> Support@eshilpmart.gov.in</h5>

              {/* <div className="googleMap">
          Add map
        </div> */}

            </div>

            <div className="col-sm-7">
              
              <form className="login-card p-5">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="fname">First Name <span>*</span></label>
                    <input type="text" className="form-control" id="fname" placeholder="" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lName">Last Name <span>*</span></label>
                    <input type="text" className="form-control" id="lName" placeholder="" />
                  </div>
                </div>


                <div className="form-group">
                  <label htmlFor="email">Email <span>*</span></label>
                  <input type="email" className="form-control" id="email" placeholder="" />
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress2">Comment or Message </label>
                  <textarea className="form-control" name="" rows="4" cols="50">

                  </textarea>
                </div>


                <button type="submit" className="btn btn-theme">Submit Query</button>
              </form>

            </div>

            <div className="col-sm-12">
              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.442528014726!2d77.23733871455852!3d28.586498292914836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2fdedaabe87%3A0xadd98301faac65ce!2sElectronics%20Niketan%2C%20CGO%20Complex%2C%206%20Lodhi%20Road%2C%20Lodhi%20Rd%2C%20CGO%20Complex%2C%20Pragati%20Vihar%2C%20New%20Delhi%2C%20Delhi%20110003!5e0!3m2!1sen!2sin!4v1624280230099!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowFullScreen="" loading="lazy"></iframe> */}
            </div>

          </div>
        </div>
      </section>
    );
  }
}