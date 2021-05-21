import axios from "axios";
import { Component } from "react";

const BASE_URL = 'https://admin.digitalindiacorporation.in/api/';

const config = {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

export default class AuthService extends Component {

  static login = async (data) => {
    try {
      config.data = data;
      config.url = BASE_URL + 'mobile-login';
      const response = await axios(config);
      return response.data ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);
    }
  }

  static register = async (data) => {

    try {

      config.data = data;
      config.url = BASE_URL + 'mobile-register';

      const response = await axios(config);
      return response.data ? response.data.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);
    }
  }

  static logout = async (data) => {
    try {

      config.data = data;
      config.url = BASE_URL + 'mobile-logout';

      const response = await axios(config);
      return response.data ? response.data.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);
    }
  }
}


