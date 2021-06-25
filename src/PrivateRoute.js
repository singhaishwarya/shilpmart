import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import Login from "../src/component/Login";
import { customLoginStyles } from "../src/lib/utils";

const PrivateRoute = ({ component: Component, isAuthenticated, ...children }) => {

  return isAuthenticated.token ?
    <Route {...children} render={props => <Component {...props} />} />
    : <Modal
      isOpen={true}
      style={customLoginStyles}
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
    >  <Login
        dismissModal={() => window.history.back()} />  </Modal>

}

export default PrivateRoute
