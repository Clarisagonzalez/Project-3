import { Container, Col, Row, Card, Button, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_USERS } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Users = () => {

    useEffect(() => {
        if(Auth.loggedIn()) document.title = `These are the resgistered users!`
        return(() => { 
            if(location.pathname !== '/users') document.title = 'Unity Fund'
        });
    }, [])

    const { data, loading } = useQuery(QUERY_ALL_USERS);
    const users = data?.users || [];
    if (loading) return (<div> Loading...</div>);
  
    if (loading) return (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    
      return (
          <Container className="mt-4">
              <Row>
                  {users.map((user) => (
                    <Col md={6} lg={4} className="mb-4" key={user._id}>
                      <Card>
                          <Card.Header>
                              <Link to={`/users/${user._id}`} className="h5 text-decoration-none">{user.username}</Link>
                              <br/>
                              <span> Contact <i>{user.username}</i> at: <a href={`mailto:${user.email}`} target='_blank' rel='noopener noreferrer' className="text-info">{user.email}</a> </span>
                          </Card.Header>
                          {user.projects.map((project) => (
                            <Card.Body key={project._id}>
                              <Card.Title className="h4">{project.projectName}</Card.Title>
                              <p>{project.projectDescription}</p>
                              <Card.Subtitle className="mb-2 text-muted">
                                Proposed on {project.projectDate}<br/>
                                {project.expiresIn} days left to raise funds!
                              </Card.Subtitle>
                            </Card.Body>
                          ))}
                      </Card>
                    </Col>
                  ))}
              </Row>
          </Container>
      );
    return (
        <Container>
            <Row>
                <Col>
                    {users.map((user) =>
                    (<Card key={user._id}>
                        <Card.Header>
                            <Link to={`/users/${user._id}`}>{user.username}</Link>
                            <br/>
                            <span> Contact <i>{user.username}</i>{' '} at : <a href = {`mailto:${user.email}`}  target= '_blank' rel='noopener noreferrer'>{user.email}</a> </span>
                        </Card.Header>
                        {user.projects.map((project) =>
                        ( <Card.Body key={project._id}>
                            <Card.Title>
                                <h2>{project.projectName}</h2>
                                <br/>
                                {project.projectDescription}
                            </Card.Title>
                            <Card.Subtitle>
                            This project was proposed on {project.projectDate}<br/>
                            {project.expiresIn} days left to raise funds!
                            </Card.Subtitle>
                        </Card.Body>
                        ))}
                    </Card>))}
                </Col>
            </Row>
        </Container>);
}

export default Users;