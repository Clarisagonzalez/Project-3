import { Card, Image} from 'react-bootstrap';


function SingleProject({ projectName, projectDate ='12/6/23.', goalAmount, expiresIn, userId, projectImage, projectDescription, links='http://github.io'}) {

    return (
        <>
            <Card >
                <Card.Header>
                    {projectName} {goalAmount} {expiresIn}
                </Card.Header>
                <Card.Title>{userId}</Card.Title>
                <Card.Subtitle> {projectDate}</Card.Subtitle>
                <Card.Body>
                <Image src={projectImage}/>
                  {projectDescription}
                </Card.Body>
                <Card.Footer>
                   <a href={links}>Some Link</a>
                </Card.Footer>
            </Card>
            </>
    );
}

export default SingleProject;