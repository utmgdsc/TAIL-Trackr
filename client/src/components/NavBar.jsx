import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  // Initialize user state with the value from localStorage or null if not present
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  const baseURL = 'http://127.0.0.1:5000';

  const logout = async () => {
    const response = await fetch(baseURL + '/api/user/logout/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      localStorage.clear();
      // Update the user state to reflect the logout
      setUser(null);
    }
    const json = await response.json();
    window.location.reload()
  };

  useEffect(() => {
    // This effect runs on mount to check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, [user]); // The empty dependency array ensures this effect runs only on mount

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
        {user ? (
          <>
            {/* Logged in */}
            <li>
              <button className='btn-nav' onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            {/* Not logged in */}
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
