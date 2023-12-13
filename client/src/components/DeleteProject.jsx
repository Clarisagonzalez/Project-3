import { Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT } from '../utils/mutations';

export default function DeleteComment({ projectId, _id }) {

    const [deleteProject, { error }] = useMutation(DELETE_PROJECT);

    const deleteHandler = async (_id, projectId) => {

        try {
            await deleteProject({
                variables: { _id: _id, projectId: projectId }
            });
            location.reload();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div>
            <Button variant='ligth' className='text-danger' onClick={() => deleteHandler(projectId, _id)}>Delete this project</Button>
        </div>
    );
}