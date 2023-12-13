import { Container, Col, Row, Card, Image } from 'react-bootstrap';
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
  
    return (
        <Container>
            <Row>
                <Col>
                    {users.map((user) =>
                    (<Card key={user._id}>
                        <Card.Header>
                            <Link to={`/users/${user._id}`} style = {{textDecoration: 'none'}}>Click &rarr;<span style={{textDecoration: 'underline'}}>{user.username}</span> in order to see all the comments by the user and the causes they have donated to.</Link>
                            <br/>
                            <span> Contact <i>{user.username}</i>{' '} at : <a href = {`mailto:${user.email}`}  target= '_blank' rel='noopener noreferrer'>{user.email}</a> </span>
                        </Card.Header>
                        {user.projects.map((project) =>
                        ( <><Card.Body key={project._id}>
                            <Card.Title>
                                <h2>{project.projectName}</h2>
                                <br/>
                                {project.projectDescription}
                            </Card.Title>
                            <Card.Subtitle>
                            This project was proposed on {project.projectDate}<br/>
                            {project.expiresIn} days left to raise funds!
                            </Card.Subtitle>
                        </Card.Body><hr/>
                        </>
                        ))}
                    </Card>))}
                </Col>
            </Row>
        </Container>);
}

export default Users;