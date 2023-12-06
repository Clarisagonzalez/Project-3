import { Button, Form } from 'react-bootstrap';

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
  const [addUser, { error }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await addUser({
      variables: { ...formData }
    });
    error? console.error(error) : Auth.login(data.addUser.token);

    navigate('/');
    setFormData(initialState);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <Form className="align-center bg-secondary text-center" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>
            Username:
            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
          </Form.Label>
        </Form.Group>
        <br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Email:
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
          </Form.Label>
        </ Form.Group>
        <br />
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>
          Password:
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
        </Form.Label>
        </ Form.Group>
        <br />
        <Button type="submit">Sign Up</Button>
      </Form>
    </div>
  );
};

export default SignUp;
