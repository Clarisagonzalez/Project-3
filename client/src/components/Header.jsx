import { Container, Row, Col } from 'react-bootstrap';

const styles = {
  header: {
    backgroundColor: '#333',
    padding: '20px',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Nunito, sans-serif'
  },
  logo: {
    width: '100px',
    height: 'auto',
  },
};

const Header = () => {
  return (
    <Container style={styles.header} >
      {/* Logo */}
      <img src="/logo.png" alt="Logo" style={styles.logo} />
      <Row>
        <Col sm={12} md={3} ><li><a href="/about">About Us</a></li></Col>
        <Col sm={12} md={3} ><li><a href="/">How to start donating</a></li></Col>
        <Col sm={12} md={3} ><li><a href="/campaigns">How to set up a campaign</a></li></Col>
        {/*add more links if needed */}
      </Row>
    </Container>
  );
};



export default Header;
