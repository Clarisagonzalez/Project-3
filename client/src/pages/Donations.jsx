import { Container, Row, Col, Button } from 'react-bootstrap';
import SingleProject from './SingleProject';
import { useEffect } from 'react';
import { ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
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

      const { data, loading } = useQuery(ME, {
        variables: { _id: Auth.getProfile().data._id}
      });
      const myDonations = data?.me.donations || [];
      console.log(myDonations);
      if(loading) return <div> Loading ...</div>
return(
     <Container>
        <h2>Causes you have supported</h2>
        <Row>
          {myDonations.map(project =>
          (<Col sm={12} md={6} lg={4} key={project._id}>
            <SingleProject {...project} />
          </Col>))}
        </Row>
      </Container>
);
};