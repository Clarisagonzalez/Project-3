import {Container,  Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <Container>
      <Row>
        <Col sm={12} md={6} lg={2}><li><Link to="/" style={{textDecoration: 'none'}}>Home</Link></li></Col>
        <Col sm={12} md={6} lg={2}><li><Link to="/campaigns" style={{textDecoration: 'none'}}>Campaigns</Link></li></Col>
        <Col sm={12} md={6} lg={2}><li><Link to="/projects"style={{textDecoration: 'none'}}>Projects</Link></li></Col>
        <Col sm={12} md={6} lg={2}><li><Link to="/about" style={{textDecoration: 'none'}}>About Us</Link></li></Col>
        <Col sm={12} md={6} lg={2}><li><Link to="/signup" style={{textDecoration: 'none'}}>Sign Up</Link></li></Col>
        <Col sm={12} md={6} lg={2}><li><Link to="/login" style={{textDecoration: 'none'}}>Log In</Link></li></Col>
        {/* we can add more links if needed */}
      </Row>
    </Container>
  );
};

export default Nav;
