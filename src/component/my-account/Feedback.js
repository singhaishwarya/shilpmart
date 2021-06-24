import React from 'react';
export default class Feedback extends React.Component {

  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Status</th>
                <th scope="col">Ticket(s)</th>
                <th scope="col">Category</th>
                <th scope="col">Priority</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><p>You do not have any support ticket yet! </p></td>
                <td></td>

              </tr>


            </tbody>
          </table>

        </div>
      </div>
    );
  }
}