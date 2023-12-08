import { Container, Col, Row, Card, Image } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_USERS } from '../utils/queries';
import { Link } from 'react-router-dom';

const Users = () => {

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
                            <Link to={`/users/${user._id}`}>{user.username}</Link>
                            <br/>
                            <span> Contact <i>{user.username}</i>{' '}: <a href = {`mailto:${user.email}`}  target= '_blank' rel='noopener noreferrer'>{user.email}</a> </span>
                        </Card.Header>
                        {user.projects.map((project) =>
                        (<Card.Body key={project._id}>
                            <Card.Title>
                                {project.projectName}
                            </Card.Title>
                            <Card.Subtitle>
                                {project.projectDescription}
                            </Card.Subtitle>
                        </Card.Body>
                        ))}
                    </Card>))}
                </Col>
            </Row>
        </Container>);
}

export default Users;