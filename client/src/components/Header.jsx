import { Container, Row, Col } from 'react-bootstrap';

const styles = {
  header: {
    backgroundColor: '#333',
    padding: '20px',
    textAlign: 'center',
    color: 'white',
  },
  logo: {
    width: '100px',
    height: 'auto',
  },
};

const Header = () => {
  return (
    <Container style={styles.header}>
        {/* Logo */}
        <img src="/logo.png" alt="Logo" style={styles.logo} />
      <Row>
          <Col sm={12} md={4} ><li><a href="/">Home</a></li></Col>
          <Col sm={12} md={4} ><li><a href="/campaigns">Campaigns</a></li></Col>
          <Col sm={12} md={4} ><li><a href="/about">About Us</a></li></Col>
          {/*add more links if needed */}
      </Row>
    </Container>
  );
};



export default Header;
