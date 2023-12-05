import { useLocation,  useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

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

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container style={styles.footer} className='fluid'>
      <Row style={styles.container} className="footer-content">
        <Col className="contact-info">
          <h3>Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </Col>

        <Col>
          <h3>Follow Us</h3>
          <div><a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">Twitter</a></div>
          <div><a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">Facebook</a></div>
          {/* Add more links if needed */}
        </Col>
      </Row>
      <Row>
      <Col style={styles.text} className="copyright">
        <p>&copy;{new Date().getFullYear()} Your Fundraising Campaign. All rights reserved.</p>
        {location.pathname !== '/' && <Button className='btn btn-lg' onClick= {() => navigate(-1) }>Go Back</Button>}
      </Col>
      </Row>
    </Container>
  );
};

export default Footer;