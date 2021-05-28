import axios from 'axios';
import { Component } from "react";
import { baseUrl, config } from './index.js';

export default class CartService extends Component {

  static add = async (data) => {
    try {

      config.url = baseUrl + 'cart-sync';
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

      config.url = baseUrl + 'cart';
      config.method = 'get';
      config.data = '';
      config.params = '';
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

      config.url = baseUrl + 'cart-item-remove';
      config.method = 'post';
      config.data = data;
      config.params = '';
      const response = await axios(config);
      return response.data ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);

    }
  }

  static changeQuantity = async (data) => {
    try {

      config.url = baseUrl + 'cart-item-change-quantity';
      config.method = 'post';
      config.data = data;
      config.params = '';
      const response = await axios(config);
      return response.data ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);

    }
  }
}
