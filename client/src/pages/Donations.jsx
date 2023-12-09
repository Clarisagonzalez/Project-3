import { Container, Row, Col, Button } from 'react-bootstrap';
import { projects } from '../utils/dataArrays';
import SingleProject from './SingleProject';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Auth from '../utils/auth';


export default function Donations ()  {

    const location= useLocation(); 

    useEffect(() => {
        document.title = `${Auth.getProfile().data.username}'s donations!`
        return () => {
          if (location.pathname !== '/donations') document.title = 'Unity Fund'
        }
      }, [])
return(
     <Container>
        <h2>Causes you have supported</h2>
        <Row>
          {projects.map(project =>
          (<Col sm={12} md={6} lg={4} key={projects.indexOf(project)}>
            <SingleProject {...project} />
          </Col>))}
        </Row>
      </Container>
);
};