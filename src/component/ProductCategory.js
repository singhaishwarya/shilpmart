import React from 'react';
import ReactStars from 'react-stars'
import { Range } from 'rc-slider';
import ProductGrid from './ProductGrid'
import { MultilevelMenu } from 'react-multilevel-menu';
import ReactPaginate from 'react-paginate';
export default class ProductCategory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product_category: this.props.category,
      offers: [
        { label: 'Buy More, Save More', value: 'grapes' },
        { label: 'Exchange Offer', value: 'mango' },
        { label: 'No Cost EMI', value: 'strawberry', disabled: true },
        { label: 'Special Price', value: 'pear' }
      ],
      selectedOffer: [],
      config: {
        paddingAtStart: true,
        // classname: 'my-custom-class',
        listBackgroundColor: ``,
        fontColor: `rgb(8, 54, 71)`,
        backgroundColor: ``,
        selectedListFontColor: ``,
        highlightOnSelect: true,
        useDividers: false,
      },
      categories: [

        {
          label: 'Travel Accessories',
          items: [
            {
              label: 'Bag',
              onSelected: function () { }
            },
            {
              label: 'Luggage',
              onSelected: function () { }
            }, {
              label: 'Cover',
              onSelected: function () { }
            },
            {
              label: 'Mask',
              onSelected: function () { }
            }
          ]
        }
      ],
      layout: 'col-lg-3 col-sm-6 col-6', //default 4X4
      priceRange: [200, 500]
    };
  }


  onLayoutChange = (value) => {
    this.setState({
      layout: (value === '2X2') ? 'col-lg-6 col-sm-6 col-6' : (value === '3X3')
        ? 'col-lg-4 col-sm-6 col-6' : 'col-lg-3 col-sm-6 col-6'
    });
    // this.receivedData();
  }
  onSliderChange = (value) => {
    console.log(value);
    this.setState({ priceRange: value })
  }
  ratingChanged = (value) => {
    console.log(value);
  }
  setSelected = (value) => {
    this.setState({ selectedOffer: value });
  }
  selectedItem = (event) => {
    console.log(event);
  }

  render() {

    const {
      categories,
      config,
      layout,
      priceRange,
    } = this.state;

    return (
      <>
        <div className='container-fluid'>
          <div className='row py-5'>
            <div className='col-lg-3'>
              <div className='shop-sidebar'>
                <article className='filter-group'>
                  <header className='card-header'>
                    <h6 className='title'>Filter by price </h6>

                  </header>
                  <div className='filter-content'>
                    <div className='price-range-wrapper'>
                      <div id='slider-range' className='price-filter-range' name='rangeInput'>

                        <Range
                          defaultValue={priceRange}
                          min={0}
                          max={2000}
                          className='filter-slider'
                          allowCross={false}
                          onAfterChange={value => { this.onSliderChange(value) }}
                        />

                      </div>
                      <div className='price-range d-flex justify-content-between'>

                        <span>
                          Price:
                          <input type='number' min='0' max='9900' defaultValue={priceRange[0]} value={priceRange[0]} id='min_price' className='price-range-field' /> <span>-</span>
                          <input type='number' min='0' max='10000'
                            defaultValue={priceRange[1]} value={priceRange[1]} id='max_price'
                            className='price-range-field' /></span>
                        <span><button className='price-range-search'
                          id='price-range-submit'>Filter</button></span>
                      </div>
                      <div id='searchResults' className='search-results-block'></div>
                    </div>
                  </div>
                </article>
                <article className='filter-group'>
                  <header className='card-header'>
                    <h6 className='title'>Rating </h6>
                  </header>
                  <div className='filter-content'>
                    <div className='filter-rateings'>
                      <div className='testimonial-ratings justify-content-start'>
                        <ReactStars
                          count={5}
                          onChange={this.ratingChanged}
                          size={24}
                          color2={'#ffd700'} />
                      </div>
                    </div>
                  </div>
                </article>
                <article className='filter-group'>
                  <header className='card-header'>
                    <h6 className='title'>Categories </h6>
                  </header>
                  <div className='filter-content'>
                    <div className='categories-list'>
                      <MultilevelMenu
                        list={categories}
                        configuration={config}
                        selectedListItem={this.selectedItem}
                        selectedLabel={this.selectedItem}
                      />
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div className='col-lg-9'>
              <section className='topsection d-flex justify-content-between'>
                <nav aria-label='breadcrumb'>
                  <ol className='breadcrumb bg-transparent'>
                    <li className='breadcrumb-item'><a href='#'>Home</a></li>
                    <li className='breadcrumb-item active' aria-current='page'>Shop</li>
                  </ol>
                </nav>
                <div className='shop-tools d-flex align-items-center'>
                  <div className='per-pge-view'>
                    <span>Show :</span>
                    <span className='active-view' onClick={() => this.onItemPerPage('12')}>12</span>
                    <span>/</span>
                    <span onClick={() => this.onItemPerPage('24')}>24</span>
                    <span>/</span>
                    <span onClick={() => this.onItemPerPage('36')}>36</span>
                  </div>

                  <div className='grid-view'>

                    <button onClick={() => this.onLayoutChange('2X2')} ></button>
                    <button onClick={() => this.onLayoutChange('3X3')} ></button>
                    <button onClick={() => this.onLayoutChange('4X4')} ></button>
                  </div>

                  <form method='get' className='shorting-wrapper'>
                    <select name='orderby' className='form-control' aria-label='Shop order'>
                      <option value='menu_order' defaultValue='selected'>Default sorting</option>
                      <option value='popularity'>Sort by popularity</option>
                      <option value='rating'>Sort by average rating</option>
                      <option value='date'>Sort by latest</option>
                      <option value='price'>Sort by price: low to high</option>
                      <option value='price-desc'>Sort by price: high to low</option>
                    </select>
                  </form>

                </div>
              </section>

              <div className='row'>
                <ProductGrid layoutProps={layout} historyProps={this.props} />
              </div>
              <ReactPaginate
      previousLabel={'Pre'}
      nextLabel={'Next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      //pageCount={pageCount}      
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={this.handlePageClick}
      containerClassName={'pagination'}
      subContainerClassName={'pages paginationItem'}
      activeClassName={'active'} />
             
            </div>
          </div>
        </div>
      </>
    );
  }
}


