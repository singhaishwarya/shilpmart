import axios from "axios";
import { Component } from "react";
import { baseUrl, config } from './index.js';

export default class AuthService extends Component {

  static login = async (data) => {
    try {
      const response = await axios.post(baseUrl + `mobile-login`, data, config);
      return response.data ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);
    }
  }
  static loginWithOtp = async (data) => {
    try {
      const response = await axios.post(baseUrl + `mobile-login-otp`, data, config);
      return response.data ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);
    }
  }

  static register = async (data) => {

    try {
      const response = await axios.post(baseUrl + `mobile-register`, data, config);
      return response.data ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) { console.log(`FETCH GET ERROR`, response); return; }
      return response.data ? response.data : [];
    }
  }

  static logout = async () => {
    try {
      config.url = baseUrl + 'mobile-logout';
      config.method = 'post';

      const response = await axios(config);
      return response.data ? response.data.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);
    }
  }

  static forgotPassword = async (data) => {
    try {
      const response = await axios.post(baseUrl + `mobile-forget-password`, data, config);
      return response.data ? response.data.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);
      return response
    }
  }

  static changePassword = async (data) => {
    try {
      const response = await axios.post(baseUrl + `mobile-change-password`, data, config);
      return response.data ? response.data : [];
    } catch (error) {
      const { response } = error;
      if (!response) return;
      console.log(`FETCH GET ERROR`, response);
    }
  }
}


