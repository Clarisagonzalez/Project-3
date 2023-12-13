import { Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT } from '../utils/mutations';
import Auth from '../utils/auth';

export default function DeleteComment({ projectId}) {

    const userId = Auth.getProfile().data._id;
    const [deleteProject] = useMutation(DELETE_PROJECT);

    const deleteHandler = async (userId, projectId) => {
        try {
            await deleteProject({
                variables: { userId, projectId: projectId }
            });
            window.location.reload();
        } catch (err) {
            throw err       
         }
    };
    return (
        <div>
            <Button variant='ligth' className='text-danger' onClick={async () => deleteHandler(projectId, userId)}>Delete this project</Button>
        </div>
    );
}