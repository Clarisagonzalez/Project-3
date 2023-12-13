import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const styles = {
  header: {
    backgroundColor: '#19747E',
    padding: '20px',
    color: '#D1E8E2',
    fontFamily: 'DM Serif Display',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
    
  },
  button: {
    width: '100%', 
    backgroundColor: '#D1E8E2',
    borderColor: '#D1E8E2'
  },
  logo: {
    width: '200px',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '20px'
  }
};

const Header = () => {
  return (
    <Container className="text-center" style={styles.header}>
      <img src="/logo.png" alt="Logo" style={styles.logo} />
      <Row className="justify-content-center">
        <Col xs={12} sm={4} md={3}>
          <Link to="/about">
            <Button variant="light" style={styles.button}>About Us</Button>
          </Link>
        </Col>
        <Col xs={12} sm={4} md={3}>
          <Link to="/howtodonate">
            <Button variant="light" style={styles.button}>How to Donate</Button>
          </Link>
        </Col>
        <Col xs={12} sm={4} md={3}>
          <Link to="/howtocampaign">
            <Button variant="light" style={styles.button}>How to Campaign</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
