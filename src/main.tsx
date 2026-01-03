import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./assets/styles/global.less"
import App from "./App";
import "./index.css";
import configureStore from "../src/configureStore.js";

export const store = configureStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
