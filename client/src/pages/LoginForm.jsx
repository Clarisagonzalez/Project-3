import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { Button, Form, Alert, Container } from 'react-bootstrap';


const LoginForm = () => {
  
  useEffect(() => {
    document.title = `If you are registered, go ahead and login!`
    return () => {
      if (location.pathname !== '/login') document.title = 'Unity Fund'
    }
  }, [])
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
    <Container className="my-4 p-4 shadow-lg rounded" style={{ background: '#f2f2f2', maxWidth: '500px' }}>
      <h2 className="text-center mb-4" style={{ fontFamily: 'DM Serif Display', fontSize: '2.50rem' }}>Login</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {error && (
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
            Something went wrong with your login credentials!
            <br />
            {error.message}
          </Alert>
        )}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email:</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Control type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
        </Form.Group>
        
        <Button
          className="w-100"
          style={{ backgroundColor: '#19747E', borderColor: '#19747E' }}
          disabled={!(formData.email && formData.password)}
          variant="primary"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
