// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux"; // 리덕스 Provider
import { store } from "./app/store"; // 우리가 만든 store.ts

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
