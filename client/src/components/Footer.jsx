import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#f2f2f2',
      padding: '20px',
      marginTop: '30px',
      textAlign: 'center',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    text: {
      color: '#333',
      fontSize: '14px',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container} className="footer-content">
        <div className="contact-info">
          <h3>Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>

        <div className="social-media">
          <h3>Follow Us</h3>
          <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">Facebook</a>
          {/* Add more links if needed */}
        </div>
      </div>

      <div style={styles.text} className="copyright">
        <p>&copy; 2023 Your Fundraising Campaign. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

