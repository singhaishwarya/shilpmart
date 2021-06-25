import axios from 'axios';
import { Component } from "react";
import { baseUrl, config } from './index.js';

export default class WishlistService extends Component {

  static addDelete = async (data) => {
    try {
      config.url = baseUrl + 'wish-list-item-add-remove';
      config.method = 'post';
      config.data = data;
      config.params = '';
      const response = await axios(config);
      return response ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);

    }
  }
  static list = async () => {
    try {
      config.url = baseUrl + 'wish-list';
      config.method = 'get';
      config.params = '';
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
