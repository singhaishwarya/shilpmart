import axios from 'axios';
import { Component } from "react";

const baseUrl = 'https://admin.digitalindiacorporation.in/api/';

export default class ProductService extends Component {
  static fetchAllProducts = async (config) => {
    try {
      const response = await axios.get(baseUrl + `products`, { params: config });
      return response.data.data.data;
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);

    }
  }
}