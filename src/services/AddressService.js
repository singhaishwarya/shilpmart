import axios from "axios";
import { Component } from "react";
import { baseUrl, config } from './index.js';

export default class Address extends Component {

  static add = async (data) => {
    try {
      config.url = baseUrl + 'address-add-edit';
      config.method = 'post';
      config.data = data;
      config.params = '';
      const response = await axios(config);
      return response.data ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) { return; }
      console.log(`FETCH GET ERROR`, response);
      return response ? response : [];
    }
  }
  static list = async () => {
    try {
      config.url = baseUrl + 'address-list';
      config.method = 'get';
      config.params = '';
      config.data = '';
      const response = await axios(config);
      return response.data ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);
    }
  }
  static delete = async (data) => {
    try {
      config.url = baseUrl + 'address-delete-default';
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


