import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./state/store/configureStore";
import App from "./App";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import "./styles/index.css";
import "./styles/button.css";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:3000";
} else {
  axios.defaults.baseURL = "https://news-in-progress-api.herokuapp.com";
}

window.store = store;
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
