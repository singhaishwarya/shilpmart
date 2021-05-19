import React from 'react';
export default class Inquiry extends React.Component {

  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <>      
        <table class="table table-striped">
          <thead>
            <th scope="col">Query</th>
            <th scope="col">Product</th>
            <th scope="col">Store</th>
            <th scope="col">Additional Info</th>
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
              <td><p>You do not have any enquiry yet! </p></td>
              <td></td>
              
            </tr>
            
           
         </tbody>
        </table>
     
      </>
    );
  }
}