import { Container, Button, Form, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function UpdateUser() {

  useEffect(() => {
    document.title = `Update your login data!`
    return () => {
      if (location.pathname !== '/update') document.title = 'Unity Fund'
    }
  }, [])

    
  const currentUser = {
    username: Auth.getProfile().data.username,
    email: Auth.getProfile().data.email,
    password: ''
  };

  const [userData, setUserData] = useState(currentUser);
  //Local state variables that validate the input entered through the forms
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [updateUser, { updateError }] = useMutation(UPDATE_USER);

  
  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    };
    setValidated(true);

    try {
      const { data } = await updateUser({
        variables: {
          ...userData
        }
      });
      setUserData(data.updateUser);
      if(!updateError)setShowAlert(true);
    } catch (err) {
      setShowAlert(true);
      throw err;
    }
  };

  return (
  <Container>
  <h2>Do you want to update your data?</h2>
  <Form noValidate validated={validated} className="align-center bg-secondary text-center" onSubmit={handleUpdateSubmit}>
    {updateError && (<Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
      Something went wrong with the updating of your credentials!
      <br />
      {updateError.message}
    </Alert>)}
    <Form.Group className="mb-3">
      <Form.Label htmlFor='username'>
        Update your username
        <Form.Control type="text" name="username" value={userData.username} onChange={handleUpdate} />
      </Form.Label>
    </Form.Group>
    <br />
    <Form.Group className="mb-3">
      <Form.Label htmlFor='email'>
        Update your email
        <Form.Control type="email" name="email" value={userData.email} onChange={handleUpdate} />
      </Form.Label>
    </ Form.Group>
    <br />
    <Form.Group className="mb-3">
      <Form.Label htmlFor='password'>
        Update your password
        <Form.Control type="password" name="password" id="password" value={userData.password} onChange={handleUpdate} />
      </Form.Label>
    </ Form.Group>
    <Button type="submit">Submit</Button>
    <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='success'>
      {`Congrats! Your username was successfully updated to ${userData.username}`}.
      <br />
      {`Congrats! Your email was successfully updated to ${userData.email}`}.
      <br/>
      {`Congrats! Your password was successfully updated to ${userData.password}`}
      <br/>
      All changes made will be reflected next time you log-in!
    </Alert>
  </Form>
</Container>);

}