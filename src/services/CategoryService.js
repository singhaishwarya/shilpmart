import axios from 'axios';
import { Component } from "react";

const baseUrl = 'https://admin.digitalindiacorporation.in/api/';

export default class CategoryService extends Component {
  static fetchAllCategory = async (config) => {
    try {
      const response = await axios.get(baseUrl + `categories`, { params: config });
      return response.data ? response.data.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);

    }
  }
}