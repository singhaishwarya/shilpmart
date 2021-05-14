import React from 'react';
import ReactStars from 'react-stars'
import { Range } from 'rc-slider';
import ProductGrid from './ProductGrid'
import { MultilevelMenu } from 'react-multilevel-menu';
import CategoryService from '../services/CategoryService';

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
      multilevelMenuConfig: {
        paddingAtStart: true,
        listBackgroundColor: ``,
        fontColor: `rgb(8, 54, 71)`,
        backgroundColor: ``,
        selectedListFontColor: ``,
        highlightOnSelect: true,
        useDividers: false
      },
      categories: [],
      priceRange: [200, 500],
      filterParams: { parent_id: props.history.location.state?.category_id || 0 },
      categogy_title: props.history.location.state?.category_title
    };
  }
  componentDidMount() {
    this.getCaregoryFilter()
  }
  componentWillReceiveProps() {
    if (this.props.history.location.state?.category_id !== this.props.location.state?.category_id) {
      this.state.filterParams.parent_id = this.props.history.location.state?.category_id;
    }
    this.getCaregoryFilter();
  }

  onSliderPriceChange = (value) => {
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
  onManualPriceChange = (index, e) => {

    const { priceRange } = this.state;
    priceRange.splice(index, 1, e.target.value * 1)
    this.setState({ priceRange: [...priceRange] }, () => {
      this.onSliderPriceChange([...priceRange]);

    });
  }
  getCaregoryFilter = () => {
    CategoryService.fetchAllCategory(this.state.filterParams).then((result) => {
      this.setState({
        categories:
          [{
            label: this.state.categogy_title,
            items: result.map((item) => {
              return ({
                label: item.title,
                onSelected: function () { }
              })
            })
          }]
      })
    })
  }
  render() {

    const {
      categories,
      multilevelMenuConfig,
      priceRange,
      categogy_title
    } = this.state;

    return (
      <>
        <section id="maincontent">
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
                            value={priceRange}
                            min={0}
                            max={5000}
                            className='filter-slider'
                            allowCross={false}
                            onChange={value => { this.onSliderPriceChange(value) }}
                            onAfterChange={value => { this.onSliderPriceChange(value) }}
                          />
                        </div>
                        <div className='price-range d-flex justify-content-between'>
                          <span>
                            Price:
                          <input type='number' min={0} max={priceRange[0] || 5000} value={priceRange[0] || 0} className='price-range-field'
                              onChange={(e) => this.onManualPriceChange(0, e)}
                            />

                            <span>-</span>
                            <input type='number' min={priceRange[0] || 0} max='10000' value={priceRange[1] || 0}
                              onChange={(e) => this.onManualPriceChange(1, e)}
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
                          configuration={multilevelMenuConfig}
                          selectedListItem={this.selectedItem}
                          selectedLabel={this.selectedItem}
                        />
                      </div>
                    </div>
                  </article>
                </div>
              </div>
              <div className='col-lg-9'>

                <ProductGrid historyProps={this.props} categogyTitle={categogy_title} />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}


