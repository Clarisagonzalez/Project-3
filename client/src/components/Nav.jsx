// Example Nav.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/campaigns">Campaigns</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        {/* we can add more links if needed */}
      </ul>
    </nav>
  );
};

export default Nav;
