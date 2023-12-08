import SingleProject from '../pages/SingleProject';
import { Row, Col, Container } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PROJECTS } from '../utils/queries';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Auth from '../utils/auth'

export default  function Projects() {
    const location = useLocation();

    useEffect(() => {
        if(Auth.loggedIn()){
            document.title = `${Auth.getProfile().data.username} is seeing all projects`
        } else { document.title = 'You are seeing all projects.'}
        return () => { 
            if(location.pathname !== '/users') document.title = 'Unity Fund'
        }
    }, [])
    const { data, loading } = useQuery(QUERY_ALL_PROJECTS);

    const projects = data?.projects || [];

    if(loading) return(<div>Loadin...</div>);

    return (
        <Container>
            <Row>
               {projects.map((project) => 
               (<Col key={project._id}>
                <SingleProject {...project} />
                </Col>))}
            </Row>
        </Container>
    );
}