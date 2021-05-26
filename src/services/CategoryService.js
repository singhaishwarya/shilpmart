import axios from 'axios';
import { Component } from "react";
import { baseUrl, config } from './index.js';

export default class CategoryService extends Component {
  static fetchAllCategory = async (data) => {
    try {

      config.url = baseUrl + 'categories';
      config.method = 'get';
      config.params = data;
      config.data = '';
      const response = await axios(config);
      return response.data ? response.data.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);

    }
  }
}