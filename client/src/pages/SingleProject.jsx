import { Col, Card, } from 'react-bootstrap';


function SingleProject({ projectName, title="This Title", projectDate= '', projectDescription, links='http://github.io'}) {

    return (
        <Col sm={12} md={6} lg={4} >
            <Card >
                <Card.Header>
                    {projectName}
                </Card.Header>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle> {projectDate}</Card.Subtitle>
                <Card.Body>
                  {projectDescription}
                    <Card.Img src='/logo512.png'/>
                </Card.Body>
                <Card.Footer>
                   <a href={links}>{links}</a>
                </Card.Footer>
            </Card>
        </Col>
    );
}

export default SingleProject;