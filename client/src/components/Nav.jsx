import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Nav = () => {
  return (
    <Container className="navbar" style={{ backgroundColor: '#D1E8E2', fontFamily: 'Nunito, sans-serif', }}>
      <Row className="justify-content-center">
          <Col sm={12} md={6} lg={3}><ul><li><Link to='/' style={{ textDecoration: 'none' }}>Home</Link></li></ul></Col>
          <Col sm={12} md={6} lg={3}><ul><li><Link to="/users" style={{ textDecoration: 'none' }}>Users</Link></li></ul></Col>
          <Col sm={12} md={6} lg={3}><ul><li><Link to="/projects" style={{ textDecoration: 'none' }}>Projects</Link></li></ul></Col>
          <Col sm={12} md={6} lg={3}><ul><li><Link to="/donate" style={{ textDecoration: 'none' }}>Donate</Link></li></ul></Col>
        {!Auth.loggedIn() ? (
          <>
            <Col sm={12} md={6} lg={3}><ul><li><Link to="/login" style={{ textDecoration: 'none' }}>Log In</Link></li></ul></Col>
            <Col sm={12} md={6} lg={3}><ul><li><Link to="/signup" style={{ textDecoration: 'none' }}>Sign Up</Link></li></ul></Col>
          </>
        ) : (
          <>
            <Col sm={12} md={6} lg={3}><ul><li><Link to="/dashboard" style={{ textDecoration: 'none' }}>My Dashboard</Link></li></ul></Col>
            <Col sm={12} md={6} lg={3}><ul><li><Link to="/" style={{ textDecoration: 'none' }} onClick={() => Auth.logout()}>Log Out</Link></li></ul></Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Nav;
