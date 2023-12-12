import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; 

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container fluid className='footer'>
      <Row className="footer-content">
        <Col className="contact-info">
          <h3>Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </Col>

        <Col className="follow-us">
          <h3>Follow Us</h3>
          {/* Social links */}
        </Col>
      </Row>
      <Row>
        <Col className="copyright">
          <p>&copy;{new Date().getFullYear()} UnityFund. All rights reserved.</p>
          {location.pathname !== '/' && <Button className='go-back-button' onClick={() => navigate(-1)}>Go Back</Button>}
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;