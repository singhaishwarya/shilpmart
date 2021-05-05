import React from 'react';
import ReactStars from 'react-stars'
import { Range } from 'rc-slider';
import ProductGrid from './ProductGrid'
import { MultilevelMenu } from 'react-multilevel-menu';

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
      priceRange: [200, 500]
    };
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

              <ProductGrid historyProps={this.props} />
            </div>
          </div>
        </div>
      </>
    );
  }
}


