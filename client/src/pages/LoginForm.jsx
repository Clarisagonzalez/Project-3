import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

import { Button, Form } from 'react-bootstrap';

const LoginForm = () => {
  const initialState = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [login, { error }] = useMutation(LOGIN);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await login({
      variables: { ...formData }
    });
    error? console.error(error) : Auth.login(data.login.token);
    navigate('/');
    setFormData(initialState);
  };

  return (
    <div>
      <h2>Login</h2>
      <Form className='bg-secondary text-center' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Email:
            <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
          </Form.Label>
        </Form.Group>
        <br />
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Password:
            <Form.Control type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
          </Form.Label>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginForm;
