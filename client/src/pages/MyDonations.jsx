import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { ALL_MY_DONATIONS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import Auth from '../utils/auth';
import SingleDonation from '../components/SingleDonation';
import { Link } from 'react-router-dom';

export default function Donations() {

  const location = useLocation();

  useEffect(() => {
    document.title = `${Auth.getProfile().data.username}'s donations!`
    return () => {
      if (location.pathname !== '/donations') document.title = 'Unity Fund'
    }
  }, [])

  const { data, loading } = useQuery(ALL_MY_DONATIONS, {
    variables: { _id: Auth.getProfile().data._id }
  });
  const myDonations = data?.allMyDonations || [];
  if (loading) return <div> Loading ...</div>
  return (
    <Container>
      <h2>Causes you have supported:</h2>
      <Row>
        {!myDonations.length ? (<h2>Press on the link &rarr;<Link to='/projects'>Projects</Link> to choose a project. Any donation will be thanked.</h2>) : (myDonations.map(project =>
        (<Col sm={12} md={6} key={project.donation._id}>
          <SingleDonation { ...project} />
        </Col>)))}
      </Row>
    </Container>
  );
};