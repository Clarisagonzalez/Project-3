import { Button, Form, Alert, Container } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignUp = () => {

  useEffect(() => {
    document.title = `Register to start a campaign/project!`
    return () => {
      if (location.pathname !== '/signup') document.title = 'Unity Fund'
    }
  }, [])

  const initialState = {
    username: '',
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const [addUser, { error }] = useMutation(ADD_USER);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      const { data } = await addUser({
        variables: { ...formData }
      });
      setValidated(true);
      Auth.login(data.addUser.token);
      navigate('/');
      setFormData(initialState);
    } catch (err) {
      setShowAlert(true);
      throw err;
    }
  };

  return (
    <Container className="my-4 p-4 shadow-lg rounded" style={{ background: '#f2f2f2', maxWidth: '500px' }}>
      <h2 className="text-center mb-4" style={{ fontFamily: 'DM Serif Display', fontSize: '2.50rem' }}>Sign Up</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {showAlert && (
          <Alert dismissible onClose={() => setShowAlert(false)} variant="danger">
            Something went wrong with your signup!
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
        </Form.Group>

        <Button
          className="w-100"
          style={{ backgroundColor: '#19747E', borderColor: '#19747E' }}
          disabled={!(formData.username && formData.email && formData.password)}
          variant="primary"
          type="submit"
        >
          Sign Up
        </Button>
      </Form>

      {error && (
        <div className="mt-3 text-center p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </Container>
  );
};

export default SignUp;
