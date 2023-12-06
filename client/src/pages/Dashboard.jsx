import { Container, Row, Button, Form} from 'react-bootstrap';
import { projects } from '../utils/dataArrays';
import SingleProject from './SingleProject';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ADD_PROJECT } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Dashboard() {

  const initialState = {
    projectName: '',
    projectDescription: '',
    expiresIn: '',
    goalAmount: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [addProject, { error }] = useMutation(ADD_PROJECT);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addProject({
      variables: { projectName: formData.projectName, 
        projectDescription: formData.projectDescription, 
        expiresIn: parseInt(formData.expiresIn), 
        goalAmount: parseFloat(formData.goalAmount), 
        userId: Auth.getProfile().data._id}
    });
    projects.push(data);
    setFormData(initialState);
  } catch(error) {
    throw error
  }
  };

  return (
    <>
      <Container>
        <h1>Your campaigns</h1>
        <Row>
          {projects.map(project =>
            (<SingleProject {...project} key={projects.indexOf(project)}/>))}
        </Row>
      </Container>
      <Container>
        <h1>Causes you have supported</h1>
        <Row>
          {projects.map(project =>
            (<SingleProject {...project} key={projects.indexOf(project)} />))}
        </Row>
      </Container>
      <Container>
        <h1>Want to start other campaigns/projects? Fill the form below:</h1>
        <Row>
          <div>
            <h2>Add Project</h2>
            <Form className="align-center bg-secondary text-center" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Enter a name for your campaign/project:
                  <Form.Control type="text" name="projectName" value={formData.projectName} onChange={handleChange} />
                </Form.Label>
              </Form.Group>
              <br />
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  Give a brief description of said campaign (no more than 500 characters!):
                  <Form.Control type="text" name="projectDescription" value={formData.projectDescription} onChange={handleChange} />
                </Form.Label>
              </ Form.Group>
              <br />
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  What will be the deadline to donate money for the campaign?
                  <Form.Control type="text" name="expiresIn" value={formData.expiresIn} onChange={handleChange} />
                </Form.Label>
              </ Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  What is the goal amount for the campaign?
                  <Form.Control type="text" name="goalAmount" value={formData.goalAmount} onChange={handleChange} />
                </Form.Label>
              </ Form.Group>

              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </Row>
      </Container>
    </>
  );
}