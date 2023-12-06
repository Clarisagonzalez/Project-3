import { Col, Card, } from 'react-bootstrap';


function SingleProject({ projectName, projectDate ='12/6/23.', goalAmount, expiresIn, userId, projectImage, projectDescription, links='http://github.io'}) {

    return (
        <Col sm={12} md={6} lg={4} >
            <Card >
                <Card.Header>
                    {projectName} {goalAmount} {expiresIn}
                </Card.Header>
                <Card.Title>{userId}</Card.Title>
                <Card.Subtitle> {projectDate}</Card.Subtitle>
                <Card.Body>
                  {projectDescription}
                    <Card.Img src={projectImage}/>
                </Card.Body>
                <Card.Footer>
                   <a href={links}>{links}</a>
                </Card.Footer>
            </Card>
        </Col>
    );
}

export default SingleProject;