import { Link } from 'react-router-dom';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const LoginForm = () => {
  return (
    <Col xs={6} className="col-centered">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicChecbox">
          <Form.Check type="checkbox" label="Remember Me" />
        </Form.Group>
        <Link to='/data'>
          <Button variant="primary" type="submit">   
              Login  
          </Button>
        </Link>
      </Form>
    </Col>
  );
}

export default LoginForm;
