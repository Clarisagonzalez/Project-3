import { Container } from 'react-bootstrap';
import SingleUserDonations from '../components/SingleUserDonations';
import SingleUserComments from '../components/SingleUserComments';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const SingleUser =  () => {
    const { id } =  useParams();

    const { data, loading } = useQuery(QUERY_USER, {
        variables: { _id: id }
    });

    const username = data?.user.username || '';
    if(loading) return <div>Loading...</div>;
    return (
        <Container>
            <h1>{`All comments by ${username}`}</h1>
            <SingleUserComments _id={id} />
            <hr />
            <h1>{`All donations by ${username}`}</h1>
            <SingleUserDonations _id={id} />
        </Container>
    );
};

export default SingleUser;