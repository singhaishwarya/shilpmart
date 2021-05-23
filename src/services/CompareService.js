import axios from 'axios';
import { Component } from "react";
import { baseUrl, config } from './index.js';

export default class CompareService extends Component {

  static add = async (data) => {
    try {
      config.url = baseUrl + 'compare-list-item-add-remove';
      config.method = 'post';
      config.data = data;

      const response = await axios(config);
      return response.data ? response.data.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);

    }
  }
}
