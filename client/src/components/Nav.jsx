import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';


const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#D1E8E2', fontFamily: 'Nunito, sans-serif', margin: '20px' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontFamily: 'DM Serif Display' }}>
          Unity Fund
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ textDecoration: 'none' }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/users" style={{ textDecoration: 'none' }}>
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/projects" style={{ textDecoration: 'none' }}>
              Projects
            </Nav.Link>
            {Auth.loggedIn() &&
            <Nav.Link as={Link} to="/donate" style={{ textDecoration: 'none' }}>
              Donate
            </Nav.Link>}
          </Nav>
          <Nav>
            {!Auth.loggedIn() ? (
              <>
                <Nav.Link as={Link} to="/login" style={{ textDecoration: 'none' }}>
                  Log In
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" style={{ textDecoration: 'none' }}>
                  Sign Up
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/dashboard" style={{ textDecoration: 'none' }}>
                  My Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/" style={{ textDecoration: 'none' }} onClick={() => Auth.logout()}>
                  Log Out
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
