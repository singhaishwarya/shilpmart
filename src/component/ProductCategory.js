import React, { Fragment } from "react";
import { Treebeard } from 'react-treebeard';
// import ReactStars from 'react-stars'
import { Range } from 'rc-slider';
import ProductGrid from './ProductGrid'
import CategoryService from '../services/CategoryService';

export default class ProductCategory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuOptions: [],
      product_category: this.props.category,
      offers: [
        { label: 'Buy More, Save More', value: 'bmsm' },
        { label: 'Exchange Offer', value: 'eo' },
        { label: 'No Cost EMI', value: 'nce', disabled: true },
        { label: 'Special Price', value: 'sp' }
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
      parent_id: props.history.location.state?.parent_id,
      category_id: props.history.location.state?.category_id,
      category_breadcrumbs: props.history.location.state?.category_breadcrumbs,
      selectedOption: null
    };
    this.onToggle = this.onToggle.bind(this);
    this.currentUrlParams = new URLSearchParams(window.location.search);

  }
  componentWillReceiveProps() {
    this.getCategoryFilter(this.state.parent_id);
    this.getSetQueryParams()
  }

  componentDidMount() {
    this.getCategoryFilter(this.state.parent_id);
    this.getSetQueryParams();
  }

  getSetQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let entries = urlParams.entries(),
      queryParams = {};
    const { priceRange } = this.state;

    for (const entry of entries) {
      switch (entry[0]) {
        case 'min_price':
          priceRange.splice(0, 1, entry[1] * 1)
          this.setState({ priceRange: [...priceRange] }, () => {
            this.setState({ priceRange: [...priceRange] })
          })
          break
        case 'max_price':
          priceRange.splice(1, 1, entry[1] * 1)
          this.setState({ priceRange: [...priceRange] }, () => {
            this.setState({ priceRange: [...priceRange] })
          })
          break
        case 'cat_ids':
          this.setState({ cat_ids: entry[1] })
          break

        default:
          return;
      }
    }

    return queryParams;
  }
  onSliderPriceChange = (value) => {
    this.setState({ priceRange: value });
    this.currentUrlParams.set('min_price', value[0])
    this.currentUrlParams.set('max_price', value[1])
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: "&" + this.currentUrlParams.toString()
    });

  }

  onManualPriceChange = (index, e) => {

    const { priceRange } = this.state;
    priceRange.splice(index, 1, e.target.value * 1)
    this.setState({ priceRange: [...priceRange] }, () => {
      this.onSliderPriceChange([...priceRange]);
    });

  }
  filterByPriceRange = () => {
    this.currentUrlParams.set('min_price', this.state.priceRange[0])
    this.currentUrlParams.set('max_price', this.state.priceRange[1])
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: "&" + this.currentUrlParams.toString()
    });
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

  getCategoryFilter = (parent_id) => {
    let MegaMenu = [];
    try {
      CategoryService.fetchAllCategory({ parent_id: parent_id }).then((result) => {
        MegaMenu = result?.map((item) => {
          return {
            name: item.title,
            key: item.id,
            toggled: item.id === this.state.category_id,
            children: item.child?.map((subitem1) => {
              return {
                name: subitem1.title,
                key: subitem1.id,
                toggled: subitem1.id === this.state.category_id,
              }
            })

          }
        });
        this.setState({ menuOptions: result?.length > 0 ? MegaMenu : [] });
      });
    } catch (err) {
      console.log(err);
    }
  }
  onToggle(node, toggled) {
    const { cursor, menuOptions } = this.state;
    if (cursor) {
      this.setState(() => ({ cursor, active: false }));
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState(() => ({ cursor: node, menuOptions: Object.assign({}, menuOptions), category_id: node.key }));
    this.currentUrlParams.set('cat_ids', node.key)
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: "&" + this.currentUrlParams.toString()
    });


  }
  render() {

    const {
      menuOptions,
      priceRange,
      category_breadcrumbs,
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
                            defaultValue={priceRange}
                            min={0}
                            max={5000}
                            className='filter-slider'
                            allowCross={false}
                            onAfterChange={value => { this.onSliderPriceChange(value) }}
                            draggableTrack={true}
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
                          <span>
                            <button onClick={() => { this.filterByPriceRange() }} className='price-range-search'
                              id='price-range-submit'>Filter</button>
                          </span>
                        </div>
                        <div id='searchResults' className='search-results-block'></div>
                      </div>
                    </div>
                  </article>
                  <article className='filter-group'>
                    <Treebeard
                      data={menuOptions}
                      onToggle={this.onToggle}
                    />
                  </article>
                </div>
              </div>
              <div className='col-lg-9'>
                <ProductGrid categoryBreadcrumbs={category_breadcrumbs} {...this.props} />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}


