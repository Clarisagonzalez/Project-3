import { Card } from 'react-bootstrap';

export default function SingleDonation({ projectName, donation }) {
    return (<Card>
        <Card.Title>
            Supported the following cause: {projectName}
        </Card.Title>
        <Card.Body>
            On {donation.donationDate}{' '}
            you donated ${donation.amount}.00 to this cause.
        </Card.Body>
    </Card>);
}