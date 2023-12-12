import { Container, Row, Col, Button } from 'react-bootstrap';
import { projects } from '../utils/dataArrays';
import SingleProject from './SingleProject';
import { useEffect } from 'react';
import { useQuery} from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { ME } from '../utils/queries';
import Auth from '../utils/auth';

export default function Dashboard() {

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = `${Auth.getProfile().data.username}'s dashboard!`
    return () => {
      if (location.pathname !== '/dashboard') document.title = 'Unity Fund'
    }
  }, [])

  const { data, loading, error } = useQuery(ME, {
    variables: { _id: Auth.getProfile().data._id }
  });
  const myProjects = data?.me.projects || [];
  if (loading) return (<div>Loading...</div>);


  return (
    <>
      <Container>
        <h1>Welcome to your Dashboard, <strong><i>{Auth.getProfile().data.username}</i></strong>! What do you want to do today?:</h1>
      </Container>
        {error ? <div className='text-center text-danger'>{error.message}</div>:
        <Container>
        <h2>See your campaigns/projects</h2>
        <Row>
          {myProjects.map(project =>
          (<Col sm={12} md={6} key={project._id}>
            <SingleProject {...project} />
          </Col>))}
        </Row>
      </Container>}
      <Container>
        <Button onClick = {() => navigate('/update')}> Update your personal data!</Button>{' '}
        <Button onClick = {() => navigate('/create_project')}>Propose a new project!</Button>{' '}
        <Button onClick = {() => navigate('/donations')}>See the projects you have supported</Button>{' '}
        <Button onClick = {() => navigate('/comments')}>See all of your comments</Button>
      </Container> 
    </>
  );
};