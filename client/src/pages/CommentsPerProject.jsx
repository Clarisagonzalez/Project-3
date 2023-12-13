import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { COMMENTS_PER_PROJECT } from '../utils/queries';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Comments() {

    useEffect(()=>{
        document.title = 'Comments for Chosen Project';
        return () => {}
    }, []);
    
    const { id } = useParams();

    const { data, loading, error } = useQuery(COMMENTS_PER_PROJECT, {
        variables: { projectId: id }
    });

    const comments = data?.commentsPerProject || [];
    if(loading) return <div> Loading...</div>;
    if(error) return <div>{error.message}</div>

    return (
        <Container>
            <Row>
            {!comments.length ? <h2>There are no comments available for this project.</h2> : comments.map(comment => (<Col key={comment._id}>
            <Card>
                <Card.Header>
                    <Card.Title>
                        {comment.commentDate}
                    </Card.Title>
                    <Card.Subtitle>
                        {comment.commentAuthor}
                    </Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    {comment.commentText}
                </Card.Body>
            </Card>
            </Col>))}
            </Row>
        </Container>
    )

}
