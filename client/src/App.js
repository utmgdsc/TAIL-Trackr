import React, { Component } from "react";
import {BrowserRouter, Route, Routes, redirect} from "react-router-dom"
import Home from "./components/Home"
import NavBar from "./components/NavBar"
import Login from "./components/Login";
import Register from "./components/Register"
import "./App.css";
import NewPostPage from "./components/NewPostPage";
import CreatePost from "./components/CreatePost";
import Dashboard from "./components/Dashboard";

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
              <Route path="/new-post" element={<NewPostPage />} />
              {localStorage.getItem("user") ? <Route path="/create-post" element={<CreatePost />} /> : redirect("/")}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </main>
        </BrowserRouter>
      </div>
    )
}
export default App;