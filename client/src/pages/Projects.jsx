import SingleProject from '../pages/SingleProject';
import { Row, Container } from 'react-bootstrap';
import { projects } from '../utils/dataArrays'

export default function Projects() {
    return (
        <Container>
            <Row>
               { projects.map(project => 
                (<SingleProject {...project}  />))}
            </Row>
        </Container>
    );
}