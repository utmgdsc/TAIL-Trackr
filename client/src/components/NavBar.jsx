import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <nav className='navbar'>
      <div className='logo'>
        <h1>TailTrackR</h1>
      </div>
      <ul className='nav-links'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href='#'>About</a>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
