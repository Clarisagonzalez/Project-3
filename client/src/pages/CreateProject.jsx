import { Container, Row, Button, Form, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../utils/mutations';
import Auth from '../utils/auth';


export default function CreateProject() {

  useEffect(() => {
    document.title = `Go ahead and create a project!`
    return () => {
      if (location.pathname !== '/create_project') document.title = 'Unity Fund'
    }
  }, [])

  const initialState = {
    projectName: '',
    projectDescription: '',
    expiresIn: '',
    goalAmount: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [showAlert, setShowAlert] = useState(false);

  const [addProject, { projectError }] = useMutation(ADD_PROJECT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addProject({
        variables: {
          projectName: formData.projectName,
          projectDescription: formData.projectDescription,
          expiresIn: parseInt(formData.expiresIn),
          goalAmount: parseFloat(formData.goalAmount),
          userId: Auth.getProfile().data._id
        }
      });
      setFormData(data.addProject);
      setShowAlert(true);
    } catch (error) {
      throw error;
    }
  };

  return (<Container>
    <h2>Want to start another campaign/project? Fill the form below:</h2>
    <Row>
      <div>
        <h2>Add Project</h2>
        <Form className="align-center bg-secondary text-center" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor='projectName'>
              Enter a name for your campaign/project:
              <Form.Control type="text" name="projectName" value={formData.projectName} onChange={handleChange} />
            </Form.Label>
          </Form.Group>
          <br />
          <Form.Group className="mb-3">
            <Form.Label htmlFor='projectDescription'>
              Give a brief description of said campaign (no more than 500 characters!):
              <Form.Control type="text" name="projectDescription" value={formData.projectDescription} onChange={handleChange} />
            </Form.Label>
          </ Form.Group>
          <br />
          <Form.Group className="mb-3">
            <Form.Label htmlFor='expiresIn'>
              For how many days you will be collecting funds for the campaign?
              <Form.Control type="text" name="expiresIn" value={formData.expiresIn} onChange={handleChange} />
            </Form.Label>
          </ Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor='goalAmount'>
              What is the goal amount for the campaign?
              <Form.Control type="text" name="goalAmount" value={formData.goalAmount} onChange={handleChange} />
            </Form.Label>
          </ Form.Group>

          <Button
            disabled={!(formData.projectName && formData.projectDescription && formData.expiresIn && formData.goalAmount)}
            type="submit"
            variant='primary'
          >
            Submit
          </Button>
          {projectError ? (<Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            {projectError.message}
          </Alert>) :
            (<Alert dismissible onClose={() => { setShowAlert(false); setFormData(initialState);}} show={showAlert} variant='success'>
              {`Congrats! A new project was created by ${Auth.getProfile().data.username}.`}
            </Alert>)}
        </Form>
      </div>
    </Row>
  </Container>);
}