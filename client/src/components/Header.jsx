import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
        {/* Logo */}
        <img src="/logo.png" alt="Logo" style={styles.logo} />
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/campaigns">Campaigns</a></li>
          <li><a href="/about">About Us</a></li>
          {/*add more links if needed */}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    padding: '20px',
    textAlign: 'center',
    color: 'white',
  },
  logo: {
    width: '100px',
    height: 'auto',
  },
};

export default Header;
