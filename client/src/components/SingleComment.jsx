import {Card} from 'react-bootstrap';

export default function SingleComment({projectName, comment}) {
    return(<Card>
        <Card.Title>
            Comment for project: {projectName}
        </Card.Title>
        <Card.Subtitle>
            Posted on: {comment.commentDate} 
        </Card.Subtitle>
        <Card.Body>
            {comment.commentText}
        </Card.Body>
    </Card>);
}