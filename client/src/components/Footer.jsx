import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container fluid className='footer' style={{ backgroundColor: '#f2f2f2', padding: '20px', marginTop: '120px', textAlign: 'center', fontFamily: 'Nunito, sans-serif' }}>
      <Row className="footer-content" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Col className="contact-info">
          <h3>Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </Col>
        <Col>
          <h3>Donate to the Site</h3>
          <p>As a nonprofit organization we depend on the donations provided by socially, environmentally, and artistically aware people like you.</p>
          <p>Please, click <a href='#nav'>Donate</a> in order to donate.</p>
        </Col>
        <Col>
          <h3>Follow Us</h3>
          <div><a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">Twitter</a></div>
          <div><a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">Facebook</a></div>
        </Col>
      </Row>
      <Row>
        <Col className="copyright" style={{ color: '#333', fontSize: '14px' }}>
          <p>&copy;{new Date().getFullYear()} UnityFund. All rights reserved.</p>
          {location.pathname !== '/' && (
          <Button className='btn btn-lg' style={{ backgroundColor: '#19747E', color: '#FFFFFF' }} onClick={() => navigate(-1)}>
            Go Back
            </Button>
            )}
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
