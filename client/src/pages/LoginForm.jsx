import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

import { Button, Form, Alert } from 'react-bootstrap';

const LoginForm = () => {
  const initialState = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN);


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
    };

    setValidated(true);

    try {
      const { data } = await login({
        variables: { ...formData }
      });

      Auth.login(data.login.token);
      setFormData(initialState);

    } catch (err) {
      setShowAlert(true);
      throw err;
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', fontFamily:'Nunito, sans-serif'}}>Login</h2>
      <Form noValidate validated={validated} className='bg-secondary text-center' onSubmit={handleSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className="mb-3">
          <Form.Label htmlFor= 'email'>
            Email:
            <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required/>
          </Form.Label>
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group className="mb-3">
          <Form.Label htmlFor= 'password'>
            Password:
            <Form.Control type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required/>
          </Form.Label>
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <br />
        <Button 
        disabled={!(formData.email && formData.password)}
        variant="primary" 
        type="submit">
          Login
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

export default LoginForm;
