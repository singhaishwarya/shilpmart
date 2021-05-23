import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...children }) => {

  return isAuthenticated.token ?
    <Route {...children} render={props => <Component {...props} />} />
    : <Redirect to="/login" />;

}

export default PrivateRoute
