import { Col, Card, } from 'react-bootstrap';


function SingleProject(props) {

    return (
        <Col sm={12} md={6} lg={4}>
            <Card >
                <Card.Header>
                    {props.projectName}
                </Card.Header>
                <Card.Title>{props.title}</Card.Title>
                <Card.Subtitle> {props.projectDate}</Card.Subtitle>
                <Card.Body>
                  {props.projectDescription}
                    <Card.Img src='/logo512.png'/>
                </Card.Body>
                <Card.Footer>
                   {props.links}
                </Card.Footer>
            </Card>
        </Col>
    );
}

export default SingleProject;