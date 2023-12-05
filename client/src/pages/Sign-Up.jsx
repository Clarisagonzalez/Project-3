import { Button, Form } from 'react-bootstrap';

import { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
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
