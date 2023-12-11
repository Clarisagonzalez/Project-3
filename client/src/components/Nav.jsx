import {Button, Container,  Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Nav = () => {

  return (
    <Container className="navbar" style={{ backgroundColor: '#D1E8E2',fontFamily: 'Nunito, sans-serif' }}>
      <Row className="justify-content-center">
        <Col sm={12} md={6} lg={2}>
        <ul className="list-unstyled d-flex justify-content-around">
          <li className="ml-2"><Button as={Link} to="/" style={{textDecoration: 'none'}} className="mb-2">Home</Button></li>
          <li className="ml-2"><Button as={Link} to="/users" style={{textDecoration: 'none'}} className="mb-2">Users</Button></li>
          <li><Button as={Link} to="/projects"style={{textDecoration: 'none'}}>Projects</Button></li>
          <li><Button as={Link} to="/about" style={{textDecoration: 'none'}}>Donate</Button></li>
        {!Auth.loggedIn()?    
        (<>
        
          <li><Button as={Link} to="/login" style={{textDecoration: 'none'}}>Log In</Button></li>
          <li><Button as={Link} to="/signup" style={{textDecoration: 'none'}}>Sign Up</Button></li>
        </>)
        :
        (<>
        <li><Link to="/dashboard" style={{textDecoration: 'none'}}>My Dashboard</Link></li>
        <li><Link to="/" style={{textDecoration: 'none'}} onClick={() => Auth.logout()}>Log Out</Link></li>
        </>)}
        </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Nav;
