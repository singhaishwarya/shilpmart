import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as wishlistAction from '../actions/wishlist';

class Wishlist extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: ''
    }
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let wishlist = {
      name: this.state.name
    }
    this.setState({
      name: ''
    });
    this.props.addWishlist(wishlist);
  }

  listView(data, index) {
    return (
      <div className="row">
        <div className="col-md-10">
          <li key={index} className="list-group-item clearfix">
            {data.name}
          </li>
        </div>
        <div className="col-md-2">
          <button onClick={(e) => this.deleteWishlist(e, index)} className="btn btn-danger">
            Remove
          </button>
        </div>
      </div>
    )
  }

  deleteWishlist(e, index) {
    e.preventDefault();
    this.props.deleteWishlist(index);
  }

  render() {

    return (
      <div className="container">
        <h1>Clientside Wishlists Application</h1>
        <hr />
        <div>
          <h3>Add Wishlist Form</h3>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} className="form-control" value={this.state.name} /><br />
            <input type="submit" className="btn btn-success" value="ADD" />
          </form>
          <hr />
          {<ul className="list-group">
            {this.props.wishlist?.map((wishlist, i) => this.listView(wishlist, i))}
          </ul>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    wishlist: state.wishlist
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addWishlist: wishlist => dispatch(wishlistAction.addWishlist(wishlist)),
    deleteWishlist: index => dispatch(wishlistAction.deleteWishlist(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
