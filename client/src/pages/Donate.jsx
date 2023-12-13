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
  <div className="container mt-4">
    <Card className="mb-4">
      <Card.Header className="text-center">
        <h3>{project.projectName}</h3>
        <p>Amount that needs to be raised: ${project.goalAmount}!<br />
        Hurry! This campaign expires in {project.expiresIn} days!</p>
      </Card.Header>
      <Card.Body>
        {!project?.donations?.length ? (
          <div className="text-center">No donations yet...</div>
        ) : (
          project.donations.map(donation => (
            <div className="mb-2">
              <div>${donation.amount}</div>
              <div>{donation.donationDate}</div>
              <div>{donation.donorId}</div>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
    
    <div>
      <h2 className="text-center mb-4">Donate to {project.projectName}</h2>
      <Form className="bg-light p-4 rounded" onSubmit={handleSubmit}>
        {error && (
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
            className="mb-3"
          >
            Something went wrong with your donation!
            <br />
            {error.message}
          </Alert>
        )}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="amount">Amount to Donate:</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            className="form-control-lg"
            placeholder="Enter the donation in USD($)"
            value={donationData.amount}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="paymentType">Method of Payment:</Form.Label>
          <Form.Control
            type="text"
            name="paymentType"
            className="form-control-lg"
            placeholder="Enter the method of payment"
            value={donationData.paymentType}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
        style={{ backgroundColor: '#19747E', borderColor: '#19747E' }}
          disabled={!(donationData.amount && donationData.paymentType)}
          variant="primary"
          type="submit"
          className="btn-lg"
        >
          Make Donation!
        </Button>
      </Form>
    </div>
  </div>
</>

  );
};

export default Donate;
