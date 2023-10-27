import React, { Component } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./components/Home"
import NavBar from "./components/NavBar"
import Login from "./components/Login";
import Register from "./components/Register"
import "./App.css";


// app component will control all routes within our program
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;