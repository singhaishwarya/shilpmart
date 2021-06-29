import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { persistor, store } from "./persistStore";
import { PersistGate } from "redux-persist/integration/react";
import "./public/bootstrap.min.css";
import "./public/jbility.css";
import "./index.css";
// import "./public/swiper-bundle.min.css"
import 'react-alice-carousel/lib/alice-carousel.css';
import 'rc-slider/assets/index.css';
import 'react-image-gallery/styles/css/image-gallery.css';
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