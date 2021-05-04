import React from 'react';
export default class Compare extends React.Component {

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
      <div className='container-fluid'>
        <div className='row'>

          <h4 className='text-center'>Compare</h4>
        </div>
      </div >
    );
  }
}