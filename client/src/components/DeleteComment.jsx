import { Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from '../utils/mutations';

export default function DeleteComment({ commentId, _id }) {
   
    const [deleteComment, { error }] = useMutation(DELETE_COMMENT);
        
    const deleteHandler = async (_id, commentId) => {
        try{
       await deleteComment({
            variables: { id: _id, commentId: commentId }
        });
        if(error) console.log(error);
        location.reload();
    } catch(err) {
        console.error(err);
    }
    };
    return (
        <div>
        <Button variant='ligth' className='text-danger' onClick={()=> deleteHandler(commentId, _id)}>Delete this comment</Button>
        </div>
    );
}