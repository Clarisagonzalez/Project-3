import { Row, Col } from 'react-bootstrap';
import SingleDonation from '../components/SingleDonation';
import { useQuery } from '@apollo/client';
import { ALL_MY_DONATIONS } from '../utils/queries';

export default function SingleUserDonations({ _id }) {
    const { data, loading }= useQuery(ALL_MY_DONATIONS, {
        variables: { _id }
    });

    const donations = data?.allMyDonations || [];

    if (loading) return <div>Loading...</div>;

    return (
        <Row>
            {!donations.length ? <h2>No donations so far...</h2> : (donations.map((donation) => (
                <Col key={donation.donation._id}>
                    <SingleDonation {...donation} />
                </Col>)
            ))}
        </Row>
    );
}