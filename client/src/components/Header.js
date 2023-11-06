import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <h1 className="logo">TAILTRACKr</h1>
      <a href="/info" className="info-link">Info</a>
    </div>
  );
}

export default Header;
