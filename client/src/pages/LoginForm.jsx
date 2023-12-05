import { useState } from 'react';
import gql from 'graphql-tag';
import { Button, Form } from 'react-bootstrap';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ****I need to add logic for sumbitting the data using GraphQL
    // Once logged In user needs to be redirected to new page****
    // 
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
