import React from 'react';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/campaigns">Campaigns</a></li>
          <li><a href="/about">About Us</a></li>
          {/* we can add more links if needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
