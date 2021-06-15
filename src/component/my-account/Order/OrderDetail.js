import React from 'react';
export default class OrderDetail extends React.Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-7">
                  <div className="deladd">
                    <h5>Delivery Address</h5>
                    <h6>Persone Name</h6>
                    <p>Plot No 7, M G Road, Opp Saibaba Temple, Borivli(e)<br/> Mumbai,  Maharashtra - 46000545                   
                    </p>
                    <p><strong>Phone Number :</strong> +919811148709</p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}