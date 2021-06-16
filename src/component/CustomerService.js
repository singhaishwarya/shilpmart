import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare, faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons'
export default class CustomerService extends React.Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <section id="maincontent">
        <div className="container-fluid">
          <div className="row py-5">
            <div className="col-sm-6 p-5">
              <h3>Customer Support</h3>
              <p><FontAwesomeIcon icon={faPhoneSquareAlt} /> 011-24303500</p>
              <p><FontAwesomeIcon icon={faEnvelopeSquare} /> support[at]eshilpmart[dot]gov[dot]in</p>
            </div>

            <div className="col-sm-6 p-5">
              <h3 className="mb-5">Get in Touch</h3>
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" className="form-control" id="fname" placeholder="" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lName">First Name</label>
                    <input type="text" className="form-control" id="lName" placeholder="" />
                  </div>
                </div>


                <div className="form-group">
                  <label htmlFor="email">Email</label>
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
          </div>
        </div>
      </section>
    );
  }
}