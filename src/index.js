import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { persistor, store } from "./persistStore";
import { PersistGate } from "redux-persist/integration/react";
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <HashRouter hashType="slash">
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);