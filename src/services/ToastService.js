
import { Component } from "react";
import { toast } from 'react-toastify';

export default class ToastService extends Component {
  static error = async (message) => {
    return toast.error(
      message,
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }

  static success = async (message) => {
    return toast.success(
      message,
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }
}