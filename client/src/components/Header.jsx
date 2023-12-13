import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { Container, Row, Col } from 'react-bootstrap';

const styles = {
  header: {
    backgroundColor: '#19747E',
    padding: '20px',
    margin: 'auto',
    textAlign: 'center',
    color: '#D1E8E2',
    fontFamily: 'DM Serif Display',
    width: '100%',
  },
  buttonRow: {
    marginTop: '20px'
  },
  button: {
    width: '153px', 
    backgroundColor: '#D1E8E2'
  },
};

const Header = () => {
  return (
    <Container style={styles.header} >
      <img src="/logo.png" alt="Logo" style={{ width: '200px', height: 'auto', borderRadius: '10px' }} />
      <Row style={{ ...styles.buttonRow, justifyContent: 'center' }}>
        <Col sm={12} md={3} >
            <Link to="/about">
              <Button variant="light" style={styles.button}> About Us</Button>
              </Link>
            </Col>
        <Col sm={12} md={3} >
            <Link to="/howtodonate">
            <Button variant="light" style={styles.button}> How to Donate</Button>
              </Link>
            </Col>
        <Col sm={12} md={3} >
            <Link to="/howtocampaign">
            <Button variant="light" style={styles.button}> How to campaign</Button>
              </Link>
            </Col>
      </Row>
    </Container>
  );
};



export default Header;
