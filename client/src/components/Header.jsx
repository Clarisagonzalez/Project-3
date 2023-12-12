import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

const styles = {
  header: {
    backgroundColor: '#19747E',
    padding: '20px',
    margin: '20px',
    textAlign: 'center',
    color: '#D1E8E2',
    fontFamily: 'Nunito, sans-serif'
  },
  logo: {
    width: '100px',
    height: 'auto',
  },
};

const Header = () => {
  return (
    <Container style={styles.header} >
      <img src="/logo.png" alt="Logo" style={{ width: '200px', height: 'auto', borderRadius: '10px' }} />
      <Row>
        <Col sm={12} md={3} ><li><Link to="/about">About Us</Link></li></Col>
        <Col sm={12} md={3} ><li><Link to="/howtodonate">How to start donating</Link></li></Col>
        <Col sm={12} md={3} ><li><Link to="/howtocampaign">How to set up a campaign</Link></li></Col>
      </Row>
    </Container>
  );
};



export default Header;
