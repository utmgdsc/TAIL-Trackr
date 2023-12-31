import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux";
import userReducer from "./features/user";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    localStorage.setItem('user', JSON.stringify(state));
  } catch (err) {
    // Handle errors here
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: persistedState, // Set preloadedState with the state loaded from localStorage
});

// Subscribe to store changes and save state to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

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
