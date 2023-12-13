import { Alert, Form, Dropdown, InputGroup, Button, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SITE_DONATIONS } from '../utils/queries';
import { MAKE_SITE_DONATION } from '../utils/mutations';
import Auth from '../utils/auth';

const Donate = () => {

  useEffect(() => {
    document.title = `Go ahead, help us make the world a better place!`
    return () => {
      if (location.pathname !== '/donate') document.title = 'Unity Fund'
    }
  }, []);

  const donorId = Auth.getProfile().data._id;
  const donorName = Auth.getProfile().data.username;

  const initialState = {
    donorName: donorName,
    donorId: donorId,
    donationAmount: 0,
    donorComment: '',
    paymentMethod: ''
  };

  const [donationData, setDonationData] = useState(initialState);
  const [showAlert, setShowAlert] = useState(false);
  const [makeDonation, { error }] = useMutation(MAKE_SITE_DONATION);

  const { data, loading } = useQuery(QUERY_SITE_DONATIONS);

  const donations = data?.siteDonations || [];
  if (loading) return <div>Loading...</div>;
  console.log(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData({ ...donationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      donationData.donationAmount = parseFloat(donationData.donationAmount);
      console.log(donationData);
      await makeDonation({
        variables: {...donationData}
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
          All donations received to date:
        </Card.Header>
        <Card.Body>
          {!donations.length ? (<div> No donations have been received yet...</div>) : (donations.map(donation => (
            <>
              <h2>Thank you {donation.donorName}</h2>
              <p>We received {donation.donationAmount} from you on the date {donation.donationDate}</p>
            </>
          )))}
        </Card.Body>
        <hr/>
      </Card>
      <div>
        <h2>Donate to Unity_Fund!</h2>
        <Form className='bg-secondary text-center' onSubmit={handleSubmit}>
          {error && <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            {error.message}
          </Alert>}
          <Form.Group className="mb-3">
            <Form.Label htmlFor='donationAmount'>
              Amount to Donate:
              <Form.Control type="text" name="donationAmount" placeholder="Enter the donation in USD($)"  onChange={handleChange} required />
            </Form.Label>
            <Form.Control.Feedback type='invalid'>Please, specify the amount to donate.</Form.Control.Feedback>
          </Form.Group>
          <br />
          <InputGroup>
            <InputGroup.Text>Your input is important to us. Leave any comment or suggestion you have!</InputGroup.Text>
            <Form.Control as="textarea" name="donorComment" onChange={handleChange} />
          </InputGroup>
          <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Method of Payment
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{setDonationData({ ...donationData, paymentMethod: 'Debit Card' })}}>Debit Card</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{setDonationData({ ...donationData, paymentMethod: 'Credit Card' })}}>Credit Card</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{setDonationData({ ...donationData, paymentMethod: 'Digital Wallet' })}}>Digital Wallet</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{setDonationData({ ...donationData, paymentMethod: 'Other' })}}>Other</Dropdown.Item>
                </Dropdown.Menu>
          </Dropdown>
          <br/>
          <Button
            variant="success"
            type="submit">
            Thanks for your donation!
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Donate;
