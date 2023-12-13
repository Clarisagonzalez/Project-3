import { Row, Col } from 'react-bootstrap';
import  SingleComment from '../components/SingleComment';
import { useQuery } from '@apollo/client';
import { ALL_MY_COMMENTS } from '../utils/queries';

export default function SingleUserComments({ _id }) {

const { data, loading } = useQuery(ALL_MY_COMMENTS, {
    variables: { _id }
});

const comments = data?.allMyComments || [];

if(loading) return <div>Loading...</div>;
return (
<Row>
{comments.map((comment) => (
    <Col key={comment.comment._id}>
        <SingleComment {...comment} />
    </Col>
))}
</Row>
);
}