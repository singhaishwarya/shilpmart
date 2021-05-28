import React from 'react';
export default class Orders extends React.Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div class="table-responsive">
      <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Order ID</th>
      <th scope="col">Date</th>
      <th scope="col">Order Status</th>
      <th scope="col">Total</th>
      
      <th className="text-right">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>#3535</td>
      <td>25 May 2021</td>
      <td className="text-success">Complete</td>      
      <td>2530</td>
      <td className="text-right act-btn">
        <button type="button" class="btn btn-success btn-sm">View</button>
        <button type="button" class="btn btn-danger btn-sm">Cancel</button>
        <button type="button" class="btn btn-warning btn-sm">Support</button>
      </td>      
    </tr>

    <tr>
      <td>#3536</td>
      <td>28 May 2021</td>
      <td className="text-warning">Process</td>      
      <td>2530</td>
      <td className="text-right act-btn">
      <button type="button" class="btn btn-success btn-sm">View</button>
        <button type="button" class="btn btn-danger btn-sm">Cancel</button>
        <button type="button" class="btn btn-warning btn-sm">Support</button>
      </td>      
    </tr>

    <tr>
      <td>#3536</td>
      <td>23 May 2021</td>
      <td className="text-danger">Cancel</td>      
      <td>2530</td>
      <td className="text-right act-btn">
      <button type="button" class="btn btn-success btn-sm">View</button>
        <button type="button" class="btn btn-danger btn-sm">Cancel</button>
        <button type="button" class="btn btn-warning btn-sm">Support</button>
      </td>      
    </tr>

    
    
  </tbody>
</table>
      </div>
    );
  }
}