import React from 'react';

export default class CheckoutCallback extends React.Component {

  constructor(props) {
    super(props);

    console.log("demo constructor", props);
  }
  componentDidMount() {
    console.log("demo componentDidMount", this.props);
  }

  render() {
    return (
      <div className="empty-wishlist">
        <h2>Thank you for shopping with us.</h2>
      </div>
    );
  }
}