import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { projects } from '../utils/dataArrays';
import SingleProject from './SingleProject';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT, UPDATE_USER } from '../utils/mutations';
import { MY_PROJECTS } from '../utils/queries';
import Auth from '../utils/auth';

export default function Dashboard() {

  const initialState = {
    projectName: '',
    projectDescription: '',
    expiresIn: '',
    goalAmount: ''
  };

  const currentUser = {
    username: Auth.getProfile().data.username,
    email: Auth.getProfile().data.email,
    password: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [userData, setUserData] = useState(currentUser);

  const [addProject] = useMutation(ADD_PROJECT, {
    refetchQueries: [
      MY_PROJECTS,
      'myProjects'
    ]
  });
  const [updateUser] = useMutation(UPDATE_USER);

  const { data, loading } = useQuery(MY_PROJECTS);
  
  const myProjects = data?.projects || [];

  if (loading) return (<div>Loading...</div>);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
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
      setFormData(data);
    } catch (error) {
      throw error
    }
  };


  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateUser({
        variables: {
          ...userData
        }
      });
      setUserData(data);
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Container>
        <h1>Welcome to your Dashboard, <strong><i>{Auth.getProfile().data.username}</i></strong>! What do you want to do today?:</h1>
      </Container>
      <Container>
        <h2>See your campaigns/projects</h2>
        <Row>
          {myProjects.map(project =>
            ( <Col sm={12} md={6} lg={4} key={myProjects.indexOf(project)}>
             <SingleProject {...project}  />
             </Col>))}
        </Row>
      </Container>

      <Container>
        <h2>Causes you have supported</h2>
        <Row>
          {projects.map(project =>
            ( <Col sm={12} md={6} lg={4} key={projects.indexOf(project)}>
              <SingleProject {...project}  />
            </Col>))}
        </Row>
      </Container>

      <Container>
        <h2>Do you want to update your data?</h2>
        <Form className="align-center bg-secondary text-center" onSubmit={handleUpdateSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              Update your username
              <Form.Control type="text" name="username" value={userData.username} onChange={handleUpdate} />
            </Form.Label>
          </Form.Group>
          <br />
          <Form.Group className="mb-3">
            <Form.Label>
              Update your email
              <Form.Control type="email" name="email" value={userData.email} onChange={handleUpdate} />
            </Form.Label>
          </ Form.Group>
          <br />
          <Form.Group className="mb-3">
            <Form.Label>
              Update your password
              <Form.Control type="password" name="password" id="password" value={userData.password} onChange={handleUpdate} />
            </Form.Label>
          </ Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>

      <Container>
        <h2>Want to start other campaigns/projects? Fill the form below:</h2>
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
              <Form.Group className="mb-3">
                <Form.Label>
                  Give a brief description of said campaign (no more than 500 characters!):
                  <Form.Control type="text" name="projectDescription" value={formData.projectDescription} onChange={handleChange} />
                </Form.Label>
              </ Form.Group>
              <br />
              <Form.Group className="mb-3">
                <Form.Label>
                  What will be the deadline to donate money for the campaign?
                  <Form.Control type="text" name="expiresIn" value={formData.expiresIn} onChange={handleChange} />
                </Form.Label>
              </ Form.Group>
              <Form.Group className="mb-3">
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
};