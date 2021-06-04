import React from "react";
import { Treebeard } from 'react-treebeard';
// import ReactStars from 'react-stars'
import { Range, createSliderWithTooltip } from 'rc-slider';
import ProductGrid from './ProductGrid'
import Loader from "react-loader-spinner";
import CategoryService from '../services/CategoryService';
const Ranger = createSliderWithTooltip(Range);
export default class ProductList extends React.Component {

  constructor(props) {
    super(props);
    this.onCategoryFilter = this.onCategoryFilter.bind(this);
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
      categories: [],
      priceRange: [200, 500],
      parent_id: props.history.location.state?.parent_id || 0,
      category_id: props.history.location.state?.category_id,
      category_breadcrumbs: props.history.location.state?.category_breadcrumbs,
      selectedOption: null, queryParams: {}
    };

  }


  componentDidMount() {
    this.currentUrlParams = new URLSearchParams(window.location.search);
    this.getCategoryFilter(this.state.parent_id);
  }

  componentWillReceiveProps() {
    this.currentUrlParams = new URLSearchParams(window.location.search);
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
            children: item.child?.map((subitem1) => {
              return {
                name: subitem1.title,
                key: subitem1.id,
                children: subitem1?.child?.length > 0 && subitem1?.child?.map((subitem2) => {
                  return {
                    name: subitem2.title,
                    key: subitem2.id
                  }
                })
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

  onCategoryFilter(node, toggled) {
    if (this.state.cursor) { this.state.cursor.active = false; }
    node.active = true;
    this.currentUrlParams.set('cat_ids', [node.key])
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: "&" + this.currentUrlParams.toString()
    });
    if (node.children) { node.toggled = toggled; }
    this.setState({ cursor: node });

  }

  render() {

    const {
      menuOptions,
      priceRange,
      category_breadcrumbs,
    } = this.state;

    return (
      <>
        {/* <Loader
      visible={true}///dont push temporary changes
      type="Puff"
      color="#e05206"
      className="loader"
      height={100}
      width={100}
      margin={0}
      timeout={1000} //3 secs
    /> */}
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
                          <Ranger
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
                    <header className='card-header'>
                      <h6 className='title'>Filter by Categories </h6>
                    </header>
                    <Treebeard
                      data={menuOptions}
                      style={treeStyle}
                      onToggle={this.onCategoryFilter}
                    />


                  </article >

                  {/* <article>
                    <header class="card-header"><h6 class="title">Filter by Material </h6></header>
                    <div className="filter-box">
                      <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="menswear" value="menswear" />
                        <label className="form-check-label" htmlFor="menswear">Art Silk
</label>
                      </div>

                      <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="womenswear" value="womenswear" />
                        <label className="form-check-label" htmlFor="womenswear">Bamboo
</label>
                      </div>

                      <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="homeTextile" value="homeTextile" />
                        <label className="form-check-label" htmlFor="homeTextile">Banana Fiber
</label>
                      </div>

                      <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="homeDecore" value="homeDecore" />
                        <label className="form-check-label" htmlFor="homeDecore">Cotton
</label>
                      </div>

                      <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="floorCoverings" value="floorCoverings" />
                        <label className="form-check-label" htmlFor="floorCoverings">Cotton-Silk
</label>
                      </div>

                      <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="clothing" value="clothing" />
                        <label className="form-check-label" htmlFor="clothing">Eri Silk
</label>
                      </div>

                      <div className="form-check shm-filter-checkbox"><input type="checkbox" className="form-check-input" id="officeSup" value="officeSup" />
                        <label className="form-check-label" htmlFor="officeSup">Georgette
</label>
                      </div>
                    </div>
                  </article> */}
                </div >
              </div >
              <div className='col-lg-9'>
                <ProductGrid categoryBreadcrumbs={category_breadcrumbs} {...this.props} />
              </div>
            </div >
          </div >
        </section >
      </>
    );
  }
}
const treeStyle = {
  tree: {
    base: {
      listStyle: 'none',
      backgroundColor: 'white',
      margin: 0,
      paddingBottom: 30,
      color: 'rgb(35,31,32)',
      //fontFamily: '"Helvetica Neue", "Open Sans", Arial, sans-serif',
      fontSize: '1rem'
    },
    node: {
      base: {
        position: 'relative'
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '5px 5px',
        display: 'block'
      },
      activeLink: {
        background: 'rgba(0, 0, 0, 0.04)'
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '12px',
          width: '24px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-7px 0 0 -7px',
          height: '14px'
        },
        height: 8,
        width: 8,
        arrow: {
          fill: 'rgb(232,127,19)',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: 'rgb(35,31,32)'
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px'
      },
      loading: {
        color: '#E2C089'
      }
    }
  }
}


