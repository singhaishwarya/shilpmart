import React from 'react';
import ReviewService from '../../services/ReviewService';
import { format } from 'date-fns';
export default class MyReviews extends React.Component {

  constructor() {
    super();
    this.state = {
      reviews: []
    };
  }

  componentDidMount() {
    this.getReviews()
  }
  getReviews = () => {
    try {
      ReviewService.getReviews().then((result) => {
        this.setState({ reviews: result.data })
      });
    }
    catch (err) {
      console.log(err);
    }
  }
  render() {
    const { reviews } = this.state;
    return (
      <div className="container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Sr.No.</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">rating</th>
                <th scope="col">date</th>
              </tr>
            </thead>
            <tbody>
              {reviews?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.product_review_title}</td>
                  <td>{item.product_review_description}</td>
                  <td>{item.product_rating}</td>
                  <td>  {format(new Date(item.created_at), 'dd-MM-yyyy')}</td>
                </tr>
              ))}



            </tbody>
          </table>

        </div>
      </div>
    );
  }
}