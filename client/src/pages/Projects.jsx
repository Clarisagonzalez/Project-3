import SingleProject from '../pages/SingleProject';
import { Row, Container } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PROJECTS } from '../utils/queries';
import { useEffect } from 'react';
import Auth from '../utils/auth'

export default  function Projects() {
    useEffect(() => {
        document.title = `${Auth.getProfile().data.username} is seeing all projects`
        return;
    }, [])
    const { data, loading } = useQuery(QUERY_ALL_PROJECTS);

    const projects = data?.projects || [];

    if(loading) return(<div>Loadin...</div>);

    return (
        <Container>
            <Row>
               { projects.map(project => 
                (<SingleProject {...project} key={projects.indexOf(project)} />))}
            </Row>
        </Container>
    );
}