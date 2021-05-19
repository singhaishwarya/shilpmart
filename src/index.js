import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux'
import persistStore from "./persistStore";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={persistStore().store}>
    <PersistGate loading={null} persistor={persistStore().persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);