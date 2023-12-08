import {Container,  Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Nav = () => {
  return (
    <Container>
      <Row>
        <Col sm={12} md={6} lg={2}><li><Link to="/" style={{textDecoration: 'none'}}>Home</Link></li></Col>
        <Col sm={12} md={6} lg={2}><li><Link to="/users" style={{textDecoration: 'none'}}>Users</Link></li></Col>
        <Col sm={12} md={6} lg={2}><li><Link to="/projects"style={{textDecoration: 'none'}}>Projects</Link></li></Col>
        <Col sm={12} md={6} lg={2}><li><Link to="/about" style={{textDecoration: 'none'}}>Donate</Link></li></Col>
        {!Auth.loggedIn()?    
        (<>
        <Col sm={12} md={6} lg={2}><li><Link to="/login" style={{textDecoration: 'none'}}>Log In</Link></li></Col>
        <Col sm={12} md={6} lg={2}><li><Link to="/signup" style={{textDecoration: 'none'}}>Sign Up</Link></li></Col>
        </>)
        :
        (<>
        <Col sm={12} md={6} lg={2}><li><Link to="/dashboard" style={{textDecoration: 'none'}}>My Dashboard</Link></li></Col>
        <Col sm={12} md={6} lg={2}><li><Link to="/" style={{textDecoration: 'none'}} onClick={() => Auth.logout()}>Log Out</Link></li></Col>
        </>)}
      </Row>
    </Container>
  );
};

export default Nav;
