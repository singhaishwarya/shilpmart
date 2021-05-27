import React from 'react';
export default class Checkout extends React.Component {

  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <>
        <table class="table table-striped">

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

      </>
    );
  }
}