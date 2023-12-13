import { Container, Row, Col, Card} from 'react-bootstrap';
import SingleComment from '../components/SingleComment';
import {ALL_MY_COMMENTS} from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

export default function MyComments() {
    const { loading, data } = useQuery(ALL_MY_COMMENTS, {
        variables: { _id: Auth.getProfile().data._id }
    });
    const myComments = data?.allMyComments || [];
    if(loading) return <div> Loading... </div>
 

    return(
        <Container>
        <h2>Here are all of the projects/campaigns you have commented on:</h2>
        <Row>
          {myComments.map((comment) =>
          (<Col sm={12} md={6} key={comment.comment._id}>
           <SingleComment {...comment} />
          </Col>))}
        </Row>
      </Container>
    );
}