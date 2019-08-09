import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class LoginForm extends Component{
  constructor(){
    super()
    this.state = {
      validated:false,
      setValidated:false
    }
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(event.currentTarget.checkValidity());
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else{
        this.setState ({ setValidated : true });
      }
  };
  
  render(){
    const { validated, setValidated } = this.state;
    if ( setValidated ){
      return <Redirect to='/data'/>;} 
    return (
      <Col xs={6} className="col-centered">
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
            <Form.Control.Feedback type="invalid">
              Please choose a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required/>
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
            <Button variant="primary" type="submit">   
                Login  
            </Button>
        </Form>
      </Col>
    );
  }
}

export default LoginForm;
