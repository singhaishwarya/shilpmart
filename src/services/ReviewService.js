
import axios from "axios";
import { Component } from "react";
import { baseUrl, config } from './index.js';
export const userData = localStorage.getItem('persist:root') ?
  JSON.parse(JSON.parse(localStorage.getItem('persist:root')).userData) : '';

export default class ReviewService extends Component {

  static addEdit = async (data) => {
    try {
      let multipartConfig = {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + (userData ? userData?.token : ''),
        }
      }
      multipartConfig.url = baseUrl + 'add-edit-review';
      multipartConfig.method = 'post';
      multipartConfig.params = '';
      multipartConfig.data = data;
      const response = await axios(multipartConfig);
      return response.data ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);
    }
  }

  static getReviews = async () => {
    try {
      config.url = baseUrl + 'reviews';
      config.method = 'post';
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
}


