import { Card, Image} from 'react-bootstrap';
import Auth from '../utils/auth';
import AddComment from '../components/AddComment';
import MakeDonation from '../components/MakeDonation';
import { Link } from 'react-router-dom';

function SingleProject({ projectName, goalAmount, expiresIn, projectDate, projectDescription, _id , userId}) {
 
    return (
        <>
            <Card >
                <Card.Header>
                    <h3>{projectName}</h3>
                    We need your help to raise ${goalAmount}!<br/>
                    Hurry! This campaign expires in {expiresIn} days!
                </Card.Header>
                <Card.Title> This project was submitted on {projectDate}</Card.Title>
                <Card.Subtitle>User: {userId}</Card.Subtitle>
                <hr/>
                <Card.Body>
                <h6>Description</h6>
                  {projectDescription}
                </Card.Body>
                <Card.Footer>
                   <a href=''>Some Link</a>
                </Card.Footer>
                {Auth.loggedIn() && 
                <>
                <AddComment projectId = {_id}/>
                <MakeDonation projectId = {_id}/>
                <Link to={`/${_id}/comments`}>See all the available comments!</Link>
                </>}
            </Card>
            </>
    );
}

export default SingleProject;