import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from "./reducers";
import { createHashHistory } from 'history'

const persistConfig = {
  key: "root",
  storage
};

export const history = createHashHistory({
  hashType: 'slash',
  getUserConfirmation: (message, callback) => callback(window.confirm(message))
});

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);

export const persistor = persistStore(store);