import React from 'react';
export default class Settings extends React.Component {

  constructor() {
    super();
    this.state = {
      productsToCompare: []
    };
  }

  render() {
    // const { productsToCompare } = this.state
    return (
      <div className="row py-5">
        <h1>demo Settings</h1>
      </div>
    );
  }
}