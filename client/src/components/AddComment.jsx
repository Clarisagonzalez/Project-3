import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Container, Alert, Form, InputGroup, Button } from 'react-bootstrap';
import { ADD_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';

export default function AddComment({ projectId }) {

    const [commentText, setCommentText] = useState('');

    const [addComment, { error }] = useMutation(ADD_COMMENT)
    const [showAlert, setShowAlert] = useState(false);


    const handleChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(commentText)
        try {
            await addComment({
                variables: { projectId, commentText: commentText }
            });
            alert('Comment successfully added!')
            setCommentText('');
        } catch (err) {
            setShowAlert(true);

            throw err;
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                {error && <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong!
                    <br />
                    {error.message}
                </Alert>}
                <InputGroup>
                    <InputGroup.Text>Leave your thoughts about this campaign/project!</InputGroup.Text>
                    <Form.Control as="textarea" onChange={handleChange} />
                </InputGroup>
                <Button variant='primary' type='submit'>Add Comment!</Button>
            </Form>
        </Container>
    );
}