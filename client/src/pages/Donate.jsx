import { Alert, Form, Col, Button, Card} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_PROJECT } from '../utils/queries';
import { MAKE_DONATION } from '../utils/mutations';
import SingleProject from './SingleProject';

const Donate = () => {

  useEffect(() => {
    document.title = `Go ahead, help a cause today!`
    return () => {
      if (location.pathname !== '/donate') document.title = 'Unity Fund'
    }
  }, []);

  const { id } = useParams();

  const initialState = {
    amount: 0,
    paymentMethod: null
  };

  const [donationData, setDonationData] = useState(initialState);
  const [showAlert, setShowAlert] = useState(false);
  const [makeDonation, { error }] = useMutation(MAKE_DONATION);


  const { data, loading, queryError } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: {
      projectId: id
    }
  });

  const project = data?.project || {};
  ;
  if (loading) return <div> Loading...</div>


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData({ ...donationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await makeDonation({
        variables: { ...donationData }
      });

      setDonationData(initialState);

    } catch (err) {
      setShowAlert(true);
      throw err;
    }
  };

  return (
    <>
      <Card >
        <Card.Header>
          <h3>{project.projectName}</h3>
          Amount that needs to be raised ${project.goalAmount}!<br />
          Hurry! This campaign expires in {project.expiresIn} days!
        </Card.Header>
        <Card.Body>
          {!project.donations.length ? (<div> No donations yet...</div>) : (project.donations.map(donation => (
            <>
            <div>{donation.amount}</div><br/>
            <div>{donation.donationDate}</div><br/>
            <div>{donation.donorId}</div>
            </>
          )))}
        </Card.Body>
      </Card>
      <div>
        <h2>Donate to {project.projectName}</h2>
        <Form className='bg-secondary text-center' onSubmit={handleSubmit}>
          {error && <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Something went wrong with your login credentials!
            <br />
            {error.message}
          </Alert>}
          <Form.Group className="mb-3">
            <Form.Label htmlFor='amount'>
              Amount to Donate:
              <Form.Control type="text" name="amount" placeholder="Enter the donation in USD($)" value={donationData.amount} onChange={handleChange} required />
            </Form.Label>
            <Form.Control.Feedback type='invalid'>Please, specify the amount to donate.</Form.Control.Feedback>
          </Form.Group>
          <br />
          <Form.Group className="mb-3">
            <Form.Label htmlFor='password'>
              Method of Payment:
              <Form.Control type="text" name="paymentType" placeholder="Enter the method of payment" value={donationData.paymentType} onChange={handleChange} required />
            </Form.Label>
            <Form.Control.Feedback type='invalid'>You need to stipulate the method of payment!</Form.Control.Feedback>
          </Form.Group>
          <br />
          <Button
            disabled={!(donationData.amount && donationData.paymentType)}
            variant="primary"
            type="submit">
            Make Donation!
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Donate;
