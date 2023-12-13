import { Card } from 'react-bootstrap';
import Auth from '../utils/auth';
import AddComment from '../components/AddComment';
import MakeDonation from '../components/MakeDonation';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

export default function SingleProject({ projectName, goalAmount, expiresIn, projectDate, projectDescription, _id , userId}) {
    const { data, loading } = useQuery(QUERY_USER, {
        variables: { _id: userId }
    });

    const username = data?.user.username || '';
    if(loading) return <div>Loading...</div>;
    return (
        <>
            <Card >
                <Card.Header>
                    <h3>{projectName}</h3>
                    We need your help to raise ${goalAmount}!<br/>
                    Hurry! This campaign expires in {expiresIn} days!
                </Card.Header>
                <Card.Title> This project was submitted on {projectDate} by {username}</Card.Title>
                <hr/>
                <Card.Body>
                <h6>Description</h6>
                  {projectDescription}
                </Card.Body>
                <Card.Footer>
                   <a href=''>Click to go to the site!</a>
                </Card.Footer>
                {(Auth.getProfile().data._id !== userId)&&
                (<>
                <AddComment projectId = {_id}/>
                <MakeDonation projectId = {_id}/>
                </>)}
                <Link to={`/${_id}/comments`}>See all the available comments!</Link>
                
            </Card>
            </>
    );
}

