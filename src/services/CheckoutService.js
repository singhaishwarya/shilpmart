import axios from "axios";
import { Component } from "react";
import { baseUrl, config } from './index.js';

export default class Checkout extends Component {

  static orderPlace = async (data) => {
    try {
      config.url = baseUrl + 'order-place';
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
  static list = async () => {
    try {
      config.url = baseUrl + 'orders';
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
  static orderCancel = async (data) => {
    try {
      config.url = baseUrl + 'order-cancel';
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

  static orderValidate = async (data) => {
    try {
      config.url = baseUrl + 'order-validate';
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

  static orderInvoice = async (data) => {
    try {
      config.url = baseUrl + 'order-invoice';
      config.method = 'post';
      config.data = '';
      config.params = data;
      const response = await axios(config);
      return response.data ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);
    }
  }
}


