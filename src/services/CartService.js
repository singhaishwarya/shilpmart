import axios from 'axios';
import { Component } from "react";
import { baseUrl, config } from './index.js';

export default class CartService extends Component {

  static add = async (data) => {
    try {

      config.url = baseUrl + 'cart-item-add-remove';
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

  static list = async () => {
    try {

      config.url = baseUrl + 'cart';
      config.method = 'get';
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

      config.url = baseUrl + 'cart-item-add-remove';
      config.method = 'post';
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
