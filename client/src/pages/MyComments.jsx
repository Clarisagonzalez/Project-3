import { Container, Row, Col} from 'react-bootstrap';
import SingleComment from '../components/SingleComment';
import {ALL_MY_COMMENTS} from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import DeleteComment from '../components/DeleteComment';

export default function MyComments() {

    const _id = Auth.getProfile().data._id;

    const { loading, data } = useQuery(ALL_MY_COMMENTS, {
        variables: { _id }
    });
    const myComments = data?.allMyComments || [];
    if(loading) return <div> Loading... </div>
 

    return(
        <Container>
        <h2>Here are all of the projects/campaigns you have commented on:</h2>
        <Row>
          {myComments.length ? (myComments.map((comment) =>
          (<Col sm={12} md={6} key={comment.comment._id}>
           <SingleComment {...comment} />
           <DeleteComment _id ={_id}/>
          </Col>))) : <h2>You haven't commented on any project yet. Kind suggestions are always welcome!</h2>}
        </Row>
      </Container>
    );
}