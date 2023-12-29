import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux";
import userReducer from "./features/user"

const store = configureStore({
  reducer: {
    user: userReducer,
  },
})


const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.style.backgroundColor = "#292C33";
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
