
import { Component } from "react";
import { toast } from 'react-toastify';
toast.configure();
export default class ToastService extends Component {
  static error = async (message) => {
    return toast.error(
      message,
      {
        toastId: '007'
      },
      {
        style: {
          backgroundColor: "#e87f13",
          color: "#fff"
        }
      },
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      },
      // clearWaitingQueue(),
      // dismiss(console.log("demooooerrpor"))
    );
  }

  static success = async (message) => {
    return toast.success(
      message,
      {
        style: {
          backgroundColor: "#34aa44",
          color: "#fff"
        }
      },
      {
        toastId: '008'
      },
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      }
    );
  }
}