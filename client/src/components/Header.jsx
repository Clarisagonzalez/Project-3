import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Header.css'; 

const Header = () => {
  return (
    <Container className="header-container">
      <img src="/logo.png" alt="Logo" className="header-logo" />
      <Row>
        <Col sm={12} md={3} ><li className="nav-item"><Link to="/about" className="nav-link">About Us</Link></li></Col>
        <Col sm={12} md={3} ><li className="nav-item"><Link to="/howtodonate" className="nav-link">How to start donating</Link></li></Col>
        <Col sm={12} md={3} ><li className="nav-item"><Link to="/howtocampaign" className="nav-link">How to set up a campaign</Link></li></Col>
      </Row>
    </Container>
  );
};

export default Header;