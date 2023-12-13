import { Container, Row, Col, Button } from 'react-bootstrap';
import SingleProject from './SingleProject';
import { useEffect } from 'react';
import { useQuery} from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';
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
  const _id =  Auth.getProfile().data._id ;

  const { data, loading, error } = useQuery(QUERY_USER, {
    variables: { _id }
  });
  let myProjects;
  data?.user.projects ? myProjects = data?.user.projects : myProjects = [];
  if (loading) return (<div>Loading...</div>);

  const projectIds = myProjects.map((project) => project._id);
  return (
    <>
      <Container>
        <h1 style={{ fontFamily: 'DM Serif Display'}}>Welcome to your Dashboard, <strong><i>{Auth.getProfile().data.username}</i></strong>! What do you want to do today?:</h1>
      </Container>
        {error ? <div className='text-center text-danger'>{error.message}</div>: myProjects.length ? 
        (<Container>
        <h2>See your campaigns/projects</h2>
        <Row>
          {myProjects.map(project =>
          (<Col sm={12} md={6} key={project._id}>
            <SingleProject {...project} />
          </Col>))}
        </Row>
      </Container>): (<h2 className='text-center'>You still haven't contributed any project. Click "Propose a new project" below to start today!</h2>)}
      <Container>
        <Button onClick = {() => navigate('/update')}> Update your personal data!</Button>{' '}
        <Button onClick = {() => navigate('/create_project')}>Propose a new project/Start a campaign</Button>{' '}
        <Button onClick = {() => navigate('/donations')}>See the projects you have supported</Button>{' '}
        <Button onClick = {() => navigate('/comments')}>See all of your comments</Button>
      </Container> 
    </>
  );
};