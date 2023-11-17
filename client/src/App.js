import React, { Component } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./components/Home"
import NavBar from "./components/NavBar"
import Login from "./components/Login";
import Register from "./components/Register"
import "./App.css";


// app component will control all routes within our program
function App() {

    return (
      <div className="App">
        <BrowserRouter>
       <NavBar />
        <main style={{ marginTop: '60px' }}> {/* Adjust the margin value based on your header's height */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
        </main>
        </BrowserRouter>
      </div>
    )
}
export default App;