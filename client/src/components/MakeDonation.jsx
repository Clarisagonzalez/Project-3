import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Container, Alert, Form, InputGroup, Button } from 'react-bootstrap';
import { MAKE_DONATION } from '../utils/mutations';
import Auth from '../utils/auth';
import Dropdown from 'react-bootstrap/Dropdown';


export default function MakeDonation({ projectId }) {

    const [donatedAmount, setDonatedAmount] = useState(0);

    const [makeDonation, { error }] = useMutation(MAKE_DONATION);
    const [showAlert, setShowAlert] = useState(false);


    const handleChange = (e) => {
        setDonatedAmount(parseFloat(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await makeDonation({
                variables: { projectId, amount: donatedAmount, donorId: Auth.getProfile().data._id }
            });
            setDonatedAmount(0);
            setShowAlert(true);

        } catch (err) {

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
                <Button variant='primary' type='submit'>Click to Donate</Button>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='success'>
                    {`${Auth.getProfile().data.username} successfully donated!`}
                </Alert>
            </Form>
            <br/>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Select Method of Payment
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Debit Card</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Credit Card</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Digital Wallet</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Other</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Container>
    );
}