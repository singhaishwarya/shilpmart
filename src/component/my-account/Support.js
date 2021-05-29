import React from 'react';
export default class Support extends React.Component {

  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <th scope="col">Status</th>
            <th scope="col">Ticket(s)</th>
            <th scope="col">Category</th>
            <th scope="col">Priority</th>
            <th scope="col">Actions</th>
          </thead>
          <tbody>
            {/* <tr>
              <td scope="row">1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr> */}
            <tr>
              <td><p>You do not have any support ticket yet! </p></td>
              <td></td>

            </tr>


          </tbody>
        </table>

      </div>
    );
  }
}