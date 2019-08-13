import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      isChecked: false,
      validated: false,
      isInvalid: false
    }
  }

  componentDidMount() {
    if (localStorage.getItem('savedUser') !== null) {
      localStorage.getItem('savedUser')
      this.setState({ user: JSON.parse(localStorage.getItem('savedUser')) });
    }
    if (localStorage.getItem('currentUser') !== null) {
      localStorage.setItem('currentUser', JSON.stringify(''));
      this.userCallBackMethod('');
    }
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.currentTarget.checkValidity();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ isInvalid: true });
    } else {
      this.handleValues(event);
      this.setState({ validated: true, isInvalid: false });
    }
  };

  checkboxToggle = (event) => {
    this.setState({ isChecked: !this.state.isChecked })
  }

  handleValues = (event) => {
    let userData =
    {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value
    };
    this.userCallBackMethod(userData.email);
    if (this.state.isChecked) {
      localStorage.setItem('savedUser', JSON.stringify(userData));
    }
  };

  handleEmailChange = (event) => {
    this.setState({ isInvalid: false });
  };

  userCallBackMethod = (value) => {
    this.props.userEmail(value);
  }

  render() {
    const { validated, isInvalid, user } = this.state;
    if (validated) {
      return <Redirect to='/data' />;
    }
    return (
      <Col xs={6} className="col-centered">
        <Form noValidate validated={validated} onSubmit={this.handleSubmit} >
          <Form.Group controlId="formEmail">
            <Form.Label>
              Email address
            </Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              placeholder="Enter email"
              isInvalid={isInvalid}
              onChange={this.handleEmailChange}
              defaultValue={user.email}
            />
            <Form.Control.Feedback type="invalid" className="invalid-feedback">
              Please choose a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control
              required
              name="password"
              type="password"
              placeholder="Password"
              defaultValue={user.password}
            />
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
            <Form.Check
              type="checkbox"
              name="saveUser"
              label="Remember Me"
              onChange={this.checkboxToggle}
            />
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