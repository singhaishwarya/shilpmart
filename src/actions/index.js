import { FETCH_CATEGORY } from './types';
import axios from 'axios';

const baseUrl = 'https://admin.digitalindiacorporation.in/api';

export const fetchAllCategory = (id) => {
  return (dispatch) => {
    axios.get(baseUrl + `/categories`, {
      params: { parent_id: id }
    }).then(response => {
      dispatch(fetchCategory(response.data.data))
    }).catch(error => {
      throw (error);
    });
  };
};


export const fetchCategory = (category) => {
  return {
    type: FETCH_CATEGORY,
    category
  }
};
