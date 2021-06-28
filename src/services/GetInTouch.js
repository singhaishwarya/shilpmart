import axios from "axios";
import { Component } from "react";
import { baseUrl, config } from './index.js';

export default class GetInTouch extends Component {

  static getinTouch = async (data) => {
    try {
      config.url = baseUrl + 'get-in-touch';
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
}