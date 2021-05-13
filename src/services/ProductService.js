import axios from 'axios';

const baseUrl = 'https://admin.digitalindiacorporation.in/api/';

export default class ProductService {
  fetchAllProducts = () => {
    // return (dispatch) => {
    axios.get(baseUrl + `products`, {
      // params: { parent_id: id }
    }).then(response => {
      console.log("Demo=== in servixs", response.data.data.data)
      return response.data.data;
      // dispatch(fetchProducts(response.data.data.data))
    }).catch(error => {
      throw (error);
    });
    // };
  };
}