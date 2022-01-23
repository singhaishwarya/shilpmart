import React from "react";
import { Treebeard } from 'react-treebeard';
import { Range, createSliderWithTooltip } from 'rc-slider';
import ProductGrid from './ProductGrid'
import CategoryService from '../services/CategoryService';
import Select from 'react-select';
const Ranger = createSliderWithTooltip(Range);

export default class ProductList extends React.Component {

  constructor(props) {
    super(props);
    this.onCategoryFilter = this.onCategoryFilter.bind(this);
    this.currentUrlParams = new URLSearchParams(window.location.search);

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
      priceRange: [0, 0],
      category_id: props.history.location.state?.category_id || (this.currentUrlParams.get('cat_ids') || 0),
      category_breadcrumbs: props.history.location.state?.category_breadcrumbs,
      selectedOption: null, queryParams: {},
      parentCategory: (localStorage.getItem('parentCategory') && JSON.parse(localStorage.getItem('parentCategory'))) || [],
      setFilter: []
    };

  }


  componentDidMount() {

    if (localStorage.getItem('parentCategory') !== null) {
      if (JSON.parse(localStorage.getItem('parentCategory')).find(({ id }) => id * 1 === this.currentUrlParams.get('cat_ids') * 1)) {
        return;
      }
      else {

        this.setState({ parentCategory: [] });
        localStorage.removeItem("parentCategory");
      }
    }
    this.currentUrlParams = new URLSearchParams(window.location.search);
    this.getCategoryFilter(this.state.category_id);
  }

  componentWillUnmount() {
    if (localStorage.getItem('parentCategory') !== null) {
      if (JSON.parse(localStorage.getItem('parentCategory')).find(({ id }) => id * 1 === this.currentUrlParams.get('cat_ids') * 1)) {
        return;
      }
      else {
        this.setState({ parentCategory: [] });
        localStorage.removeItem("parentCategory");
      }
    }
  }
  handleColorChange = (selectedOption) => {
    this.setState({ selectedOption })
    this.currentUrlParams.set('color', selectedOption.value)
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: "&" + this.currentUrlParams.toString()
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.history.location.search !== prevProps.location.search) {
      this.getCategoryFilter((this.currentUrlParams.get('cat_ids') || 0));
    }
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
    priceRange.splice(index, 1, e.target?.value * 1)
    this.setState({ priceRange: [...priceRange] })

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

  getCategoryFilter = (category_id) => {

    let MegaMenu = [];
    try {
      CategoryService.fetchAllCategory({ parent_id: category_id }).then((result) => {
        MegaMenu = result?.map((item) => {
          return {
            toggled: false,
            name: item.title,
            key: item.id,
            parent_id: item.parent_id,
            children: item.child.length > 0 && item.child?.map((subitem1) => {
              return {
                name: subitem1.title,
                key: subitem1.id,
                parent_id: subitem1.parent_id,
                children: subitem1?.child?.length > 0 && subitem1?.child?.map((subitem2) => {
                  return {
                    name: subitem2.title,
                    key: subitem2.id,
                    parent_id: subitem2.parent_id,
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
    var a = [];
    a = JSON.parse(localStorage.getItem('parentCategory')) || [];
    a.push({ name: node.name, id: node.key, parent_id: node.parent_id });
    localStorage.setItem('parentCategory', JSON.stringify(a));
    this.getCategoryFilter(node.key)
    this.setState({ parentCategory: JSON.parse(localStorage.getItem('parentCategory')) || [] });

    this.currentUrlParams.set('cat_ids', [node.key]);
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: "&" + this.currentUrlParams.toString()
    });

  }

  setCategoryIdParams = (id, index) => {
    this.currentUrlParams.set('cat_ids', [id]);
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: "&" + this.currentUrlParams.toString()
    });
    this.setState({ parentCategory: this.state.parentCategory.slice(0, index) })
    localStorage.setItem('parentCategory', JSON.stringify(JSON.parse(localStorage.getItem('parentCategory')).slice(0, index)));

  }
  handleFilters = (e, key) => {

    if (e.target.checked) {
      this.setState({ [key]: e.target.value })
      this.currentUrlParams.set(key, e.target.value)
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: "&" + this.currentUrlParams.toString()
      });
    }
    else {
      this.setState({ [key]: '' })
      this.currentUrlParams.delete(key)
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: "&" + this.currentUrlParams.toString()
      });
    }

  }

  render() {

    const {
      menuOptions,
      priceRange,
      category_breadcrumbs,
      parentCategory, setFilter, selectedOption
    } = this.state;
    console.log("===", this.state)
    return (

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
                        {priceRange.length > 1 && <Ranger
                          value={priceRange}
                          onChange={(value) => this.setState({ priceRange: value })}
                          min={0}
                          max={50000}
                          className='filter-slider'
                          allowCross={false}
                          onAfterChange={value => { this.onSliderPriceChange(value) }}
                        />}
                      </div>
                      <div className='price-range'>
                        <div className="rangewraper">
                          <div className="w-50 pr-2 mr-2">
                            <div className="input-group input-group-sm">
                              <span className="input-group-text bg-light">₹</span>
                              <input min={0} max={priceRange[0]} value={priceRange[0]} className="form-control range-slider-value-min" onChange={(e) => this.onManualPriceChange(0, e)} type="text" />
                            </div>
                          </div>
                          <div className="w-50">
                            <div className="input-group input-group-sm">
                              <span className="input-group-text bg-light">₹</span>
                              <input min={priceRange[0] || 0} max='10000' value={priceRange[1] || 0}
                                onChange={(e) => this.onManualPriceChange(1, e)}
                                className="form-control range-slider-value-min" type="text" />
                            </div>
                          </div>

                        </div>
                        <span className="ml-2 border-radius">
                          <button onClick={() => this.onSliderPriceChange(priceRange)} className='price-range-search'
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
                  {parentCategory?.length > 0 && parentCategory?.map((item, index) =>
                    <div key={index} className='catHead'>
                      <span onClick={() => this.setCategoryIdParams(item?.parent_id, index)}>{item?.name}</span></div>)}
                  <Treebeard
                    data={menuOptions}
                    style={treeStyle}
                    onToggle={this.onCategoryFilter}
                  />
                </article >
                {setFilter.map((item, index) => <article key={index} className='filter-group'>
                  <header className='card-header'>
                    <h6 className='title'>Filter by {item.key} </h6>
                  </header>
                  {item.key === 'Color' ? <Select
                    value={selectedOption}
                    onChange={this.handleColorChange}
                    defaultValue={selectedOption}
                    options={item.values.map((item3, index) => { return { value: item3, label: item3 } })}
                  /> :
                    item.values.map((item1, index) => <div key={index} className='catHead'> <input type="checkbox"
                      checked={this.state[item.key.split(" ").join("")] === item1}
                      onChange={(e) => this.handleFilters(e, item.key.split(" ").join(""))} value={item1} />{item1}</div>)}

                </article >)}
              </div >
            </div >
            <div className='col-lg-9'>
              <ProductGrid categoryBreadcrumbs={category_breadcrumbs} {...this.props}
                setPriceRangeProps={(e) => this.setState({ priceRange: e })} setFilters={(e) => this.setState({ setFilter: e })} />
            </div>
          </div >
        </div >
      </section >


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


