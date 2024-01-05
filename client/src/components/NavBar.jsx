import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { logout } from '../features/user';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function NavBar() {
  // Initialize user state with the value from localStorage or null if not present
  // const [user, setUser] = useState(localStorage.getItem('user') || null);
  
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  const baseURL = "http://127.0.0.1:5000"

  const handleSubmit = () => {
    logoutUser()
  }

  const logoutUser = async () => {
    const response = await fetch(baseURL + '/api/user/logout/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    });


    // logging the user out of the program
    if (response.ok) {
      dispatch(logout())
    }
    const json = await response.json();
  }

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
          <Link to="/create-post">Create Posts</Link>
        </li>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link to='/shelters'>Animal Shelters</Link>
        </li>
        
        {user ? (
          <>
            {/* Logged in, show logout button*/}
            <li>
              <button onClick={handleSubmit}>Logout</button>
            </li>
          </>
        ) : (
          <>
            {/* Not logged in, show register and login buttons */}
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
