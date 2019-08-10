import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class LoginForm extends Component{
  constructor(){
    super()
    this.state = {
      user:[],
      checkbox:false,
      validated:false,
      isInvalid: false
    }
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.currentTarget.checkValidity();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      this.setState ({ isInvalid : true });
    } else{
      this.handleValues(event);
      this.setState ({ validated : true , isInvalid : false });
    }
  };

  checkboxToggle = (event) => {
    this.setState ({ checkbox: !this.state.checkbox })
  }  

  handleValues = (event) => {
    this.setState ({ user : [
        {
          email:event.target.elements.email.value,
          password:event.target.elements.password.value
        }
      ] 
    })
    const { checkbox, user } = this.state;
    if (checkbox) {
      localStorage.setItem('user', JSON.stringify(user));
    }  
  };

  handleEmailChange = (event) => {
    this.setState ({ isInvalid : false });
  };
  
  render(){
    const { validated, isInvalid } = this.state;
    if ( validated ){
      return <Redirect to='/data'/>;} 
    return (
      <Col xs={6} className="col-centered">
        <Form noValidate validated={validated} onSubmit={this.handleSubmit} >
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              required 
              type="email" 
              name="email" 
              placeholder="Enter email" 
              isInvalid={isInvalid} 
              onChange={this.handleEmailChange}
            />
            <Form.Control.Feedback type="invalid" className="invalid-feedback">
              Please choose a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required name="password" type="password" placeholder="Password"/>
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
            <Form.Check type="checkbox" name="saveUser" label="Remember Me" onChange={this.checkboxToggle} />
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
