import React from "react";
export default class Cart extends React.Component {

  constructor() {
    super();
    this.state = {
      galleryItems: [],
    };
  }

  componentDidMount() {


  }

  render() {
    return (
      <div className="row">
        <span>NO PRODUCTS IN THE CART.</span>
      </div>
    );
  }
}