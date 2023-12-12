import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import './Nav.css'; // Import the CSS

const Nav = () => {
  return (
    <Container className="navbar">
      <Row className="justify-content-center">
        <Col sm={12} md={6} lg={3}><ul><li className="nav-item"><Link to='/' className="nav-link">Home</Link></li></ul></Col>
        <Col sm={12} md={6} lg={3}><ul><li className="nav-item"><Link to="/users" className="nav-link">Users</Link></li></ul></Col>
        {/* ... Rest of the columns */}
        {!Auth.loggedIn() ? (
          <>
            <Col sm={12} md={6} lg={3}><ul><li className="nav-item"><Link to="/login" className="nav-link">Log In</Link></li></ul></Col>
            <Col sm={12} md={6} lg={3}><ul><li className="nav-item"><Link to="/signup" className="nav-link">Sign Up</Link></li></ul></Col>
          </>
        ) : (
          <>
            <Col sm={12} md={6} lg={3}><ul><li className="nav-item"><Link to="/dashboard" className="nav-link">My Dashboard</Link></li></ul></Col>
            <Col sm={12} md={6} lg={3}><ul><li className="nav-item"><Link to="/" className="nav-link" onClick={() => Auth.logout()}>Log Out</Link></li></ul></Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Nav;