import axios from "axios";
import { Component } from "react";
import { baseUrl, config } from './index.js';

export default class Master extends Component {


  static getStates = async () => {
    try {

      config.url = baseUrl + 'states';
      config.method = 'get';
      const response = await axios(config);
      return response.data ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);
    }
  }



  static getDistrict = async (data) => {
    try {
      config.url = baseUrl + 'districts';
      config.method = 'get';
      config.params = data;

      const response = await axios(config);
      return response.data ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);
    }
  }

  static getSubDistrict = async (data) => {
    try {
      config.url = baseUrl + 'sub-districts';
      config.method = 'get';
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


