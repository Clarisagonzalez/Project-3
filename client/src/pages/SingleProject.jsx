import { Card, Image} from 'react-bootstrap';


function SingleProject({ projectName, projectDate ='12/6/23.', goalAmount, expiresIn, userId, projectImage, projectDescription, links='http://github.io'}) {

    return (
        <>
            <Card >
                <Card.Header>
                    <h3>{projectName}</h3>
                    We need your help to raise ${goalAmount}!<br/>
                    Hurry! This campaign expires in {expiresIn} days!
                </Card.Header>
                <Card.Title>{userId}</Card.Title>
                <Card.Subtitle> This project was submitted on {projectDate}</Card.Subtitle>
                <hr/>
                <Card.Body>
                <Image src={projectImage}/>
                <h6>Description</h6>
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