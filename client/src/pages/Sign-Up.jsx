import { Button, Form, Alert } from 'react-bootstrap';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignUp = () => {
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
    <div>
      <h2 style={{ textAlign: 'center', fontFamily:'Nunito, sans-serif'}} >Sign Up</h2>
      <Form noValidate validated={validated} className="align-center bg-secondary text-center" onSubmit={handleSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>
        <Form.Group className="mb-3">
          <Form.Label>
            Username:
            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
          </Form.Label>
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>

        </Form.Group>

        <br />
        <Form.Group className="mb-3">
          <Form.Label>
            Email:
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Label>
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </ Form.Group>
        <br />
        <Form.Group className="mb-3">
          <Form.Label>
            Password:
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
          </Form.Label>
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </ Form.Group>
        <br />
        <Button
          disabled={!(formData.username && formData.email && formData.password)}
          type="submit"
          variant='primary'>
          Sign Up
        </Button>
      </Form>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default SignUp;
