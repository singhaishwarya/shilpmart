import React from 'react';
export default class CorporateEnquiries extends React.Component {

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
          <h1 className="text-center p-5">Corporate Enquiries</h1>

        </div>
      </div>
      <div className="container">
        <div className="row">
        <div className="col-sm-6 offset-sm-3 p-5">
              <h3 className="mb-5">Drop Us A Line</h3>
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" className="form-control" id="fname" placeholder="" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lName">Last Name</label>
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