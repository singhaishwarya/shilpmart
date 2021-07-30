import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Rating from 'react-rating';
export default class Review extends React.Component {

  constructor() {
    super();
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <section id="maincontent">
       
        <div className="container-fluid">
          <div className="row py-3">
            <div className="col-12 mb-4">
              <div className="card card-body shadow">
                <div className="d-flex justify-content-between">
                <div><h5>Ratings & Reviews</h5></div>
                <div className="review_product d-flex">
                  <div className="text-right d-flex flex-column">
                    <span>Handloom Cotton Saree</span>
                    <div className="allreview"><span>4.7★</span><small>(2,525)</small></div>
                  </div>
                  <div className="reviewpro_img">
                  <img src={require('../public/saree-2-300x300.jpeg')} className="img-fluid" alt="Saree" />  
                  </div>                  
                </div>
                </div>
              </div>
            </div>
            
              <div className="col-sm-3">
              <div className="card shadow">
                <div className="card-header" style={{backgroundColor:'#fff'}}>
                <h5>What makes a good review</h5>
                </div>
                <div className="card-body">
                  <div className="reviewFaqs">
                    <h6>Have you used this product?</h6>
                    <p>Your review should be about your experience with the product.</p>
                  </div>

                  <div className="reviewFaqs">
                    <h6>Why review a product?</h6>
                    <p>Your valuable feedback will help fellow shoppers decide!</p>
                  </div>

                  <div className="reviewFaqs">
                    <h6>How to review a product?</h6>
                    <p>Your review should include facts. An honest opinion is always appreciated. If you have an issue with the product or service please contact us from the help centre.</p>
                  </div>

                </div>
                </div>
              </div>

              <div className="col-sm-9">
              <div className="card shadow">
                <div className="card-header" style={{backgroundColor:'#fff'}}><h6>Rate This Product</h6>
                <Rating className="reviewStar" emptySymbol="fa fa-star-o" fullSymbol="fa fa-star"/>
                <span className="ml-1 text-success">Very Good</span>
                </div>
                <div className="card-body">
                <h5>Review This Product</h5>
                  <form className="login-card">
                <div className="form-group">
                <label for="description">Description</label>
                <textarea className="form-control" id="description" rows="7"></textarea>
                </div>
                
                <div className="form-group">
                <label for="description">Title (optional)</label>
                <input type="text" className="form-control" placeholder="Review Title..."/>
                </div>

                <div className="form-group">
                  <div className="photoUpload">
                    <input type="file" multiple id="uploadpic" className="form-control"/>
                    <label htmlFor="uploadpic" className="photoBg"><FontAwesomeIcon icon={faCamera}/></label>
                  </div>
                  
                </div>
                <button type="submit" class="btn btn-theme">Submit Review</button>
                
  
  
                  </form>
                </div>

              <div className="cart-empty py-5">
            <h2>Haven't purchased this product?</h2>
      <span>Sorry! You are not allowed to review this product since you haven't bought it on eshilpmart.</span>
            
          </div>

                </div>
                
              
              </div>

          </div>
        </div>
      </section>
    );
  }
}