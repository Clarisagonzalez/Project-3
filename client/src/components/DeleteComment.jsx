import { Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from '../utils/mutations';

export default function DeleteComment({  _id }) {
   
    const [deleteComment] = useMutation(DELETE_COMMENT);
        
    const deleteHandler = async (_id) => {
        try{
         const { data } = await deleteComment({
            variables: { _id }
        });
        window.location.reload();
    } catch(err) {
        throw err;
    }
    };
    return (
        <div>
        <Button variant='ligth' className='text-danger' onClick={async ()=> deleteHandler(_id)}>Delete this comment</Button>
        </div>
    );
}