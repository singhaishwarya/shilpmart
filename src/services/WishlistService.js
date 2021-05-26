import axios from 'axios';
import { Component } from "react";
import { baseUrl, config } from './index.js';

export default class WishlistService extends Component {

  static add = async (data) => {
    try {
      config.url = baseUrl + 'wish-list-item-add-remove';
      config.method = 'post';
      config.data = data;
      config.params = data;
      const response = await axios(config);
      return response.data ? response.data : [];
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
  static delete = async (data) => {
    try {
      config.url = baseUrl + 'wish-list-item-add-remove';
      config.method = 'post';
      config.params = data;
      config.data = data;
      const response = await axios(config);
      return response.data ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);

    }
  }
}
