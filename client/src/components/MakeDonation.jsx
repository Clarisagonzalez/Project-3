import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Container, Alert, Form, InputGroup, Button } from 'react-bootstrap';
import { MAKE_DONATION } from '../utils/mutations';
import Auth from '../utils/auth';

export default function MakeDonation({ projectId }) {

    const [donatedAmount, setDonatedAmount] = useState(0);

    const [makeDonation, { error }] = useMutation(MAKE_DONATION);
    const [showAlert, setShowAlert] = useState(false);


    const handleChange = (e) => {
        setDonatedAmount(parseInt(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await makeDonation({
                variables: { projectId, amount: donatedAmount, donorId: Auth.getProfile().data._id}
            });
            console.log(data.makeDonation);
            setDonatedAmount(0);
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
                    <InputGroup.Text>Enter the amount you want to donate in $USD</InputGroup.Text>
                    <Form.Control type="text" onChange={handleChange} />
                </InputGroup>
                <Button variant='primary' type='submit'>Please Donate</Button>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='success'>
                    {`${Auth.getProfile().data.username} successfully donated!`}
                </Alert>
            </Form>
        </Container>
    );
}